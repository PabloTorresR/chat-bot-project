import { Amplify } from 'aws-amplify';
import { deleteTrailingSlash } from '../app/utils/format';

const configureAmplify = () =>
  Amplify.configure({
    mandatorySignIn: true,
    region: import.meta.env.VITE_REACT_APP_COGNITO_REGION,
    userPoolId: import.meta.env.VITE_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_COGNITO_APP_CLIENT_ID,
    oauth: {
      // domain: import.meta.env.REACT_APP_COGNITO_OAUTH_DOMAIN,
      scope: ['profile', 'email', 'openid', 'phone', 'aws.cognito.signin.user.admin'],
      redirectSignIn: deleteTrailingSlash(import.meta.env.VITE_APP_BASE_URL ?? ''),
      redirectSignOut: deleteTrailingSlash(import.meta.env.VITE_APP_BASE_URL ?? ''),
      responseType: 'code',
    },
    cookieStorage: {
      domain: import.meta.env.VITE_REACT_APP_AUTH_COOKIE_DOMAIN,
      path: '/',
      expires: 7,
      secure: true,
    },
  });

export default configureAmplify;
