import { memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { Card, CardFooter, CardTextHeader } from "@/ui/widgets/card";
import { Chip } from "@/ui/widgets/chip";
import {OpenInNewIcon} from "@/ui/widgets/icon";
import {List, ListItemText} from "@/ui/widgets/list";
import ListItemButton from "@/ui/widgets/list/listItemButton";

import { EXPERIENCES } from "./experiences.constants";
import { Position } from "./experiences.types";
import Link from "@/ui/widgets/link/link";
import { Title } from "@/ui/widgets/title";

const CLASSNAMES = {
    companyDetail: {
        listItemText: {
            paragraph: "py-1 remove(py-3, items-center, flex)",
            primary: "mr-8 font-bold uppercase tracking-widest text-slate-200",
            secondary: "block text-slate-500"
        },
        paragraph: {
            at: "block text-center pb-2",
            location: "text-slate-500 inline-flex",
            name: "mr-4 text-wrap inline-flex"
        }
    },
    experience: {
        card: "my-2 cursor-pointer first:mt-0 last:mb-0 shadow-none",
        cardFooter: {
            root: "py-2",
            list: {
                root: "flex flex-wrap gap-3",
                chip: "border-sky-300 group-hover:border-sky-300 group-hover:text-sky-300 mr-2 mt-2 last:mr-0"
            }
        },
        cardTextHeader: {
            root: {
                icon: "inline-flex justify-end"
            },
            icon: {
                svg: {className: "fill-slate-300 group-hover:fill-sky-300"}
            }
        },
        listItemButton: "group w-full rounded-md p-3 my-4 first:mt-0 last:mb-0 hover:border-slate-800 shadow-lg shadow-slate-500/50"
    }
} as const;

type CompanyDetailProps = {
    name: string,
    location: string,
    positions: Array<Position>
};

CompanyDetailComponent.PropTypes = {
    name: PropTypes.string,
    location: PropTypes.string,
    positions: PropTypes.array
};

function CompanyDetailComponent({name, location, positions}: CompanyDetailProps) {
    return (
        <>
            <List component="ol">
                {
                    positions.map(position => {
                        const {from, title, to} = position;
                        const ariaLabel = from && to ? `A ${title} from ${from} to ${to}}` : `A ${title}`;
                        return (
                            <ListItemText
                                key={title}
                                aria-label={ariaLabel}
                                className={CLASSNAMES.companyDetail.listItemText}
                                hideIndicator
                                primary={title}
                                seconday={from && to ? `${from} - ${to}` : null}
                                textProps={{
                                    component: Title,
                                    variant: "h5"
                                }}
                            />
                        );
                    })
                }
            </List>
            <p aria-label={`at ${name} located at ${location}`}>
                <span className={CLASSNAMES.companyDetail.paragraph.at}>at</span>
                <span className={CLASSNAMES.companyDetail.paragraph.name}>{name}</span>
                <span className={CLASSNAMES.companyDetail.paragraph.location}>{location}</span>
            </p>
        </>
    );
}

const CompanyDetails = memo(withDisplayName<CompanyDetailProps>("Experiences")(CompanyDetailComponent));

function Experiences() {
    return (
        <List component="ol" aria-label="Experiences">
            {
                EXPERIENCES.map(experience => {
                    const {id, company, positions, technologies} = experience;
                    return (
                        <ListItemButton key={id} className={CLASSNAMES.experience.listItemButton}>
                            <Link value={company.externalLink}>
                                <Card className={CLASSNAMES.experience.card}>
                                    <CardTextHeader
                                        className={CLASSNAMES.experience.cardTextHeader.root}
                                        icon={<OpenInNewIcon svg={CLASSNAMES.experience.cardTextHeader.icon.svg} />}>
                                        <CompanyDetails
                                            name={company.name}
                                            location={company.location}
                                            positions={positions}
                                        />
                                    </CardTextHeader>
                                    <CardFooter className={CLASSNAMES.experience.cardFooter.root}>
                                        <List className={CLASSNAMES.experience.cardFooter.list.root} aria-label="Technologies">
                                            {
                                                technologies.map(technology => (
                                                    <ListItemText key={technology} aria-label={technology}>
                                                        <Chip className={CLASSNAMES.experience.cardFooter.list.chip} label={technology} />
                                                    </ListItemText>
                                                ))
                                            }
                                        </List>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </ListItemButton>
                    );
                })
            }
        </List>
    );
}

export default memo(withDisplayName()(Experiences));
