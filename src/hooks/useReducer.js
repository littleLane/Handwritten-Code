import { render } from "react-dom";

let lastState;

function useReducer(reducer, initialState) {
  lastState = lastState !== undefined ? lastState : initialState;

  function dispatch(action) {
    lastState = reducer(lastState, action);
    render();
  }

  return [lastState, dispatch];
}
