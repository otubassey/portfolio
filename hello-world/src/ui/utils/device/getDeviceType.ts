import {DeviceTypes} from "./device.constants";
import {DeviceType} from "./device.type";

function getDeviceType(): DeviceType {
    const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isWindows = Boolean(userAgent.match(/IEMobile/i));
    const isSSR = Boolean(userAgent.match(/SSR/i));
    const isMobile = Boolean(isAndroid || isIos || isWindows);
    const isDesktop = Boolean(!isMobile && !isSSR);
    
    if(isDesktop) {
        return DeviceTypes.DESKTOP;
    }
    if(isMobile) {
        return DeviceTypes.MOBILE;
    }
    return DeviceTypes.SSR;
}

export default getDeviceType;
