const deepFreeze = <T extends object>(object: T): Readonly<T> => {
  (Object.keys(object) as Array<keyof T>).forEach((key) => {
    const value = object[key];
    if (
      typeof value === "object" &&
      value !== null &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });
  return Object.freeze(object);
};

export default deepFreeze;
