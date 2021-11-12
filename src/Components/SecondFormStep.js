import Input from "./Input";
import InputRadio from "./InputRadio";
import Buttons from "./Buttons";

const SecondFormStep = ({
  state,
  badValidate,
  handleInput,
  step,
  setStep,
  validateForm,
  tomorrowDate,
  setBadValidate,
}) => {
  const deviceSamePlace = ["Tak", "Nie"];

  const validateStep = (stepId) => {
    const validate = {
      name: false,
      email: false,
      phone: false,
      street: false,
      zipCode: false,
      city: false,
      getBack: false,
      deviceSamePlace: false,
      street2: false,
      zipCode2: false,
      city2: false,
      agreement: false,
    };

    if (state.name === "") validate.name = true;

    if (state.email === "") validate.email = true;

    const regExEmail =
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if (!regExEmail.test(state.email)) validate.email = true;

    if (state.phone === "") validate.phone = true;

    const regExPhoneNumber = /^[0-9\+]{8,13}$/;
    if (!regExPhoneNumber.test(state.phone)) validate.phone = true;

    if (state.street === "") validate.street = true;
    const regExZipCode = /^\d\d-\d\d\d$/;
    if (!regExZipCode.test(state.zipCode)) validate.zipCode = true;

    if (state.city === "") validate.city = true;

    if (state.getBack === "") validate.getBack = true;

    if (
      (state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "Rękojmia") &&
      state.requiresDisassembly === "Tak"
    ) {
      if (state.deviceSamePlace === "") validate.deviceSamePlace = true;
    }

    if (
      (state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "Rękojmia") &&
      state.requiresDisassembly === "Tak" &&
      state.deviceSamePlace === "Nie"
    ) {
      if (state.street2 === "") validate.street2 = true;
      if (!regExZipCode.test(state.zipCode2)) validate.zipCode2 = true;
      if (state.city2 === "") validate.city2 = true;
    }

    if (state.agreement === "") validate.agreement = true;

    setBadValidate({ ...badValidate, ...validate });

    if (
      !validate.name &&
      !validate.email &&
      !validate.phone &&
      !validate.street &&
      !validate.zipCode &&
      !validate.city &&
      !validate.getBack &&
      !validate.agreement
    ) {
      if (
        state.typeOfReturn === "Gwarancja producenta" ||
        (state.typeOfReturn === "Rękojmia" && state.howFinish)
      ) {
        if (state.requiresDisassembly === "Nie") {
          setStep(3);
        } else if (state.requiresDisassembly === "Tak") {
          if (state.deviceSamePlace === "Tak") {
            setStep(3);
          } else if (state.deviceSamePlace === "Nie") {
            if (state.street2 && state.zipCode2 && state.city2) {
              setStep(3);
            }
          }
        }
      } else if (state.typeOfReturn === "Dostałem towar uszkodzony") {
        if (state.isProtocol) {
          setStep(3);
        }
      }
    }
  };
  return (
    <div>
      <Input
        value={state.name}
        name={"name"}
        labelName="Imię i nazwisko lub nazwa firmy"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.name}
        errorMsg={"Podaj imię i nazwisko lub nazwa firmy"}
      />
      <Input
        value={state.email}
        name={"email"}
        labelName="Adres e-mail"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.email}
        errorMsg={"Podaj adres e-mail"}
      />
      <Input
        value={state.phone}
        name={"phone"}
        labelName="Telefon"
        handleInput={handleInput}
        type={"number"}
        validation={badValidate.phone}
        errorMsg={"Podaj telefon kontaktowy"}
      />
      <Input
        value={state.street}
        name={"street"}
        labelName="Ulica i numer domu"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.street}
        errorMsg={"Podaj ulicę i numer domu"}
      />
      <Input
        value={state.zipCode}
        name={"zipCode"}
        labelName="Kod pocztowy"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.zipCode}
        errorMsg={"Podaj kod pocztowy"}
      />
      <Input
        value={state.city}
        name={"city"}
        labelName="Miejscowość"
        handleInput={handleInput}
        type={"text"}
        validation={badValidate.city}
        errorMsg={"Podaj miejscowość"}
      />
      {(state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "Rękojmia") &&
      state.requiresDisassembly === "Tak" ? (
        <InputRadio
          value={state.deviceSamePlace}
          name={"deviceSamePlace"}
          labelName={`Adres urządzenia taki sam jak powyżej?`}
          handleInput={handleInput}
          validation={badValidate.deviceSamePlace}
          options={deviceSamePlace}
          errorMsg={`Podaj adres urządzenia`}
        />
      ) : null}
      {(state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "Rękojmia") &&
      state.requiresDisassembly === "Tak" &&
      state.deviceSamePlace === "Nie" ? (
        <div>
          <div className="return-form__subtitle">Adres urządzenia:</div>
          <Input
            value={state.street2}
            name={"street2"}
            labelName="Ulica i numer domu"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.street2}
            errorMsg={"Podaj ulicę i numer domu"}
          />

          <Input
            value={state.zipCode2}
            name={"zipCode2"}
            labelName="Kod pocztowy"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.zipCode2}
            errorMsg={"Podaj kod pocztowy"}
          />

          <Input
            value={state.city2}
            name={"city2"}
            labelName="Miejscowość"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.city2}
            errorMsg={"Podaj miejscowość"}
          />
        </div>
      ) : null}
      <Input
        value={state.getBack}
        name={"getBack"}
        labelName="Preferowana data odbioru"
        handleInput={handleInput}
        type={"date"}
        validation={badValidate.getBack}
        minValue={tomorrowDate}
        errorMsg={"Podaj preferowaną datę odbioru"}
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

export default SecondFormStep;
