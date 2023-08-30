import React, { useState } from "react";
import { useContext, useEffect } from "react";

//COMPONENT
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Login() {
  return (
    <div className="flex flex-col w-full lg:flex-row lg:justify-center lg:gap-5">
      <LoginForm />
      <div className="divider lg:divider-horizontal before:bg-primary after:bg-secondary">
        OR
      </div>
      <RegisterForm />
    </div>
  );
}
