"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft, PlayIcon, SaveIcon, Zap } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AppSelector from "@/components/zap/AppSelector";
import EventSelector from "@/components/zap/EventSelector";
import ZapCanvas from "@/components/zap/ZapCanvas";

import { availableActions, availableTrigger} from "@/lib/data";

export type Step = {
  id: string;
  type: "trigger" | "action";
  appId: string;
  eventId: string;
  config: { [key: string]: string };
};

const CreateZap = () => {
  const [zapName, setZapName] = useState("Untitled Zap");
  const [steps, setSteps] = useState<Step[]>([]);
  const [selecting, setSelecting] = useState<{ type: "trigger" | "action"; index: number } | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [configuring, setConfiguring] = useState<number | null>(null);

  const showToast = (title: string, description: string) => {
    toast(title, { description });
  };

  const handleAddTrigger = () => {
    if (!steps.some(step => step.type === "trigger")) {
      setSelecting({ type: "trigger", index: 0 });
      setSelectedApp(null);
    } else {
      showToast("Cannot add another trigger", "A Zap can only have one trigger.");
    }
  };

  const handleAddAction = () => {
    setSelecting({ type: "action", index: steps.length });
    setSelectedApp(null);
  };

  const handleSelectApp = useCallback((appId: string) => {
    setSelectedApp(appId);
  }, []);

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
        ? [newStep, ...steps.filter(step => step.type !== "trigger")]
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

  const handleConfigChange = (stepIndex: number, fieldId: string, value: string) => {
    setSteps(prev =>
      prev.map((step, index) =>
        index === stepIndex ? { ...step, config: { ...step.config, [fieldId]: value } } : step
      )
    );
  };

  const handleConfigDone = () => {
    setConfiguring(null);
    showToast("Configuration saved", "Your step configuration has been saved.");
  };

  const handleSaveZap = () => {
    showToast("Zap saved", "Your Zap has been saved successfully!");
  };

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
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="container py-6">
            <div className="flex items-center justify-between">
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
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Test
                </Button>
                <Button size="sm" onClick={handleSaveZap} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ZapCanvas
              steps={steps}
              configuring={configuring}
              appTriggers={availableTrigger}
              appActions={availableActions}
              onAddTrigger={handleAddTrigger}
              onAddAction={handleAddAction}
              onConfigChange={handleConfigChange}
              onConfigDone={handleConfigDone}
            />

            {/* App selection */}
            {selecting && !selectedApp && (
              <div className="mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <AppSelector
                    // apps={availableApps}
                    // onSelectApp={handleSelectApp}
                    // title={`Choose ${selecting.type === "trigger" ? "Trigger" : "Action"} App`}
                  />
                </div>
              </div>
            )}

            {/* Event selection */}
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
