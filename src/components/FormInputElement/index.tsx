"use client";

import { ChangeEventHandler, useId } from "react";

export default function FormInputElement({
  label,
  value,
  name,
  warningMessage,
  message,
  error,
  onChangeHandler,
  bordered = false,
  editable = true,
}: {
  label: string;
  value: string;
  name: string;
  warningMessage?: string;
  message?: string;
  error?: string;
  onChangeHandler: ChangeEventHandler;
  bordered?: boolean;
  editable?: boolean;
}) {
  const inputHintId = useId();

  return (
    <div className="mb-6 md:flex md:items-center">
      <div className="md:w-1/3">
        <label
          className="mb-1 block pr-4 text-lg text-black md:mb-0 md:text-right"
          htmlFor={inputHintId}
        >
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className={`w-full appearance-none rounded bg-white px-4 py-2 leading-tight text-gray-700 focus:border-primary focus:bg-white focus:outline-none ${
            bordered && editable ? "border border-gray-300" : ""
          }`}
          required
          id={inputHintId}
          name={name}
          type="text"
          value={value}
          onChange={onChangeHandler}
          disabled={!editable}
          data-testid={name}
        />
        {message && <div className="text-xs text-gray-500 mt-3">{message}</div>}
        {warningMessage && (
          <div className="text-xs text-amber-500 mt-2">{warningMessage}</div>
        )}
        {error && <div className="text-xs text-red-500 ">{error}</div>}
      </div>
    </div>
  );
}
