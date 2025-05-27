
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export type ConfigField = {
//     id: string;
//     label: string;
//     type: "text" | "select" | "email";
//     placeholder?: string;
//     options?: { value: string; label: string }[];
// };

// interface ConfigurationFormProps {
//     stepId: string;
//     stepType: "trigger" | "action";
//     fields: ConfigField[];
//     config: { [key: string]: string };
//     onConfigChange: (fieldId: string, value: string) => void;
//     onDone: () => void;
// }
// const fields = [{
//     id: "212121",
//     label: "Untitled Name",
//     type: "text" | "select" | "email",
//     placeholder: "not needed",
//     options: {
//         value: "demo",
//         label: "demo"
//     }
// }]

// const ConfigurationForm = ({
//     stepId,
//     stepType,
//     fields,
//     config,
//     onConfigChange,
//     onDone
// }) => {
//     if (fields.length === 0) {
//         return (
//             <div>
//                 <p className="text-muted-foreground">No configuration required for this step.</p>
//                 <Button onClick={onDone} className="mt-4">Done</Button>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-4">
//             {fields.map(field => (
//                 <div key={field.id} className="space-y-2">
//                     <label className="text-sm font-medium" htmlFor={`${stepId}-${field.id}`}>
//                         {field.label}
//                     </label>

//                     {field.type === 'select' ? (
//                         <Select
//                             value={config[field.id] || ''}
//                             onValueChange={(value) => onConfigChange(field.id, value)}
//                         >
//                             <SelectTrigger id={`${stepId}-${field.id}`}>
//                                 <SelectValue placeholder="Select an option" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {field.options?.map(option => (
//                                     <SelectItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     ) : (
//                         <input
//                             id={`${stepId}-${field.id}`}
//                             type={field.type}
//                             value={config[field.id] || ''}
//                             onChange={(e) => onConfigChange(field.id, e.target.value)}
//                             placeholder={field.placeholder}
//                             className="w-full p-2 border rounded"
//                         />
//                     )}
//                 </div>
//             ))}

//             <Button onClick={onDone} className="mt-4">
//                 Done
//             </Button>
//         </div>
//     );
// };

// export default ConfigurationForm;