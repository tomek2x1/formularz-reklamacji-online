import Input from "./Input";
import Select from "./Select";
import SelectTypeOfReturn from "./SelectTypeOfReturn";
import TextArea from "./TextArea";
import InputFile from "./InputFile";
import Buttons from "./Buttons";

const FirstFormStep = ({
  state,
  badValidate,
  handleInput,
  todayDate,
  step,
  setStep,
  validateForm,
  setBadValidate,
}) => {
  const howFinishApplication = [
    "Naprawa towaru",
    "Wymiana towaru na nowy",
    "Obniżenie ceny towaru",
    "Odstąpienie od umowy (istotna wada towaru)",
  ];
  const isTrue = ["Tak", "Nie"];

  const producer = [
    "Blaupunkt",
    "Climative",
    "Danfoss",
    "Devi",
    "Digitime",
    "Dimplex",
    "Ebeco",
    "Eberle",
    "Emko",
    "Esco",
    "Nexans",
    "Rotenso",
    "Sonniger",
    "Thermoval",
    "Vaco",
    "Warmtec",
    "Inny",
  ];

  const validateStep = (stepId) => {
    const validate = {
      docNumber: false,
      producer: false,
      typeProduct: false,
      quantity: false,
      buyDate: false,
      typeOfReturn: false,
      howFinish: false,
      isProtocol: false,
      requiresDisassembly: false,
      description: false,
    };

    if (state.docNumber === "") validate.docNumber = true;

    if (state.producer === "") validate.producer = true;

    if (state.typeProduct === "") validate.typeProduct = true;

    if (state.quantity === "" || state.quantity < 0) validate.quantity = true;

    if (state.typeOfReturn === "") validate.typeOfReturn = true;

    if (
      state.typeOfReturn === "Gwarancja producenta" ||
      state.typeOfReturn === "Rękojmia"
    ) {
      if (state.requiresDisassembly === "") validate.requiresDisassembly = true;
    }

    if (state.buyDate === "") validate.buyDate = true;

    if (state.typeOfReturn === "Rękojmia") {
      if (state.howFinish === "") validate.howFinish = true;
    }

    if (state.typeOfReturn === "Dostałem towar uszkodzony") {
      if (state.isProtocol === "") validate.isProtocol = true;
    }

    if (state.description === "") validate.description = true;

    setBadValidate({ ...badValidate, ...validate });

    if (
      !validate.docNumber &&
      !validate.producer &&
      !validate.buyDate &&
      !validate.typeProduct &&
      !validate.quantity &&
      !validate.typeOfReturn &&
      !validate.description
    ) {
      setStep(2);
    }
  };
  return (
    <div>
      <Input
        value={state.docNumber}
        name={"docNumber"}
        labelName="Numer zamówienia lub numer faktury"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.docNumber}
        errorMsg={"Podaj numer zamówienia lub numer faktury"}
      />
      <Select
        value={state.producer}
        optionsValue={producer}
        name={"producer"}
        labelName="Producent"
        handleInput={handleInput}
        validation={badValidate.producer}
        errorMsg={"Podaj nazwę producenta"}
      />
      <Input
        value={state.typeProduct}
        name={"typeProduct"}
        labelName="Nazwa i model towaru"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.typeProduct}
        errorMsg={"Podaj nazwę i model towaru"}
      />
      <Input
        value={state.quantity}
        name={"quantity"}
        labelName="Ilość sztuk"
        handleInput={handleInput}
        type={"number"}
        minValue={1}
        validation={badValidate.quantity}
        errorMsg={"Podaj ilość"}
      />
      <Input
        value={state.buyDate}
        name={"buyDate"}
        labelName="Data zakupu"
        handleInput={handleInput}
        type={"date"}
        validation={badValidate.buyDate}
        maxDate={todayDate}
        errorMsg={"Podaj datę zakupu"}
      />
      <SelectTypeOfReturn
        value={state.typeOfReturn}
        name={"typeOfReturn"}
        labelName="Rodzaj zgłoszenia"
        handleInput={handleInput}
        validation={badValidate.typeOfReturn}
        errorMsg={"Podaj rodzaj zgłoszenia"}
        buyDate={state.buyDate}
      />
      {state.typeOfReturn === "Rękojmia" ? (
        <Select
          value={state.howFinish}
          name={"howFinish"}
          labelName="Oczekiwany sposób zakończenia zgłoszenia"
          optionsValue={howFinishApplication}
          handleInput={handleInput}
          validation={badValidate.howFinish}
          errorMsg={"Podaj sposób zakończenia zgłoszenia"}
        />
      ) : null}
      {state.typeOfReturn === "Dostałem towar uszkodzony" ? (
        <Select
          value={state.isProtocol}
          name={"isProtocol"}
          labelName="Czy został sporządzony protokół szkody przez kuriera?"
          optionsValue={isTrue}
          handleInput={handleInput}
          validation={badValidate.isProtocol}
          errorMsg={"Czy jest sporządzony protokół"}
        />
      ) : null}
      {state.typeOfReturn === "Gwarancja producenta" ||
      state.typeOfReturn === "Rękojmia" ? (
        <Select
          value={state.requiresDisassembly}
          name={"requiresDisassembly"}
          labelName="Czy produkt wymaga demontażu"
          optionsValue={isTrue}
          handleInput={handleInput}
          validation={badValidate.requiresDisassembly}
          errorMsg={"Czy produkt wymaga demontażu"}
        />
      ) : null}
      <TextArea
        value={state.description}
        name={"description"}
        labelName="Opis wady"
        handleInput={handleInput}
        validation={badValidate.description}
        errorMsg={"Podaj opis wady"}
      />
      <InputFile
        value={state.files}
        name={"files"}
        length={state.files.length}
        labelName={
          state.isProtocol === "Tak"
            ? "Dodaj zdjęcia wady i skan protokołu szkody"
            : "Dodaj zdjęcia wady"
        }
        handleInput={handleInput}
        validation={badValidate.files}
      />
      <Buttons
        step={step}
        setStep={setStep}
        validateStep={validateStep}
        validateForm={validateForm}
      />
    </div>
  );
};

export default FirstFormStep;
