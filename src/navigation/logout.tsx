import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { NavigationPresenter } from "./navigation-presenter";
import { Router } from "../routing";
import { AuthenticationRepository } from "../authentication/authentication-repository";
import { LoginRegisterPresenter } from "../authentication";

export const Logout = observer(({ node }: any) => {
  const loginRegistrationPresenter = useInjection(LoginRegisterPresenter);

  return (
    <>
      <div
        className="navigation-item"
        style={{ backgroundColor: "#2e91fc" }}
        onClick={() => {
          loginRegistrationPresenter.logout();
        }}
      >
        &larr; logout
      </div>
    </>
  );
});
