import React, { useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, OutlinedInput } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ROUTES } from '~/config';
import { useAuth, useToast } from '~/context';
import { IAuthForm } from '~/api';
import { Page, Button, ErrorText } from '~/components/ui';

import { AuthWrapper, FormField, FormLink } from './FormField';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  })
  .required();

export const LoginPage = () => {
  const { handleLogin, loading, error } = useAuth();
  const { showErrorToast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IAuthForm>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IAuthForm): void => {
    handleLogin(data);
  };

  useEffect(() => {
    if (error !== '') {
      showErrorToast(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Page title='Welcome back'>
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

          <FormField>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <OutlinedInput
                  id='password'
                  color='primary'
                  type='password'
                  placeholder='Password'
                  onChange={onChange}
                  value={value}
                  name={name}
                  fullWidth
                />
              )}
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
            <Link href={ROUTES.FORGOT_PASSWORD}>
              <FormLink sx={{ mt: '4px' }}>Forgot your password?</FormLink>
            </Link>
          </FormField>

          <Button
            color='primary'
            variant='contained'
            type='submit'
            fullWidth
            disabled={!isValid}
            loading={loading}
          >
            SIGN IN
          </Button>

          <Box display='flex' alignItems='center' justifyContent='center'>
            <Typography variant='body2'>
              Don’t have an account yet? &nbsp;
            </Typography>
            <Link href={ROUTES.REGISTER}>
              <FormLink>Sign up</FormLink>
            </Link>
          </Box>
        </AuthWrapper>
      </form>
    </Page>
  );
};
