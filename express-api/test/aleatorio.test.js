import {jest,describe,expect,test} from "@jest/globals";

import app from "../src/app.js";
import request  from "supertest";

describe("Aleatorio",() => {

	test("numero Aleatorio", async () => {
		const res = await request(app)
			.get("/teste/aleatorio");

		expect(res.status).toBe(200);

		let numero = parseInt(res.body.numero);

		expect(numero >= 0 && numero <= 100).toBeTruthy();
	});

});