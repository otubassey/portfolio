import { useContext } from "react";

import { ConfigurationContext } from "@/hwiui/context/configuration";

// TODO: rename this directory to application (this shoud be application context)

function useApplicationContext() {
    const [configuration] = useContext(ConfigurationContext);
    return configuration;
}

export default useApplicationContext;
