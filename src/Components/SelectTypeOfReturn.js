import { useState, useEffect } from "react";

const SelectTypeOfReturn = ({
  name,
  value,
  handleInput,
  labelName,
  validation,
  errorMsg,
  buyDate,
}) => {
  useEffect(() => {
    getDate7DaysAgo();
  }, [buyDate]);

  const [showThirdOption, setShowThirdOption] = useState(false);

  const getDate7DaysAgo = () => {
    if (buyDate) {
      const subtrNowAnd7Ago =
        Date.now() - new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
      const subtrNowAndUserBuyAgo = Date.now() - new Date(buyDate);
      if (subtrNowAndUserBuyAgo - subtrNowAnd7Ago > 0) {
        setShowThirdOption(false);
      } else {
        setShowThirdOption(true);
      }
    }
  };

  return (
    <label
      htmlFor={name}
      className={
        validation
          ? "return-form__label return-form__require"
          : "return-form__label"
      }
    >
      <div className="return-form__name">
        {labelName}: <span className="return-form__star">*</span>
      </div>
      <select
        id={name}
        value={value}
        name={name}
        onChange={(e) => {
          handleInput(e);
        }}
        className="require return-form__field"
      >
        <option value="" defaultValue readOnly>
          Wybierz
        </option>
        <option value="Gwarancja producenta">Gwarancja producenta</option>
        <option value="Rękojmia">Rękojmia</option>
        {showThirdOption ? (
          <option value="Dostałem towar uszkodzony">
            Dostałem towar uszkodzony
          </option>
        ) : null}
      </select>
      {validation ? (
        <p className="return-form__require-info">{errorMsg}</p>
      ) : null}
    </label>
  );
};

export default SelectTypeOfReturn;
