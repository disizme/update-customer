export default function adminLogin
    (state = {error: null, success: null, processing: false}, action) {

    switch (action.type) {
        case 'ADMIN_LOGIN_SUCCESS':
            return {...state, ...{success: action.success, error: null}};

        case 'ADMIN_LOGIN_ERROR':
            return {...state, ...{success: null, error: action.error}};

        case 'ADMIN_LOGIN_PROCESSING':
                return {...state, ...{processing: action.processing}};

        default:
            return state;
    }
}

