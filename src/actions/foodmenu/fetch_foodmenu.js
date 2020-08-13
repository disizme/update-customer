import axios from 'axios';
// import store from "../../store";
import { Config } from '../../Config';
// import { errorHandler } from '../../helpers/helper';
// import { addSuccessMessage } from '../successMessage/success_message';

function _success(success) {
  return {type: 'FETCH_FOODMENU_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_FOODMENU_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_FOODMENU_PROCESSING', processing }
}
export function fetchFoodMenu(slug) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl+`/${slug}/menu`,
      // url: "/api/food.json",
      method: "get",
      dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
      axios(config).then(res => {
        dispatch(_processing(false));
        let ims = res.data && res.data.map(i => {
          i["image"] = i.image ? Config.urlbase+i.image : null
          return i
        })
        res.data = ims
        dispatch(_success(res));

      }).catch(error => {
        let response = error
        // let response = errorHandler(error)
        //   store.dispatch(addSuccessMessage({
        //     message: {variant: `error`, message: response.data, title: ``}
        //   }))
          dispatch(_error({response:{status:500,data:response.data}}));
          dispatch(_processing(false));
      });
  }
}

export default fetchFoodMenu;

