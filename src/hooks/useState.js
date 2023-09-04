import { render } from "react-dom";

const memoriedState = [];
let lastIndex = 0;

function useState(initialState) {
  memoriedState[lastIndex] = memoriedState[lastIndex] || initialState;

  function setState(newState) {
    memoriedState[lastIndex] = newState;
    render();
  }

  return [memoriedState[lastIndex++], setState];
}
