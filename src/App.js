import React, { useState, useEffect } from "react";

import "./App.css";

import Agreement from "./Components/Agreement";
import FormFooter from "./Components/FormFooter";
import Buttons from "./Components/Buttons";
import FirstFormStep from "./Components/FirstFormStep";
import SecondFormStep from "./Components/SecondFormStep";

import ProgressBar from "./Components/ProgressBar";

const App = () => {
  const [state, setState] = useState({
    docNumber: "",
    producer: "",
    typeProduct: "",
    quantity: 1,
    typeOfReturn: "",
    buyDate: "",
    howFinish: "",
    isProtocol: "",
    requiresDisassembly: "",
    description: "",
    files: [],
    name: "",
    email: "",
    phone: "",
    street: "",
    zipCode: "",
    city: "",
    deviceSamePlace: "",
    street2: "",
    zipCode2: "",
    city2: "",
    getBack: "",
    agreement: "",
  });

  const [todayDate, setTodayDate] = useState(false);
  const [tomorrowDate, setTomorrowDate] = useState(false);

  const [step, setStep] = useState(1);

  const handleProgressBarStep = (id) => {
    if (id < step) {
      setStep(id);
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const tomorrow = today.getDate() + 1;
    const todayDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    const tomorrowDate = `${year}-${month < 10 ? `0${month}` : month}-${
      tomorrow < 10 ? `0${tomorrow}` : tomorrow
    }`;
    setTodayDate(todayDate);
    setTomorrowDate(tomorrowDate);
  };

  const [badValidate, setBadValidate] = useState({
    docNumber: "",
    producer: "",
    typeProduct: "",
    quantity: "",
    typeOfReturn: "",
    buyDate: "",
    howFinish: "",
    isProtocol: "",
    requiresDisassembly: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    street: "",
    zipCode: "",
    city: "",
    getBack: "",
    deviceSamePlace: "",
    street2: "",
    zipCode2: "",
    city2: "",
    agreement: "",
  });

  const [showForm, setShowForm] = useState(true);

  const [showSpinner, setShowSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);

  const [taskNumber, setTaskNumber] = useState("");

  const validateForm = (e) => {
    const validate = {
      docNumber: false,
      producer: false,
      typeProduct: false,
      quantity: false,
      typeOfReturn: false,
      buyDate: false,
      howFinish: false,
      isProtocol: false,
      requiresDisassembly: false,
      description: false,
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
        state.typeOfReturn === "R??kojmia") &&
      state.requiresDisassembly === "Tak"
    ) {
      if (state.deviceSamePlace === "") validate.deviceSamePlace = true;
    }

    if (
      (state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "R??kojmia") &&
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
      !validate.docNumber &&
      !validate.producer &&
      !validate.buyDate &&
      !validate.typeProduct &&
      !validate.quantity &&
      !validate.typeOfReturn &&
      !validate.description &&
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
        (state.typeOfReturn === "R??kojmia" && state.howFinish)
      ) {
        if (
          !validate.requiresDisassembly &&
          state.requiresDisassembly === "Nie"
        ) {
          sendForm(state);
        } else if (state.requiresDisassembly === "Tak") {
          if (state.deviceSamePlace === "Tak") {
            sendForm(state);
          } else if (state.deviceSamePlace === "Nie") {
            if (state.street2 && state.zipCode2 && state.city2) {
              sendForm(state);
            }
          }
        }
      } else if (state.typeOfReturn === "Dosta??em towar uszkodzony") {
        if (!validate.isProtocol) {
          sendForm(state);
        }
      }
    }
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleCheckbox = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const sendForm = (obj) => {
    setShowForm(false);
    setShowSpinner(true);

    const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
    const body = {
      subject: "Reklamacja (online)",
      description: `
      <h4>Reklamacja (online)</h4>
      <b>Numer zam??wienia lub numer faktury:</b> ${obj.docNumber} <br/>
      <b>Producent:</b> ${obj.producer} <br/>
      <b>Nazwa i model towaru:</b> ${obj.typeProduct} <br/>
      <b>Ilo???? sztuk:</b> ${obj.quantity} <br/>
      <br/>
      <b>Rodzaj zg??oszenia:</b> ${obj.typeOfReturn} <br/>
      ${
        obj.typeOfReturn === "Gwarancja producenta"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "R??kojmia"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>
          <b>Oczekiwany spos??b zako??czenia zg??oszenia:</b> ${obj.howFinish} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "Dosta??em towar uszkodzony"
          ? `<b>Czy zosta?? sporz??dzony protok???? szkody przez kuriera?:</b> ${obj.isProtocol} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "Gwarancja producenta" ||
        obj.typeOfReturn === "R??kojmia"
          ? `<b>Czy produkt wymaga demonta??u:</b> ${obj.requiresDisassembly} <br/>`
          : ""
      }
      <br/>
      <b>Opis wady:</b> ${obj.description} <br/>
      <br/>
      <b>Imi?? i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
      <b>Adres e-mail:</b> ${obj.email} <br/>
      <b>Telefon:</b> ${obj.phone} <br/>
      <br/>
      <b>Ulica:</b> ${obj.street}<br/>
      <b>Kod pocztowy:</b> ${obj.zipCode} <br/>
      <b>Miejscowo????:</b> ${obj.city} <br/>
      ${
        obj.typeOfReturn === "Gwarancja producenta" ||
        obj.typeOfReturn === "R??kojmia"
          ? `<b>Adres urz??dzenia taki sam jak adres powy??ej:</b> ${obj.deviceSamePlace} <br/>`
          : ""
      }

      ${
        (obj.typeOfReturn === "Gwarancja producenta" ||
          obj.typeOfReturn === "R??kojmia") &&
        obj.requiresDisassembly === "Tak" &&
        obj.deviceSamePlace === "Nie"
          ? `<b>Adres urz??dzenia: 
          Ulica: </b> ${obj.street2} <br/>
          <b>Kod pocztowy: </b> ${obj.zipcode} <br/>
          <b>Miejscowo????: </b> ${obj.zipcode} <br/>
          `
          : ""
      }
      <br/>
      <b>Preferowana data odbioru:</b> ${obj.getBack} <br/>
      `,
      email: obj.email,
      phone: obj.phone,
      priority: 1,
      status: 2,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "VHE3djNOUEFwUWFSNXhscG80Zg==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then(function (data) {
        if (data.id) {
          setShowSpinner(false);
          setShowSuccess(true);
          setTaskNumber(data.id);
        } else {
          setShowSpinner(false);
          setShowError(true);
        }
      })
      .catch(function (error) {
        setShowSpinner(false);
        setShowError(true);
        console.log(error);
      });
  };

  return (
    <div className="return">
      {showForm ? (
        <div id="return-form" className="return-form">
          <h2 className="return-form__title">Formularz reklamacji</h2>
          <ProgressBar
            step={step}
            handleProgressBarStep={handleProgressBarStep}
          />
          {step === 1 ? (
            <FirstFormStep
              state={state}
              badValidate={badValidate}
              handleInput={handleInput}
              todayDate={todayDate}
              step={step}
              setStep={setStep}
              validateForm={validateForm}
              setBadValidate={setBadValidate}
            />
          ) : null}

          {step === 2 ? (
            <SecondFormStep
              state={state}
              badValidate={badValidate}
              handleInput={handleInput}
              step={step}
              setStep={setStep}
              validateForm={validateForm}
              tomorrowDate={tomorrowDate}
              setBadValidate={setBadValidate}
            />
          ) : null}
          {step === 3 ? (
            <div>
              <Agreement
                value={state.agreement}
                name={"agreement"}
                handleCheckbox={handleCheckbox}
                validation={badValidate.agreement}
              />
              <Buttons
                step={step}
                setStep={setStep}
                validateForm={validateForm}
              />
              <FormFooter />
            </div>
          ) : null}
        </div>
      ) : null}
      {showSpinner ? (
        <div id="return-spinner" className="return-spinner">
          <div className="return-spinner__container">
            <div className="return-spinner__wrapper">
              <div className="return-spinner-circle1 return-spinner-circle"></div>
              <div className="return-spinner-circle2 return-spinner-circle"></div>
              <div className="return-spinner-circle3 return-spinner-circle"></div>
              <div className="return-spinner-circle4 return-spinner-circle"></div>
              <div className="return-spinner-circle5 return-spinner-circle"></div>
              <div className="return-spinner-circle6 return-spinner-circle"></div>
              <div className="return-spinner-circle7 return-spinner-circle"></div>
              <div className="return-spinner-circle8 return-spinner-circle"></div>
              <div className="return-spinner-circle9 return-spinner-circle"></div>
              <div className="return-spinner-circle10 return-spinner-circle"></div>
              <div className="return-spinner-circle11 return-spinner-circle"></div>
              <div className="return-spinner-circle12 return-spinner-circle"></div>
            </div>
          </div>
        </div>
      ) : null}
      {showSuccess ? (
        <div id="return-message" className="return-message">
          <div className="return-message__container">
            <h2 className="return-message__success">
              Formularz zosta?? wys??any poprawnie
            </h2>
            <h3 className="return-message__id">
              Numer Twojego zg??oszenia: <strong>{taskNumber}</strong>
            </h3>
            <p className="return-message__remember">
              * Potwierdzenie wys??ania formularza znajdziesz na swojej skrzynce
              pocztowej.
            </p>
            <p className="return-message__remember">
              ** Pami??taj, aby spakowa?? wszystkie elementy zestawu oraz oznaczy??
              paczk?? numerem zg??oszenia.
            </p>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div id="return-error" className="return-message return-error">
          <div className="return-message__container">
            <h2 className="return-message__error">
              Podczas wysy??ania formularza wyst??pi?? b????d. Spr??buj p????niej.
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
