import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { LoginRegisterPresenter, Option } from "./login-registration-presenter";
import { useState } from "react";
import { Messages } from "../core/messages/messages";
import { useValidation, validateInput } from "../core";
import { registrationSchema } from "./registration-validation-schema";
import { ValidationError } from "yup";

export const LoginRegistrationPage = observer((props: any) => {
  const loginRegisterPresenter = useInjection(LoginRegisterPresenter);
  const [clientValidationMessages, updateClientValidationMessages] =
    useValidation();

  const { email, password, option } = loginRegisterPresenter;

  const [loginRegisterFormValues, setLoginRegisterFormValues] = useState<any>({
    email: email ?? "",
    password: password ?? "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRegisterFormValues({
      ...loginRegisterFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormToggle = (option: Option) => {
    loginRegisterPresenter.setOption(option);
    updateClientValidationMessages([]);
  };

  const handleFormSubmission = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      updateClientValidationMessages([]);
      const { email, password } = loginRegisterFormValues;
      validateInput(registrationSchema, loginRegisterFormValues);
      if (option === "login") loginRegisterPresenter.login(email, password);
      if (option === "register")
        loginRegisterPresenter.register(email, password);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        updateClientValidationMessages(error.errors);
      }
    }
  };

  return (
    <>
      <div className="logo">
        <img
          alt="logo"
          style={{ width: 60, filter: "grayscale(100%)" }}
          src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/1537017/settings_images/1UxqoCceShyczTsmzsLy_logo.png"
        />
      </div>
      <div className="option">
        <input
          style={{ backgroundColor: "#e4257d" }}
          type="submit"
          value="login"
          onClick={() => {
            handleFormToggle("login");
          }}
        />
        <input
          style={{ backgroundColor: "#2E91FC" }}
          type="submit"
          value="register"
          onClick={() => {
            handleFormToggle("register");
          }}
        />
      </div>
      <div
        className="login-register"
        style={{
          backgroundColor: option === "login" ? "#E4257D" : "#2E91FC",
        }}
      >
        <form className="login" onSubmit={handleFormSubmission}>
          <label>
            <input
              type="text"
              name="email"
              value={loginRegisterFormValues.email}
              placeholder="Email"
              onChange={handleOnChange}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={loginRegisterFormValues.password}
              placeholder="Password"
              onChange={handleOnChange}
            />
          </label>
          {option === "login" ? (
            <input type="submit" value="login" />
          ) : (
            <input type="submit" value="register" />
          )}
        </form>

        <div
          className="validation-message"
          style={{
            backgroundColor: option === "login" ? "#E4257D" : "#2E91FC",
          }}
        >
          <Messages />
        </div>
      </div>
    </>
  );
});
