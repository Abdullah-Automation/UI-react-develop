import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, OutlinedInput } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Page, Button, ErrorText } from '~/components/ui';
import { ROUTES } from '~/config';
import { PwdValidate } from '~/components/domain';

import { AuthWrapper, FormField, FormLink } from '../Login';

import { RegisterName } from './RegisterName';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Email is not valid'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export const RegisterPage = () => {
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [validatePwd, setValidatePwd] = useState<string>('');

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (): void => {
    setIsNextStep(true);
    window.analytics.track(`On submit register button`, {});
  };

  const handlePwd = (pwd: string, onChange: any) => {
    setValidatePwd(pwd);
    onChange(pwd);
  };

  return (
    <Page title='Create your account' isLargePage={isNextStep}>
      {!isNextStep ? (
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
                    placeholder='Password'
                    type='password'
                    onChange={e => handlePwd(e.target.value, onChange)}
                    value={value}
                    name={name}
                    fullWidth
                  />
                )}
              />
              <PwdValidate pwd={validatePwd} />
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
              sx={{ marginTop: '16px' }}
            >
              CREATE
            </Button>

            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              mt={2}
            >
              <Typography variant='subtitle2'>
                Already have an account? &nbsp;
              </Typography>
              <Link href={ROUTES.LOGIN}>
                <FormLink>Sign in</FormLink>
              </Link>
            </Box>
          </AuthWrapper>
        </form>
      ) : (
        <RegisterName
          email={getValues('email')}
          password={getValues('password')}
        />
      )}
    </Page>
  );
};
