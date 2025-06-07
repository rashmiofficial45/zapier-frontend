import React from "react";
import { Button } from "@/components/ui/button";

/**
 * Defines the structure of a configuration field.
 * It can be of type "text", "email", or "select".
 */
type ConfigField = {
    id: string;
    label: string;
    type: "text" | "email" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[]; // Only for select fields
};

/**
 * Basic props passed into the ConfigurationForm.
 */
type Props = {
    fields: ConfigField[];                        // Array of config fields to render
    config: { [key: string]: string };           // Holds current values for each field
    onConfigChange: (id: string, value: string) => void; // Called when any input changes
    onDone: () => void;                           // Called when user clicks "Done"
};

/**
 * A simple form component that dynamically renders input fields
 * based on the `fields` prop and allows users to update their values.
 */
const ConfigurationForm: React.FC<Props> = ({ fields, config, onConfigChange, onDone }) => {
    // Called when user clicks the Done button
    const handleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDone();
    };

    // If no fields to show, display message and Done button
    if (!fields.length) {
        return (
            <div>
                <p className="text-muted-foreground">No configuration required.</p>
                <Button onClick={handleDone} className="mt-4">
                    Done
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Loop through each field and render appropriate input */}
            {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="text-sm font-medium">
                        {field.label}
                    </label>

                    {/* Render select dropdown if type is 'select' */}
                    {field.type === "select" ? (
                        <select
                            id={field.id}
                            value={config[field.id] || ""}
                            onChange={(e) => onConfigChange(field.id, e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="" disabled>
                                {field.placeholder || "Select an option"}
                            </option>
                            {(field.options || []).map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        // Render text or email input
                        <input
                            id={field.id}
                            type={field.type}
                            value={config[field.id] || ""}
                            onChange={(e) => onConfigChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full p-2 border rounded"
                        />
                    )}
                </div>
            ))}

            {/* Done Button */}
            <Button onClick={handleDone} className="mt-4">
                Done
            </Button>
        </div>
    );
};

export default ConfigurationForm;
