import { globalActionType } from "../../action/shared/globalAction";

const initialState = {
  showWelcomePage: true,
  accessToken: null,
  optData: {
    isUserRegistered: false,
    otp: {},
    message: "",
    phoneNumber: "",
  },
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case globalActionType.SHOW_UPDATE_WELCOME_PAGE:
      return {
        ...state,
        showWelcomePage: action.showWelcomePage,
      };
    case globalActionType.SAVE_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};

export default globalReducer;
