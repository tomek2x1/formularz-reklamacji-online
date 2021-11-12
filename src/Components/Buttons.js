import React from "react";

const Buttons = ({ step, setStep, validateStep, validateForm }) => {
  return (
    <div
      className={`step-buttons ${
        step === 1 ? "step-buttons__firstStep" : null
      }`}
    >
      <button
        className={`step-buttons__button step-buttons__button--prev ${
          step === 1 ? "step-buttons__button--hide" : null
        }`}
        onClick={() => setStep(step - 1)}
      >
        Wstecz
      </button>
      {step !== 3 ? (
        <button
          className="step-buttons__button"
          onClick={() => validateStep(step)}
        >
          Dalej
        </button>
      ) : (
        <button
          className="step-buttons__button"
          onClick={(e) => {
            validateForm(e);
          }}
        >
          Wyślij formularz
        </button>
      )}
    </div>
  );
};

export default Buttons;
