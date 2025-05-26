import React from 'react'
import { Button } from '../ui/button'
import { PlusIcon, Zap } from 'lucide-react'
import StepCard from './StepCard';

type Step = {
    id: string;
    type: "trigger" | "action";
    appId: string;
    eventId: string;
    config: { [key: string]: string };
  };

const ZapCanvas = (
    // steps: Step[]
) => {
    const steps = [{
        id:1
    }]
    if (steps.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="max-w-lg mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <Zap className="h-8 w-8 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Build your first Zap</h2>
                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        Connect your favorite apps and automate your workflow in minutes.
                    </p>
                    <Button
                        // onClick={onAddTrigger}
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <PlusIcon className="mr-3 h-5 w-5" />
                        Add a Trigger
                    </Button>
                </div>
            </div>
        );
      }
  return (
    <div>
          <div className="space-y-6">
              {/* Steps flow */}
              <div className="relative">
                  {steps.map((step, index) => (
                      <div key={step.id} className="relative">
                          {/* Step card */}
                          <StepCard
                            //   index={index}
                            //   step={step}
                            //   isConfiguring={configuring === index}
                            //   configFields={mockConfigFields[step.eventId] || []}
                            //   availableApps={availableApps}
                            //   eventName={getEventName(step)}
                            //   eventDescription={getEventDescription(step)}
                            //   onEdit={() => onEditStep(index)}
                            //   onConfigChange={(fieldId, value) => onConfigChange(index, fieldId, value)}
                            //   onConfigDone={onConfigDone}
                            //   onDelete={step.type === "action" ? () => onDeleteStep(index) : undefined}
                          />

                          {/* Connection line between steps */}
                          {index < steps.length - 1 && (
                              <div className="flex justify-center py-3">
                                  <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>

              {/* Add action button */}
              <div className="flex justify-center pt-6">
                  <Button
                      variant="outline"
                    //   onClick={onAddAction}
                      className="border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-600 hover:text-orange-600 px-8 py-4 rounded-xl font-medium transition-all hover:shadow-md"
                  >
                      <PlusIcon className="mr-3 h-5 w-5" />
                      Add Action
                  </Button>
              </div>
          </div>
    </div>
  )
}

export default ZapCanvas