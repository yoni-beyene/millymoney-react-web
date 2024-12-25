import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import globalReducer from "../reducer/shared/globalReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { encryptTransform } from "redux-persist-transform-encrypt";

const globalPersistConfig = {
  key: "global",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: "your-secret-key",
      onError: function (error) {
        console.error("Error while encrypting:", error);
      },
    }),
  ],
};
const rootReducer = combineReducers({
  global: persistReducer(globalPersistConfig, globalReducer),
});
export const store = createStore(rootReducer, composeWithDevTools());
export const persistor = persistStore(store);
