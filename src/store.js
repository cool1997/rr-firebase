import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'

import appReducer from './slice/appSlice'


const store = configureStore({
    reducer: {
        app: appReducer,
        form: formReducer,
    },
})


export default store