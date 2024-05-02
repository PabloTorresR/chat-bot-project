import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-use';
import { Auth, Hub } from 'aws-amplify';
import { queryClient } from '../../../../../config/react-query';
import { User } from '../../types/user';

export const useAuthManager = () => {
  const [user, { set, setAll }] = useMap<User>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoutCleanup = useCallback(() => {
    queryClient.removeQueries();
  }, []);

  const patchUser = useCallback(
    (values: Partial<User>) => {
      Object.keys(values).forEach(key => {
        set(key as keyof User, values[key]);
      });
    },
    [set],
  );

  const logout = useCallback(async () => {
    await Auth.signOut();
    setAll({});
    setIsLoggedIn(false);
    logoutCleanup();
  }, [setAll, logoutCleanup]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => Auth.signIn(email, password),
    [],
  );

  const signUp = useCallback(
    async ({
      email,
      password,
      preferred_username,
    }: {
      email: string;
      password: string;
      preferred_username: string;
    }) => {
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          preferred_username,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      set('email', email);
      set('preferred_username', preferred_username);
      return result;
    },
    [set],
  );

  const resendSignUpCode = useCallback((email: string) => Auth.resendSignUp(email), []);

  const confirmSignUp = useCallback((id: string, code: string) => Auth.confirmSignUp(id, code), []);

  const getCurrentUser = useCallback(() => Auth.currentAuthenticatedUser(), []);

  const retrieveUser = useCallback(async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });

      // // Cognito prop Authentication.CustomAttributes.IS_SIGN_UP_COMPLETED is not used anymore
      // // It is replace by a User property within settings: settings.display.popUpForm
      // authData.isSignUpCompleted = !!authData.isSignUpCompleted || !!data.settings?.display?.popUpForm;

      //NOTE: dmitry tenia aqui una llamada a un endpoint dentro del api gateway para obtener la informacion del usuario
      //luego cogía y lo metía con el setAll({...attributes, ...data})
      setAll(attributes);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, [setAll]);

  useEffect(() => {
    Hub.listen('auth', async ({ payload }) => {
      if (payload.event === 'signIn') {
        await retrieveUser();
        setIsLoggedIn(true);
        return;
      }
      if (payload.event === 'signOut') {
        setAll({});
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }
      if (payload.event === 'autoSignIn') {
         setAll(payload.data?.attributes);
        setIsLoggedIn(true);
      }
    });
  }, [retrieveUser, setAll]);

  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  return {
    user: {
      data: user,
      patch: patchUser,
      setData: setAll,
    },
    isLoading,
    isLoggedIn: {
      value: isLoggedIn,
      setValue: setIsLoggedIn,
    },
    actions: {
      authSignIn: signIn,
      authLogout: logout,
      authSignUp: signUp,
      authResendSignUpCode: resendSignUpCode,
      authConfirmSignUp: confirmSignUp,
      authGetCurrentUser: getCurrentUser,
      authRetrieveUser: retrieveUser,
    },
  };
};
