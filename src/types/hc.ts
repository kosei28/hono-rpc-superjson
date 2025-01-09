import { Schema } from "hono";
import { ClientRequest } from "hono/client";
import { HonoBase } from "hono/hono-base";

type PathToChain<
  Path extends string,
  E extends Schema,
  Original extends string = Path
> = Path extends `/${infer P}`
  ? PathToChain<P, E, Path>
  : Path extends `${infer P}/${infer R}`
  ? { [K in P]: PathToChain<R, E, Original> }
  : {
      [K in Path extends "" ? "index" : Path]: ClientRequest<
        E extends Record<string, unknown> ? E[Original] : never
      >;
    };

export type Client<T> = T extends HonoBase<any, infer S, any>
  ? S extends Record<infer K, Schema>
    ? K extends string
      ? PathToChain<K, S>
      : never
    : never
  : never;

export type Callback = (opts: CallbackOptions) => unknown;

interface CallbackOptions {
  path: string[];
  args: any[];
}
