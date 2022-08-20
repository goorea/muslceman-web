import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  FormControl,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import React from 'react';
import { Controller, Path } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form';

import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import useBucket from '@src/hooks/useBucket';
import {
  CreateTrainingInput,
  TrainingCategory,
  TrainingType,
  UpdateTrainingInput,
} from '@src/types/graphql';

import useRules from './hooks/useRules';

type TrainingInput = CreateTrainingInput | UpdateTrainingInput;

type P<T> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control?: Control<T>;
  setValue: UseFormSetValue<T>;
};

function TrainingFormFields<T extends TrainingInput>({
  register,
  errors,
  control,
  setValue,
}: P<T>) {
  const {
    nameRules,
    categoryRules,
    typeRules,
    descriptionRules,
    preferenceRules,
  } = useRules();

  const { handleFileInput: handleThumbnail, loading: thumbnailLoading } =
    useBucket<T>('thumbnailPath', setValue);
  const { handleFileInput: handleVideo, loading: videoLoading } = useBucket<T>(
    'videoPath',
    setValue,
  );

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={thumbnailLoading || videoLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TextField
        error={!!errors.name}
        margin="normal"
        fullWidth
        id="name"
        label="이름"
        autoFocus
        helperText={errors.name?.message}
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
        {...register('name', nameRules)}
      />
      <InputLabel id="category-label" sx={{ mt: 1 }}>
        카테고리
      </InputLabel>
      {control && (
        <Controller
          // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
          name="category"
          control={control}
          rules={categoryRules}
          render={({ field }) => (
            <Select
              fullWidth
              labelId="category-label"
              id="category"
              inputProps={{ 'data-testid': 'category' }}
              {...field}
            >
              {Object.values(TrainingCategory).map(category => (
                <MenuItem key={category} value={category}>
                  {getTrainingCategoryForKorean(category)}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      )}
      <InputLabel id="type-label" sx={{ mt: 1 }}>
        타입
      </InputLabel>
      {control && (
        <Controller
          // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
          name="type"
          control={control}
          rules={typeRules}
          render={({ field }) => (
            <Select
              fullWidth
              labelId="type-label"
              id="type"
              inputProps={{ 'data-testid': 'type' }}
              {...field}
            >
              {Object.values(TrainingType).map(type => (
                <MenuItem key={type} value={type}>
                  {getTrainingTypeForKorean(type)}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      )}

      <TextField
        error={!!errors.description}
        margin="normal"
        fullWidth
        id="description"
        label="설명"
        helperText={errors.description?.message}
        multiline={true}
        type="number"
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
        {...register('description', descriptionRules)}
      />

      <TextField
        error={!!errors.preference}
        margin="normal"
        fullWidth
        id="preference"
        label="선호도"
        helperText={errors.preference?.message}
        type="number"
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
        {...register('preference', preferenceRules)}
      />

      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel htmlFor="outlined-adornment-thumbnail">
          썸네일 경로
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-thumbnail"
          type="text"
          disabled
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                component="label"
                sx={{ marginLeft: '5px' }}
              >
                찾기
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                  hidden
                />
              </Button>
            </InputAdornment>
          }
          label="썸네일 경로"
          {...register('thumbnailPath' as Path<T>)}
        />
      </FormControl>

      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel htmlFor="outlined-adornment-video">비디오 경로</InputLabel>
        <OutlinedInput
          id="outlined-adornment-video"
          type="text"
          disabled
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                component="label"
                sx={{ marginLeft: '5px' }}
              >
                찾기
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleVideo}
                  hidden
                />
              </Button>
            </InputAdornment>
          }
          label="비디오 경로"
          {...register('videoPath' as Path<T>)}
        />
      </FormControl>
    </>
  );
}

export default TrainingFormFields;
