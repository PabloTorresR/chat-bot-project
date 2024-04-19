import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActionsSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { useCallback, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';
import { QueryParams } from '@chat-app/routes/namespaces';

export interface ConfirmSignUpFieldValues extends FieldValues {
  confirmationCode: string;
}

const ConfirmSignUp = () => {
  const { authConfirmSignUp, authResendSignUpCode } = useAuthActionsSelector();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const userSub = useMemo(() => new URLSearchParams(location.search).get(QueryParams.Auth.ID), [location]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmSignUpFieldValues>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        confirmationCode: yup.string().required('Confirmation code is required'),
      }),
    ),
  });

  const handleConfirmSignUp = useCallback(
    async ({ confirmationCode }: ConfirmSignUpFieldValues) => {
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);
        await authConfirmSignUp(userSub ?? '', confirmationCode);
      } catch (err: unknown) {
        const error = err as Error;
        setError('generalError', { message: error.message ?? 'An error occurred' });
      } finally {
        setIsLoading(false);
      }
    },
    [authConfirmSignUp, isLoading, userSub, setError],
  );

  const handleResendCode = useCallback(() => {
    if (userSub) {
      authResendSignUpCode(userSub);
    }
  }, [authResendSignUpCode, userSub]);

  const renderErrors = () => {
    if (errors.generalError) {
      return <p className={styles.errorMessage}>{errors.generalError.message as string}</p>;
    }

    return <>{errors.confirmationCode && <p className={styles.errorMessage}>{errors.confirmationCode.message}</p>}</>;
  };

  return (
    <div className={styles.floatingContainer}>
      <h2>Confirm your email</h2>
      <form onSubmit={handleSubmit(handleConfirmSignUp)}>
        <input type="text" placeholder="Confirmation Code" {...register('confirmationCode')} />
        {renderErrors()}
        <button className={styles.floatingContainer__submitButton} type="submit">
          Confirm
        </button>
      </form>
      <button className={styles.floatingContainer__cta} type="button" onClick={() => handleResendCode()}>
        Please, send me a new code
      </button>
    </div>
  );
};

export default ConfirmSignUp;
