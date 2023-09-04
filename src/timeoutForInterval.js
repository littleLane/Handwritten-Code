(function () {
  const list = new Set();

  function myInterval(fn, ms) {
    const ref = {};

    const exce = () =>
      setTimeout(() => {
        fn.apply(null);
        ref.current = exce();
      }, ms);

    ref.current = exce();
    list.add(ref);
    return ref;
  }

  function myClearInterval(ref) {
    clearTimeout(ref.current);
    list.delete(ref);
  }

  window.myInterval = myInterval;
  window.myClearInterval = myClearInterval;
})();
