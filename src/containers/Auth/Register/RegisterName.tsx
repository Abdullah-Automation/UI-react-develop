import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import {
  OutlinedInput,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthApi, IAuthForm } from '~/api';
import { useToast } from '~/context';
import { Button, ErrorText } from '~/components/ui';

import { AuthWrapper, FormField } from '../Login';

interface IRegisterNameForm {
  firstName: string;
  lastName: string;
  industry: string;
  industryInput?: string;
  source: string;
  sourceInput?: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('First name is not valid'),
    lastName: yup.string().required('Last name is not valid'),
    industry: yup.string().required('Industry is not valid'),
    industryInput: yup
      .string()
      .when('industry', industry =>
        industry === 'Other'
          ? yup.string().required('Industry is not valid')
          : yup.string()
      ),
    source: yup.string().required('Source is not valid'),
    sourceInput: yup
      .string()
      .when('source', source =>
        source === 'Others'
          ? yup.string().required('Source is not valid')
          : yup.string()
      ),
  })
  .required();

export const RegisterName = ({ email, password }: IAuthForm) => {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IRegisterNameForm>({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      industry: '',
      industryInput: '',
      source: '',
      sourceInput: '',
    },
    resolver: yupResolver(schema),
  });
  const watchIndustryCheck = watch('industry');
  const watchSourceCheck = watch('source');

  const { mutate, isLoading } = useMutation(
    (data: any) => AuthApi.register(data),
    {
      onSuccess: () => {
        // Store email in local storage
        localStorage.setItem('email', email);
        showSuccessToast('Verification code is sent!');
        router.push(`/confirmation-code`);
      },
      onError: (err: any) => {
        showErrorToast(err?.response?.data?.message || 'Something went wrong!');
      },
    }
  );

  const onSubmit = (data: IRegisterNameForm): void => {
    mutate({
      ...data,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthWrapper>
        <FormField>
          <OutlinedInput
            fullWidth
            id='firstName'
            color='primary'
            placeholder='First name'
            {...register('firstName')}
          />
          {errors.firstName && (
            <ErrorText>{errors.firstName.message}</ErrorText>
          )}
        </FormField>

        <FormField>
          <OutlinedInput
            fullWidth
            id='lastName'
            color='primary'
            placeholder='Last name'
            {...register('lastName')}
          />
          {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
        </FormField>

        <FormField title='What best describes your industry?'>
          <Controller
            name='industry'
            control={control}
            render={({ field: { onChange, value, name } }): JSX.Element => (
              <RadioGroup onChange={onChange} value={value} name={name}>
                <FormControlLabel
                  value='Education'
                  control={<Radio size='small' />}
                  label={<Typography variant='subtitle2'>Education</Typography>}
                />
                <FormControlLabel
                  value='Localization and Marketing'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='subtitle2'>
                      Localization and Marketing
                    </Typography>
                  }
                />
                <FormControlLabel
                  value='Media and Entertainment'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='subtitle2'>
                      Media and Entertainment
                    </Typography>
                  }
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio size='small' />}
                  label={<Typography variant='subtitle2'>Other</Typography>}
                />
              </RadioGroup>
            )}
          />
          {errors.industry && <ErrorText>{errors.industry.message}</ErrorText>}

          {watchIndustryCheck === 'Other' && (
            <OutlinedInput
              fullWidth
              id='industryInput'
              color='primary'
              {...register('industryInput')}
              placeholder='Please enter your industry'
            />
          )}
        </FormField>

        <FormField title='How do you know about us?'>
          <Controller
            name='source'
            control={control}
            render={({ field: { onChange, value, name } }): JSX.Element => (
              <RadioGroup onChange={onChange} value={value} name={name}>
                <FormControlLabel
                  value='Web Search'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='subtitle2'>Web Search</Typography>
                  }
                />
                <FormControlLabel
                  value='Word of Mouth'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='subtitle2'>Word of Mouth</Typography>
                  }
                />
                <FormControlLabel
                  value='Twitter'
                  control={<Radio size='small' />}
                  label={<Typography variant='subtitle2'>Twitter</Typography>}
                />
                <FormControlLabel
                  value='Linkedin'
                  control={<Radio size='small' />}
                  label={<Typography variant='subtitle2'>Linkedin</Typography>}
                />
                <FormControlLabel
                  value='Marketing email'
                  control={<Radio size='small' />}
                  label={
                    <Typography variant='subtitle2'>Marketing email</Typography>
                  }
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio size='small' />}
                  label={<Typography variant='subtitle2'>Other</Typography>}
                />
              </RadioGroup>
            )}
          />
          {errors.source && <ErrorText>{errors.source.message}</ErrorText>}

          {watchSourceCheck === 'Other' && (
            <OutlinedInput
              fullWidth
              id='sourceInput'
              color='primary'
              {...register('sourceInput')}
              placeholder='Please enter your source'
            />
          )}
        </FormField>

        <Button
          color='primary'
          variant='contained'
          type='submit'
          fullWidth
          loading={isLoading}
          disabled={!isValid}
          sx={{ marginTop: '16px' }}
        >
          CREATE
        </Button>
      </AuthWrapper>
    </form>
  );
};
