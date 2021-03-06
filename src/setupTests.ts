// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

//https://hceris.com/jest-fail-test-if-unexpected-network-request-happens/

// const spies = {
//   fetch: jest.spyOn(window, "fetch"),
// };

// beforeEach(() => {
//   jest.resetAllMocks();
// });

// afterEach(() => {
//   expect(spies.fetch).not.toHaveBeenCalled();
// });

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

//mock out Ant Design Forms
//https://github.com/ant-design/ant-design/issues/21096
Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});
