export const Body = () => {
  return function (_: any, __: string, descriptor: PropertyDescriptor): any {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const body = JSON.parse(args[0].body);
        const result = targetMethod.apply(this, body);

        return result;
      } catch (error) {
        throw error;
      }
    };
  };
};
