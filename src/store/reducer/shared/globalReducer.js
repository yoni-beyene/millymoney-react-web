import { globalActionType } from "../../action/shared/globalAction";

const initialState = {
  showWelcomePage: true,
  accessToken: null,
  senderId: "",
  optData: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case globalActionType.SHOW_UPDATE_WELCOME_PAGE:
      return {
        ...state,
        showWelcomePage: action.showWelcomePage,
      };
    case globalActionType.SAVE_OPT_DATA:
      return {
        ...state,
        optData: action.optData,
      };
    case globalActionType.SAVE_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        senderId: action.senderId,
      };
    default:
      return state;
  }
};

export default globalReducer;
