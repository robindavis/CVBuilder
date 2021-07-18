// Library Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

// User Imports
import rootSagas from "../redux-saga/rootSagas";

// Initializing logger
const logger = createLogger();
// Initializing redux saga
const sagaMiddleware = createSagaMiddleware();
// Root store instance
const store = createStore(
  combineReducers({}),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSagas);

// Exports
export default store;
