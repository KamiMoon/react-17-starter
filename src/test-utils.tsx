import React from "react";
import { render as rtlRender } from "@testing-library/react";
//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
// Import your own reducer
import rootReducer from "./redux/rootReducer";
import { MemoryRouter } from "react-router-dom";
import { Router } from "react-router-dom";

function render(
  ui: JSX.Element,
  {
    initialState,
    //store = createStore(rootReducer, initialState),

    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    let routerWrappedComponent = <MemoryRouter>{children}</MemoryRouter>;

    if (renderOptions.history) {
      routerWrappedComponent = (
        <Router history={renderOptions.history}>{children}</Router>
      );
    }

    return <Provider store={store}>{routerWrappedComponent}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
