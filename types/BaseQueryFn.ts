import { ThunkDispatch } from "@reduxjs/toolkit";

export interface CustomError {
  data: { error: [{ ru: string }, { en: string }] };
}

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = CustomError,
  DefinitionExtraOptions = Record<string, unknown>,
  Meta = Record<string, unknown>
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => Promise<QueryReturnValue<Result, Error, Meta>>;

export interface BaseQueryApi {
  signal: AbortSignal;
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown;
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };
