function isWindowDefined() {
    try {
        return Boolean(window?.document);
    } catch (error) {
        return false;
    }
}

function isServerSideRendering() {
    const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    if(userAgent) {
        return Boolean(userAgent.match(/Node/i)) || Boolean(userAgent.match(/SSR/i));
    }
    return !isWindowDefined();
}

export default isServerSideRendering;
