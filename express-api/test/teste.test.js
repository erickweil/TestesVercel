import {jest,describe,expect,test} from "@jest/globals";

import app from "../src/app.js";
import request from "supertest";

describe("Teste",() => {

	const req = request(app);

	test("Receber mensagem", async () => {
		const mensagemEnviada = "Oi tudo bem?";
		const resp = await req.get("/teste/mensagem")
			.set("Accept", "aplication/json")  
			.query({teste: mensagemEnviada})
			.expect("content-type", /json/)	  
			.expect(200);

		let mensagemRecebida = resp.body.mensagem;
		expect(mensagemRecebida).toBe(mensagemEnviada);
	});

	test("Swagger redirect", async () => {
		const resp = await req.get("/")
			.expect(302);

		expect(resp.header["location"]).toBe("docs/docs.html");
	});

	test("Deve Não encontrar", async () => {
		const resp = await req.get("/rota-inexistente").expect(404);
	});
});