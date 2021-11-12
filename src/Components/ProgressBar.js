const ProgressBar = ({ step, handleProgressBarStep }) => {
  return (
    <div className="stepper-wrapper">
      <div
        className={`stepper-item ${step === 1 ? "active" : ""} completed`}
        onClick={() => handleProgressBarStep(1)}
      >
        <div className="step-counter">1</div>
        <div className="step-name">Dane zamówienia</div>
      </div>
      <div
        className={`stepper-item ${step === 2 ? "active" : ""} ${
          step > 1 ? "completed" : ""
        }`}
        onClick={() => handleProgressBarStep(2)}
      >
        <div className="step-counter">2</div>
        <div className="step-name">Dane klienta</div>
      </div>
      <div
        className={`stepper-item ${step === 3 ? "active" : ""} ${
          step > 2 ? "completed" : ""
        }`}
        onClick={() => handleProgressBarStep(3)}
      >
        <div className="step-counter">3</div>
        <div className="step-name">Podsumowanie</div>
      </div>
    </div>
  );
};

export default ProgressBar;
