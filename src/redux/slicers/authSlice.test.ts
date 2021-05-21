import { store } from "redux/store";
import { logout, login } from "./authSlice";

test("logs out", () => {
    let state = store.getState();

    expect(state.auth.token).toBe('');

    store.dispatch(logout());

    state = store.getState();

    expect(state.auth.token).toBe('');
});

test("logs in", async () => {
    let state = store.getState();

    expect(state.auth.token).toBe('');

    await store.dispatch(login({ 'email': 'asdf', 'password': 'asf' }));

    state = store.getState();

    expect(state.auth.token).toBe('abcd');
});