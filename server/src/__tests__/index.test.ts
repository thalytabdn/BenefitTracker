import { app } from "..";

import request from "supertest";

describe("GET /ping", () => {
	it("returns pong if the server is up", async () => {
		const res = await request(app).get("/ping");

		expect(res.text).toEqual("Pong");
	});
});

describe("Post /login", () => {
	it("should not return token with invalid credentials", async () => {
		const res = await request(app).post("/login").send({
			username: "teste",
			password: "password",
		});

		expect(res.status).not.toEqual(201);
	});
});

describe("Post /login", () => {
	it("should return token with valid credentials", async () => {
		const res = await request(app).post("/login").send({
			username: "valida",
			password: "valida",
		});

		expect(res.status).toEqual(201);
	});
});
