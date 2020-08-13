export default function activateLoader
    (state = { flag:false, text:"" }, action) {

    switch (action.type)
    {
        case 'ACTIVATE_LOADING':
            return {flag:true, text: action.text };

        case 'DEACTIVATE_LOADING':
            return {flag: false, text: ""};

        default: return state;
    }
}
