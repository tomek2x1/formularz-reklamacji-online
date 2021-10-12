import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Components/Input";
import Select from "./Components/Select";
import TextArea from "./Components/TextArea";
import InputFile from "./Components/InputFile";
import Agreement from "./Components/Agreement";
import FormFooter from "./Components/FormFooter";

const App = () => {
  const [state, setState] = useState({
    docNumber: "",
    producer: "",
    typeProduct: "",
    quantity: 1,
    typeOfReturn: "",
    buyDate: "",
    howFinish: "",
    getDate: "",
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
    getBack: "",
    agreement: "",
  });

  const [todayDate, setTodayDate] = useState(false);
  const [tomorrowDate, setTomorrowDate] = useState(false);

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
    getDate: "",
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
      getDate: false,
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
      agreement: false,
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
      if (state.buyDate === "") validate.buyDate = true;
      if (state.requiresDisassembly === "") validate.requiresDisassembly = true;
    }

    if (state.typeOfReturn === "Rękojmia") {
      if (state.howFinish === "") validate.howFinish = true;
    }

    if (
      state.typeOfReturn ===
      "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
    ) {
      if (state.getDate === "") validate.getDate = true;
      if (state.isProtocol === "") validate.isProtocol = true;
    }

    if (state.description === "") validate.description = true;

    if (state.name === "") validate.name = true;

    if (state.email === "") validate.email = true;

    const regExEmail =
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if (!regExEmail.test(state.email)) validate.email = true;

    if (state.phone === "") validate.phone = true;

    const regExPhoneNumber = /^[0-9\+]{8,13}$/;
    if (!regExPhoneNumber.test(state.phone)) validate.phone = true;

    if (state.street === "") validate.street = true;

    if (state.zipCode === "") validate.zipCode = true;

    if (state.city === "") validate.city = true;

    if (state.getBack === "") validate.getBack = true;

    if (state.agreement === "") validate.agreement = true;

    setBadValidate({ ...badValidate, ...validate });

    if (
      !validate.docNumber &&
      !validate.producer &&
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
      if (state.typeOfReturn === "Gwarancja producenta") {
        if (!validate.buyDate && !validate.requiresDisassembly) {
          sendForm(state);
        }
      } else if (
        state.typeOfReturn === "Gwarancja producenta" ||
        state.typeOfReturn === "Rękojmia"
      ) {
        if (
          !validate.buyDate &&
          !validate.howFinish &&
          !validate.requiresDisassembly
        ) {
          sendForm(state);
        }
      } else if (
        state.typeOfReturn ===
        "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
      ) {
        if (!validate.getDate && !validate.isProtocol) {
          sendForm(state);
        }
      }
    }
  };

  const applicationType = [
    "Gwarancja producenta",
    "Rękojmia",
    "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)",
  ];

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
      <b>Numer zamówienia lub numer faktury:</b> ${obj.docNumber} <br/>
      <b>Producent:</b> ${obj.producer} <br/>
      <b>Nazwa i model towaru:</b> ${obj.typeProduct} <br/>
      <b>Ilość sztuk:</b> ${obj.quantity} <br/>
      <br/>
      <b>Rodzaj zgłoszenia:</b> ${obj.typeOfReturn} <br/>
      ${
        obj.typeOfReturn === "Gwarancja producenta"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "Rękojmia"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>
          <b>Oczekiwany sposób zakończenia zgłoszenia:</b> ${obj.howFinish} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn ===
        "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
          ? `<b>Data otrzymania towaru:</b> ${obj.getDate} <br/>
            <b>Czy został sporządzony protokół szkody przez kuriera?:</b> ${obj.isProtocol} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "Gwarancja producenta" ||
        obj.typeOfReturn === "Rękojmia"
          ? `<b>Czy produkt wymaga demontażu:</b> ${obj.requiresDisassembly} <br/>`
          : ""
      }
      <br/>
      <b>Opis wady:</b> ${obj.description} <br/>
      <br/>
      <b>Imię i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
      <b>Adres e-mail:</b> ${obj.email} <br/>
      <b>Telefon:</b> ${obj.phone} <br/>
      <br/>
      <b>Ulica:</b> ${obj.street}<br/>
      <b>Kod pocztowy:</b> ${obj.zipCode} <br/>
      <b>Miejscowość:</b> ${obj.city} <br/>
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
          <h2 className="return-form__title">Formularz reklamacji (online)</h2>

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

          <Select
            value={state.typeOfReturn}
            name={"typeOfReturn"}
            labelName="Rodzaj zgłoszenia"
            optionsValue={applicationType}
            handleInput={handleInput}
            validation={badValidate.typeOfReturn}
            errorMsg={"Podaj rodzaj zgłoszenia"}
          />
          {state.typeOfReturn === "Gwarancja producenta" ||
          state.typeOfReturn === "Rękojmia" ? (
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
          ) : null}
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

          {state.typeOfReturn ===
          "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)" ? (
            <div>
              <Input
                value={state.getDate}
                name={"getDate"}
                labelName="Data otrzymania towaru"
                handleInput={handleInput}
                type={"date"}
                validation={badValidate.getDate}
                maxDate={todayDate}
                errorMsg={"Podaj datę otrzymania towaru"}
              />
              <Select
                value={state.isProtocol}
                name={"isProtocol"}
                labelName="Czy został sporządzony protokół szkody przez kuriera?"
                optionsValue={isTrue}
                handleInput={handleInput}
                validation={badValidate.isProtocol}
                errorMsg={"Czy jest sporządzony protokół"}
              />
            </div>
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
            labelName="Dodaj zdjęcia wady"
            handleInput={handleInput}
            validation={badValidate.files}
          />

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
            type={"number"}
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

          <Agreement
            value={state.agreement}
            name={"agreement"}
            handleCheckbox={handleCheckbox}
            validation={badValidate.agreement}
          />

          <div className="return-form__btn-wrapper">
            <button
              className="return-form__btn"
              onClick={(e) => {
                validateForm(e);
              }}
            >
              Wyślij formularz
            </button>
          </div>
          <FormFooter />
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
              Formularz został wysłany poprawnie
            </h2>
            <h3 className="return-message__id">
              Numer Twojego zgłoszenia:
              <strong>{taskNumber}</strong>
            </h3>
            <p className="return-message__remember">
              * Potwierdzenie wysłania formularza znajdziesz na swojej skrzynce
              pocztowej.
            </p>
            <p className="return-message__remember">
              ** Pamiętaj, aby spakować wszystkie elementy zestawu oraz oznaczyć
              paczkę numerem zgłoszenia.
            </p>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div id="return-error" className="return-message return-error">
          <div className="return-message__container">
            <h2 className="return-message__error">
              Podczas wysyłania formularza wystąpił błąd. Spróbuj później.
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
