import { memo } from "react";

import { displayName, useToggle } from "@/packages/hwiui";
import { PresentationContainer, PresentationContainerContentText, PresentationEditor, PresenterProps } from "@/packages/playground";

const ToggleButtonPresenter = ({
    componentMapping,
    node
}: PresenterProps) => {
    const [isCodeShown, toggleIsCodeShown] = useToggle(false);
    return (
        <PresentationContainer>
            <PresentationContainerContentText>
                <span>
                    Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                </span>

                <br />

                <span>
                    Description of ToggleButton
                    Demo with props
                    demo toolbar - show code, edit in Stackblitz, edit in code sandbox, reset demo
                </span>  
            </PresentationContainerContentText>
            <PresentationEditor
                componentMapping={componentMapping}
                isCodeShown={isCodeShown}
                node={node}
                toggleIsCodeShown={toggleIsCodeShown}
            />
        </PresentationContainer>
    );
};

export default memo(displayName()(ToggleButtonPresenter));
