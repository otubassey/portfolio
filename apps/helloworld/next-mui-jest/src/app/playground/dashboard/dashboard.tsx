import { memo } from "react";

import { Typography } from "@mui/material";

import { displayName, Section, SectionContent } from "@/packages/hwiui";

import { ComponentsByPresentationTitle, PresentationsByTitle } from "./presentation";
import { PresentationAttributes, PresentationTitleValues } from "./types";

type DashboardProps = {
    item?: PresentationTitleValues | null;
};

const Dashboard = ({
    item
}: DashboardProps) => {
    const presentation: PresentationAttributes | null = item ? PresentationsByTitle[item] : null;
    const PresenterComponent = presentation ? presentation.presenter : null;
    return (
        <Section
            title={presentation?.title ?? "Dashboard"}
            PaperProps={{
                sx: {
                    height: "calc(100dvh - 100px)",
                    overflowY: "auto"
                }
            }}
            TypographyProps={{
                variant: "h3"
            }}>

            <SectionContent divider="none">

                {
                    PresenterComponent
                        ? (
                            <>
                                {
                                    presentation?.node &&
                                    <PresenterComponent
                                        componentMapping={ComponentsByPresentationTitle}
                                        node={presentation.node}
                                    />
                                }

                                {
                                    !presentation?.node &&
                                    <PresenterComponent />
                                }
                            </>
                        )
                        : <Typography>Unsupported Presenter</Typography>
                }

            </SectionContent>
        </Section>
    );
};

export default memo(displayName()(Dashboard));
