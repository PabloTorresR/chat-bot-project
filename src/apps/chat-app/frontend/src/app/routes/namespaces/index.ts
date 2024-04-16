/* eslint-disable @typescript-eslint/no-namespace */
export enum RouteName {
  HOME = '/',
  MAINTENANCE = '/maintenance',
  NOT_FOUND = '/not-found',
  LOGIN = '/login',
}

export namespace RoutePath {
  export enum Name {
    HOME = 'HOME',
    MAINTENANCE = 'MAINTENANCE',
    LOGIN = 'LOGIN',
    NOT_FOUND = 'NOT_FOUND',
  }

  export const Route: Record<Name, string> = {
    [Name.HOME]: RouteName.HOME,
    [Name.MAINTENANCE]: RouteName.MAINTENANCE,
    [Name.LOGIN]: RouteName.LOGIN,
    [Name.NOT_FOUND]: RouteName.NOT_FOUND,
  };
}
