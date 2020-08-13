import axios from 'axios';
// import store from "../../store";
import { Config } from '../../Config';
import store from '../../store';
import fetchFoodMenu from '../foodmenu/fetch_foodmenu';
// import { errorHandler } from '../../helpers/helper';
// import { addSuccessMessage } from '../successMessage/success_message';

function _success(success) {
  return {type: 'FETCH_CATEGORY_SUCCESS', success}
}

function _error(error) {
  return {type: 'FETCH_CATEGORY_ERROR', error}
}

function _processing(processing) {
    return { type: 'FETCH_CATEGORY_PROCESSING', processing }
}

export function fetchCategory(slug) {
  return dispatch => {
    dispatch(_processing(true));
    let config = {
      url: Config.BaseUrl+`/${slug}/category`,
      // url: '/api/category.json',
      method: "get",
      dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + loginToken()
    //   }
    };
      axios(config).then(res => {
        dispatch(_processing(false));
        dispatch(_success(res));
        store.dispatch(fetchFoodMenu(slug))
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

export default fetchCategory;

