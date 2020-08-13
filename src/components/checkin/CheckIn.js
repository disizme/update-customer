import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Row
  } from 'reactstrap';
import { FaUtensils } from "react-icons/fa";
import { connect } from 'react-redux';
import store from '../../store'
import customerCheckin from '../../actions/customer/customer_checkin';
import MainLogo from '../../helpers/logo/MainLogo';
import Inputs from '../../helpers/Inputs';
import userProfile from '../../actions/admin/user_profile';

class CheckIn extends Component{
  slug= this.props.match.params.slug
   state={
     data: {
       name: "",
       email: "",
       // address:"",
       phone_number: "",
       postcode: ""
     },
     checkError: false,
     checkedin: false
   }


   componentDidMount(){
       if(!this.props.userProfile.success){
           store.dispatch(userProfile(this.slug))
       }else{
         document.title = this.props.userProfile.success.data.name + ' | Check-In'
       }
   }

   onChange(e) {
     let { name } = e.target;
     let { value } = e.target;
     let { data } = { ...this.state };
     data[name] = value;
     this.setState({ data: {...data}});
   }

   onSubmit(e){
       e.preventDefault()
       if(this.state.checkedin){
         store.dispatch(customerCheckin(this.state.data, this.props.match.params.slug))
       }else{
         this.setState({ checkError: true })
       }
   }

   componentDidUpdate(prevProps){
     let { customerCheckin, userProfile } = this.props;
     if (customerCheckin !== prevProps.customerCheckin) {
         let { success, error } = customerCheckin;
         if(success){
           sessionStorage.setItem("customer", success.data.email)
           this.props.history.push(`/${this.slug}/menu`)
       }else if(error){
       }
     }
     if(userProfile !== prevProps.userProfile){
       if(userProfile.success){
         if(userProfile.success.data.color !== null || userProfile.success.data.color !== ""){
            document.documentElement.style.setProperty('--brand-color', userProfile.success.data.color);
         }
         document.title = userProfile.success.data.name + ' | Check-In'
       }
     }
   }

   render(){
     const { data, checkedin } = this.state
     let allInputs = [
       {
         name: "name",
         placeholder: "Name",
         type: "text",
         value: data.name,
         required: true
       },
       {
         name: "email",
         placeholder: "Email",
         type: "email",
         value: data.email,
         required: true,
       },
       // {
       //   name: "address",
       //   placeholder: "Address",
       //   type: "text",
       //   value: data.address,
       //   required: true,
       // },
       {
         name: "phone_number",
         placeholder: "Contact No.",
         type: "tel",
         value: data.phone_number,
         pattern: "[0-9]{7,10}",
         required: true
       },
       {
         name: "postcode",
         placeholder: "Postal Code",
         type: "text",
         value: data.postcode,
         required: true,
         pattern: "[0-9]{4}"
       }
     ]

     return <div className="App check-in d-flex flex-row align-items-center">
     <Container>
     <Row className="justify-content-center">
       <Col xs='8' md='6' lg='5' sm='7' style={{minWidth: '320px'}}>
         <Card className="check-in-card">
           <CardBody >
             <MainLogo className="text-center"
               photo={this.props.userProfile.success ? this.props.userProfile.success.data.photo : null} />
               <div className="text-center">
                 <h4>{this.props.userProfile.success ? this.props.userProfile.success.data.name : ""} </h4>
                 <p className="text-muted">Please Check-in</p>
               </div>
               <Form className="px-2" onSubmit={(e) => this.onSubmit(e)}>
                 {
                   allInputs.map(i=> {
                     return <Inputs input={i} key={i.name}
                       onChange={(e) => this.onChange(e)} />
                   })
                 }
               <div className="text-center mt-3">
                 <div className="mb-1">
                   {/* <label> */}
                   <input type="checkbox" className="mr-1" style={{verticalAlign: "middle"}}
                    value={checkedin} onChange={() => 
                       this.setState({
                         checkedin: !checkedin,
                         checkError: false
                       })}
                   /> <small className={this.state.checkError ? "check-error" : ""}>
                   I agree to all the&nbsp;
                   <a href="https://dinemate.com.au/terms" target="_blank" rel="noopener noreferrer">
                   Terms and Conditions
                  </a>&nbsp;and
                  &nbsp;
                   <a href="https://dinemate.com.au/privacy-policy/" target="_blank" rel="noopener noreferrer">
                   Privacy Policy
                  </a>&nbsp;
                   by checking in to this application.
                   </small>
                   {/* </label> */}
                   </div>
                 <p xs="6">
                     <Button className="px-4 brand-component" type='submit'>
                     <FaUtensils className="mr-1" />
                         Check-in
                     </Button>
                 </p>
                 <p className="mb-1 brand-color"><small>Powered by Dinemate</small></p>
               </div>
               </Form>
           </CardBody>
         </Card>
       </Col>
     </Row>
   </Container>
   </div>
   }
}

function mapStateToProps(state) {
   let { customerCheckin, userProfile } = state
   return {
     customerCheckin, userProfile
   }
 }
 
 export default connect(mapStateToProps)(CheckIn)
 