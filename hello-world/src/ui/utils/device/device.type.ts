import {DeviceTypes as DeviceTypesConstant} from "./device.constants";

export type DeviceType = typeof DeviceTypesConstant[keyof typeof DeviceTypesConstant];
