import React, {Component, Suspense} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
// import store from "../../store"
import PageLoader from '../../helpers/loader/PageLoader';
import ShowSnackbar from "../common/messages/Snackbar"

const CheckIn = React.lazy(() => import('../checkin/CheckIn'));
const FoodMenu = React.lazy(() => import('../menu/FoodMenu'));

const Home = () => {
  return <div className="App check-in d-flex flex-row align-items-center">
    <button className="text-center mx-auto my-auto btn brand-component p-2" 
      style={{color: "white"}}
      onClick={() => window.location.href="https://dinemate.com.au"}>
      Please Use the QR code
    </button>
  </div>
}

class Routes extends Component {
  state = {
    user: {username: ''},
    window: {width: null},
    processing: false
  };


//   componentDidMount() {
//     if (loggedIn()) {
//       store.dispatch(getLoggedInUser());
//       if (!loggedIn()) {
//         this.setState({
//           processing: false
//         })
//       }
//       if (loggedIn() && window.location.href.includes('login'))
//       {
//         this.props.history.push(`/dashboard`);
//       }
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.getLoggedInUser !== prevProps.getLoggedInUser) {
//       let {success} = this.props.getLoggedInUser;
//       if (success) {
//         let user = {...this.state.user};
//         // store.dispatch(getRole(success.data.payload.id));
//         user.name = success.data.full_name;
//         this.setState({user});
//       } else {
//         //
//       }
//     }
//   }

  render() {
    return (
      <div>
        <Suspense fallback={<div />}>
            <Switch>
              <Route exact path="/" render={(props) => <Home />} />
                <Route exact path="/:slug/checkin" name="Check In" render={(props) => <CheckIn {...props} />} />
                <Route exact path="/:slug/menu" name="Food Menu" render={(props) => <FoodMenu {...props} />} />
                <Redirect to="/" />
            </Switch>
        </Suspense>
        <PageLoader/>
        <ShowSnackbar />
      </div>
    );
  }
}


function mapStateToProps(state) {
  let { getLoggedInUser } = { ...state }
  return {
    getLoggedInUser
  }
}

export default connect(mapStateToProps)(Routes);
