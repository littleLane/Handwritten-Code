import { render } from "react-dom";

let lastDendencies;

function useEffect(callback, dependencies) {
  if (lastDendencies) {
    const isChanged =
      dependencies &&
      dependencies.some((dep, index) => !Object.is(dep, lastDendencies[index]));

    if (isChanged) {
      typeof callback === "function" && callback();
      lastDendencies = dependencies;
    }
  } else {
    typeof callback === "function" && callback();
    lastDendencies = dependencies;
  }
}
