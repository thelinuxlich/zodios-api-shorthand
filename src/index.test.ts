import { expect, it } from "vitest";
import { api } from "..";
import { z } from "zod";
import { Zodios, makeApi, ApiOf } from "@zodios/core";

const endpoints = api({
	"POST transactions": {
		path: "/v1/transactions",
		queries: {
			limit: z.number(),
			offset: z.number(),
		},
		body: z.string(),
		response: z.number(),
		description: {
			path: "Create a transaction",
			response: "Returns the Transaction ID",
			queries: {
				limit: "Add a limit to pagination",
				offset: "Page number",
			},
		},
	},
	"GET transaction": {
		path: "/v1/transaction/:id",
		params: {
			id: z.number(),
		},
		response: z.number(),
		errors: {
			"404": z.literal("Not Found"),
		},
		description: {
			path: "Find a transaction by ID",
			response: "Returns the transaction ID",
			errors: {
				"404":
					"This error is triggered when the transaction is not found in the database",
			},
		},
	},
});

it("Has the runtime API methods", async () => {
	const API = new Zodios("http://foo.bar.com", makeApi(endpoints));
	type MyApi = ApiOf<typeof API>;
	expect(API.postTransactions).toBeDefined();
	expect(API.getTransaction).toBeDefined();
});
