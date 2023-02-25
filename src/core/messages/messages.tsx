import * as React from "react";
import { observer } from "mobx-react";
import { MessagesPresenter } from "./";

import { useInjection } from "inversify-react";
import { useValidation } from "../providers";

export const Messages = observer(() => {
  let [uiMessages] = useValidation();
  const messagesPresenter = useInjection(MessagesPresenter);

  return (
    <>
      {messagesPresenter.messages &&
        messagesPresenter.messages.map((item: string, i: number) => {
          return (
            <div style={{ backgroundColor: "red" }} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}
      {uiMessages &&
        uiMessages.map((item: string, i: number) => {
          return (
            <div style={{ backgroundColor: "orange" }} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}
    </>
  );
});
