import { ChangeEvent, memo } from "react";

import { IconButton } from "@/hwiui/widgets/button";
import { displayName } from "@/hwiui/decorator";
import { Typography } from "@/hwiui/widgets/typography";

type Props = {
    onRememberChange?: (val: boolean) => void;
    onReset?: (val: boolean) => void;
    remember?: boolean;
    disableReset: boolean;
};

const Actions = ({
    onRememberChange,
    onReset,
    remember = false,
    disableReset = false
}: Props) => {
    return (
        <fieldset className="gap-3">
            <Typography variant="title"><legend>Actions:</legend></Typography>

            <div className="flex gap-x-3">
                <input
                    type="checkbox"
                    id="scales"
                    name="remember"
                    checked={remember}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onRememberChange?.(event.target.checked)}
                />
                <Typography component="label" htmlFor="scales">Remember</Typography>
            </div>

            <div className="flex gap-x-3">
                <IconButton disabled={disableReset} icon="restore" onClick={() => onReset?.()} />
            </div>
        </fieldset>
    );
};

export default memo(displayName()(Actions));
