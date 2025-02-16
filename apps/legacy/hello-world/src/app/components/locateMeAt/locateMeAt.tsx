import { displayName } from "@/hwiui/decorator";
import { IconButton } from "@/hwiui/widgets/button";
import { ValuesOf } from "@/hwiui/widgets/common";
import { IconName } from "@/hwiui/widgets/icon";
import { Link as LinkComponent, LinkType } from "@/hwiui/widgets/link"; 
import {List, ListItemButton} from "@/hwiui/widgets/list";

const CLASSNAMES = {
    root: "inline-grid grid-cols-3 gap-x-4 my-8"
} as const;

type Contact = {
    name: string;
    icon: ValuesOf<typeof IconName>;
    link: LinkType;
};

const CONTACTS: Array<Contact> = [
    {
        name: IconName.GITHUB,
        icon: IconName.GITHUB,
        link: {
            rel: IconName.GITHUB,
            href: "https://github.com/otubassey/portfolio"
        }
    },
    {
        name: IconName.LINKED_IN,
        icon: IconName.LINKED_IN,
        link: {
            rel: IconName.LINKED_IN,
            href: "https://www.linkedin.com/in/otuekong-bassey-a3941996"
        }
    }
] as const;

function LocateMeAt() {
    return (
        <List className={CLASSNAMES.root}>
            {
                CONTACTS.map(contact => (
                    <ListItemButton key={contact.name}>
                        <IconButton
                            icon={contact.icon}
                            component={LinkComponent}
                            componentProps={{value: contact.link}}
                        />
                    </ListItemButton>
                ))
            }
        </List>
    );
}

export default displayName()(LocateMeAt);
