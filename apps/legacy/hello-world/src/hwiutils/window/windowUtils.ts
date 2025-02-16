import LocalStorageUtils from "./localStorageUtils";

class WindowUtils {
    static LocalStorage = LocalStorageUtils;

    static Tweaker = this.isWindowDefined()
        ? window.Tweaker
        : {
            theme: {
                isSame: (name?: string) => {},
                onChange: (name?: string) => {}
            }
        };

    // to circumvent vercel's 'ReferenceError: navigator is not defined'
    static getNavigator(): Navigator | null {
        return this.isWindowDefined() ? navigator : null;
    }

    static isWindowDefined(): boolean {
        try {
            return Boolean(window?.document);
        } catch (_error) {
            return false;
        }
    }
}

export default WindowUtils;
