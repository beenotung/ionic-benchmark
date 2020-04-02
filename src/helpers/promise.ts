export function promiseFinally<T>(p: Promise<T>, cb: () => void) {
  if (typeof p.finally === 'function') {
    return p.finally(cb);
  }
  console.warn(
    'Promise.finally is not supported, polyfill now. But it will makes uncaught rejection detection fail',
  );
  Promise.prototype.finally = function polyfillFinally(): Promise<T> {
    // tslint:disable-next-line no-invalid-this
    const p = this as Promise<T>;
    p.catch(() => undefined).then(cb);
    return p;
  };
  return p.finally(cb);
}
