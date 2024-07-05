function isWindowDefined() {
    try {
        return Boolean(window?.document);
    } catch (_error) {
        return false;
    }
}

export default isWindowDefined;
