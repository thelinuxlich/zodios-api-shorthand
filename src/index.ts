import { z } from "zod";
import { makeParameters, ZodiosEndpointParameters } from "@zodios/core";

import { L, U } from "ts-toolbelt";

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
type APIEndpoint = {
  path: string;
  response: z.ZodType<unknown, z.ZodTypeDef, unknown>;
  queries?: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>;
  headers?: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>;
  body?: z.ZodType<unknown, z.ZodTypeDef, unknown>;
};
type APIConfig = Record<MethodAndAlias, APIEndpoint>;
type ParameterPath<T, K, V> = V extends z.ZodType<
  unknown,
  z.ZodTypeDef,
  unknown
>
  ? {
      type: T;
      name: K extends string ? K : "";
      schema: V;
    }
  : never;
type APIPath<Name, Info> = Name extends `${infer Method} ${infer Alias}`
  ? {
      alias: `${Lowercase<Method>}${Capitalize<Alias>}`;
      method: Lowercase<Method> extends _HTTPMethods
        ? Lowercase<Method>
        : "get";
      path: Info extends APIEndpoint ? Info["path"] : never;
      response: Info extends APIEndpoint ? Info["response"] : never;
      parameters: Info extends APIEndpoint
        ? L.Concat<
            L.Concat<
              U.ListOf<
                {
                  [K in keyof Info["queries"]]: ParameterPath<
                    "Query",
                    K,
                    Info["queries"][K]
                  >;
                }[keyof Info["queries"]]
              >,
              U.ListOf<
                {
                  [K in keyof Info["headers"]]: ParameterPath<
                    "Header",
                    K,
                    Info["headers"][K]
                  >;
                }[keyof Info["headers"]]
              >
            >,
            Info["body"] extends z.ZodType<unknown, z.ZodTypeDef, unknown>
              ? [ParameterPath<"Body", "body", Info["body"]>]
              : []
          >
        : never;
    }
  : never;

type API<C extends APIConfig> = L.Concat<
  U.ListOf<{ [K in keyof C]: APIPath<K, C[K]> }[keyof C]>,
  []
>;

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const api = <Config extends APIConfig>(config: Narrow<Config>) => {
  const endpoints = [];
  for (const [key, _value] of Object.entries(config)) {
    const value = _value as APIEndpoint;
    const [method, alias] = key.split(" ");
    if (method === undefined) throw new Error("Missing method");
    if (alias === undefined) throw new Error("Missing alias");
    const queries: Array<ReturnType<typeof makeParameters>> = [];
    const headers: Array<ReturnType<typeof makeParameters>> = [];
    const makeParams = (
      type: "Query" | "Body" | "Header",
      container: Array<ReturnType<typeof makeParameters>>,
      obj: Record<string, z.ZodType<unknown, z.ZodTypeDef, unknown>>
    ) => {
      for (const [_key, _value] of Object.entries(obj)) {
        container.push(
          makeParameters([
            {
              type: type,
              name: _key,
              schema: _value,
            },
          ])
        );
      }
    };
    if (value.queries !== undefined) {
      makeParams("Query", queries, value.queries);
    }
    if (value.headers !== undefined) {
      makeParams("Header", headers, value.headers);
    }
    const endpoint = {
      method: method.toLowerCase() as Lowercase<HTTPMethods>,
      path: value.path,
      response: value.response,
      alias: method.toLowerCase() + capitalize(alias),
      parameters: [
        ...headers.flat(),
        ...queries.flat(),
      ] as ZodiosEndpointParameters,
    };
    if (value.body !== undefined) {
      const bodyParam = makeParameters([
        {
          type: "Body",
          name: "body",
          schema: value.body,
        },
      ]);
      endpoint.parameters.push(...bodyParam.flat());
    }
    endpoints.push(endpoint);
  }
  return endpoints as API<Config>;
};
