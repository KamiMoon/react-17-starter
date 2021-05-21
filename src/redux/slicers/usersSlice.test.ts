import { createStore } from "redux/store";
import { fetchUser, fetchUsers } from "redux/slicers/usersSlice";

test("fetches users", async () => {
    const store = createStore();
    let state = store.getState();
    expect(state.users.ids).toEqual([]);

    await store.dispatch(fetchUsers());

    state = store.getState();
    expect(state.users.ids).toEqual(["1", "2"]);
});

test("fetches user", async () => {
    const store = createStore();
    let state = store.getState();
    expect(state.users.ids).toEqual([]);

    await store.dispatch(fetchUser({ id: "1" }));

    state = store.getState();
    expect(state.users.ids).toEqual(["1"]);
});
