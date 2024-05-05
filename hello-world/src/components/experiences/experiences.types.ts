import { LinkType } from "@/ui/widgets/link";

export type Company = {
    name: string;
    location: string;
    externalLink?: LinkType;
};

export type Position = {
    title: string,
    from?: string;
    to?: string;
};

export type Exprience = {
    id: number;
    company: Company;
    isCurrent: boolean;
    positions: Array<Position>
    technologies: Array<string>
};
