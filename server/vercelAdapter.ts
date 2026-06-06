import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Request, Response } from "express";

type RouteHandler = (req: Request, res: Response) => void;

export function createHandler(handler: RouteHandler, params?: Record<string, string>) {
  return (req: VercelRequest, res: VercelResponse) => {
    const expressReq = req as Request;
    if (params) {
      expressReq.params = params;
    }
    handler(expressReq, res as unknown as Response);
  };
}

export function createParamHandler(
  handler: RouteHandler,
  paramName: string,
  query: VercelRequest["query"],
) {
  const value = query[paramName];
  const paramValue = Array.isArray(value) ? value[0] : value;
  return createHandler(handler, { [paramName]: String(paramValue ?? "") });
}
