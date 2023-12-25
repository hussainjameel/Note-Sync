import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="fixed top-0 right-0 z-50 w-full">
      {props.alert && (
        <div
          className={`${
            props.alert.type === "success"
              ? "text-sm text-amber-800  border-l-8 border-amber-800 bg-amber-200 rounded-lg p-4"
              : "text-sm text-red-700 border-l-8 border-red-700 bg-red-100 rounded-lg p-4"
          }`}
          role="alert"
        >
          <p className="font-bold ">{capitalize(props.alert.type)}</p>
          <p> {props.alert.msg}.</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
