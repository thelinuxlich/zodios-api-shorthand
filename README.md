# Why?

This library is a helper to shorten the Zodios API definition, so instead of writing:

```ts
makeApi([
  {
    method: "get",
    name: "getTransactions",
    path: "/v1/transactions",
    parameters: [
      {
        type: "Query",
        name: "limit",
        schema: z.number(),
      },
      {
        type: "Query",
        name: "offset",
        schema: z.number(),
      },
    ],
    response: z.string(),
  },
]);
```

You can write:

```ts
api({
  "GET transactions": {
    path: "/v1/transactions",
    queries: {
      limit: z.number(),
      offset: z.number(),
    },
    response: z.string(),
  },
});
```

# Instructions

Check out `src/index.test.ts` about usage
