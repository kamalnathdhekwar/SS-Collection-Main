import { Fragment } from "react";
import { Check } from "lucide-react";

/**
 * Checkout Progress Stepper
 * Displays the current step in the checkout process
 */
const CheckoutStepper = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { number: 1, title: "Order Summary", key: "summary" },
    { number: 2, title: "Payment", key: "payment" },
    { number: 3, title: "Success", key: "success" },
  ];

  return (
    <div className="w-full bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Desktop stepper */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => (
            <Fragment key={step.key}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : currentStep === step.number
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-300 bg-white text-slate-300"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </div>
                <p
                  className={`mt-2 text-xs sm:text-sm font-semibold text-center transition-colors duration-300 ${
                    currentStep >= step.number ? "text-slate-950" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                    currentStep > step.number ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile stepper */}
        <div className="sm:hidden">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <Fragment key={step.key}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-emerald-500 text-white"
                      : currentStep === step.number
                      ? "bg-slate-950 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 transition-colors duration-300 ${
                      currentStep > step.number ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-600">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
