import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { Title } from "@/ui/widgets/title/";

type Props = {
    children: string
};

DialogTitle.propTypes = {
    children: PropTypes.node
}

function DialogTitle({children}: Props) {
    return (
        <div className="flex flex-row items-center">
            <Title className="flex-1 text-primary font-lg font-bold tracking-normal leading-tight" variant="h3">{children}</Title>
        </div>
    );
}

export default withDisplayName()(DialogTitle);
