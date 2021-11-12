import React, { useState } from "react";

const InputFile = ({
  name,
  value,
  handleInput,
  labelName,
  validation,
  length,
}) => {
  const [fileNumbers, setFileNumbers] = useState(0);

  const localFilesValid = (e) => {
    const files = e.target.files;
    setFileNumbers(files.length);
  };

  return (
    <label htmlFor="userFile" className="return-form__label">
      <div className="return-form__name">{labelName}:</div>
      <input
        type="file"
        id="userFile"
        onChange={(e) => {
          localFilesValid(e);
        }}
        multiple
      />
      {fileNumbers > 5 ? (
        <p className="return-form__require-info">
          Maksymalna liczba plików wynosi: 5
        </p>
      ) : null}
    </label>
  );
};

export default InputFile;
