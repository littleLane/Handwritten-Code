let lastCallback;
let lastCallbackDependencies = [];

function useCallback(callback, dependencies = []) {
  if (lastCallback) {
    const isChanged =
      dependencies &&
      dependencies.some((dep, index) =>
        Object.is(dep, lastCallbackDependencies[index])
      );
    if (isChanged) {
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  } else {
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
  }

  return lastCallback;
}
