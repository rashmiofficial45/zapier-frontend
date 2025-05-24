"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import axios from "axios";

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
interface Zap {
    "id": string,
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string
        }
    },
    "userId": number,
    "actions":
    {
        "id": string,
        "action": "sol-transfer" | "email",
        "sortingOrder": number,
        "zapId": string,
        "actionId": string
    }[]
}
function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        const fetchZaps = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/zap/`, {
                    headers: { Authorization: token },
                });

                console.log("✅ Zaps fetched:", response.data.zaps);
                setZaps(response.data.zaps); // ✅ FIXED HERE
            } catch (error) {
                console.error("❌ Error fetching zaps:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchZaps();
    }, []);
    console.log(zaps)
    return { loading, zaps }
}
const AllZaps = () => {
    const { loading, zaps } = useZaps();

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:pl-11 min-h-screen">
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
                            <Input placeholder="Search your Zaps..." className="pl-10" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Loading your zaps...</div>
                    ) : zaps.length === 0 ? (
                        <div className="text-center text-muted-foreground">You haven't created any zaps yet.</div>
                    ) : (
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
                                {/* Mobile View */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                                    {zaps.map((zap) => (
                                        <Card key={zap.id} className="overflow-hidden shadow-sm hover:shadow transition-shadow">
                                            <CardContent className="p-5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <Link href={`/zaps/${zap.id}`}>
                                                        <h3 className="text-lg font-semibold text-primary hover:text-primary/90 transition-colors">
                                                            Zap #{zap.id.slice(0, 6)}
                                                        </h3>
                                                    </Link>
                                                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">Trigger</p>
                                                        <p className="font-medium">{zap.trigger.type.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">Actions</p>
                                                        <p className="font-medium">{zap.actions.map(a => a.action).join(", ")}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">Sorting Order</p>
                                                        <p>{zap.actions.map(a => a.sortingOrder).join(", ")}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Desktop View */}
                                <div className="hidden lg:block rounded-lg border overflow-hidden shadow-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[300px]">Zap ID</TableHead>
                                                <TableHead>Trigger</TableHead>
                                                <TableHead>Actions</TableHead>
                                                <TableHead>Sorting</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {zaps.map((zap) => (
                                                <TableRow key={zap.id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium">
                                                        <Link href={`/zaps/${zap.id}`} className="text-primary hover:text-primary/90 hover:underline transition-colors">
                                                            {zap.id.slice(0, 10)}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{zap.trigger.type.name}</TableCell>
                                                    <TableCell>{zap.actions.map(a => a.action).join(", ")}</TableCell>
                                                    <TableCell>{zap.actions.map(a => a.sortingOrder).join(", ")}</TableCell>
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
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default AllZaps;
