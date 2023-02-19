import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "inversify-react";
import {container} from "./app-ioc";
import { configure } from 'mobx'

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
      <App />
    </Provider>
  </React.StrictMode>
)
