import { isType } from './getType'
export default function cache(fn, _thisArg, resetReject = true, keyFn) {
  let res = {}
  let isCached = {}
  return function (...args) {
    const key = isType(keyFn, 'function') ? keyFn(...args) : keyFn
    if (isCached[key] === true) {
      return res[key]
    }
    res[key] = fn.apply(_thisArg || this, args)
    isCached[key] = true
    if (resetReject && (isType(res[key], 'promise') || (res[key].then && res[key].catch))) {
      res[key].catch(e => {
        res[key] = undefined;
        isCached[key] = false;
      });
    }
    return res[key]
  }
}
