import {DeviceTypes} from "./device.constants";
import {DeviceType} from "./device.type";

import isServerSideRendering from "../application/isServerSideRendering";

function getDeviceType(): DeviceType {
    if(!navigator?.userAgent || isServerSideRendering()) {
        return DeviceTypes.UNKNOWN;
    }

    const isAndroid = Boolean(navigator.userAgent.match(/Android/i));
    const isMobileIos = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    const isMobile = Boolean(isAndroid || isMobileIos); // Note: this neglects other mobile OS's

    return isMobile ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP;
}

export default getDeviceType;
