import {Equal, Expect} from "../common";
import ValuesOf from "./valuesOf";

interface ObjectA {
    name: string;
    age: number;
    isActive: boolean;
}

type ObjectAValues = ValuesOf<ObjectA>;
type Test1 = Expect<Equal<ObjectAValues, string | number | boolean>>;

// Correct with no typescript warnings
let TRUE_A: Test1 = true;

// Type 'false' is not assignable to type 'true'.ts(2322).
// 'TRUE' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
TRUE_A = false;

interface ObjectB {
    a: string;
    b: string;
}

type ObjectBValues = ValuesOf<ObjectB>;
type Test2 = Expect<Equal<ObjectBValues, string>>;

// Correct with no typescript warnings
let TRUE_B: Test2 = true;

// Type 'false' is not assignable to type 'true'.ts(2322).
// 'TRUE' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
TRUE_B = false;
