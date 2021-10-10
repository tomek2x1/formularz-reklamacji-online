const InputFile = ({
  name,
  value,
  handleInput,
  labelName,
  validation,
  length,
}) => {
  return (
    <label htmlFor="userFile" className="return-form__label">
      <div className="return-form__name">{labelName}:</div>
      <input
        type="file"
        id="userFile"
        name={name}
        value={value}
        onChange={(e) => {
          handleInput(e);
        }}
        multiple
      />
      {length > 0 ? (
        <p className="return-form__require-info">
          Wymagane są pliki w formacie: png, jpg, jpeg
        </p>
      ) : null}
    </label>
  );
};

export default InputFile;
