import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActionsSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { QueryParams, RoutePath } from '@chat-app/routes/namespaces';

export interface SignUpFieldValues extends FieldValues {
  email: string;
  password: string;
  preferred_username: string;
}

const SignUp = () => {
  const { authSignUp } = useAuthActionsSelector();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFieldValues>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email('Please enter a valid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        preferred_username: yup.string().required('Username is required'),
      }),
    ),
  });

  const handleSignUp = useCallback(
    async ({ email: _email, password: _password, preferred_username: _username }: SignUpFieldValues) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const creds = { email: _email, password: _password, preferred_username: _username };
      try {
        const result = await authSignUp(creds);
        navigate(`${RoutePath.Route.CONFIRM_SIGN_UP}?${QueryParams.Auth.ID}=${result.userSub}`);
      } catch (err: unknown) {
        const error = err as Error;
        setError('generalError', { message: error.message ?? 'An error occurred' });
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, authSignUp, isLoading, setError],
  );

  const handleGoToSignIn = useCallback(() => {
    navigate(RoutePath.Route.SIGN_IN);
  }, [navigate]);

  return (
    <div className={styles.floatingContainer}>
      <h2>We would just like to know some details about you...</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        <input type="text" placeholder="Username" {...register('preferred_username')} />
        {errors.preferred_username && <p className={styles.errorMessage}>{errors.preferred_username.message}</p>}
        <input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        {errors.generalError && <p className={styles.errorMessage}>{errors.generalError.message as string}</p>}
        <button className={styles.floatingContainer__submitButton} type="submit">
          Sign Up
        </button>
      </form>
      <button className={styles.floatingContainer__cta} onClick={() => handleGoToSignIn()}>
        I already have an account
      </button>
    </div>
  );
};

export default SignUp;
