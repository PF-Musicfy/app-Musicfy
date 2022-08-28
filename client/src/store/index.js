import {configureStore} from '@reduxjs/toolkit';
import music from "./slice/index"
import user from "./slice/user.js";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'userInfo',
  storage,
  whitelist: ['userToken']
}

const persistedReducer = persistReducer(persistConfig, user)

const store = configureStore({
  reducer: {
    music,
    user: persistedReducer
  }
})

export default store
