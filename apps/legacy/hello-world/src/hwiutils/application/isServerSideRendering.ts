import WindowUtils from "../window/windowUtils";

function isServerSideRendering() {
    const navigator = WindowUtils.getNavigator();
    const userAgent = navigator?.userAgent ?? "SSR";
    if(userAgent) {
        return Boolean(userAgent.match(/Node/i)) || Boolean(userAgent.match(/SSR/i));
    }
    return !WindowUtils.isWindowDefined();
}

export default isServerSideRendering;
