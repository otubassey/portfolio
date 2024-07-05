// to circumvent vercel's 'ReferenceError: navigator is not defined'
function getWindowNavigator(): Navigator | null {
    try {
        typeof navigator === "undefined" ? null : navigator;
    } catch(_error) {
        return null;
    }
}

export default getWindowNavigator;
