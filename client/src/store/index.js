import {configureStore} from '@reduxjs/toolkit';
import music from "./slice/index"
import user from "./slice/user.js";
import player from "./slice/player.js";

export default configureStore({
  reducer: {
    music,
    user,
    player,
  }
})
