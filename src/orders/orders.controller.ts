import { NextFunction, Request, Response, Router } from "express";
import { Types } from "mongoose";

import HttpError from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import roleCheckMiddleware from "../middlewares/roleCheckMiddleware";
import validationMiddleware from "../middlewares/validation.middleware";
// import userModel from "../user/user.model";
import CreateOrderDto from "./orders.dto";
import IOrder from "./orders.interface";
import Order from "./orders.interface";
import orderModel from "./orders.model";

export default class OrderController implements Controller {
    public path = "/orders";
    public router = Router();
    private order = orderModel;
    // private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // CRUD
        // R:
        this.router.get(this.path, this.getAllorders);
        this.router.get(`${this.path}/:id`, this.getorderById);
        this.router.get(`${this.path}/:offset/:limit/:Order/:sort/:keyword?`, this.getPaginatedorders);
        // C:
        this.router.post(this.path, [validationMiddleware(CreateOrderDto), authMiddleware, roleCheckMiddleware(["admin"])], this.createorder);
        // U:
        this.router.patch(`${this.path}/:id`, [validationMiddleware(CreateOrderDto, true), authMiddleware, roleCheckMiddleware(["admin"])], this.modifyorder);
        // D:
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteorderById);
    }

    private getAllorders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.order.find();
            res.send(orders);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private getPaginatedorders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order; // order?
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let orders = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.order.find({ $or: [{ orderName: { $regex: regex } }, { description: { $regex: regex } }] }).count();
                orders = await this.order
                    .find({ $or: [{ orderName: { $regex: regex } }, { description: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.order.countDocuments();
                orders = await this.order
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, orders: orders });
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private getorderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            // if (!(await isIdValid(this.order, [orderId], next))) return;

            const order = await this.order.findById(id);
            if (!order) return next(new HttpError(404, `Failed to get order by id ${id}`));

            res.send(order);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };

    private createorder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderData: IOrder = req.body;
            const neworder = await this.order.create({ ...orderData });
            if (!neworder) return next(new HttpError(400, "Failed to create order"));
            res.send(neworder);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private modifyorder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!Types.ObjectId.isValid(id)) return next(new IdNotValidException(id));

            const orderData: Order = req.body;
            const order = await this.order.findByIdAndUpdate(id, orderData, { new: true });
            //if (!order) return next(new UserNotFoundException(id));

            res.send(order);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
    private deleteorderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderId: string = req.params.id;
            // if (!(await isIdValid(this.order, [orderId], next))) return;

            const response = await this.order.findByIdAndDelete(orderId);
            if (!response) return next(new HttpError(404, `Failed to delete order by id ${orderId}`));

            res.sendStatus(200);
        } catch (error) {
            next(new HttpError(400, error.message));
        }
    };
}
