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

export default class OrderDetailController implements Controller {
    public path = "/order-details";
    public router = Router();
    private OrderDetail = OrderDetails;
    // private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllOrderDetails);
        this.router.get(`${this.path}/:id`, this.getOrderDetailById);
        this.router.get(`${this.path}/:offset/:limit/:order-details/:sort/:keyword?`, this.getPaginatedOrderDetails);
        this.router.post(this.path, [validationMiddleware(CreateOrderDetailsDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createOrderDetail);
        this.router.patch(
            `${this.path}/:id`,
            [validationMiddleware(CreateOrderDetailsDto, true), authMiddleware, roleCheckMiddleware(["admin"])],
            this.modifyOrderDetail,
        );
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteOrderDetailById);
    }

    private getAllOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderDetails = await this.OrderDetail.find();
            res.send(OrderDetails);
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
                count = await this.OrderDetail.find({ $or: [{ OrderDetailName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                OrderDetails = await this.OrderDetail.find({ $or: [{ OrderDetailName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${OrderDetail}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.OrderDetail.countDocuments();
                OrderDetails = await this.OrderDetail.find({})
                    .sort(`${sort == -1 ? "-" : ""}${OrderDetail}`)
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

            const OrderDetail = await this.OrderDetail.findById(id);
            if (!OrderDetail) return next(new HttpError(404, `Failed to get OrderDetail by id ${id}`));

            res.send(OrderDetail);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private createOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderDetailData: IOrderDetails = req.body;
            const newOrderDetail = await this.OrderDetail.create({ ...OrderDetailData });
            if (!newOrderDetail) return next(new HttpError(400, "Failed to create OrderDetail"));
            res.send(newOrderDetail);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private modifyOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!Types.ObjectId.isValid(id)) return next(new IdNotValidException(id));

            const OrderDetailData: IOrderDetails = req.body;
            const OrderDetail = await this.OrderDetail.findByIdAndUpdate(id, OrderDetailData, { new: true });
            //if (!OrderDetail) return next(new UserNotFoundException(id));

            res.send(OrderDetail);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private deleteOrderDetailById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderDetailId: string = req.params.id;
            // if (!(await isIdValid(this.OrderDetail, [OrderDetailId], next))) return;

            const response = await this.OrderDetail.findByIdAndDelete(OrderDetailId);
            if (!response) return next(new HttpError(404, `Failed to delete OrderDetail by id ${OrderDetailId}`));

            res.sendStatus(200);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
}
