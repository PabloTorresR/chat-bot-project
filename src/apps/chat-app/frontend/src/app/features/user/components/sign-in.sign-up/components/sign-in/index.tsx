import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActionsSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@chat-app/routes/namespaces';
import Card from '@chat-app/features/cards/components/card';
import MessageItem from '@chat-app/features/conversation/components/conversation/components/message-item';
import { MessageSender } from '@chat-app/features/conversation/enums/message-sender';
import USER_DEFAULT_AVATAR from '/SVG/icn_person.svg';

export interface SignInFieldValues extends FieldValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const { authSignIn } = useAuthActionsSelector();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFieldValues>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email('Please enter a valid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    ),
  });

  const handleSignIn = useCallback(
    async ({ email: _email, password: _password }: SignInFieldValues) => {
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);

        const creds = { email: _email, password: _password };
        await authSignIn(creds);
      } catch (err: unknown) {
        const error = err as Error;
        setError('generalError', { message: error.message ?? 'An error occurred' });
      } finally {
        setIsLoading(false);
      }
    },
    [setError, authSignIn, isLoading],
  );

  const handleGoToSignUp = useCallback(() => {
    navigate(RoutePath.Route.SIGN_UP);
  }, [navigate]);

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__leftSide}>
        <MessageItem
          content={'Generate words in Spanish about signing in an awesome app'}
          messageSender={MessageSender.USER}
          avatar={USER_DEFAULT_AVATAR}
        />
        <Card
          foreignWord="Iniciar Sesión"
          nativeWord="Sign In"
          example="Si ya tienes una cuenta puedes iniciar sesión aquí"
          exampleNative="If you already have an account you can sign in here"
          popularExample="The Matrix (1999): Necesitas iniciar sesión para acceder al sistema"
          popularExampleNative="The Matrix (1999): You need to log in to access the system"
          difficulty={3}
        />
      </div>
      <div className={styles.floatingContainer}>
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
          <input type="password" placeholder="Password" {...register('password')} />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
          {errors.generalError && <p className={styles.errorMessage}>{errors.generalError.message as string}</p>}
          <button className={styles.floatingContainer__submitButton} type="submit">
            Sign In
          </button>
        </form>
        <button className={styles.floatingContainer__cta} onClick={() => handleGoToSignUp()}>
          Register now!
        </button>
      </div>
    </div>
  );
};

export default SignIn;
