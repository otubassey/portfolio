import {getWindowNavigator, isWindowDefined} from "../window";

function isServerSideRendering() {
    const navigator = getWindowNavigator();
    const userAgent = navigator?.userAgent ?? "SSR";
    if(userAgent) {
        return Boolean(userAgent.match(/Node/i)) || Boolean(userAgent.match(/SSR/i));
    }
    return !isWindowDefined();
}

export default isServerSideRendering;
