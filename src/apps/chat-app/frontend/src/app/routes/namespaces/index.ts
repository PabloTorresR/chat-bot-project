/* eslint-disable @typescript-eslint/no-namespace */
export namespace RouteName {
  export enum Routes {
    HOME = '/',
    CONVERSATIONS = '/conversations',
    COLLECTION = '/collection',
    MAINTENANCE = '/maintenance',
    NOT_FOUND = '/not-found',
    AUTH = '/auth',
  }

  export enum RoutesAuth {
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    CONFIRM_SIGN_UP = '/confirm-sign-up',
  }
}
export namespace RoutePath {
  export enum Name {
    HOME = 'HOME',
    CONVERSATIONS = 'CONVERSATIONS',
    COLLECTION = 'COLLECTION',
    PRACTICE = 'PRACTICE',
    MAINTENANCE = 'MAINTENANCE',
    AUTH = 'AUTH',
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    CONFIRM_SIGN_UP = 'CONFIRM_SIGN_UP',
    NOT_FOUND = 'NOT_FOUND',
  }

  export const Route: Record<Name, string> = {
    [Name.HOME]: RouteName.Routes.HOME,
    [Name.CONVERSATIONS]: RouteName.Routes.CONVERSATIONS,
    [Name.COLLECTION]: RouteName.Routes.COLLECTION,
    [Name.MAINTENANCE]: RouteName.Routes.MAINTENANCE,
    [Name.PRACTICE]: RouteName.Routes.HOME, //NOTE: COMMING SOON
    [Name.AUTH]: RouteName.Routes.AUTH,
    [Name.SIGN_IN]: RouteName.Routes.AUTH + RouteName.RoutesAuth.SIGN_IN,
    [Name.SIGN_UP]: RouteName.Routes.AUTH + RouteName.RoutesAuth.SIGN_UP,
    [Name.CONFIRM_SIGN_UP]: RouteName.Routes.AUTH + RouteName.RoutesAuth.CONFIRM_SIGN_UP,
    [Name.NOT_FOUND]: RouteName.Routes.NOT_FOUND,
  };
}

export namespace QueryParams {
  export enum Auth {
    ID = 'id',
  }
}
