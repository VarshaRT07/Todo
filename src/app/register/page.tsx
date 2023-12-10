"use client";
import FormInputElement from "@/components/FormInputElement";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [UserNameError, setUserNameError] = useState("");
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "name") {
      setUserNameError(e.target.value.length === 0 ? "User name required" : "");
    }
  };
  const isFormValid =
    (formData.name || "").trim().length > 0 &&
    (formData.email || "").trim().length > 0 &&
    (formData.password || "").trim().length > 0;

  const onHandleSubmit = () => {
    fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        signIn("Credentials", { callbackUrl: "http://localhost:3000/" });
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };
  return (
    <div className="p-4 ">
      <p className="items-center text-center p-2 bg-slate-400 text-lg">
        Log In
      </p>

      <div className="grid bg-slate-200 p-4">
        <FormInputElement
          name="name"
          label="Username"
          value={formData.name ?? ""}
          error={UserNameError}
          onChangeHandler={onInputChange}
        />
        <FormInputElement
          name="email"
          label="Email"
          value={formData.email ?? ""}
          onChangeHandler={onInputChange}
        />
        <FormInputElement
          name="password"
          label="Password"
          value={formData.password ?? ""}
          onChangeHandler={onInputChange}
        />

        <div className="flex justify-end">
          <button
            className="mx-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isFormValid}
            onClick={onHandleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
