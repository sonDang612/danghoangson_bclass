import { configureStore } from "@reduxjs/toolkit";
import searchFilterSlice from "./reducers/searchFilterReducer";

export const store = configureStore({
  reducer: {
    searchFilter: searchFilterSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
