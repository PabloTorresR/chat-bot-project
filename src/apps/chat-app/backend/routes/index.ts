import { Router, Request, Response, Express } from 'express';
import { sync } from 'glob';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { normalizePath } from '../utils/path';
import conversationsRoute from './conversations.route';
import messagesRoute from './messages.route';
import statusRoute from './status.route';
export function registerRoutes(router: Router) {
  // const routes = sync(normalizePath(__dirname) + '/**/*.route.*');
  const routes = [conversationsRoute, messagesRoute, statusRoute]
  routes.map(route => register(route, router));
}

function register(route, router: Router) {
  route.register(router);
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.type]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors,
  });
}
