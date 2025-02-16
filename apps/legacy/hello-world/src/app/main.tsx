import { memo, useState } from "react";
import Immutable from "immutable";

import { displayName } from "@/hwiui/decorator";

// Notes:
// Sections of APP
// For themeing, these are the diff app sections:
// 1. Bio / introduction
// 2. Home
// 3. Skills categories/sub-categories
// 4. experience
// 5. Projects
// 
// the common data representation is listing of items


// TODO: complete the ff:
// 1. replace FAB with settings icon right below linkedIn and github icons (on full screens) and above introduction (on mobile screens)
// 2. bundle github and linkedIn ul into nav ul
function Main() {
    return (
        <>Main display</>
    );
}

export default memo(displayName()(Main));