/**
 * 
 * @param secund Enter secund optional
 * @returns function returns itself
 */
function DelayTimeBySaveData(sec?: number): MethodDecorator {
  return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    const defaultTime = () => {
      if (sec) {
        return 1000 * sec;
      }
      return 3000;
    }

    descriptor.value = function (...args: any[]) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, defaultTime());
    };

    return descriptor;
  };
}

export { DelayTimeBySaveData }