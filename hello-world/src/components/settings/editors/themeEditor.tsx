"use client";

import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { ThemeConfiguration, ThemeVariants } from "@/ui/context/configuration";
import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";
import { Section } from "@/ui/widgets/section";
import { Switch } from "@/ui/widgets/switch";

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
    return (
        <Section title="Theme" classes={{root: ClassesUtil.concat("flex flex-col gap-5 w-full", className)}}>
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

export default memo(withDisplayName()(ThemeEditor));
