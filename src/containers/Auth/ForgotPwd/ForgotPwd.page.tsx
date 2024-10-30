import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { OutlinedInput } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ROUTES } from '~/config';
import { useToast } from '~/context';
import { AuthApi, IForgotPwdForm } from '~/api';
import { Page, Button, ErrorText } from '~/components/ui';

import { AuthWrapper, FormField } from '../Login';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
  })
  .required();

export const ForgotPwdPage = () => {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<IForgotPwdForm>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(
    (data: IForgotPwdForm) => AuthApi.forgotPassword(data),
    {
      onSuccess: () => {
        showSuccessToast('Verification code is sent to your inbox.');
        router.push(`${ROUTES.RESET_PASSWORD}?email=${getValues('email')}`);
      },
      onError: (err: any) => {
        showErrorToast(err?.response?.data?.message || 'Something went wrong!');
      },
    }
  );

  const onSubmit = (data: IForgotPwdForm): void => {
    mutate(data);
    window.analytics.track(`On submit Forgot Pwd`, {});
  };

  return (
    <Page
      title='Reset your password'
      desc='Enter your email to receive a password reset link. You may need to check your spam folder or unblock support@speechlab.ai'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthWrapper>
          <FormField>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <OutlinedInput
                  id='email'
                  color='primary'
                  placeholder='Email'
                  onChange={onChange}
                  value={value}
                  name={name}
                  fullWidth
                />
              )}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormField>

          <Button
            color='primary'
            variant='contained'
            type='submit'
            fullWidth
            disabled={!isValid}
            loading={isLoading}
          >
            Send Reset Link
          </Button>
        </AuthWrapper>
      </form>
    </Page>
  );
};
