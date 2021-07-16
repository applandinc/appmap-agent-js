const global_Reflect_getOwnPropertyDescriptor =
  Reflect.getOwnPropertyDescriptor;
const global_undefined = undefined;

export const hasOwnProperty = (object, key) =>
  global_Reflect_getOwnPropertyDescriptor(object, key) !== global_undefined;