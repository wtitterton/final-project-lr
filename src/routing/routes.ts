export interface Route {
    routeId: string | null;
    routeDef: {
    isSecure: boolean;
    path: string | null;
    },
    params?: string;
    query?: string;
    onEnter?: () => void;
    onLeave?: () => void;
     
}

export const routes = [
    {
      routeId: 'homeLink',
      routeDef: {
        path: '/app/home'
      }
    },
    {
      routeId: 'booksLink',
      routeDef: {
        path: '/app/books'
      }
    },
    {
      routeId: 'addBooksLink',
      routeDef: {
        path: '/app/books/add'
      }
    },
    {
      routeId: 'authorsLink',
      routeDef: {
        path: '/app/authors'
      }
    },
    {
      routeId: 'addAuthorsLink',
      routeDef: {
        path: '/app/authors/add'
      }
    },
    {
      routeId: 'authorsPolicyLink',
      routeDef: {
        path: '/app/authors/policy'
      }
    },
    {
      routeId: 'authorsMapLink',
      routeDef: {
        path: '/app/authors/map'
      }
    },
     {
      routeId: 'loginLink',
      routeDef: {
        path: '/app/authentication/login'
      }
    }
  ]