import { ForwardedRef, ReactNode, forwardRef } from "react";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";
import {Card, CardTextHeader} from "@/ui/widgets/card";
import { Title } from "@/ui/widgets/title";

const CLASSNAMES = {
    title: {
        sticky: "sticky top-0 z-20 mb-4 py-5 backdrop-blur md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0"
    }
} as const;

type ClassNameProp = {
    root?: string;
    title?: string;
};

type SectionProps = {
    title?: string | null;
    children?: ReactNode;
    className?: ClassNameProp | null;
    hasStickyHeader?: boolean;
};

function Section({
    title = null,
    className = null,
    children = null,
    hasStickyHeader = false,
    ...otherProps
}: SectionProps, ref: ForwardedRef<Element>) {
    const rootClasses = ClassesUtil.defaultIfFalsy(className?.root, "");
    const titleClasses = ClassesUtil.defaultIfFalsy(className?.title, "");
    return (
        <Card ref={ref} component="section" className={rootClasses} {...otherProps}>
            {
                title &&
                <CardTextHeader
                    primary={title}
                    aria-label={title}
                    className={{root: ClassesUtil.concat(titleClasses, {[CLASSNAMES.title.sticky]: hasStickyHeader})}}
                    textProps={{
                        component: Title,
                        variant: "h3"
                    }}
                />
            }
            {children}
        </Card>
    );
}

export default forwardRef<Element, SectionProps>(withDisplayName<SectionProps>()(Section));
