import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    feedback: []
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload
    },
  },
})

export const {setFeedback} = userSlice.actions;

export default userSlice.reducer;

export function getFeedback() {
  return async function (dispatch) {
    try {
      const posts = await axios.get(`${axios.defaults.baseURL}/feedback`);
      return dispatch(setFeedback(posts.data));
    } catch (error) {
      console.log('error getFeedback');
    }
  };
}
