import { put } from "redux-saga/effects";
// import { api } from "../../services/api";

import { Creators as loginActions } from "../ducks/login";

// add action parameter in function
export default function* tryLogin() {
  try {
    // const response = yield call(api.post, `${url}`, action.payload);

    yield put(
      loginActions.success({
        user: {
          name: "Matheus",
          email: "matheusslima7@gmail.com",
          phone: "21999423801",
        },
        message: "Success",
      })
    );
  } catch (err) {
    yield put(
      loginActions.error({
        user: null,
        message: "Error",
      })
    );
  }
}
