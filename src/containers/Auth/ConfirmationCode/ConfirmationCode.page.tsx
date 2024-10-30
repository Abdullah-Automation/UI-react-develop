import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactCodeInput from 'react-code-input';

import { Page, Button, ErrorText } from '~/components/ui';
import { AuthApi, IConfirmationCode, IResendConfirmationCode } from '~/api';
import { useToast } from '~/context';
import { ROUTES } from '~/config';

import { AuthWrapper, FormLink } from '../Login';

const props = {
  inputStyle: {
    margin: '4px',
    width: '12px',
    padding: '0 10px',
    fontSize: '18px',
    height: '40px',
    color: '#202124',
    background: '#FFFFFF',
    border: '1px solid #C4C5D0',
    borderRadius: '8px',
  },
  inputStyleInvalid: {
    margin: '4px',
    width: '12px',
    padding: '0 10px',
    fontSize: '18px',
    height: '40px',
    color: '#202124',
    border: '1px solid #3A4ADE',
    borderRadius: '8px',
  },
};

interface IConfirmationCodeForm {
  code: string;
}

const schema = yup
  .object({
    code: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  })
  .required();

export const ConfirmationCodePage = () => {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const [email, setEmail] = useState('');
  const [isMailVerified, setIsMailVerified] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
  } = useForm<IConfirmationCodeForm>({
    mode: 'all',
    defaultValues: {
      code: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation(
    (data: IConfirmationCode) => AuthApi.confirmationCode(data),
    {
      onSuccess: () => {
        setIsMailVerified(true);
        window.analytics.track(`On success Email Verified`, {});
      },
      onError: (err: any) => {
        showErrorToast(err?.response?.data?.message || 'Something went wrong!');
      },
    }
  );

  const { mutate: resendCode } = useMutation(
    (data: IResendConfirmationCode) => AuthApi.resendConfirmationCode(data),
    {
      onSuccess: () => {
        showSuccessToast('Verification code is reSent!');
        window.analytics.track(`On resend code`, {});
      },
      onError: (err: any) => {
        showErrorToast(err?.response?.data?.message || 'Something went wrong!');
      },
    }
  );

  const handleCodeChange = (value: string, onChange: any) => {
    onChange(value);

    if (value.length === 6) {
      mutate({
        email: email as string,
        confirmationCode: value,
      });
    }
  };

  const handleResendCode = () => {
    resendCode({ email: email as string });
  };

  const handleAccount = () => {
    router.push(ROUTES.LOGIN);
  };

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('email');
    setEmail(emailFromStorage || '');
  }, []);

  return (
    <Page
      title={
        !isMailVerified
          ? 'Verify your email address'
          : 'Your email address has been verified'
      }
      desc={
        !isMailVerified
          ? 'We have just sent a code to your email address. Please enter the 6-digit code below to confirm your account.'
          : 'Welcome to Speechlab! Now you can start making your content globally accessible with Speechlab. '
      }
    >
      {!isMailVerified ? (
        <AuthWrapper>
          <Box>
            <Controller
              name='code'
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <ReactCodeInput
                  type='text'
                  fields={6}
                  onChange={val => handleCodeChange(val, onChange)}
                  value={value}
                  name={name}
                  inputMode='latin'
                  {...props}
                />
              )}
            />
            {errors.code && <ErrorText>{errors.code.message}</ErrorText>}
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            mt={2}
          >
            <Typography variant='subtitle2'>
              Didn’t receive the code? &nbsp;
            </Typography>
            <FormLink onClick={handleResendCode}>Resend code</FormLink>
          </Box>
        </AuthWrapper>
      ) : (
        <Button
          color='primary'
          variant='contained'
          type='submit'
          fullWidth
          sx={{ marginTop: '16px' }}
          onClick={handleAccount}
        >
          Go to my account
        </Button>
      )}
    </Page>
  );
};
