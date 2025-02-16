import { ComponentType } from "react";
import { Button, ButtonBase, IconButton } from "@/hwiui/widgets/button";
import { Card } from "@/hwiui/widgets/card";
import { Icon } from "@/hwiui/widgets/icon";
import { List, ListItem, ListItemBase, ListItemButton, ListItemText } from "@/hwiui/widgets/list";
import { Modal } from "@/hwiui/widgets/modal";
import { Paper } from "@/hwiui/widgets/paper";
import { Section } from "@/hwiui/widgets/section";
import { Switch } from "@/hwiui/widgets/switch";
import { Tab, Tabs } from "@/hwiui/widgets/tabs";
import { Typography } from "@/hwiui/widgets/typography";

const HWIWUIComponentsByElement: {[key: string]: ComponentType<any>} = {
    Button,
    ButtonBase,
    Card,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemBase,
    ListItemButton,
    ListItemText,
    Modal,
    Paper,
    Section,
    Switch,
    Tab,
    Tabs,
    Typography
};

export default HWIWUIComponentsByElement;
