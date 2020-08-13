import axios from 'axios';
import { Config } from '../../Config';
// import {loginToken} from "../../components/shared/helpers/GeneralHelpers";
// import {Config} from "../../Config";
// import {errorHandler} from "../../components/shared/helpers/ErrorHandler";
import store from "../../store";
import { addSuccessMessage } from '../successMessage/success_message';

function _success(success) {
  return {type: 'CUSTOMER_CHECKIN_SUCCESS', success}
}

function _error(error) {
  return {type: 'CUSTOMER_CHECKIN_ERROR', error}
}

function _processing(processing) {
  if (processing)
    return { type: 'ACTIVATE_LOADING', text: "Checking In" }
  else
    return { type: 'DEACTIVATE_LOADING' }
}

export function customerCheckin(data,slug) {
  let params= {
    offset:  new Date().getTimezoneOffset()
  }
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl+`/${slug}/checkin`,
      // method: "get"
      // url: Config.BaseUrl + "/checkin/slug",
      method: "post",
      params,
      dataType: 'json',
      data: data,
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
    // setTimeout(() => {
      axios(config).then(res => {
        // console.log(res)
        dispatch(_processing(false));
        dispatch(_success(res));
        store.dispatch(addSuccessMessage({
          message: { variant: `error`, message: "Thank You for Checking In!", title: `` }
        }))
      }).catch(error => {
        let response = error
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });      
    // }, 3000);

  }
}

export default customerCheckin;

