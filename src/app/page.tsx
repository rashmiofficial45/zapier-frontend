import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home(){
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Connect your apps and automate workflows
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Easy automation for busy people. ZapConnect moves info between your web apps automatically, so you can focus on more important work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8">Get Started Free</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="text-lg px-8">How It Works</Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://placehold.co/600x400" alt="Automate workflows" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How ZapConnect Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automate your work in just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose your trigger</h3>
                <p className="text-muted-foreground">
                  Pick an app and event that starts your automation
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect your apps</h3>
                <p className="text-muted-foreground">
                  Link your accounts and set up automated actions
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Watch the magic happen</h3>
                <p className="text-muted-foreground">
                  Your apps work together so you don't have to
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your work?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join over 2 million people who save time with ZapConnect
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
