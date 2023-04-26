import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpError from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import roleCheckMiddleware from "../middlewares/roleCheckMiddleware";
import validationMiddleware from "../middlewares/validation.middleware";
// import userModel from "../user/user.model";
import CreateOrderDetailsDto from "./order-details.dto";
import IOrderDetails from "./order-details.interface";
import OrderDetails from "./order-details.model";

<<<<<<< HEAD
export default class OrderDetailController implements Controller {
    public path = "/order-details";
=======
export default class PartnerController implements Controller {
    public path = "/partners";
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
    public router = Router();
    private OrderDetail = OrderDetails;
    // private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
<<<<<<< HEAD
        this.router.get(this.path, this.getAllOrderDetails);
        this.router.get(`${this.path}/:id`, this.getOrderDetailById);
        this.router.get(`${this.path}/:offset/:limit/:order-details/:sort/:keyword?`, this.getPaginatedOrderDetails);
        this.router.post(this.path, [validationMiddleware(CreateOrderDetailsDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createOrderDetail);
        this.router.patch(
            `${this.path}/:id`,
            [validationMiddleware(CreateOrderDetailsDto, true), authMiddleware, roleCheckMiddleware(["admin"])],
            this.modifyOrderDetail,
=======
        this.router.get(this.path, this.getAllPartners);
        this.router.get(`${this.path}/:id`, this.getPartnerById);
        this.router.get(`${this.path}/:offset/:limit/:Partner/:sort/:keyword?`, this.getPaginatedPartners);
        this.router.post(this.path, [validationMiddleware(CreateOrderDetailsDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createPartner);
        this.router.patch(
            `${this.path}/:id`,
            [validationMiddleware(CreateOrderDetailsDto, true), authMiddleware, roleCheckMiddleware(["admin"])],
            this.modifyPartner,
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteOrderDetailById);
    }

    private getAllOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
<<<<<<< HEAD
            const OrderDetails = await this.OrderDetail.find();
            res.send(OrderDetails);
=======
            const Partners = await this.OrderDetail.find();
            res.send(Partners);
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private getPaginatedOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const OrderDetail = req.params.OrderDetail; // OrderDetail?
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let OrderDetails = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
<<<<<<< HEAD
                count = await this.OrderDetail.find({ $or: [{ OrderDetailName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                OrderDetails = await this.OrderDetail.find({ $or: [{ OrderDetailName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${OrderDetail}`)
=======
                count = await this.OrderDetail.find({ $or: [{ PartnerName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                Partners = await this.OrderDetail.find({ $or: [{ PartnerName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${Partner}`)
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.OrderDetail.countDocuments();
<<<<<<< HEAD
                OrderDetails = await this.OrderDetail.find({})
                    .sort(`${sort == -1 ? "-" : ""}${OrderDetail}`)
=======
                Partners = await this.OrderDetail.find({})
                    .sort(`${sort == -1 ? "-" : ""}${Partner}`)
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, OrderDetails: OrderDetails });
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private getOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            // if (!(await isIdValid(this.OrderDetail, [OrderDetailId], next))) return;

<<<<<<< HEAD
            const OrderDetail = await this.OrderDetail.findById(id);
            if (!OrderDetail) return next(new HttpError(404, `Failed to get OrderDetail by id ${id}`));
=======
            const Partner = await this.OrderDetail.findById(id);
            if (!Partner) return next(new HttpError(404, `Failed to get Partner by id ${id}`));
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019

            res.send(OrderDetail);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private createOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
<<<<<<< HEAD
            const OrderDetailData: IOrderDetails = req.body;
            const newOrderDetail = await this.OrderDetail.create({ ...OrderDetailData });
            if (!newOrderDetail) return next(new HttpError(400, "Failed to create OrderDetail"));
            res.send(newOrderDetail);
=======
            const PartnerData: IOrderDetails = req.body;
            const newPartner = await this.OrderDetail.create({ ...PartnerData });
            if (!newPartner) return next(new HttpError(400, "Failed to create Partner"));
            res.send(newPartner);
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private modifyOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!Types.ObjectId.isValid(id)) return next(new IdNotValidException(id));

<<<<<<< HEAD
            const OrderDetailData: IOrderDetails = req.body;
            const OrderDetail = await this.OrderDetail.findByIdAndUpdate(id, OrderDetailData, { new: true });
            //if (!OrderDetail) return next(new UserNotFoundException(id));
=======
            const PartnerData: IOrderDetails = req.body;
            const Partner = await this.OrderDetail.findByIdAndUpdate(id, PartnerData, { new: true });
            //if (!Partner) return next(new UserNotFoundException(id));
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019

            res.send(OrderDetail);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private deleteOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderDetailId: string = req.params.id;
            // if (!(await isIdValid(this.OrderDetail, [OrderDetailId], next))) return;

<<<<<<< HEAD
            const response = await this.OrderDetail.findByIdAndDelete(OrderDetailId);
            if (!response) return next(new HttpError(404, `Failed to delete OrderDetail by id ${OrderDetailId}`));
=======
            const response = await this.OrderDetail.findByIdAndDelete(PartnerId);
            if (!response) return next(new HttpError(404, `Failed to delete Partner by id ${PartnerId}`));
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019

            res.sendStatus(200);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
}
