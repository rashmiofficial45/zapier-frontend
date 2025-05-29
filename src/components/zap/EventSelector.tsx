import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type Event = {
    id: string;
    name: string;
    description?: string;
    icon?:string,
    catagory?:string
};

interface EventSelectorProps {
    events: Event[];
    onSelectEvent: (eventId: string) => void;
    type: "trigger" | "action";
}

const EventSelector: React.FC<EventSelectorProps> = ({
    events,
    onSelectEvent,
    type,
}) => {
    const title = `Choose ${type === "trigger" ? "Trigger" : "Action"}`;
    const subtitle = `When this ${type} happens, your Zap will automatically run.`;

    return (
        <Card className="bg-white shadow-lg border-0">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                    {title}
                </CardTitle>
                <p className="text-gray-600">{subtitle}</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {events.map((event) => (
                        <button
                            key={event.id}
                            onClick={() => onSelectEvent(event.id)}
                            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-700">
                                        {event.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 ml-4" />
                            </div>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default EventSelector;
