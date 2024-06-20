import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import useChangePassword from '@src/operations/mutations/changePassword';
import { toastsState } from '@src/recoils';
import usePasswordRules from '@src/screens/ChangePasswordScreen/hooks/usePasswordRules';

export type ChangePasswordFormInput = {
  password: string;
  passwordConfirmation: string;
};

const ChangePasswordScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ChangePasswordFormInput>();
  const changePassword = useChangePassword();

  const { passwordRules, passwordConfirmationRules } =
    usePasswordRules(getValues);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

  const onSubmit = async ({ password }: ChangePasswordFormInput) => {
    await changePassword({
      variables: {
        token: searchParams.get('token') || '',
        password,
      },
    });
  };

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate('/');
      setToast(prevState =>
        prevState.concat({
          message: '잘못된 경로입니다.',
          severity: 'error',
        }),
      );
    }
  }, [navigate, searchParams, setToast]);

  return (
    <Container
      data-testid="changePasswordScreen"
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5" sx={{ fontWeight: 'bold' }}>
          비밀번호 변경
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.password}
            margin="normal"
            fullWidth
            id="password"
            label="비밀번호"
            type="password"
            autoComplete="new-password"
            autoFocus
            helperText={errors.password?.message}
            {...register('password', passwordRules)}
          />
          <TextField
            error={!!errors.passwordConfirmation}
            margin="normal"
            fullWidth
            label="비밀번호 확인"
            type="password"
            id="password-confirmation"
            autoComplete="new-password"
            helperText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation', passwordConfirmationRules)}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
          >
            비밀번호 변경
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordScreen;
