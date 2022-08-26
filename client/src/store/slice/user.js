import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    feedback: [],
    users: [],
    user: {},
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload.reverse();
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const {
  setFeedback,
  setUsers,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;

function elCreador(url = '',cb1,cb2){
  return async function(dispatch){
    if(typeof cb2 === 'function') dispatch(cb2())
    try{
      const { data } = await axios.get(axios.defaults.baseURL + url);
      dispatch(cb1(data));
    }catch(e){
      console.log('error: action ',cb1.name);
    }
  }
}
export const getFeedback = () => elCreador('/feedback', setFeedback)
export const getUsers = () => elCreador('/user', setUsers)

export const getOnline = (id) => elCreador(`/user/online/${id}`, setUsers)
