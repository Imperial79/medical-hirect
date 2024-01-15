import React from "react";

export function KButton({
  id,
  onClick,
  type = "button",
  label = "Label",
  labelSize = "sm",
  btnColor = "bg-blue-700",
  labelColor = "white",
  hoverColor = "blue-800",
  focusColor = "blue-300",
  rounded = "full",
  width = "full",
  margin = "",
  className = "",
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className={`text-${labelColor} ${btnColor} hover:${hoverColor} focus:ring-4 focus:outline-none focus:ring-${focusColor} font-medium rounded-${rounded} text-${labelSize} w-${width} sm:w-auto px-5 py-2.5 text-center light:focus:ring-${btnColor} ${margin} ${className}`}
    >
      {label}
    </button>
  );
}

export function TextfieldLabel({ label }) {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
  );
}

export function KTextField({
  label = "label",
  maxLength,
  type = "text",
  id = "",
  name = id,
  pattern = "",
  placeholder = "placeholder",
  required = true,
  value,
  onChange,
  readOnly = false,
  spacing = "[0px]",
  margin = "mb-5",
  actionElement,
}) {
  return (
    <div className={margin}>
      <label
        htmlFor={id}
        className={`${
          label === "" ? "hidden" : ""
        } block mb-2 text-sm font-medium text-gray-900`}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={type}
          id={id}
          name={name}
          maxLength={maxLength}
          className={`shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 tracking-${spacing}`}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        {actionElement === undefined ? (
          <></>
        ) : (
          <div className="ml-2">{actionElement}</div>
        )}
      </div>
    </div>
  );
}

export function KTextArea({
  label = "label",
  maxLength,
  rows = 3,
  type = "text",
  id = "",
  name = id,
  placeholder = "placeholder",
  required = true,
  readOnly = false,
  value,
  onChange,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <textarea
        type={type}
        id={id}
        name={name}
        rows={rows}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function KDropDown({
  id,
  name,
  label = "label",
  children,
  onChange,
  margin = "mb-5",
}) {
  return (
    <div className={margin}>
      <label
        htmlFor={id}
        className={`${
          label === "" ? "hidden" : ""
        } block mb-2 text-sm font-medium text-gray-900`}
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        onChange={onChange}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 inline-flex items-center justify-between w-full text-nowrap"
      >
        {children}
      </select>
    </div>
  );
}

export function KGrid({
  crossAxisCount = 2,
  gap = 5,
  children,
  alignment = "center",
  margin = "mb-5",
}) {
  return (
    <div
      className={`md:grid md:grid-cols-${crossAxisCount} gap-${gap} items-${alignment} ${margin}`}
    >
      {children}
    </div>
  );
}
