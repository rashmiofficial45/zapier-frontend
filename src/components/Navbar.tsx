"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-b bg-white p-4 sticky top-0 z-10">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                            <path d="m8 18 3-3-3-3"></path>
                            <path d="m13 12 3-3-3-3"></path>
                            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        </svg>
                    </div>
                    <span className="text-xl font-bold">ZapConnect</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/zaps">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        My Zaps
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/explore">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Explore
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pricing">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Pricing
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-4">
                        <Link href="/auth/signin">
                            <Button variant="outline">Log in</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button>Sign up free</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                            <div className="flex flex-col h-full">
                                <div className="flex-1 py-4">
                                    <nav className="flex flex-col gap-4">
                                        <Link href="/zaps" className="px-2 py-3 text-lg font-medium hover:bg-accent rounded-md transition-colors">
                                            My Zaps
                                        </Link>
                                        <Link href="/explore" className="px-2 py-3 text-lg font-medium hover:bg-accent rounded-md transition-colors">
                                            Explore
                                        </Link>
                                        <Link href="/pricing" className="px-2 py-3 text-lg font-medium hover:bg-accent rounded-md transition-colors">
                                            Pricing
                                        </Link>
                                    </nav>
                                </div>
                                <div className="border-t py-4 flex flex-col gap-3">
                                    <Link href="/auth/login" className="w-full">
                                        <Button variant="outline" className="w-full">Log in</Button>
                                    </Link>
                                    <Link href="/auth/signup" className="w-full">
                                        <Button className="w-full">Sign up free</Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
