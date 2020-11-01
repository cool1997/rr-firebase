import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'

import appReducer from './slice/appSlice'
import createAPI from './api'
// import api from './api'


const api = createAPI((...args) => store.dispatch(...args))

const store = configureStore({
    reducer: {
        app: appReducer,
        form: formReducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            }
        })
    )
})


export default store