import { ComponentType, ReactElement } from "react";
import Immutable from "immutable";

import { Category } from ".";
import { HWIWUIComponentsByElement } from "../external";
import { PlaygroundComponentsByElement } from "../internal/base";
import { ImmutablePlaygroundAttributes, PropNameAttributes } from "./types";

class PlaygroundUtils {
    getAdditionalAttributes(node: ImmutablePlaygroundAttributes | null): Immutable.List<ImmutablePlaygroundAttributes> {
        return node?.get("additionalAttributes") ?? Immutable.List<ImmutablePlaygroundAttributes>();
    }

    getComponent(node: ImmutablePlaygroundAttributes): ReactElement<any> | ComponentType<any> | null {
        if(node.get("category") === Category.ELEMENT) {
            return node.get("element");
        }
        if(node.get("category") === Category.HWIUI_COMPONENT) {
            return HWIWUIComponentsByElement[node.get("element")] ?? null;
        }
        if(node.get("category") === Category.PLAYGROUND_COMPONENT) {
            return PlaygroundComponentsByElement[node.get("element")] ?? null;
        }
        return null;
    }

    getProps(node: ImmutablePlaygroundAttributes): Map<string, any> {
        const propNames = node.get("propNames")?.toJS() ?? [];
        return propNames
            .reduce((accumulatedProps: Map<string, any>, propName: PropNameAttributes) => ({
                ...accumulatedProps,
                [propName]: node.get(propName)
            }), {});
    }

    getValueForNode(node: ImmutablePlaygroundAttributes | null): ComponentType<any> | any | null {
        if(!node) {
            return null;
        }
        let value = node.get("value") ?? null;
        if(!value) {
            return value;
        }
        if(typeof value === "object" && !Immutable.List.isList(value)) {
            const Component = this.getComponent(value);
            value = Component ?? value;
        }
        return value
    }
}

export default new PlaygroundUtils();
