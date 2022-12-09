import { z } from "zod";
import { makeParameters, makeErrors, ZodiosEndpointDefinition, ZodiosEndpointParameters } from "@zodios/core";
import { L, U } from "ts-toolbelt";
import { Status } from "@tshttp/status";

type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });
type StatusCode = LiteralUnion<`${typeof Status[keyof typeof Status]}`>;
type Narrow<T> = Try<T, [], NarrowNotZod<T>>;
type Try<A, B, C> = A extends B ? A : C;

type NarrowRaw<T> =
	| (T extends Function ? T : never) // eslint-disable-line
	| (T extends string | number | bigint | boolean ? T : T)
	| (T extends [] ? [] : never)
	| {
			[K in keyof T]: K extends "description" ? T[K] : NarrowNotZod<T[K]>;
	  };

type NarrowNotZod<T> = Try<T, z.ZodType, NarrowRaw<T>>;
type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type _HTTPMethods = Lowercase<HTTPMethods>;
type MethodAndAlias = `${HTTPMethods} ${string}`;

type DescriptionObject = {
	path?: string;
	response?: string;
	queries?: Record<string, string>;
	params?: Record<string, string>;
	headers?: Record<string, string>;
	body?: string;
	errors?: {
		[k in StatusCode]?: string;
	};
};
type APIEndpoint = {
	path: string;
	response: z.ZodType<unknown, z.ZodTypeDef, unknown>;
	queries?: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>;
	headers?: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>;
	params?: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>;
	description?: DescriptionObject;
	body?: z.ZodType<unknown, z.ZodTypeDef, unknown>;
	errors?: {
		[k in StatusCode]?: z.ZodType<unknown, z.ZodTypeDef, unknown>;
	};
};
type APIConfig = Record<MethodAndAlias, APIEndpoint>;
type ParameterPath<T, K, V, D> = V extends z.ZodType<unknown, z.ZodTypeDef, unknown>
	? {
			type: T;
			name: K extends string ? K : "";
			schema: V;
			description?: D extends string ? D : never;
	  }
	: never;
type APIPath<Name, Info> = Name extends `${infer Method} ${infer Alias}`
	? Info extends APIEndpoint
		? {
				alias: `${Lowercase<Method>}${Capitalize<Alias>}`;
				method: Lowercase<Method> extends _HTTPMethods ? Lowercase<Method> : "get";
				path: Info["path"];
				response: Info["response"];
				description: Info["description"] extends DescriptionObject
					? Info["description"]["path"] extends string
						? Info["description"]["path"]
						: never
					: never;
				responseDescription: Info["description"] extends DescriptionObject
					? Info["description"]["response"] extends string
						? Info["description"]["response"]
						: never
					: never;
				parameters: {
					queries: Info["queries "] extends Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>
						? U.ListOf<
								{
									[K in keyof Info["queries"]]: ParameterPath<
										"Query",
										K,
										Info["queries"][K],
										K extends string
											? Info["description"] extends DescriptionObject
												? Info["description"]["queries"] extends Record<string, string>
													? Info["description"]["queries"][K]
													: never
												: never
											: never
									>;
								}[keyof Info["queries"]]
						  >
						: never;
					headers: Info["headers"] extends Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>
						? U.ListOf<
								{
									[K in keyof Info["headers"]]: ParameterPath<
										"Header",
										K,
										Info["headers"][K],
										K extends string
											? Info["description"] extends DescriptionObject
												? Info["description"]["headers"] extends Record<string, string>
													? Info["description"]["headers"][K]
													: never
												: never
											: never
									>;
								}[keyof Info["headers"]]
						  >
						: never;
					body: Info["body"] extends z.ZodType<unknown, z.ZodTypeDef, unknown>
						? [
								ParameterPath<
									"Body",
									"body",
									Info["body"],
									Info["description"] extends DescriptionObject
										? Info["description"]["body"] extends string
											? Info["description"]["body"]
											: never
										: never
								>,
						  ]
						: never;
					params: Info["params"] extends Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>
						? U.ListOf<
								{
									[K in keyof Info["params"]]: ParameterPath<
										"Path",
										K,
										Info["params"][K],
										K extends string
											? Info["description"] extends DescriptionObject
												? Info["description"]["params"] extends Record<string, string>
													? Info["description"]["params"][K]
													: never
												: never
											: never
									>;
								}[keyof Info["params"]]
						  >
						: never;
				};
		  }
		: never
	: never;

type API<C extends APIConfig> = U.ListOf<{ [K in keyof C]: APIPath<K, C[K]> }[keyof C]>;

const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const zodiosTypes = {
	Query: "queries",
	Body: "body",
	Header: "headers",
	Path: "params",
} as const;

export const api = <Config extends APIConfig>(config: Narrow<Config>) => {
	const endpoints = [];
	for (const [key, _value] of Object.entries(config)) {
		const value = _value as APIEndpoint;
		const [method, alias] = key.split(" ");
		if (method === undefined) {
			throw new Error("Missing method");
		}
		if (alias === undefined) {
			throw new Error("Missing alias");
		}
		type P = ReturnType<typeof makeParameters>[];
		const queries: P = [];
		const headers: P = [];
		const pathParams: P = [];
		const makeParams = (
			type: "Query" | "Header" | "Path",
			container: P,
			obj: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>,
		) => {
			for (const [_key, _value] of Object.entries(obj)) {
				const description = value.description?.[zodiosTypes[type]]?.[_key] || "";
				container.push(
					makeParameters([
						{
							type: type,
							name: _key,
							schema: _value,
							description,
						},
					]),
				);
			}
		};
		if (value.queries !== undefined) {
			makeParams("Query", queries, value.queries);
		}
		if (value.headers !== undefined) {
			makeParams("Header", headers, value.headers);
		}
		if (value.params !== undefined) {
			makeParams("Path", pathParams, value.params);
		}
		const endpoint = {
			method: method.toLowerCase() as Lowercase<HTTPMethods>,
			path: value.path,
			response: value.response,
			alias: method.toLowerCase() + capitalize(alias),
			parameters: [...headers.flat(), ...queries.flat(), ...pathParams.flat()] as ZodiosEndpointParameters,
		} as ZodiosEndpointDefinition;
		const errors: {
			status: number;
			description: string;
			schema: z.ZodType<unknown, z.ZodTypeDef, unknown>;
		}[] = [];
		if (typeof value.errors === "object" && Object.keys(value.errors).length > 0) {
			for (const [k, v] of Object.entries(value.errors)) {
				const description = value.description?.errors?.[k] ?? "";
				if (v) {
					errors.push({
						status: +k,
						description,
						schema: v,
					});
				}
			}
			endpoint.errors = makeErrors(errors);
		}
		if (value.description?.response) {
			endpoint.responseDescription = value.description?.response;
		}
		if (value.description?.path) {
			endpoint.description = value.description?.path;
		}
		if (value.body !== undefined && method !== "GET") {
			const bodyParam = makeParameters([
				{
					type: "Body",
					name: "body",
					schema: value.body,
					...(value.description?.body && {
						description: value.description?.body,
					}),
				},
			]);
			endpoint?.parameters?.push(...bodyParam.flat());
		}
		endpoints.push(endpoint);
	}
	return endpoints as unknown as API<Config>;
};
