import React from "react";
import LoginForm from "./_components/loginform";

const Login = () => {
  return (
    <>
      <div className="flex justify-center m-8">
        <div className="border-2 border-solid border-black">
          <div className="m-3 p-3">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
