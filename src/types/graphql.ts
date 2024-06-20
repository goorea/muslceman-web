export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
  ObjectId: any;
};

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type CreateTrainingInput = {
  category: TrainingCategory;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  preference?: Maybe<Scalars['Int']>;
  thumbnailPath?: Maybe<Scalars['String']>;
  type: TrainingType;
  videoPath?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type JwtResponse = {
  __typename?: 'JWTResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  deviceID: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Model = {
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  createTraining: Training;
  deletePlan: Scalars['Boolean'];
  deleteTraining: Scalars['Boolean'];
  findPassword: Scalars['Boolean'];
  login: AuthenticationResponse;
  multipleCreateOrUpdatePlans: Array<Plan>;
  multipleCreateTrainings: Array<Training>;
  refreshToken: JwtResponse;
  register: AuthenticationResponse;
  sendVerifyEmail: Scalars['String'];
  socialLogin: AuthenticationResponse;
  updateTraining: Scalars['Boolean'];
  verify: Scalars['Boolean'];
  withdrawal: Scalars['Boolean'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreateTrainingArgs = {
  input: CreateTrainingInput;
};

export type MutationDeletePlanArgs = {
  _id: Scalars['ObjectId'];
};

export type MutationDeleteTrainingArgs = {
  _id: Scalars['ObjectId'];
};

export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationMultipleCreateOrUpdatePlansArgs = {
  inputs: Array<PlanInput>;
};

export type MutationMultipleCreateTrainingsArgs = {
  inputs: Array<CreateTrainingInput>;
};

export type MutationRefreshTokenArgs = {
  deviceID: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationSocialLoginArgs = {
  input: SocialLoginInput;
};

export type MutationUpdateTrainingArgs = {
  _id: Scalars['ObjectId'];
  input: UpdateTrainingInput;
};

export type MutationVerifyArgs = {
  token: Scalars['String'];
};

export type Plan = Model & {
  __typename?: 'Plan';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  plannedAt: Scalars['DateTime'];
  training: Training;
  updatedAt: Scalars['DateTime'];
  user: User;
  volumes?: Maybe<Array<Volume>>;
};

export type PlanInput = {
  _id?: Maybe<Scalars['ID']>;
  plannedAt: Scalars['DateTime'];
  training: Scalars['ID'];
  volumes: Array<VolumeInput>;
};

export type Query = {
  __typename?: 'Query';
  existUser: Scalars['Boolean'];
  getOneRM: Scalars['Float'];
  me: User;
  plans: Array<Plan>;
  trainings: Array<Training>;
  users: Array<User>;
};

export type QueryExistUserArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export type QueryGetOneRmArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  birth?: Maybe<Scalars['DateTime']>;
  deviceID: Scalars['String'];
  email: Scalars['String'];
  gender?: Maybe<Gender>;
  name: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  profileImagePath?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
};

export type ResetPassword = Model & {
  __typename?: 'ResetPassword';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum Role {
  Admin = 'ADMIN',
  Verified = 'VERIFIED',
}

export type SocialLoginInput = {
  deviceID: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  provider: SocialProvider;
};

export enum SocialProvider {
  Apple = 'APPLE',
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
}

export type Training = Model & {
  __typename?: 'Training';
  _id: Scalars['ID'];
  category: TrainingCategory;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  preference?: Maybe<Scalars['Int']>;
  thumbnailPath?: Maybe<Scalars['String']>;
  type: TrainingType;
  updatedAt: Scalars['DateTime'];
  videoPath?: Maybe<Scalars['String']>;
};

export enum TrainingCategory {
  Calisthenics = 'CALISTHENICS',
  Cardiovascular = 'CARDIOVASCULAR',
  Weight = 'WEIGHT',
}

export enum TrainingType {
  Abdominal = 'ABDOMINAL',
  Arm = 'ARM',
  Back = 'BACK',
  Cardiovascular = 'CARDIOVASCULAR',
  Chest = 'CHEST',
  Etc = 'ETC',
  Lower = 'LOWER',
  Shoulder = 'SHOULDER',
}

export type UpdateTrainingInput = {
  category?: Maybe<TrainingCategory>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preference?: Maybe<Scalars['Int']>;
  thumbnailPath?: Maybe<Scalars['String']>;
  type?: Maybe<TrainingType>;
  videoPath?: Maybe<Scalars['String']>;
};

export type User = Model & {
  __typename?: 'User';
  _id: Scalars['ID'];
  birth?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailVerifyToken?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  name: Scalars['String'];
  nickname: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  profileImagePath?: Maybe<Scalars['String']>;
  provider?: Maybe<SocialProvider>;
  refreshToken?: Maybe<Scalars['JSONObject']>;
  roles?: Maybe<Array<Role>>;
  tel?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Volume = Model & {
  __typename?: 'Volume';
  _id: Scalars['ID'];
  complete?: Maybe<Scalars['Boolean']>;
  count?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  distances?: Maybe<Scalars['Float']>;
  oneRM?: Maybe<Scalars['Float']>;
  plan: Plan;
  times?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  weight?: Maybe<Scalars['Float']>;
};

export type VolumeInput = {
  _id?: Maybe<Scalars['ID']>;
  complete?: Maybe<Scalars['Boolean']>;
  count?: Maybe<Scalars['Int']>;
  distances?: Maybe<Scalars['Float']>;
  times?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};
