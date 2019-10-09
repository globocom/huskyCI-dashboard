import { all, takeLatest } from "redux-saga/effects";

import { Types as LoginTypes } from "../ducks/login";
import tryLogin from "./login";

export default function* rootSaga() {
  return yield all([takeLatest(LoginTypes.TRY_LOGIN, tryLogin)]);
}
