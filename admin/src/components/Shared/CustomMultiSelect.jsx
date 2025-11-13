import React from "react";
import Select from "react-select";

const CustomMultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  isMulti = true,
  isClearable = true,
  isSearchable = true,
  label,
  className = "",
}) => {
  return (
    <div className={`custom-multiselect ${className}`}>
      {label && <label className="form-label fw-semibold">{label}</label>}

      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CustomMultiSelect;
