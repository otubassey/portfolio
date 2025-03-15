type ValuesOf<T extends object> = T[keyof T];

export default ValuesOf;
