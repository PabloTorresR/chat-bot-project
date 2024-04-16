import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActionsSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { useCallback, useState } from 'react';
import styles from './styles.module.scss';

export interface SignInFieldValues extends FieldValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const { authSignIn } = useAuthActionsSelector();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
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
      } finally {
        setIsLoading(false);
      }
    },
    [authSignIn, isLoading],
  );

  const handleGoToRegister = () => {
    // Navigate to register page logic here
  };

  return (
    <div className={styles.floatingContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleGoToRegister}>Go to Register</button>
    </div>
  );
};

export default SignIn;
