import { configureStore } from "@reduxjs/toolkit";
import { questionApi } from "./features/questionSlice";
import { answerApi } from "./features/answerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [questionApi.reducerPath]: questionApi.reducer,
      [answerApi.reducerPath]: answerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(questionApi.middleware)
        .concat(answerApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
