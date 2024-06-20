import { RegisterOptions } from 'react-hook-form';
import { UseFormGetValues } from 'react-hook-form/dist/types/form';

import { ChangePasswordFormInput } from '@src/screens/ChangePasswordScreen';

const usePasswordRules = (
  getValues: UseFormGetValues<ChangePasswordFormInput>,
): {
  passwordRules: RegisterOptions<ChangePasswordFormInput, 'password'>;
  passwordConfirmationRules: RegisterOptions<
    ChangePasswordFormInput,
    'passwordConfirmation'
  >;
} => ({
  passwordRules: {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '8글자보다 적습니다',
    },
  },
  passwordConfirmationRules: {
    validate: value =>
      value === getValues('password') || '비밀번호와 값이 다릅니다',
  },
});

export default usePasswordRules;
