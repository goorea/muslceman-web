import { gql, useMutation } from '@apollo/client';
import { useSetRecoilState } from 'recoil';

import { toastsState } from '@src/recoils';
import { Mutation, MutationChangePasswordArgs } from '@src/types/graphql';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $token: String!) {
    changePassword(password: $password, token: $token)
  }
`;

const useChangePassword = () => {
  const setToast = useSetRecoilState(toastsState);
  const [changePassword] = useMutation<
    Pick<Mutation, 'changePassword'>,
    MutationChangePasswordArgs
  >(CHANGE_PASSWORD, {
    onError: error => {
      error?.graphQLErrors.forEach(e => {
        setToast(prevState =>
          prevState.concat({
            message: e.message,
            severity: 'error',
          }),
        );
      });
    },
  });

  return changePassword;
};

export default useChangePassword;
