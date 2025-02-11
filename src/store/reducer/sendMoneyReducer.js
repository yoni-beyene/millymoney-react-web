import { sendMoneyAction } from "../action/sendMoneyAction";

const initialState = {
  newRemit: {
    amount: 100,
    currencyCode: "USD",
    channel: "",
    channelCode: "",
    senderId: "",
    accountNumber: "",
    accountHolderFirstName: "",
    accountHolderLastName: "",
    exchangeRate: "",
    exchangeAmount: "",
    appliedFee: "",
  },
};

const sendMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case sendMoneyAction.UPDATE_AMOUNT:
      return {
        ...state,
        showWelcomePage: action.showWelcomePage,
      };
    case sendMoneyAction.UPDATE_NEW_REMIT_FIELDS:
      return {
        ...state.newRemit,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default sendMoneyReducer;
