import { ChangeEvent, memo, useCallback } from "react";

import { displayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { Props } from "../../common";

//TODO: re-write this to be node centric without the cloneelement, if possible
const Input = ({node, onNodeChange}: Props) => {
    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange(
            node!
                .set("checked", event.target.checked)
                .set("value", event.target.value)
        );
    }, [node, onNodeChange]);
    if(!node) {
        return "Invalid Input Node";
    }
    const childrenElements = node.get("children");
    console.log("tagged-Input: vals =", {
        childrenElementsToJS: childrenElements?.toJS?.(),
        childrenElements,
        node: node?.toJS()
    });
    return (
        <div className="my-2">
            <input
                id={node.get("id")}
                checked={node.get("checked") ?? false}
                className={ClassesUtils.merge(
                    node.get("className"),
                    [node.get("type") === "radio" && "cursor-pointer"]
                )}
                name={node.get("name")}
                onChange={handleInputChange}
                // onFocus={handleInputChange}
                placeholder={node.get("placeholder")}
                type={node.get("type")}
                value={node.get("value")}
            />
        </div>
    );
};

// const Input = ({children, node, onNodeChange}: Props) => {
//     const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
//         onNodeChange(
//             node!
//                 .set("checked", event.target.checked)
//                 .set("value", event.target.value)
//         );
//     }, [node, onNodeChange]);
//     const handleNodeChange = useCallback((modifiedChildNode: PlaygroundNode) => {
//         let modifiedNode = update(node!, modifiedChildNode);
//         if(modifiedNode.get("type") === "radio") {
//             modifiedNode = modifiedNode.set("checked", true);
//         }
//         onNodeChange(modifiedNode.set("value", modifiedChildNode.get("value")));
//     }, [children, node, onNodeChange]);
//     if(!node) {
//         return "Invalid Input Node";
//     }
//     const childrenElements = Children.toArray(children);
//     console.log("tagged-Input: vals =", {
//         children,
//         childrenToJS: children?.toJS?.(),
//         childrenElements,
//         node: node?.toJS()
//     });
//     return (
//         <div className="grid grid-cols-3 gap-2 my-2">
//             <div>
//                 {/* <label htmlFor={node.get("id")}>{node.get("displayName")}</label> */}
//                 <label htmlFor={node.get("id")}></label>
//                 <input
//                     id={node.get("id")}
//                     checked={node.get("checked") ?? false}
//                     className={node.get("className")}
//                     name={node.get("name")}
//                     onChange={handleInputChange}
//                     placeholder={node.get("placeholder")}
//                     type={node.get("type")}
//                     value={node.get("value")}
//                 />
//             </div>
//             {
//                 childrenElements.length > 0 && childrenElements.every(Boolean) &&
//                 <div className="col-span-2">
//                     {childrenElements.map((child, index) => {
//                         console.log("tagged-Input-childrenElements: child =", child, child.$$typeof?.displayName);
//                         return (
//                             isValidElement(child)
//                                 ? cloneElement(child, {
//                                     key: index,
//                                     ...child.props,
//                                     onChange: handleInputChange,
//                                     onNodeChange: handleNodeChange
//                                 })
//                                 : child
//                         )
//                     })}
//                 </div>
//             }
//         </div>
//     );
// };

export default memo(displayName()(Input));
