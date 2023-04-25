import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpError from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import roleCheckMiddleware from "../middlewares/roleCheckMiddleware";
import validationMiddleware from "../middlewares/validation.middleware";
import userModel from "../user/user.model";
import CreatePartnerDto from "./partners.dto";
import IPartner from "./partners.interface";
import Partner from "./partners.interface";
import PartnerModel from "./partners.model";

export default class PartnerController implements Controller {
    public path = "/Partners";
    public router = Router();
    private Partner = PartnerModel;
    private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllPartners);
        this.router.get(`${this.path}/:id`, this.getPartnerById);
        this.router.get(`${this.path}/:offset/:limit/:Partner/:sort/:keyword?`, this.getPaginatedPartners);
        this.router.post(this.path, [validationMiddleware(CreatePartnerDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createPartner);
        this.router.patch(
            `${this.path}/:id`,
            [validationMiddleware(CreatePartnerDto, true), authMiddleware, roleCheckMiddleware(["admin"])],
            this.modifyPartner,
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deletePartnerById);
    }

    private getAllPartners = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Partners = await this.Partner.find();
            res.send(Partners);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private getPaginatedPartners = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const Partner = req.params.Partner; // Partner?
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let Partners = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.Partner.find({ $or: [{ PartnerName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                Partners = await this.Partner.find({ $or: [{ PartnerName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${Partner}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.Partner.countDocuments();
                Partners = await this.Partner.find({})
                    .sort(`${sort == -1 ? "-" : ""}${Partner}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, Partners: Partners });
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private getPartnerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            // if (!(await isIdValid(this.Partner, [PartnerId], next))) return;

            const Partner = await this.Partner.findById(id);
            if (!Partner) return next(new HttpError(404, `Failed to get Partner by id ${id}`));

            res.send(Partner);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private createPartner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const PartnerData: IPartner = req.body;
            const newPartner = await this.Partner.create({ ...PartnerData });
            if (!newPartner) return next(new HttpError(400, "Failed to create Partner"));
            res.send(newPartner);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private modifyPartner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!Types.ObjectId.isValid(id)) return next(new IdNotValidException(id));

            const PartnerData: Partner = req.body;
            const Partner = await this.Partner.findByIdAndUpdate(id, PartnerData, { new: true });
            //if (!Partner) return next(new UserNotFoundException(id));

            res.send(Partner);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private deletePartnerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const PartnerId: string = req.params.id;
            // if (!(await isIdValid(this.Partner, [PartnerId], next))) return;

            const response = await this.Partner.findByIdAndDelete(PartnerId);
            if (!response) return next(new HttpError(404, `Failed to delete Partner by id ${PartnerId}`));

            res.sendStatus(200);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
}
