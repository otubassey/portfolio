/**
 * TODO: move this into the tweaker folder
 * 
 * 
 * Needed for:
 * 1. theme switching
 */
const Tweaker = (() => {
    const tweakTheme = () => {
        const htmlDocument = document.documentElement;

        const getAssignedTheme = () => (htmlDocument.dataset?.theme ?? null);

        const handleThemeChange = name => {
            if(name) {
                htmlDocument.setAttribute("data-theme", name);
            } else {
                htmlDocument.removeAttribute("data-theme");
            }
        };

        return ({
            isSame: name => {
                const assigned = getAssignedTheme();
                return name === assigned;
            },
            onChange: name => handleThemeChange(name) 
        });
    };

    return ({
        theme: tweakTheme()
    });
})();

window.Tweaker = Tweaker;
