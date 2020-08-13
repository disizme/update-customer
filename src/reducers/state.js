import { combineReducers } from 'redux';
import activateLoader from './loading/activate-loader';
import fetchCategory from './category/fetch-category';
import fetchFoodMenu from './foodmenu/fetch-foodmenu';
import customerCheckin from './customer/customer-checkin';
import customerOrder from './customer/customer-order';
import adminLogin from './admin/admin-login';
import userProfile from './admin/user-profile';
import successMessage from './successMessage/success-message';

const allReducers = combineReducers({
    activateLoader, userProfile,
    fetchCategory, fetchFoodMenu,
    customerCheckin, customerOrder,
    adminLogin, successMessage
});

export default allReducers;
