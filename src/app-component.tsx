import * as React from "react";
import { observer } from "mobx-react";
import { AppPresenter } from "./app-presenter";
import { Home } from "./home";
import { LoginRegistrationPage } from "./authentication";
import { useInjection } from "inversify-react";
import { Navigation } from "./navigation";
import { AddBooks, Books } from "./books";
import { AddAuthors, Authors, Map, Policy } from "./authors";

export const AppComponent = observer((props: any) => {
  const appPresenter = useInjection(AppPresenter);

  React.useEffect(() => {
    appPresenter.load(() => {});
  }, []);

  const renderedComponents = [
    {
      id: "homeLink",
      component: <Home key="home" />,
    },
    {
      id: "booksLink",
      component: <Books key="booksLink" />,
    },
    {
      id: "addBooksLink",
      component: <AddBooks key="addBooksLink" />,
    },
    {
      id: "authorsLink",
      component: <Authors key="authorsLink" />,
    },
    {
      id: "addAuthorsLink",
      component: <AddAuthors key="addAuthorsLink" />,
    },
    {
      id: "authorsPolicyLink",
      component: <Policy key="authorsPolicyLink" />,
    },
    {
      id: "authorsMapLink",
      component: <Map key="authorsMapLink" />,
    },
  ];

  return (
    <div>
      {appPresenter.currentRoute.routeId === "loginLink" ? (
        <div>
          <LoginRegistrationPage />
        </div>
      ) : (
        <div className="container">
          <div className="left">
            <Navigation />
          </div>
          <div className="right">
            {renderedComponents.map((current) => {
              return (
                appPresenter.currentRoute.routeId === current.id &&
                current.component
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
