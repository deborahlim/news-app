import {configureStore} from '@reduxjs/toolkit';

// configure store function from redux toolkit creates the store which holds our state, combines our reducers and has built in middleware
// returns a store which we can export; allowing us to link the store to the app
// need to pass reducers (an object) to the function 
export default configureStore({
    reducer: {},
})


