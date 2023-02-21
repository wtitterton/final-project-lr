import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "inversify-react";
import {container} from "./app-ioc";
import { configure } from 'mobx'
import { ValidationProvider } from './core';
import {AppComponent} from './app-component';
import './App.css'

configure({
  enforceActions: 'never',
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider container={container}>
       <ValidationProvider>
          <AppComponent />
       </ValidationProvider>
      
    </Provider>
  </React.StrictMode>
)
