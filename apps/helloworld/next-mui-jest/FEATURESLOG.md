# Features Log - Next-MUI-Jest

This serves to track the features, their states, associated tasks, and other relevant information for the development of the Portfolio App using Next, Material-UI (MUI), and Jest. It also serves as a roadmap and planning tool.

This document is organized by feature, making it easy to navigate and track progress. Each feature has the following details:
1. **Description**: A clear detailing of feature's purpose.  
2. **Roadmap**: Outlines the planned phases for each feature, providing a high-level overview of the development process. This helps with planning and prioritization.  
3. **State**: A field indicating the current development status of each feature. The values are:  
    * Completed - When the development work on the feature has been completed.  
    * In Progress - When the feature is under development.  
    * Planned - When the feature is ready for development.  
    * Backlog - When the feature is still under review and not ready for development.  
    * Refinement - When a feature is just an idea that needs to be thought about, researched on and reviewed.  
4. **Tasks**: A list of associated tasks, which can be checked off as they are completed. This provides a more granular view of the work involved.  
5. **Dependencies**: A list of any external services, libraries, or components that are required for the feature.  
6. **Notes**: Allows for capturing additional information, considerations, or potential issues related to the feature.  


## Feature: Implement reusable ToggleButton Component

- **Description**: Create a reusable ToggleButton component that handles the switching between two icons.
- **Roadmap**: 
- **State**: Planned  
    - **Tasks**:  
        - [] Create a new React component file for ToggleButton to be included in the `/packages/hwiui/widgets/` directory.
        - [] It should be a wrapper around Material-UI's ToggleButton component to provide the icon switching functionality
        - [] Write unit tests for the ToggleButton Component, covering state changes and prop handling
        - [] Document the component's usage and props
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Implement reusable RouteLink Component

- **Description**: Create a reusable RouteLink component that wraps the Link component from Nextjs to provide a theme-able navigation between routes, within the application.
- **Roadmap**: 
- **State**: Planned  
    - **Tasks**:  
        - [] Create a new React component file for RouteLink to be included in the `/packages/hwui/widgets/` directory.
        - [] Import and implement Link component from `next/link` with Typography component from Material-UI as child. Ensure the props for RouteLink mirrors that of Link component and include a TypographyProps to be passed to the Typography component.
        - [] Implement a "active" prop for RouteLink to visually identify the currently active route/page. 
        - [] Write unit tests for the RouteLink Component, covering state changes and prop handling
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: App Header - Responsive Header Component

- **Description**: Implement a header component built using Material-UI's AppBar that adapts its layout and functionality based on screen size (mobile vs. larger screens).
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] Create a new responsive component called AppHeader intended to be a wrapper component for Material-UI's AppBar component.
        - [] Use the custom ToggleButton for both the menu, resume download, and setting icon buttons
        - [] Create a responsive App logo in svg
        - [] Use the custom RouteLink component for the page navigation options
        - [] Use CSS to hide the menu icon button in larger screens and show it in mobile screens
        - [] Use CSS to hide the page options in mobile screens and show it in larger screens
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
        - [] Test visibility of toggle buttons and page options
- **Dependencies**:  
- **Notes**:

## Feature: App Header - Desktop App Header Layout

- **Description**: Implement a layout for larger screens, featuring the app's logo to the far left, page options next to the logo, and both a resume download IconButton and a settings ToggleButton to the far right.
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] In larger screen layout, place the app's logo (an SVG) on the far left.
        - [] Implement and position page navigation (using nav element, List and ListItem from Material-UI and the custom RouteLink component) next to the app's logo.
        - [] On the far right, implement a settings IconButton (using the custom ToggleButton component).
        - [] On the far right, next to the settings IconButton, implement a resume download IconButton (using the Material-UI's IconButton component).
        - [] When the settings IconButton is clicked (open state), display a close IconButton in its place and open the right-side drawer.
        - [] When the close IconButton is clicked (closed state), display the settings IconButton and close the drawer.
        - [] Implement the right-side drawer using Material-UI's Drawer component.
        - [] When the resume download IconButton is clicked, a PDF version of the resume should be downloaded.
        - [] Ensure accessibility standards are met.
        - [] Ensure to include js-doc where necessary.
        - [] Test visibility of the drawer on settings/close ToggleButton.
- **Dependencies**:  
- **Notes**:

## Feature: App Header - Mobile App Header Layout

- **Description**: Implement a layout for mobile screens, featuring a menu ToggleButton to the far left, the app's logo positioned next to the menu ToggleButton, and both the resume download IconButton and the settings ToggleButton to the far right.
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] In the mobile layout, place a menu ToggleButton on the far left
        - [] Display the app logo next to the menu ToggleButton
        - [] On the far right, implement a settings ToggleButton
        - [] When the Menu IconButton is clicked (open state), display a close IconButton in its place and open the full-screen drawer (overlay).
        - [] When the close IconButton is clicked (close state), display the menu IconButton and close the drawer.
        - [] Implement the full-screen drawer using Material-UI's Drawer component (maybe set the anchor to "bottom" and variant to "temporary").
        - [] When the resume download IconButton is clicked, a PDF version of resume file should be downloaded.
        - [] When the settings IconButton is clicked (open state), display a close IconButton in its place and open the full-screen drawer (overlay).
        - [] When the close IconButton is clicked (close state), display the setting IconButton and close the drawer.
        - [] Ensure that only one drawer can be open at a time (closing the currently open drawer before opening a new one).
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
        - [] Test visibility of the drawer on click of either the menu/close or settings/close ToggleButton.
- **Dependencies**:  
- **Notes**:

## Feature: App Header - Integration and Styling

- **Description**: Integrate the app header component into the application and apply necessary styling.
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] Import and use the `AppHeader` component in the appropriate layout or page component.
        - [] Apply styling using Material-UI's styling solutions (e.g. makeStyles, styled, sx prop) to customize the appearance of the header, icons, and drawers.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
        - [] Test the responsiveness of the header across different screen sizes.
- **Dependencies**:  
- **Notes**:

## Feature: App Header - Resume PDF Download Button

- **Description**: A styled Material-UI IconButton that triggers the download of a resume in PDF format to the user's device, compatible with both mobile and desktop environments. The button includes a download icon and provides visual feedback during the download process.
- **Roadmap**: 
- **State**: Planned  
    - **Tasks**:  
        - [] Create a `ResumeDownloadButton` component using Material-UI's IconButton.
        - [] Import and integrate DownloadIcon from `@mui/icons-material` as the button icon.
        - [] Import the resume PDF file (e.g., <first-last-name>.pdf) into the project (consider placing it in a public directory for easy access).
        - [] Implement the download logic within the IconButton's onClick handler.
        - [] Utilize the Blob API and URL.createObjectURL to create a downloadable file link.
        - [] Programmatically create and trigger a temporary anchor element for download initiation.
        - [] Add a CircularProgress overlay on the button during the downloading state using Material-UI.
        - [] Implement error handling with a Material-UI Snackbar to display failure messages (e.g., "Resume download failed.").
        - [] Clean up the temporary URL object using URL.revokeObjectURL after download.
        - [] Wrap the IconButton with Material-UI Tooltip displaying "Download resume" on hover.
        - [] Add accessibility attributes (e.g., aria-label="Download resume PDF", aria-busy during loading).
        - [] Implement keyboard navigation support for the IconButton.
        - [] Test the button on desktop browsers for consistent download behavior.
        - [] Test hte button on mobile devices to verify compatibility.
        - [] Write unit tests to verify the download functionality. These tests should simulate a click event and check if the download attribute is set correctly.
        - [] Verify accessibility compliance using a tool likes axe or screen reader testing (e.g., NVDA, VoiceOver).
        - [] Add a success Snackbar notification (e.g. "Resume downloaded successfully") upon completion.
- **Dependencies**:  
- **Notes**:

## Feature: Menu Drawer

- **Description**: Implement a menu drawer componeny that provides navigation to different sections or components within the application. The drawer displays a list of page options. Some page options may have sub-lists for more granular navigation. Clicking a top-level page option without a sub-list will close the drawer and navigate to the associated section or display the associated component. Clicking a top-level page option with a sub-list expands the sub-list. Selecting an item from the sub-list closes the drawer and navigates to the associated section or displays the assicated component. Sub-lists have a fixed, scrollable height.
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] Create a new component for the menu drawer (e.g., MenuDrawer).
        - [] Implement the drawer's UI using Material-UI components (e.g., Drawer, List, ListItem, Collapse, ListSubHeader).
        - [] Implement the rendering of the top-level page options in the List component.
        - [] Implement the sub-list expansion/collapse functionality using the Collapse component and state management.
        - [] Implement navigation logic:
        - [] Set a fixed height and enable scrolling for the sub-lists using CSS or Material-UI styling.
        - [] Style the drawer and its contents using Material-UI styling solutions.
        - [] Integrate the MenuDrawer component into the application's layout (in the header).
        - [] Test the component thoroughtly, ensuring correct navigation for all page options and sub-list items, as well as correct sub-list expansion/collapse.
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary.
- **Dependencies**:  
- **Notes**:

## Feature: Settings Drawer

- **Description**: Implement a settings drawer component that allows users to customize the application's theme. Users can select between dark, light, and system (time of day) modes. Within each mode, users can choose a specific theme from a list of available options. The drawer also provides options to save the chosen theme to local storage for persistence across sessions.
- **Roadmap**: 
- **State**: Planned
    - **Tasks**:  
        - [] Create a new component for the settings drawer (e.g SettingsDrawer).
        - [] Implement the drawer's UI using Material-UI components (e.g. Drawer, Switch for persistence, RadioGroup, Radio, Button).
        - [] Implement the theme mode selection using radio buttons or Material-UI's toggle buttons for Dark, Light, and System.
        - [] Implement theme selection using radio buttons within each mode.
        - [] Implement the "Save Theme" functionality using a Switch.
        - [] Implement local storage functionality to save the selected theme and "Save Theme" preference.
        - [] Implement the "Apply" button functionality:
            * Apply the selected theme to the application using a theme provider (e.g, Material-UI's ThemeProvider).
            * Save the theme and "Save Theme" preference to local storage if the "Save Theme" option is selected. 
        - [] Integrate the SettingsDrawer component into the application's layout (in the header).
        - [] Test the component thoroughly to ensure all functionalities work as expected. This includes testing themeswitching, local storage persistence, and the "Apply" button functionality.
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Theme Implementation

- **Description**: Implement a custom theme across the application that aligns with Material-UI's design system. This includes setting up color schemes, typography, and component styles to ensure consistency in user interface elements. The theme should be adaptable to both light and dark modes, and should be easily switchable based on user preferences or time of day.  
- **Roadmap**: 
- **State**: Backlog
    - **Tasks**:  
        - [] Setup Material-UI Theme Provider:
            * Integrate `@mui/material/styles` to create and manage themes.
            * Define a default theme configuration including primary, secondary, error, warning, info, and success colors, as well as typography settings.
        - [] Create Custom Theme files:
            * Write custom themes for light and dark modes in separate files or within a single file with clear separation. Ideally, create 4 aditional themes (2 dark and 2 white) to the MUI default.
            * Ensure themes are scalable for future additions or modifications. 
        - [] Global Theme Application:
            * Wrap the main component in ThemeProvider from Material-UI (or custom built) to apply the theme globally.  
            * Use CssBaseline to kickstart an elegant, consistent, and simple baseline of atyles.
        - [] Theme switching mechanism:
            * Implement logic for switching between light and dark themes based on user preferences or time of day.
        - [] Responsive design considerations:
            * Ensure the theme adapts well to different screen sizes, possibly using media queries or responsive utility classes from Material-UI.
        - [] Testing:
            * Write Jest tests to verify that components render correctly with the applied theme.
            * Test theme switching functionality to ensure no visual or functional regressions.
        - [] Documentation:
            * Include jsdocs where appropriate to help document how the theme could be modified, extended, and configured.
        - [] Performance Optimization:
            * Ensure that theme changes do not lead to large UI rebuilds, possibly by using memoization or optimizing context updates.
        - [] User Preferences storage:
            * Implement or integrate with a solution to save user's theme preferences (like local storage or cookies) for persistence across sessions.
- **Dependencies**:  
- **Notes**:

## Feature: Pages - Initial Portfolio and Playground pages Layout

- **Description**: Implement portfolio and playground pages for the application that aligns with the file-system based routing of Next-js. This includes creating directories for both pages with layout and/or page.tsx files in them.
- **Roadmap**: 
- **State**: Backlog
    - **Tasks**:  
        - [] Create a portfolio directory in `/src/app/` with a `page.tsx` file
        - [] Create a playground directory in `/src/app/` with a `page.tsx` file
        - [] Ensure the pages adapts well to different screen sizes.
        - [] Ensure accessibility standards are met
        - [] Test page switching functionality in both mobile and larger screens to ensure no visual or functional regressions.
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Implement Header and Heading Hierarchy

- **Description**: This feature aims to improve SEO, accessibility, and maintainability by implementing a system that ensures a clear and logical heading structure. This means starting with and only having a single H1 and organizing content with H2 to H6 tags. It will involve creating a solution using React's context api.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Analyze existing Heading Usage:
            * Audit the current application to identify all instances of heading tags (<h1> to <h6>)
            * Note any inconsistencies or violations of the single <h1> and sequential hierarchy rules
        - [] Create a Header Context with React's Context API
        - [] Create a reusable Header component
        - [] Wrap each page with the root Header context provider to preserve the heading structure within each page.
        - [] Test the component thoroughly to ensure the heading hierarchy is preserved and we can have only a single <h1> element.
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Implement reusable Section Component

- **Description**: This component will provide a flexible and consistent structure for sections within the application. It will include optional sticky header and scrollable contet areas within a semantic <section> tag, improving layout control and user experience.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create the basic Section component structure:
            * Set up a new component file (e.g., Section.tsx) to be included in the `/packages/hwiui/widgets/` directory.
            * Use the <section> HTML tag as the root element
            * Implement Material-UI's Box cmponent for styling and layout control.
        - [] Implement optional sticky headers:
            * Add a `stickyHeader` flag prop to control header stickiness. The flag can be used to determine the value of the CSS position value: whether or not it's set to true or false.
            * Allow passing custom header as prop (e.g., a React node). If the type is string, it should be displayed with the custom Header component to ensure the heading structure is maintained otherwise, display the node.
        - [] Implement scrollable content areas:
            * Add `scrollable` flag prop to enable content scrolling. 
            * Allow passing content as a `children` prop.
        - [] Ensure passing of custom styles targeted at the header and content.
        - [] Implement responsive design:
            * Use Material-UI's responsive breakpoint to adjust the layout and styling for different screen sizes
            * Ensure that the sticky header and scrollable content work correctly on mobile devices.
        - Write unit tests:
            * Test the component's rendering with and without sticky headers and scrollable content.
            * Test the component's behavior with different props and styles
            * Test responsive behavior.
        - [] Document the component's usage and props in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Playground page Layout

- **Description**: Implement the fundamental layout structure for the Playground page, using Material-UI's Grid system to create a responsive two-pane layout with a side panel and a main view.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] In the `page.tsx` file for Playground page, use a <main> tag as the root element for semantic structure.
        - [] Utilize Material-UI's Grid component to create a two-column layout for larger screens and one-column layout for mobile screens.
        - [] Apply a gap style to the Grid container for visual separation.
        - [] Ensure to hide the side navigation panel in mobile screen sizes.
        - [] Use an instance of the Section component for the main view to ensure heading structure integrity
        - [] Test responsive behavior:
            * Test the layout on a variety of screen sizes to ensure proper responsiveness.
            * Test the visibility of the desktop navigation on mobile and larger screens.
        - [] Document the Playground page:
            * Add comments to the code to explain the layout and responsive behavior where necessary.
            * Document the page usage in an `Overview` section of the Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Left Side Navigation Panel

- **Description**: Implement a left side navgation panel on the Playground page for desktop screens. This panel will display a Material-UI <ListItem> labeled "Overview" and a list of names of custom components in the application. Clicking on any item (Overview or component name) will display the corresponding documentation in the main view area of the Playground.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a new component for the left side navigation panel.
        - [] Implement the navigation panel using Material-UI components List, ListItem, etc... Ensure that the panel is only visible on desktop screens.
        - [] Create a ListItem for "Overview" and map the component names to ListItem.
        - [] Implement logic to determine which component's documentation to display in the main view.
        - [] Style the navigation panel and list items to match the application's design.
        - [] Test the navigation panel thoroughly to ensure that clicking on each item displays the correct documentation.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Main Component information View

- **Description**: A view displaying comprehensive information about a component, including descriptions, prop details, an interactive demo, and code examples.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Design the layout for the main component information view, including sections for descriptions, prop table, interactive demo, and code examples.
        - [] Implement the display of component descriptions, potentially broken down into subheadings as needed.
        - [] Create a table to display prop details including prop name, type, default value, and description. Consider using a Material-UI Table component.
        - [] Implement the interactive demo area where the component is rendered and its props can be manipulated.
        - [] Design and implement input elements/components (e.g., Material-UI TextFields, Selects, Checkboxes, Switches, etc...) to control the component's prrops in the interactive demo.
        - [] Connect the input elements to the component's props so that changes are reflected in real-time.
        - [] Ensure the main component information view is responsive and works well on different screen sizes.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Interactive Demo

- **Description**: A live, editable instance of the component where users can interact with its props and see the results.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Implement the rendering of the target component within the interactive demo area.
        - [] Create a mechanism to dynamically update the component's props based on user interaction with the input elements.
        - [] Ensure the interactive demo handles different prop types appropriately (e.g., strings, numbers, booleans, arrays, objects, functions).
        - [] Implement error handling and display for invalid prop values, if necessary
        - [] Ensure interactive demo is responsive and works well on different screen sizes.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Code Example Display

- **Description**: A section displaying code examples for the component, with a toggle to show/hide the code and buttons to edit in StackBlitz/CodeSandbox, copy code, and reset code.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Integrate a code editor component (e.g., react-syntax-highlighter, prism-react-renderer) to display code examples with syntax highlighting for JavaScript/TypeScript.
        - [] Implement the "Show Code"/"Hide Code" button that toggles the visibility of the code editor.
        - [] Implement the "Edit in StackBlitz" button (or an appropriate Material-UI IconButton) that opens the code in a StackBlitz project dynamically.
        - [] Implement the "Edit in CodeSandbox" button (or an appropriate Material-UI IconButton) that opens the code in a CodeSandbox editor. Similar to StackBlitz, this will likely involve creating a CodeSandbox project dynamically.
        - [] Implement the "Copy Code" button (or an appropriate Material-UI IconButton) that copies the code to the clipboard with the formatting preserved.
        - [] Implement an alert or other visual feedback to confirm when the code has been copied.
        - [] Implement the "Reset" button (or an appropriate Material-UI IconButton) to restore the code in the editor to its original state.
        - [] Ensure the code example display is responsive and works well on different screen sizes.
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Code Display with Show/Hide functionality

- **Description**: A toggleable code display showing example code in a JavaScript/TypeScript editor with show/hide functionality.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Use the custom ToggleButton with "Show Code" as the defaultNode and "Hide Code" as the selectedNode.
        - [] Create Code Editor component
        - [] Add collapse animation for code displaying using Material-UI transaactions.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Code Editor Integration

- **Description**: A custom code editor within the documentation view.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Choose and integrate a suitable code component (e.g., react-ace, react-codemirror, Monaco).
        - [] Configure the code editor to support JavaScript/TypeScript syntax highlighting and formatting.
        - [] Implement the display of code examples within the editor.
        - [] Ensure the code editor is responsive and works well on different screen sizes.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement StackBlitz/CodeSandbox integration

- **Description**: Buttons to open the component's code usage example in StackBlitz or CodeSandbox for live editing.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Research and implement the integration with StackBlitz and CodeSandbox APIs.
        - [] Create Material-UI Buttons for StackBlitz and CodeSandbox.
        - [] Implement code example export functionality
        - [] Create the functionality to generate the necessary project files and configurations for StackBlitz and CodeSandbox.
        - [] Generate URL generation logic with encoded component code.
        - [] Add button click handlers to open new tabs with respective editors.
        - [] Handle potential errors during the StackBlitz/CodeSandbox project creation process.
        - [] Ensure accessibility standards are met
        - [] Test integration functionality to ensure the necessary project files and configurations StackBlitz and CodeSandbox are created.
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Copy Code Functionality

- **Description**: A button to copy the code to the clipboard.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Consider the `clipboard-copy` library to implement the copy functionality
        - [] Alternatively, implement "Copy Code" button using Material-UI.
        - [] Preserve code formatting when copying and adding clipboard API integration.
        - [] Provide user feedback using a brief alert from Material-UI, to confirm successful copy.
        - [] Ensure accessibility standards are met
        - [] Test copy functionality to ensure the following:
            * code is copied correctly
            * code format is preserved
            * successful alert is displayed
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Implement Reset Code Functionality

- **Description**: A button to reset the code in the editor to its original state.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Store the original code for each component.
        - [] Implement the "Reset" button functionality to restore the code in the editor from the stored original code.
        - [] Ensure accessibility standards are met
        - [] Test reset functionality to ensure original code can be restored with any change in the editor.
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Page - Implement Portfolio page Layout

- **Description**: Implements the layout for the Portfolio page, dividing it into two primary sections (using the custom Section component) and a main content area. On mobile screens, the sections will stack vertically, while on larger screens, they will be displayed side-by-side with a gap. The left section (or top on mobile screens) will contain an introduction, brief biography, and navigation, while the right section (or bottom on mobile screens) will house the main portfolio content sections.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] In the `page.tsx` file for Porfolio page, use a <main> tag as the root element for semantic structure.
        - [] Implement the two primary sections:
            * Use two instances of the Section component
            * Add placeholder content (Header, Introduction paragraph, and Navigation component that's to be created separately) to the left/top Section.
            * Add placeholder content (components for Home, Skills, Experiences, and Projects - each to be created separately) to the right/bottom section.
        - [] Implement responsive layout:
            * Use Material-UI's Grid or Box with responsive breakpoints to control the layout.
            * On mobile screens (e.g., xs breakpoint), stack the two Section components vertically.
            * On larger screns (e.g., sm or md breakpoints), arrange the Section components side-by-side with a gap
        - [] Implement responsive navigation:
            * Create a separate navigation component for the left section
            * Hide the navigation in the header component on mobile screens using responsive breakpoints
            * Style the navigation for desktop display.
        - [] Create placeholder Home, Skills, Experiences, and Projects components:
            * Create components for each of the portfolio sections.
            * Add placeholder content to each component.
        - [] Test responsive behavior:
            * Test the layout on a variety of screen sizes to ensure proper responsiveness.
            * Test the visibility of the desktop navigation on mobile and larger screens.
        - [] Document the Portfolio page:
            * Add comments to the code to explain the layout and responsive behavior where necessary.
            * Document the page usage in Playground
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:
- **Notes**:

## Feature: Portfolio Left Section Header - Bio/Intro Header Component

- **Description**: This component displays a header section with a dynamic introduction, including animated name spans, a job title, and a brief bio summary.
- **Roadmap**: Backlog
- **State**: 
    - **Tasks**:  
        - [] Create a new component for the Bio/Introduction header.
        - [] Implement the root <header> element as the container using Material-UI's Box or Container  for layout consistency.
        - [] Create a span within the <h1> tag.
        - [] Create the first <span> within the <h1> with the text "I'm".
        - [] Implement the custom character component () for animating individual characters.
        - [] Create a <span> within the <h1> that uses the custom character component to animate the first name.
        - [] Create a <span> within the <h1> that uses the custom character component to animate the last name.
        - [] Create a span within the <h1> for the job title "Senior full-stack developer".
        - [] Apply animations to the spans within the <h1> tag (e.g., using CSS transactions, animations, or a library like react-spring).
        - [] Create the paragraph tag (<p>) for the bio summary.
        - [] Ensure the component is responsive across different screen sizes
        - [] Test the component thoroughly to ensure all animations and text display correctly.
        - [] Ensure accessibility standards are met
        - [] Ensure to include js-doc where necessary
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header - Animated Character Component

- **Description**: This resusable component animates individual characters within a given text string, allowing for dynamic and engaging text displays.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a new component for the charactere animation (e.g., AnimatedCharacter, AnimatedTypography).
        - [] Accept a `text` prop as input, representing the string to be animated.
        - [] Split the input `text` into an array of individual characters.
        - [] Map over the array of characters to create a <span> for each character.
        - [] Apply animations to each character span. Consider different animation libraries or approaches:
            * CSS Transitions: Simple animations like fade-in, slide-in, etc.
            * CSS Keyframes: More complex, multi-stage animations.
            * React Spring: A powerful library for physics-based animations.
            * Framer Motion: Another animation library, good for orchestrating complex sequences.
        - [] Allow for customization of animation properties via props (e.g., animationype, duration, delay, easing). This might include:
            * animationType: "fade-in", "slide-up", "bounce", etc.
            * duration: Animation during in milliseconds.
            * delay: Delay before the animation starts.
            * easing: Easing function for the animation (e.g, "ease-in-out").
        - [] Style the component to ensure proper spacing and alignment of characters.
        - [] Ensure the component is performant, especially for longer strings. Consider techniques like memo to prevent unnecessary re-renders.
        - [] Write unit tests for the component to verify correct functionality and prop handling.
        - [] Document the component's API and usage.
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header - Navigation Component

- **Description**: This component provides navigation links and social media icons within the header section.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a new component for the navigation
        - [] Implement the root <nav> element.
        - [] Create the first Material-UI List component for the navigtion links.
        - [] Create ListItem components for "Home", "Skills", "Experiences", and "Projects".
        - [] Implement the bullet/line change on hover and click for the navigation links:
            * Use Material-UI's ListItemIcon for bullets/lines.
            * Use state to track the currently active link.
            * Implement hover behavior to change the bullet to a line (if not active).
            * Implement click behavior to set the active link and change the bullet to a line.
            * Apply active color to the line and text of the active link.
            * Prevent hover effect on the currently active link.
        - [] Create the second Material-UI List component.
        - [] Create a Material-UI IconButton for GitHub.
        - [] Add the GitHub icon to the IconButton.
        - [] Implement the click handler for the GitHub IconButton to open a new tab with the GitHub profile URL.
        - [] Create a Material-UI IconButton for LinkedIn.
        - [] Add the LinkedIn icon to the IconButton.
        - [] Implement the click handler for the LinkedIn IconButton to open a new tab with the LinkedIn profile URL.
        - [] Style the component using Material-UI components and styling solutions.
        - [] Ensure the component is responsive across different screen sizes.
        - [] Test the component thoroughly to ensure navigation and icon links function correctly.
        - [] Consider accessibility best practices.
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header Navigation Component - Home Component

- **Description**: A visually striking home section featuing an animated GIF of a terminal typing "Hello World" in a retro, monospace font style. The GIF is centered within a Material-UI Card or Box, with an optional static caption below (e.g., "Welcome to My World of code") styled with Material-UI's Typography. The component uses Next.js's Image component for optimized loading, with a fade-in animation on page load to enhance the welcoming effect. This serves as a thematic introduction to the portfolio, blending nostalgia with sophistication.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a HomeTerminal component.
        - [] Source or create the animated GIF:
            * Use a tool like Photoshop, After Effects, or an online GIF maker (e.g., EZGIF) to design a terminal animation typing "Hello World."
            * Style it with a retro aesthetic: green text (#00FF00), black background, monospace font (e.g., IBM Plex Mono or a CRT effect).
            * Set dimensions (e.g., 400x200px) and ensure it loops seamlessly.
            * Save as `public/hello-world-terminal.gif`
        - [] In the component, use Next.js's Image component for optimized rendering:
            * Import Image from next/image.
            * Add `<Image src="/hello-world-terminal.gif" alt="Hello World terminal animation" width={400} height={200} />`.
        - [] Wrap the Image in a Material-UI Card or Box for styling:
            * Use sx props for a subtle shadow or border (e.g., sx={{boxShadow: 4, borderRadius: 2}}).
            * Center it with display: "flex", justifyContent: "center".
        - [] Add an optional caption below the GIF:
            * Use Material-UI's Typography (e.g., `<Typography variant="h5" sx={{mt: 2}}>Welcome to My World of Code</Typography>`).
            * Style with a modern font weight or color from the theme (e.g., color: 'primary.main').
        - [] Wrap the entire content in a Material-UI Container or Box for layout control (e.g., sx={{py: 8, textAlign: 'center'}})
        - [] Add a fade-in animation on load:
            * Use framer-motion (install if needed: npm install framer-motion).
            * Wrap the Card or Box in a motion.div with {initial: {opacity: 0}, animate: {opacity: 1}, transition: {duration: 1}}.
        - [] Ensure responsiveness:
            * Adjust GIF size with Image's layout="responsive" or Material-UI breakpoints (e.g., smaller width on mobile).
        - [] Test accessibility:
            * Add a descriptive `alt` attribute to the Image.
            * nsure caption contrast meets WCAG guidelines.
        - [] Integrate the HomeTerminal component into the home page.
        - [] Optimize the GIF file size (e.g., compress with a tool like TinyPNG or ImageOptim) to reduce load time.
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header Navigation Component - Skills Component

- **Description**: A section displaying a grid of cards, each representing a technology or skill. Known skills feature a bold design with an icon and name, while skills in progress include a progress bar to visualize learning status. Material-UI's Card and Grid components ensure a responsive layout, with subtle animations for interactivity.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a `SkillCards` component.
        - [] Use Material-UI's Grid component to create a responsive card layout.
        - [] Design a SkillCard sub-component using Material-UI's Card, CardContent, and Typography for each skill.
        - [] For known/mastered skills:
            * Add an icon for each skill (e.g., via `@mui/icons-material` or a custom SVG).
            * Display the skill name with a bold, confident styling (e.g, Typography with variant="h6", fontWeight="bold").
            * Apply a confident background color or border (e.g., `sx={{backgroundColor: '#e0f7fa'}}`) to differentiate from learning skills.
        - [] For learning skills:
            * Include an icon and skill name as above.
            * Extend the SkillCard with Material-UI's LinearProgress component below the name, setting a percentage to show progress.
            * Style with a lighter or muted tone (e.g., `sx={{opacity: 0.8}}`) to indicate "in progress".
        - [] Source skill data (name, icon, status, progress) from a JSON file or static array in the component.
        - [] Add hover effects to each SkillCard using Material-UI's `sx` props (e.g., `sx={{'&:hover': {boxShadow: 6, tranform: 'scaled(1.05)'}}}`) or `framer-motion` for interactivity and smooth scaling.
        - [] Ensure responsiveness with Material-UI's `Grid` breakpoints (e.g., `xs={12} sm={6} md={4}`).
        - [] Ensure accessibility by adding ARIA labels (e.g., `aria-label="Progress: 70%"` for LinearProgress) and sufficient color contrast.
        - [] Test responsiveness across devices, adjusting card sizes or grid spacing as needed (e.g., tighter spacing on mobile).
        - [] Add a subtle fade-in animation to the entire section on load using CSS keyframes or framer-motion for a polished entrance.
        - [] Integrate the SkillCards component into the main portfolio page and populate with real skill data.
        - [] Review performance (e.g., lazy-load icons or optimize renders with memo if the list grows large)
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header Navigation Component - Experiences Component

- **Description**: A timeline-based section displaying professional experiences. Each experience is a card with a company name and location as the header. Clicking a card expands it to show a list of job titles with start/end dates, technologies used, and a link to the company's website. Built with Material-UI's `Timeline` and `Accordion` components for a sleek, expandable layout with subtle animations.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create an `ExperienceTimeline` component.
        - [] Install `@mui/lab` (if not already) for Material-UI's `Timeline` component and use it as the root layout.
        - [] Define an `ExperienceCard` sub-component combining `Accordion`, `AccordionSummary`, and `AccordionDetails`.
        - [] In `AccordionSummary`, display the company name (e.g., Typography with variant="h6") and location (e.g., variant="subtitle2") with a `TimelineDot` for visual anchoring.
        - [] In `AccordionDetails`, structure the expanded content:
            * Use a List to show job titles with start/end dates (e.g., "Senior Developer, Jan 2020 - Present").
            * Display technologies as Material-UI Chip components in a flex row (e.g., "React", "Node.js").
            * Add a `Button` or Link (from Material-UI or next/link) styled with Material-UI for the company website (e.g., "Visit Company").
        - [] Source experience data from a JSON file or array.
        - [] Add expand/collapse animations using Material-UI's Collapse transistion or framer-motion.
        - [] Style the timeline with Material-UI's TimelineConnector and sx props (e.g., muted colors, clean lines).
        - [] Ensure responsiveness (e.g., stack vertically on mobile with breakpoints).
        - [] Test accessibility (e.g., ARIA labels for expandable sections and links).
        - [] Integrate into the portfolio's main page.
- **Dependencies**:  
- **Notes**:

## Feature: Portfolio Left Section Header Navigation Component - Projects Component

- **Description**: A responsive grid of project tiles styled as cards, each initially displaying the project title and technologies used as chips. On hover, a semi-transparent overlay fades in, revealing the project description, a GitHub link, and an optional live site link (for web apps). Built with Material-UI's Grid and Card components, this feature uses CSS transitions for a smooth overlay effect, offering a modern, minimalistic showcase that balances aesthetics and functionality. For non-hover devices (e.g., mobile), the overlay can toggle on tap, ensuring accessibility.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a `ProjectTiles` component.
        - [] Use Material-UI's Grid component as the container, setting responsive breakpoints (e.g., xs={12} sm={6} md={4}) for a multi-column layout.
        - [] Design a ProjectTitle sub-component using Material-UI's Card and CardContent:
            * Display the project title with Typography (e.g., variant="h6", centered or left-aligned).
            * Show technologies as Material-UI Chip components in a flex row (e.g., "Next.js", "TypeScript"), styled with sx props (e.g., margin: 0.5).
        - [] Add an overly dic within each Card:
            * Style with CSS or Material-UI's sx props (e.g., position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, transition: 'opacity 0.3s', backgroundColor: 'rgba(0, 0, 0, 0.7)').
            * Set `opacity: 1` on hover using sx (e.g., &:hover .overlay {opacity: 1}) or styled-components.
            * Inside the overlay, include:
                * Project description with Typography (e.g., variant="body2", color="white").
                * Button components for GitHub (href to repo) and optional live site (e.g., href to web app), styled with variant="contained" or variant="outlined" and color="inherit".
        - [] Define project data in a JSON file or array within the component:
            * Example: {title: "Portfolio Site", technologies: ["Next.js", "Material-UI"], description: "A personal porfolio built with modern tools.", links: [{rel: "github", href: "https://github.com/user/repo"}, {rel: "live", href: "https://site.com"}]}
        - [] Use Material-UI's Box to wrap the Grid for padding and centering (e.g., sx={{p: 4, maxWidth: "lg"}}).
        - [] Add a subtle hover effect to the Card itself (e.g., sx={{"&:hover": {boxShadow: 6}}}) to enhance interactivity.
        - [] For mobile/touch devices:
            * Use React state (e.g., useState) to toggle the overlay on tap/click instead of hover.
            * Add a small "Tap for Details" hint on smaller screens (e.g., Typography with variant="caption").
        - [] Ensure accessibility:
            * Add ARIA lables (e.g., aria-label="Project details" for the overlay).
            * Ensure sufficient contrast between overlay text and background (e.g., white text on dark overlay).
            * test keyboard navigation (e.g., focusable buttons in the overlay).
        - [] Set a fixed Card height (e.g., sx={{height: 200}}) to keep the grid uniform, with overflow handling for long tech lists or titles.
        - [] Test responsiveness (e.g., stack tiles on mobile, adjust overlay padding for smaller screens).
        - [] Optimize performance by memoizing ProjectTile with React.memo if the project lists grows large.
        - [] Add a fade-in animation to the entire grid on load using CSS keyframes or framer-motion.
        - [] Integrate the ProjectTiles component into the portfolio's main page and populate with real project data.
- **Dependencies**:  
- **Notes**:

## Feature: Legacy Version Switcher

- **Description**: A feature that enables users to toggle between the current version of the portfolio application and its previous major version (following semantic versioning). The switcher is implemented as a Material-UI component, providing a seamless way to load and display version, with appropriate user feedback and version management. The legacy version could be served from a separate static build or conditionally rendered based on selection.
- **Roadmap**: 
- **State**:  
    - **Tasks**:  
        - [] Create a VersionSwitcher component using Material-UI's Select or ToggleButtonGroup to allow version selection (e.g., "Current (v2)" vs "Legacy (v1)").
        - [] Style the switcher with Material-UI theme properties (e.g., consistent typography, colors) and position it in the UI (e.g., header or settings drawer).
        - [] Use React's useState or a context to manage the selected version state across the application.
        - [] Implement a build strategy to maintain the legacy version:
            * Option 1: Export the legacy version as a static build (e.g., out/v1/) during CI/CD.
            * Option 2: Bundle legacy components conditionally in the main app with dynamic imports.
        - [] For static build approach:
            * Configure Next.js routing to serve legacy version from a subpath (e.g., /legacy/v1).
            * Add a redirect logic in the VersionSwitcher to navigate to the legacy URL on selection.
        - [] For dynamic import approach:
            * Use Next.js dynamic to lazily load legacy components (e.g., dynamic(() => import("../legacy/v1/App"))).
            * Conditionally render the legacy or current app based on the selected version.
        - [] Add a Material-UI CircularProgress loader during version switching to indicate loading state.
        - [] Implement a fallback mechnaism: if the legacy version fails to load, display a Material-UI Alert with an error message, an SVG Image, or GIF depicting an error with an error message (e.g., "Legacy version unavailable").
        - [] Persist the selected version in localStorage to maintain user preference across sessions.
        - [] Ensure CSS isolation between versions (e.g., scope legacy styles with unique prefix or CSS modules) to prevent conflicts.
        - [] Add accessibililty attributes to the switcher (e.g., aria-label="Select application version", role="combobox").
        - [] Test version switching on desktop and mobile to ensure UI consistency and performance.
        - [] Write unit tests with Jest to verify version state changes and rendering.
        - [] Verify legacy version functionality by manually testing key features from v1.
        - [] Document the feature in the app (e.g., via a Material-UI Tooltip or help section) explaining the version switcher.
        - [] Deploy both versions in the CI/CD pipeline (e.g., Vercel) with proper versioning tags.
- **Dependencies**:  
- **Notes**:

## Feature: Playground Page - Interative UI Node real-time editor

- **Description**: Implement an interface that enabels users to define custom component trees via a JSON-based node structure in a secure, framework-agnostic format. It includes a real-time editor with a large textarea for crafting UI layouts, a button to dynamically render the interface, and a preview section powered by a recursive renderer.
- **Roadmap**: 
- **State**: Refinement  
    - **Tasks**:  
        - [] foo
        - [] bar
- **Dependencies**:  
- **Notes**:
