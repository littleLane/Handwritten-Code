function asyncGenerator(generatorFunc) {
  return function (...args) {
    const gen = generatorFunc(...args);

    return handler(gen.next());

    function handler(result) {
      console.log("result", result);
      if (result.done) {
        return Promise.resolve(result.value);
      }

      return Promise.resolve(result.value).then(
        (val) => handler(gen.next(val)),
        (err) => handler(gen.throw(err))
      );
    }
  };
}

function* handleUser() {
  const res1 = yield 1;
  const res2 = yield res1 + 1;
  return res2;
}

asyncGenerator(handleUser)().then(console.log);
