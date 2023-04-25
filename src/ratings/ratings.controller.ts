import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpError from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import roleCheckMiddleware from "../middlewares/roleCheckMiddleware";
import validationMiddleware from "../middlewares/validation.middleware";
import userModel from "../user/user.model";
import CreateRatingDto from "./ratings.dto";
import IRating from "./ratings.interface";
import Rating from "./ratings.interface";
import RatingModel from "./ratings.model";

export default class RatingController implements Controller {
    public path = "/Ratings";
    public router = Router();
    private Rating = RatingModel;
    private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllRatings);
        this.router.get(`${this.path}/:id`, this.getRatingById);
        this.router.get(`${this.path}/:offset/:limit/:Rating/:sort/:keyword?`, this.getPaginatedRatings);
        this.router.post(this.path, [validationMiddleware(CreateRatingDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createRating);
        this.router.patch(
            `${this.path}/:id`,
            [validationMiddleware(CreateRatingDto, true), authMiddleware, roleCheckMiddleware(["admin"])],
            this.modifyRating,
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteRatingById);
    }

    private getAllRatings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Ratings = await this.Rating.find();
            res.send(Ratings);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private getPaginatedRatings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const Rating = req.params.Rating; // Rating?
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let Ratings = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.Rating.find({ $or: [{ RatingName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                Ratings = await this.Rating.find({ $or: [{ RatingName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${Rating}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.Rating.countDocuments();
                Ratings = await this.Rating.find({})
                    .sort(`${sort == -1 ? "-" : ""}${Rating}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, Ratings: Ratings });
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private getRatingById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            // if (!(await isIdValid(this.Rating, [RatingId], next))) return;

            const Rating = await this.Rating.findById(id);
            if (!Rating) return next(new HttpError(404, `Failed to get Rating by id ${id}`));

            res.send(Rating);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private createRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const RatingData: IRating = req.body;
            const newRating = await this.Rating.create({ ...RatingData });
            if (!newRating) return next(new HttpError(400, "Failed to create Rating"));
            res.send(newRating);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private modifyRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!Types.ObjectId.isValid(id)) return next(new IdNotValidException(id));

            const RatingData: Rating = req.body;
            const Rating = await this.Rating.findByIdAndUpdate(id, RatingData, { new: true });
            //if (!Rating) return next(new UserNotFoundException(id));

            res.send(Rating);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private deleteRatingById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const RatingId: string = req.params.id;
            // if (!(await isIdValid(this.Rating, [RatingId], next))) return;

            const response = await this.Rating.findByIdAndDelete(RatingId);
            if (!response) return next(new HttpError(404, `Failed to delete Rating by id ${RatingId}`));

            res.sendStatus(200);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
}
