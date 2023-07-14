import { Request } from 'express'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestParams {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResponseBody {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestBody {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestQuery {}

export type AppRequest<Body = RequestBody, Query = RequestQuery> = Request<
  RequestParams,
  ResponseBody,
  Body,
  Query
>
