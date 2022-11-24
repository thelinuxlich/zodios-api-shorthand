import { expect, it } from "vitest";
import { api } from "..";
import { z } from "zod";
import { Zodios, makeApi } from "@zodios/core";

const endpoints = api({
	"GET transactions": {
		path: "/v1/transactions",
		queries: {
			limit: z.number(),
			offset: z.number(),
		},
		response: z.string(),
	},
	"GET transaction": {
		path: "/v1/transaction/:id",
		params: {
			id: z.number(),
		},
		response: z.string(),
	},
});

it("Has the runtime API methods", async () => {
	const API = new Zodios("http://foo.bar.com", makeApi(endpoints));
	expect(API.getTransactions).toBeDefined();
	expect(API.getTransaction).toBeDefined();
});
