import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type App = {
    id: string;
    name: string;
    icon: string;
    category: string;
};

interface AppSelectorProps {
    apps: App[];
    onSelectApp: (appId: string) => void;
    title: string;
}

const AppSelector: React.FC<AppSelectorProps> = ({ apps, onSelectApp, title }) => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search apps..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredApps.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => onSelectApp(app.id)}
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group cursor-pointer"
                        >
                            <div className="w-12 h-12 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                                {app.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-900 text-center leading-tight">{app.name}</span>
                            <span className="text-xs text-gray-500 mt-1">{app.category}</span>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default AppSelector;