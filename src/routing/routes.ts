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
        path: '/app/home',
        isSecure: false
      }
    },
    {
      routeId: 'booksLink',
      routeDef: {
        path: '/app/books',
        isSecure: false
      }
    },
    {
      routeId: 'addBooksLink',
      routeDef: {
        path: '/app/books/add',
        isSecure: false
      }
    },
    {
      routeId: 'authorsLink',
      routeDef: {
        path: '/app/authors',
        isSecure: false
      }
    },
    {
      routeId: 'addAuthorsLink',
      routeDef: {
        path: '/app/authors/add',
        isSecure: false
      }
    },
    {
      routeId: 'authorsPolicyLink',
      routeDef: {
        path: '/app/authors/policy',
        isSecure: true
      }
    },
    {
      routeId: 'authorsMapLink',
      routeDef: {
        path: '/app/authors/map',
        isSecure: false
      }
    },
     {
      routeId: 'loginLink',
      routeDef: {
        path: '/app/authentication/login',
        isSecure: false
      }
    },
     {
      routeId: 'default',
      routeDef: {
        path: '*',
        isSecure: false
      },
      onEnter: () => {}
    }
    
  ]