import {ClassNameValue, twMerge} from "tailwind-merge";

type ConditionalClassName = {
    [key: string]: boolean
};

type ClassName = Array<ConditionalClassName | string | null | undefined>;

const isStringClassNameType = (className?: ConditionalClassName | string | null): boolean => (
    Boolean(className) && typeof className === "string"
);

const isConditionalClassNameType = (className?: ConditionalClassName | string | null): boolean => (
    Boolean(className) && !isStringClassNameType(className) && Object.keys(className!).length > 0
);

const truthyClassNamePredicate = (className?: ConditionalClassName | string | null): boolean => (
    isStringClassNameType(className) || isConditionalClassNameType(className)
);

const collectTruthyConditionalClassName = (conditionalClassName: ConditionalClassName): string => (
    Object.entries(conditionalClassName)
        .filter(([className, booleanExpression]) => Boolean(className && booleanExpression))
        .map(([className, _]) => className)
        .join(" ")
);

const mapClasses = (className?: ConditionalClassName | string | null): string => {
    if(isStringClassNameType(className)) {
        return className as string;
    }
    return collectTruthyConditionalClassName(className as ConditionalClassName);
};

function concat(...classNames: ClassName): string {
    const classes = classNames
        .filter(truthyClassNamePredicate)
        .map(mapClasses)
        .filter(Boolean)
        .join(" ");

    return classesUtilityProcessor(classes)
        .run(remove());
}

function merge(...classNames: ClassNameValue[]): string {
    return twMerge(classNames.map(className => {
        const isObject = Boolean(className) && typeof className === "object" && !Array.isArray(className);
        if(isObject) {
            return Object.entries(className! as object)
                .filter(([className, booleanExpression]) => Boolean(className && booleanExpression))
                .map(([className, _]) => className)
                .join(" ")
                .trim();
        }
        return className;
    }));
}

function classesUtilityProcessor(classes: string) {
    return ({
        run: (...utilityFunctions: Array<UtilityFunctionMethods>): string => {
            if(Boolean(classes) && Array.isArray(utilityFunctions) && Boolean(utilityFunctions.length)) {
                let currentUtilityFunctionIndex = 0;
                let isCompleted: boolean = false;
                let modifiedClasses: string = classes;
                const currentUtilityFunction = utilityFunctions[currentUtilityFunctionIndex];
                while(currentUtilityFunctionIndex < utilityFunctions.length && !isCompleted) {
                    if(currentUtilityFunction.isResponsibility(classes)) {
                        modifiedClasses = currentUtilityFunction.apply(classes);
                        isCompleted = true;
                    } else {
                        currentUtilityFunctionIndex++;
                    }
                }
                return modifiedClasses;
            }
            return classes;
        }
    });
}

const defaultIfFalsy = (className: string | null | undefined, defaultValue: string | null): string | null => (className || defaultValue);

type UtilityFunctionMethods = {
    isResponsibility: (utilityClass: string) => boolean,
    apply: (classes: string) => string
    matches?: (utilityClass: string) => Array<string>,
};

function remove(): UtilityFunctionMethods {
    const regex = /remove\(\s*(?:[a-zA-Z0-9,-:\s\[\]]*)?\)/g;
    const matches = (text: string): Array<string> => {
        const result = text.match(regex);
        return result?.length ? [...result] : [];
    }
    return ({
        isResponsibility: (utilityText: string): boolean => (
            Boolean(matches(utilityText).length)
        ),
        apply: (classes: string): string => {
            const removeFunctionsWithParamsTexts = matches(classes);
            if(!Array.isArray(removeFunctionsWithParamsTexts) || !removeFunctionsWithParamsTexts.length) {
                return classes;
            }
            const replaaceAllRemoveFunction = (value: string): string => (
                value
                    .replaceAll("remove(", "")
                    .replaceAll(")", "")
            ); 
            console.log("tagged-Classes.remove.apply: valA =", {removeFunctionsWithParamsTexts, classes});
            return removeFunctionsWithParamsTexts
                .reduce((filteredClasses, currentRemoveFunctionsWithParamsTexts) => {
                    console.log("tagged-Classes.remove.apply.reduce: valB =", {filteredClasses, currentRemoveFunctionsWithParamsTexts});
                    if(!filteredClasses) {
                        return "";
                    }
                    const params = replaaceAllRemoveFunction(currentRemoveFunctionsWithParamsTexts)
                        .split(", ");
                    const remainingClasses = params
                        .reduce((withRemovedClasses, currClassToBeRemoved) => withRemovedClasses.replaceAll(currClassToBeRemoved, ""), filteredClasses);
                    const result = replaaceAllRemoveFunction(remainingClasses)
                        .replaceAll(", ", "")
                        .trim();
                    console.log("tagged-Classes.remove.apply.reduce: valB =", {params, remainingClasses, result});
                    return result;
                }, classes)
                .trim();
        }
    });
}

export {
    concat,
    defaultIfFalsy,
    merge
    // twMerge as merge
};
