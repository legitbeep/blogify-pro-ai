import { PropsWithChildren } from "react";
import { Button } from "../ui/button";

const SigninButton = ({ children }: PropsWithChildren) => {
  const AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/authorize`;

  const onLoginClick = () => {
    window.location.href = AUTH_URL;
  };

  return <Button onClick={onLoginClick}>{children}</Button>;
};

export default SigninButton;
