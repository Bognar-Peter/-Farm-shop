import "dotenv/config";

import type { Express } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import request, { Response, SuperAgentTest } from "supertest";

import App from "../../app";
import AuthenticationController from "../../authentication/authentication.controller";
import PartnerController from "../../partners/partners.controller";
import StatusCode from "../../utils/statusCodes";

let server: Express.Application;
let cookie: string | any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { USER_NAME, USER_PASS, ADMIN_NAME, ADMIN_PASS } = process.env;
const id = "61dc03c0e397a1e9cf988b37";

beforeAll(async () => {
    server = new App([new AuthenticationController(), new PartnerController()]).getServer();
});

describe("PARTNERS, not logged in", () => {
    it("GET requests should return statuscode 200", async () => {
        expect.assertions(3);
        const allResponse = await request(server).get(`/partners`);
        const idResponse = await request(server).get(`/partners/${id}`);
        const paginatedResponse = await request(server).get("/partners/offset/limit/order/sort/keyword");
        expect(allResponse.statusCode).toBe(StatusCode.OK);
        expect(idResponse.statusCode).toBe(StatusCode.OK);
        expect(paginatedResponse.statusCode).toBe(StatusCode.OK);
    });

    it("POST, PATCH and DELETE requests should return statuscode 401", async () => {
        expect.assertions(3);
        const createResponse = await request(server).post("/partners");
        const patchResponse = await request(server).patch(`/partners/${id}`);
        const deleteResponse = await request(server).delete(`/partners/${id}`);
        expect(createResponse.statusCode).toBe(StatusCode.Unauthorized);
        expect(patchResponse.statusCode).toBe(StatusCode.Unauthorized);
        expect(deleteResponse.statusCode).toBe(StatusCode.Unauthorized);
    });
});

describe("partners, logged in as admin", () => {
    beforeAll(async () => {
        const res = await request(server).post("/auth/login").send({
            email: ADMIN_NAME,
            password: ADMIN_PASS,
        });
        cookie = res.headers["set-cookie"];
    });

    it("GET /partners should return 200", async () => {
        expect.assertions(1);
        const res = await request(server).get("/partners").set("Cookie", cookie);
        expect(res.statusCode).toBe(StatusCode.OK);
    });

    it("GET /partners/:id should return 200", async () => {
        expect.assertions(1);
        const res = await request(server).get(`/partners/${id}`).set("Cookie", cookie);
        expect(res.statusCode).toBe(StatusCode.OK);
    });

    it("GET /partners/:offset/:limit/:order/:sort/:keyword? should return 200", async () => {
        expect.assertions(1);
        const res = await request(server).get("/partners/offset/limit/order/sort/keyword").set("Cookie", cookie);
        expect(res.statusCode).toBe(StatusCode.OK);
    });

    it("PATCH /partners/:id should return 200", async () => {
        expect.assertions(1);
        const res = await request(server).patch(`/partners/${id}`).set("Cookie", cookie).send({ order_date: Date.now });
        expect(res.statusCode).toBe(StatusCode.OK);
    });

    /*it("DELETE /partners/:id should return 200", async () => {
        expect.assertions(1);
        const res = await request(server).patch(`/partners/${id}`).set("Cookie", cookie);
        expect(res.statusCode).toBe(StatusCode.OK);
    });*/
});
