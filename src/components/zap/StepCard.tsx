import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronUp,
    Trash2,
    Settings,
} from "lucide-react";
import ConfigurationForm from "./ConfigurationForm";
// import ConfigurationForm, { ConfigField } from "./ConfigurationForm";

type App = {
    id: string;
    name: string;
    description:string;
    icon?: string; // You might replace this with a JSX.Element or dynamic import
    category?: string;
};

interface Step {
    id: string;
    type: "trigger" | "action";
    appId: string;
    eventId: string;
    config: { [key: string]: string };
}

// interface ConfigField {
//   id: string;
//   label: string;
//   placeholder?: string;
// }

interface StepCardProps {
    index: number;
    step: Step;
    isConfiguring: boolean;
    // configFields: ConfigField[];
    availableApps: App[];
    eventName: string;
    eventDescription: string;
    onEdit: () => void;
    onConfigChange: (fieldId: string, value: string) => void;
    onConfigDone: () => void;
    onDelete?: () => void;
}

const StepCard: React.FC<StepCardProps> = ({
    index,
    step,
    isConfiguring,
    availableApps,
    eventName,
    eventDescription,
    onEdit,
    onConfigChange,
    onConfigDone,
    onDelete,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const app = availableApps.find((a) => a.id === step.appId);
    const isConfigured = Object.keys(step.config).length > 0;

    return (
        <div className="relative">
            {/* Step number indicator */}
            <div className="absolute -left-4 top-4 w-7 h-7 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 z-10 shadow-sm">
                {index + 1}
            </div>

            <Card
                className={`ml-6 shadow-sm border transition-all hover:shadow-md cursor-pointer ${step.type === "trigger"
                    ? "border-orange-200 bg-gradient-to-r from-orange-50/50 to-orange-50/30"
                    : "border-blue-200 bg-gradient-to-r from-blue-50/50 to-blue-50/30"
                    } ${isConfiguring ? "ring-2 ring-orange-300 shadow-lg" : ""}`}
                onClick={onEdit}
            >
                <CardHeader className="pb-3 px-4 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-sm ${step.type === "trigger" ? "bg-orange-100" : "bg-blue-100"
                                    }`}
                            >
                                {app?.icon ?? app?.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        {step.type === "trigger"
                                            ? "Trigger"
                                            : `Action ${index}`}
                                    </span>
                                    {isConfigured && (
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    )}
                                </div>
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {eventName}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                    {eventDescription}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="flex items-center space-x-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="h-7 w-7 p-0 hover:bg-gray-100 rounded-md"
                            >
                                {isExpanded ? (
                                    <ChevronUp className="h-3 w-3" />
                                ) : (
                                    <ChevronDown className="h-3 w-3" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onEdit}
                                className="h-7 w-7 p-0 hover:bg-gray-100 rounded-md"
                            >
                                <Settings className="h-3 w-3" />
                            </Button>
                            {step.type === "action" && onDelete && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onDelete}
                                    className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600 rounded-md"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>

                {/* Expandable config summary */}
                {isExpanded && (
                    <CardContent
                        className="px-4 pb-4 pt-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="border-t pt-3">
                            <p className="text-sm text-gray-600 mb-3">Step Configuration</p>
                            {isConfigured && (
                                <div className="p-3 bg-gray-50 rounded-lg border">
                                    <p className="text-xs font-medium text-gray-700 mb-2">
                                        Config values:
                                    </p>
                                    <div className="space-y-1">
                                        {Object.entries(step.config).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center text-xs space-x-2"
                                            >
                                                <span className="text-gray-500">{key}:</span>
                                                <span className="font-medium text-gray-900 truncate">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                )}

                {/* Configuration Panel */}
                {isConfiguring && (
                    <CardContent
                        className="px-4 pb-4 pt-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="border-t pt-4">
                            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Configure {step.type === "trigger" ? "Trigger" : "Action"}
                                </h4>

                                <ConfigurationForm
                                        stepId={step.id}
                                        stepType={step.type}
                                        // fields={configFields}
                                        config={step.config}
                                        onConfigChange={onConfigChange}
                                        onDone={onConfigDone}
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};

export default StepCard;
