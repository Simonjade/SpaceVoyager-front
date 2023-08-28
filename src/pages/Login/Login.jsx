import React, { useState } from "react";
import { useContext, useEffect } from "react";

//COMPONENT
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Login() {
  return (
    <div className="flex flex-col w-full lg:flex-row">
      <LoginForm />
      <div className="flex justify-center flex-row">
        <div className="divider lg:divider-horizontal place-content-center font-bold"></div>
        <div className="">OR</div>
        <div className="divider lg:divider-horizontal place-content-center font-bold"></div>
      </div>
      <RegisterForm />
    </div>
  );
}
