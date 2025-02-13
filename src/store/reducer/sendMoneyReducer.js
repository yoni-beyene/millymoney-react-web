import { sendMoneyAction } from "../action/sendMoneyAction";

const initialState = {
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
  homeContent: "default",
};

const sendMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case sendMoneyAction.UPDATE_AMOUNT:
      return {
        ...state,
        amount: action.amount,
      };
    case sendMoneyAction.UPDATE_NEW_REMIT_FIELDS:
      return {
        ...state,
        ...action.payload,
      };
    case sendMoneyAction.UPDATE_HOME_PAGE_CONTENT:
      return {
        ...state,
        homeContent: action.value,
      };
    default:
      return state;
  }
};

export default sendMoneyReducer;
