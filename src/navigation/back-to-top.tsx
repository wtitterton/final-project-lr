import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { NavigationPresenter } from "./navigation-presenter";

export const BackToTop = observer(({ node }: any) => {
  const navigationPresenter = useInjection(NavigationPresenter);

  return (
    <>
      <div
        className="navigation-item"
        style={{ backgroundColor: "#2e91fc" }}
        onClick={() => {
          navigationPresenter.back();
        }}
      >
        &uarr; Top
      </div>
    </>
  );
});
