import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { OutlinedInput } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthApi, IResetPassword } from '~/api';
import { ROUTES } from '~/config';
import { useToast } from '~/context';
import { Page, Button, ErrorText } from '~/components/ui';
import { PwdValidate } from '~/components/domain';

import { AuthWrapper, FormField } from '../Login';

interface IResetPasswordForm {
  code: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    code: yup
      .string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export const ResetPasswordPage = () => {
  const router = useRouter();
  const { email } = router.query;
  const { showSuccessToast, showErrorToast } = useToast();
  const [validatePwd, setValidatePwd] = useState<string>('');

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IResetPasswordForm>({
    mode: 'all',
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(
    (data: IResetPassword) => AuthApi.resetPassword(data),
    {
      onSuccess: () => {
        showSuccessToast('Password is reset! Please login.');
        window.analytics.track(`On password reset`, {});
        router.push(ROUTES.LOGIN);
      },
      onError: (err: any) => {
        showErrorToast(err?.response?.data?.message || 'Something went wrong!');
      },
    }
  );

  const onSubmit = (data: IResetPasswordForm): void => {
    mutate({
      email: email as string,
      password: data.password,
      verificationCode: data.code,
    });
  };

  const handlePwd = (pwd: string, onChange: any) => {
    setValidatePwd(pwd);
    onChange(pwd);
  };

  return (
    <Page
      title='Reset your password'
      desc='Enter the reset code from the email and create a new password.'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthWrapper>
          <FormField>
            <Controller
              name='code'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <OutlinedInput
                  id='code'
                  color='primary'
                  placeholder='Reset code'
                  onChange={onChange}
                  value={value}
                  name={name}
                  fullWidth
                />
              )}
            />
            {errors.code && <ErrorText>{errors.code.message}</ErrorText>}
          </FormField>

          <FormField>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <OutlinedInput
                  id='password'
                  color='primary'
                  placeholder='New password'
                  type='password'
                  onChange={e => handlePwd(e.target.value, onChange)}
                  value={value}
                  name={name}
                  fullWidth
                />
              )}
            />
            <PwdValidate pwd={validatePwd} />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </FormField>

          <FormField>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <OutlinedInput
                  id='confirmPassword'
                  color='primary'
                  placeholder='Confirm password'
                  type='password'
                  onChange={onChange}
                  value={value}
                  name={name}
                  fullWidth
                />
              )}
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword.message}</ErrorText>
            )}
          </FormField>

          <Button
            color='primary'
            variant='contained'
            type='submit'
            fullWidth
            disabled={!isValid}
            loading={isLoading}
            sx={{ marginTop: '16px' }}
          >
            SUBMIT
          </Button>
        </AuthWrapper>
      </form>
    </Page>
  );
};
