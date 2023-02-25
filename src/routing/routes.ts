export interface Route {
  routeId: string | null;
  routeDef: {
    isSecure: boolean;
    path: string | null;
  };
  params?: string;
  query?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const routes = [
  {
    routeId: "homeLink",
    routeDef: {
      path: "/app/home",
      isSecure: true,
    },
  },
  {
    routeId: "booksLink",
    routeDef: {
      path: "/app/books",
      isSecure: true,
    },
  },
  {
    routeId: "addBooksLink",
    routeDef: {
      path: "/app/books/add",
      isSecure: true,
    },
  },
  {
    routeId: "authorsLink",
    routeDef: {
      path: "/app/authors",
      isSecure: true,
    },
  },
  {
    routeId: "addAuthorsLink",
    routeDef: {
      path: "/app/authors/add",
      isSecure: true,
    },
  },
  {
    routeId: "authorsPolicyLink",
    routeDef: {
      path: "/app/authors/policy",
      isSecure: true,
    },
  },
  {
    routeId: "authorsMapLink",
    routeDef: {
      path: "/app/authors/map",
      isSecure: true,
    },
  },
  {
    routeId: "loginLink",
    routeDef: {
      path: "/app/authentication/login",
      isSecure: false,
    },
  },
  {
    routeId: "default",
    routeDef: {
      path: "*",
      isSecure: false,
    },
    onEnter: () => {},
  },
];
