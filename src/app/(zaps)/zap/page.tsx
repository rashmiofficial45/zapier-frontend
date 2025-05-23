import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const mockZaps = [
    {
        id: "1",
        name: "New Gmail to Slack",
        status: "Active",
        lastRun: "2 hours ago",
        triggers: "Gmail",
        actions: "Slack",
        runs: 145
    },
    {
        id: "2",
        name: "Twitter mentions to Google Sheet",
        status: "Active",
        lastRun: "5 hours ago",
        triggers: "Twitter",
        actions: "Google Sheets",
        runs: 67
    },
    {
        id: "3",
        name: "New Trello card to Email notification",
        status: "Inactive",
        lastRun: "3 days ago",
        triggers: "Trello",
        actions: "Gmail",
        runs: 28
    },
    {
        id: "4",
        name: "Form submission to CRM",
        status: "Active",
        lastRun: "1 hour ago",
        triggers: "Google Forms",
        actions: "Salesforce",
        runs: 312
    }
];

const AllZaps = () => {
    return (
        <div className="flex flex-col lg:pl-12 min-h-screen">
            <Navbar />

            <main className="flex-1 container max-w-9xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Zaps</h1>
                    <Link href="/zaps/create">
                        <Button className="shadow-sm">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create Zap
                        </Button>
                    </Link>
                </div>

                <div className="mb-8">
                    <div className="relative max-w-md w-full">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search your Zaps..."
                            className="pl-10"
                        />
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="border-b mb-6">
                        <TabsList className="w-full justify-start overflow-x-auto pb-px sm:w-auto">
                            <TabsTrigger value="all" className="px-4">All Zaps</TabsTrigger>
                            <TabsTrigger value="active" className="px-4">Active</TabsTrigger>
                            <TabsTrigger value="inactive" className="px-4">Inactive</TabsTrigger>
                            <TabsTrigger value="draft" className="px-4">Drafts</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="space-y-6">
                        {/* Mobile view cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                            {mockZaps.map((zap) => (
                                <Card key={zap.id} className="overflow-hidden shadow-sm hover:shadow transition-shadow">
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <Link href={`/zaps/${zap.id}`} className="inline-block">
                                                <h3 className="text-lg font-semibold text-primary hover:text-primary/90 transition-colors">{zap.name}</h3>
                                            </Link>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${zap.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}>
                                                {zap.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-muted-foreground mb-1">Trigger</p>
                                                <p className="font-medium">{zap.triggers}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Action</p>
                                                <p className="font-medium">{zap.actions}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Last Run</p>
                                                <p>{zap.lastRun}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Total Runs</p>
                                                <p className="font-medium">{zap.runs}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Desktop view table */}
                        <div className="hidden lg:block rounded-lg border overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Run</TableHead>
                                        <TableHead>Trigger</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead className="text-right">Total Runs</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockZaps.map((zap) => (
                                        <TableRow key={zap.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">
                                                <Link href={`/zaps/${zap.id}`} className="text-primary hover:text-primary/90 hover:underline transition-colors">
                                                    {zap.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${zap.status === "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                    {zap.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{zap.lastRun}</TableCell>
                                            <TableCell>{zap.triggers}</TableCell>
                                            <TableCell>{zap.actions}</TableCell>
                                            <TableCell className="text-right">{zap.runs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="active">
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <p>Showing only active Zaps</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="inactive">
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <p>Showing only inactive Zaps</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="draft">
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <p>Showing only draft Zaps</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default AllZaps;
