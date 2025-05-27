"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import AppSelector from '@/components/zap/AppSelector';
import EventSelector from '@/components/zap/EventSelector';
import ZapCanvas from '@/components/zap/ZapCanvas';
import { appActions, appTriggers, availableApps } from '@/lib/data';
// Make sure ZapCanvas is exported as a React component that accepts a 'steps' prop.
import { ChevronLeft, PlayIcon, SaveIcon, Zap } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

export type Step = {
  id: string;
  type: "trigger" | "action";
  appId: string;
  eventId: string;
  config: { [key: string]: string };
};
const step = {
  id: "demoId",
  // type: "trigger" | "action",
  // triggerId: string;
  // zapId: string;
  // config: { [key: string]: string };
};

const CreateZap = () => {
  const [zapName, setZapName] = useState(`Untitled Zap`);
  const [steps, setSteps] = useState<Step[]>([]);
  const [selecting, setSelecting] = useState<{ type: "trigger" | "action"; index: number } | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [configuring, setConfiguring] = useState<number | null>(null);

  const handleAddTrigger = () => {
    if (steps.length === 0 || !steps.some(step => step.type === "trigger")) {
      setSelecting({ type: "trigger", index: 0 });
      setSelectedApp(null);
    } else {
      toast("Cannot add another trigger", {
        description: "A Zap can only have one trigger. You can edit the existing trigger instead.",
      });
    }
  };

  const handleAddAction = () => {
    setSelecting({ type: "action", index: steps.length });
    setSelectedApp(null);
  };

  const handleSelectApp = (appId: string) => {
    setSelectedApp(appId);
  };

  const handleSelectEvent = (eventId: string) => {
    if (!selecting || !selectedApp) return;

    const newStep: Step = {
      id: `step-${Date.now()}`,
      type: selecting.type,
      appId: selectedApp,
      eventId: eventId,
      config: {}
    };

    if (selecting.type === "trigger" && steps.some(step => step.type === "trigger")) {
      // Replace the existing trigger
      const newSteps = steps.filter(step => step.type !== "trigger");
      setSteps([newStep, ...newSteps]);
    } else if (selecting.type === "trigger") {
      // Add as the first step
      setSteps([newStep, ...steps.filter(step => step.type !== "trigger")]);
    } else {
      // Add action at the end
      setSteps([...steps, newStep]);
    }

    // Immediately show configuration for the new step
    setSelecting(null);
    setSelectedApp(null);
    setConfiguring(steps.length);

    toast(
      `${selecting.type === "trigger" ? "Trigger" : "Action"} added`,{
              description: `Successfully added a new ${selecting.type === "trigger" ? "trigger" : "action"} to your Zap.`,
    });
  };

  const handleConfigChange = (stepIndex: number, fieldId: string, value: string) => {
    setSteps(currentSteps =>
      currentSteps.map((step, index) =>
        index === stepIndex
          ? { ...step, config: { ...step.config, [fieldId]: value } }
          : step
      )
    );
  };

  const handleConfigDone = () => {
    setConfiguring(null);
    toast(
      "Configuration saved",{
      description: "Your step configuration has been saved.",
    });
  };

  const handleDeleteStep = (index: number) => {
    setSteps(currentSteps => currentSteps.filter((_, i) => i !== index));
    if (configuring === index) {
      setConfiguring(null);
    } else if (configuring !== null && configuring > index) {
      setConfiguring(configuring - 1);
    }

    toast(
      "Step deleted",{
      description: "The step has been removed from your Zap.",
    });
  };

  const handleSaveZap = () => {
    toast(
      "Zap saved",{
      description: "Your Zap has been saved successfully!",
    });
  };

  const handleEditStep = (index: number) => {
    setConfiguring(index);
  };

  const getEvents = (appId: string, type: "trigger" | "action") => {
    return type === "trigger"
      ? appTriggers[appId as keyof typeof appTriggers] || []
      : appActions[appId as keyof typeof appActions] || [];
  };

  const getAppName = (appId: string) => {
    return availableApps.find(app => app.id === appId)?.name || "";
  };

  return (
    <>
        <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

        {/* Header Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              <div className="pl-6 flex items-center space-x-6">
                <Link href="/zaps" className="text-gray-500 hover:text-gray-700 flex items-center text-sm font-medium transition-colors">
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
                <Button variant="outline" size="sm" className="border-gray-300 hover:border-gray-400 transition-all">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Test
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Canvas */}
            <ZapCanvas
              // steps={steps}
              // configuring={configuring}
              // availableApps={availableApps}
              // appTriggers={appTriggers}
              // appActions={appActions}
              // mockConfigFields={mockConfigFields}
              // onAddTrigger={handleAddTrigger}
              // onAddAction={handleAddAction}
              // onEditStep={handleEditStep}
              // onConfigChange={handleConfigChange}
              // onConfigDone={handleConfigDone}
              // onDeleteStep={handleDeleteStep}
            />

            {/* App selection modal */}
            {selecting && !selectedApp && (
              <div className="mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <AppSelector
                    apps={availableApps}
                    onSelectApp={handleSelectApp}
                    title={`Choose ${selecting.type === "trigger" ? "Trigger" : "Action"} App`}
                  />
                </div>
              </div>
            )}

            {/* Event selection modal */}
            {selecting && selectedApp && (
              <div className="mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <EventSelector
                    events={getEvents(selectedApp, selecting.type)}
                    onSelectEvent={handleSelectEvent}
                    appName={getAppName(selectedApp)}
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
  )
}

export default CreateZap