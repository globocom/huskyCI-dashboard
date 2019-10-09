export const Types = {
  LOGIN_SUCCESS: "login/SUCCESS",
  LOGIN_FAILURE: "login/FAILURE",
  TRY_LOGIN: "login/TRY",
};

const initialState = {
  user: null,
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const Creators = {
  tryLogin: payload => ({
    type: Types.TRY_LOGIN,
    payload,
  }),

  sucess: payload => ({
    type: Types.LOGIN_SUCCESS,
    payload,
  }),

  error: payload => ({
    type: Types.LOGIN_FAILURE,
    payload,
  }),
};
