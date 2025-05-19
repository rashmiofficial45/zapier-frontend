import React from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="border-b bg-white py-4 sticky top-0 z-10">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl pl-10 font-bold">ZapConnect</span>
                </Link>

                <NavigationMenu className="hidden sm:block">
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

                <div className="flex items-center gap-1 md:gap-4">
                    <Link href="/login">
                        <Button variant="outline">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign up free</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
