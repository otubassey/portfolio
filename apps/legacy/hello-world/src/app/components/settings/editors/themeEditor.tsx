"use client";

import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { ThemeConfiguration, ThemeVariants } from "@/hwiui/context/configuration";
import { displayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";
import { Section } from "@/hwiui/widgets/section";
import { Switch } from "@/hwiui/widgets/switch";

type Props = {
    className?: string;
    configuration?: ThemeConfiguration;
    onChange: (config: ThemeConfiguration) => void | null;
};

ThemeEditor.propTypes = {
    className: PropTypes.string,
    configuration: PropTypes.object,
    onChange: PropTypes.func
};

function ThemeEditor({className, configuration, onChange}: Props) {
    const isLightThemeVariantSelected = configuration?.variant?.type === ThemeVariants.LIGHT;
    const shouldApplyToSubsequentVisits = configuration?.variant?.sameAlways ?? false;
    const toggleIsLightThemeVariantSelected = useCallback(() => {
        if(configuration) {
            onChange?.({
                ...configuration,
                variant: {
                    ...configuration.variant,
                    type: !isLightThemeVariantSelected ? ThemeVariants.LIGHT : ThemeVariants.DARK
                }
            });
        }
    }, [configuration, isLightThemeVariantSelected, onChange]);
    const toggleShouldApplyToSubsequentVisits = useCallback(() => {
        if(configuration) {
            onChange?.({
                ...configuration,
                variant: {
                    ...configuration.variant,
                    sameAlways: !shouldApplyToSubsequentVisits
                }
            });
        }
    }, [configuration, onChange, shouldApplyToSubsequentVisits]);
    /**
     * TODO: theme options: light, dark, OS determined
     */
    return (
        <Section title="Theme" classes={{root: ClassesUtils.concat("flex flex-col gap-5 w-full", className)}}>
            <Switch
                checked={isLightThemeVariantSelected}
                label="Light Theme?"
                size="md"
                onChange={toggleIsLightThemeVariantSelected}
            />
            <Switch
                checked={shouldApplyToSubsequentVisits}
                label="Apply to subsequent visits?"
                size="md"
                onChange={toggleShouldApplyToSubsequentVisits}
            />
        </Section>
    );
}

export default memo(displayName()(ThemeEditor));
