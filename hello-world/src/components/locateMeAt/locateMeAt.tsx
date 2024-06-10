import { withDisplayName } from "@/ui/decorator";
import { IconButton, ICON_NAMES, IconName } from "@/ui/widgets/icon";
import { Link as LinkComponent, LinkType } from "@/ui/widgets/link"; 
import {List, ListItemButton} from "@/ui/widgets/list";

const CLASSNAMES = {
    root: "inline-grid grid-cols-3 gap-x-4 my-8"
} as const;

type Contact = {
    name: string;
    icon: IconName;
    link: LinkType;
};

const CONTACTS: Array<Contact> = [
    {
        name: ICON_NAMES.GITHUB,
        icon: ICON_NAMES.GITHUB,
        link: {
            rel: ICON_NAMES.GITHUB,
            href: "https://github.com/otubassey/portfolio"
        }
    },
    {
        name: ICON_NAMES.LINKED_IN,
        icon: ICON_NAMES.LINKED_IN,
        link: {
            rel: ICON_NAMES.LINKED_IN,
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

export default withDisplayName()(LocateMeAt);
