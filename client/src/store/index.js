import {configureStore} from '@reduxjs/toolkit';
import music from "./slice/index"


export default configureStore({
    reducer: {
        music
    }
})
