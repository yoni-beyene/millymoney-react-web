import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import globalReducer from "../reducer/shared/globalReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storageSession from "redux-persist/lib/storage/session";
import sendMoneyReducer from "../reducer/sendMoneyReducer";

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

const sendeMoneyPersistConfig = {
  key: "multicity",
  storage: storageSession,
};
const rootReducer = combineReducers({
  global: persistReducer(globalPersistConfig, globalReducer),
  sendeMoney: persistReducer(sendeMoneyPersistConfig, sendMoneyReducer),
});
export const store = createStore(rootReducer, composeWithDevTools());
export const persistor = persistStore(store);
