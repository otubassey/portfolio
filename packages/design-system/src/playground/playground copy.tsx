// "use client";

// import { useState } from "react";

// import { Card } from "../components";

// import { PropControls } from "./propControls";
// import { LivePreview } from "./livePreview";
// import { CodePreview } from "./codePreview";

// import { Example, PropDefinition } from "./types";

// export interface PlaygroundProps<T = any> {
// 	component: React.ComponentType<T>;
// 	componentName: string;
// 	defaultProps: T;
// 	propDefinitions: PropDefinition[];
// 	description?: string;
// 	examples?: Example<T>[];
// }

// export function Playground<T>({
// 	component: Component,
// 	componentName,
// 	defaultProps,
// 	propDefinitions,
// 	description,
// 	examples = [],
// }: PlaygroundProps<T>) {
//   const [props, setProps] = useState<T>(defaultProps);
//   const [selectedExample, setSelectedExample] = useState<number | null>(null);
//   const [showCode, setShowCode] = useState(false);

//   const handlePropChange = (propName: string, value: any) => {
//     setProps((prev) => ({ ...prev, [propName]: value }));
//     setSelectedExample(null); // Clear example selection when manually changing props
//   };

//   const handleExampleSelect = (index: number) => {
//     setSelectedExample(index);
//     setProps(examples[index].props);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           {componentName}
//         </h1>
//         {description && (
//           <p className="text-gray-600 dark:text-gray-400">{description}</p>
//         )}
//       </div>

//       {/* Examples */}
//       {examples.length > 0 && (
//         <Card className="p-4">
//           <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
//             Examples
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {examples.map((example, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleExampleSelect(index)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   selectedExample === index
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {example.name}
//               </button>
//             ))}
//           </div>
//         </Card>
//       )}

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Live Preview */}
//         <div>
//           <LivePreview>
//             <Component {...props} />
//           </LivePreview>
//         </div>

//         {/* Controls */}
//         <div>
//           <PropControls
//             propDefinitions={propDefinitions}
//             values={props}
//             onChange={handlePropChange}
//           />
//         </div>
//       </div>

//       {/* Code Preview */}
//       <div>
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Code
//           </h3>
//           <button
//             onClick={() => setShowCode(!showCode)}
//             className="text-sm text-blue-500 hover:text-blue-600"
//           >
//             {showCode ? "Hide" : "Show"} Code
//           </button>
//         </div>
//         {showCode && (
//           <CodePreview
//             componentName={componentName}
//             props={props}
//             code={selectedExample !== null ? examples[selectedExample].code : undefined}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Playground;
