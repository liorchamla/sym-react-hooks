import React from "react";

const Field = ({
  name,
  children,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error = "",
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label || name}</label>
      <input
        name={name}
        id={name}
        type={type || "text"}
        className={"form-control" + (error && " is-invalid")}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || label || name}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {children}
    </div>
  );
};

export default Field;
