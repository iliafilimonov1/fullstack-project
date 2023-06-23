/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IImage } from './types';
const initialState: IImage = {
  file: undefined,
  imageSize: undefined,
  imageName: undefined,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    change(state: IImage, action: PayloadAction<IImage>) {
      const { file, imageName, imageSize } = action.payload;

      Object.assign(state, { file, imageName, imageSize });
      // state = {...state, action.payload}
      // state.file = action.payload.file;
      // state.imageName = action.payload.imageName;
      // state.imageSize = action.payload.imageSize;
      // console.log('state', state);
    },
  },
});

export default imageSlice.reducer;
