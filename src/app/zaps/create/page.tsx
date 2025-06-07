"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft, PlayIcon, SaveIcon, Zap } from "lucide-react";

// UI Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AppSelector from "@/components/zap/AppSelector";
import EventSelector from "@/components/zap/EventSelector";
import ZapCanvas from "@/components/zap/ZapCanvas";

// App data
import { availableActions, availableTrigger } from "@/lib/data";

// Step Type definition for each trigger/action step
export type Step = {
  id: string;
  type: "trigger" | "action";
  appId: string;
  eventId: string;
  config: { [key: string]: string };
};

// Main page component
const CreateZap = () => {
  // Zap name state
  const [zapName, setZapName] = useState("Untitled Zap");

  // All steps (first one is always trigger, others are actions)
  const [steps, setSteps] = useState<Step[]>([]);

  // When user is choosing a trigger/action app
  const [selecting, setSelecting] = useState<{
    type: "trigger" | "action";
    index: number;
  } | null>(null);

  // Tracks currently selected app during selection process
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  // Tracks the step index being configured (config form visible)
  const [configuring, setConfiguring] = useState<number | null>(null);

  // Utility to show toast message
  const showToast = (title: string, description: string) => {
    toast(title, { description });
  };

  // Add the only allowed trigger step
  const handleAddTrigger = () => {
    if (!steps.some((step) => step.type === "trigger")) {
      setSelecting({ type: "trigger", index: 0 });
      setSelectedApp(null);
    } else {
      showToast("Cannot add another trigger", "A Zap can only have one trigger.");
    }
  };

  // Add an action step
  const handleAddAction = () => {
    setSelecting({ type: "action", index: steps.length });
    setSelectedApp(null);
  };

  // When an app is selected during AppSelector
  const handleSelectApp = useCallback((appId: string) => {
    setSelectedApp(appId);
  }, []);

  // When a trigger or action event is selected
  const handleSelectEvent = (eventId: string) => {
    if (!selecting || !selectedApp) return;

    const newStep: Step = {
      id: `step-${Date.now()}`,
      type: selecting.type,
      appId: selectedApp,
      eventId,
      config: {},
    };

    const newSteps =
      selecting.type === "trigger"
        ? [newStep, ...steps.filter((step) => step.type !== "trigger")]
        : [...steps, newStep];

    setSteps(newSteps);
    setSelecting(null);
    setSelectedApp(null);
    setConfiguring(selecting.index);

    showToast(
      `${selecting.type === "trigger" ? "Trigger" : "Action"} added`,
      `Successfully added a new ${selecting.type} to your Zap.`
    );
  };

  // When a config field is updated in a StepCard
  const handleConfigChange = (stepIndex: number, fieldId: string, value: string) => {
    setSteps((prev) =>
      prev.map((step, index) =>
        index === stepIndex
          ? { ...step, config: { ...step.config, [fieldId]: value } }
          : step
      )
    );
  };

  // When config is marked as done
  const handleConfigDone = () => {
    setConfiguring(null);
    showToast("Configuration saved", "Your step configuration has been saved.");
  };

  // Save the Zap (dummy logic for now)
  const handleSaveZap = () => {
    showToast("Zap saved", "Your Zap has been saved successfully!");
  };

  // Fetch events dynamically based on app and type
  const getEvents = useCallback(
    (id: string, type: "trigger" | "action") =>
      type === "trigger"
        ? availableTrigger[id as keyof typeof availableTrigger] || []
        : availableActions[id as keyof typeof availableActions] || [],
    []
  );

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              {/* Left: Back Button + Zap Icon + Editable Name */}
              <div className="pl-6 flex items-center space-x-6">
                <Link
                  href="/zaps"
                  className="text-gray-500 hover:text-gray-700 flex items-center text-sm font-medium transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to My Zaps
                </Link>
                <div className="h-5 border-l border-gray-300"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <input
                    type="text"
                    value={zapName}
                    onChange={(e) => setZapName(e.target.value)}
                    className="text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 text-gray-900 placeholder-gray-400"
                    placeholder="Name your Zap"
                  />
                </div>
              </div>

              {/* Right: Test & Save Buttons */}
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Test
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveZap}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md"
                >
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Zap Canvas rendering steps (Trigger + Actions) */}
            <ZapCanvas
              steps={steps}
              configuring={configuring}
              onAddTrigger={handleAddTrigger}
              onAddAction={handleAddAction}
              onConfigChange={handleConfigChange}
              onConfigDone={handleConfigDone}
            />

            {/* App Selector Popup */}
            {selecting && !selectedApp && (
              <div className="mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <AppSelector
                    apps={Object.values(availableTrigger).flat()}
                    onSelectApp={handleSelectApp}
                    title={`Choose ${selecting.type === "trigger" ? "Trigger" : "Action"} App`}
                  />
                </div>
              </div>
            )}

            {/* Event Selector Popup */}
            {selecting && selectedApp && (
              <div className="mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <EventSelector
                    events={getEvents(selectedApp, selecting.type)}
                    onSelectEvent={handleSelectEvent}
                    type={selecting.type}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default CreateZap;
