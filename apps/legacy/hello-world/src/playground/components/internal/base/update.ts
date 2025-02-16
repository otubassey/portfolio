import { PlaygroundNode } from "../../common";

function update(target: PlaygroundNode, source: PlaygroundNode): PlaygroundNode {
    if(!target) {
        return target;
    }
    if(target.get("id") === source.get("id")) {
        return source;
    }
    return target.get("children")?.size
        ? target.set("children", target.get("children").map((child: PlaygroundNode) => update(child, source)))
        : target;
}

export default update;
