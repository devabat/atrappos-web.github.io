import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import reducers from "./reducers";
import persistState from "redux-localstorage";

const config = {key: "redux-atrappos-web"};


export const enhancer =
    (process.env.NODE_ENV === 'production' ?
            compose(
                applyMiddleware(promise, thunk),
                persistState(undefined, config)
            )
            :
            compose(
                applyMiddleware(promise, thunk, logger),
                persistState(undefined, config)
            )
    );

export default createStore(
    reducers,
    enhancer
);

