import isServerSideRendering from "../application/isServerSideRendering";

class LocalStorageUtils {
    static #call(callback: () => void | null | any): void | null | any {
        if(!isServerSideRendering()) {
            try {
                return callback?.();
            } catch (exception) {
                // ignored
            }
        }
        return null;
    }
    static getItem(key: string) {
        return this.#call(() => {
            const value = localStorage.getItem(key);
            return value ?? null;
        });
    }
    static getParsedItem(key: string) {
        const value = this.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    static removeItem(key: string) {
        this.#call(() => {
            localStorage.removeItem(key)
        });
    }
    static setItem(key: string, value: string) {
        this.#call(() => {
            localStorage.setItem(key, value);
        });
    }
}

export default LocalStorageUtils;
