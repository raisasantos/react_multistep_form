import { useState } from "react";

export function useForm(steps) {
    const [currentStep, setCurrentStep] = useState(0);

    function changeStep(i, e) {
        if(e) e.preventDefault();

        if(i < 0 || i >= steps.length) return;

        setCurrentStep(i);
    }

    return {
        currentStep,//0
        currentComponent: steps[currentStep],//componentes(steps) na posição 0(currentStep)
        changeStep,//função que modifica o valor do currentstep
        isLastStep: currentStep + 1 === steps.length ? true : false
    }
}