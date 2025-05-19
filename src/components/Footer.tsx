import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-50 p-12 mt-auto">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">ZapConnect</h3>
                        <p className="text-muted-foreground">
                            Automate your work and connect your apps without writing code.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><Link href="/features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                            <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                            <li><Link href="/integrations" className="text-muted-foreground hover:text-primary">Integrations</Link></li>
                            <li><Link href="/enterprise" className="text-muted-foreground hover:text-primary">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                            <li><Link href="/help" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                            <li><Link href="/community" className="text-muted-foreground hover:text-primary">Community</Link></li>
                            <li><Link href="/webinars" className="text-muted-foreground hover:text-primary">Webinars</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                            <li><Link href="/legal" className="text-muted-foreground hover:text-primary">Legal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-muted-foreground text-sm">
                        &copy; {new Date().getFullYear()} ZapConnect, Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-muted-foreground hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
