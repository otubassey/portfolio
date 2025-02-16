import { memo } from "react";

import { Box, Typography } from "@mui/material";

import { displayName, Section } from "@/packages/hwiui";

const Overview = () => {
    return (
        <Box>
            <Typography gutterBottom>
                This is intended for exploring the building blocks of the HWIUI design system components.
                It offers a place where development of each component from the core components to the components that make up each section
                of each page can be customized with ease and results can be visualized instantly.
            </Typography>

            <Section
                PaperProps={{
                    elevation: 0
                }}
                TypographyProps={{
                    variant: "h4"
                }}
                title="Advantages">
                TBD
            </Section>
        </Box>
    );
};

export default memo(displayName()(Overview));
