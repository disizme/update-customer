// import React from "react";
// import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

// import CardSection from "./CardSection";

// class CheckoutForm extends React.Component {

//   handleSubmit = async event => {
//     event.preventDefault();

//     const { stripe, elements } = this.props;
//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     // const result = await stripe.createToken(card);
//     // if (result.error) {
//     //   console.log(result.error.message);
//     // } else {
//     //   console.log(result.token);
//     // }

//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: card,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   render() {
//     return (
//       <div className="pt-2">
//         <form onSubmit={this.handleSubmit}>
//           <CardSection />
//           <div className="text-right mx-2 mb-3">
//           <button disabled={!this.props.stripe} className="btn btn-secondary brand-component btn-sm">
//             Pay
//           </button>
//           </div>
//         </form> 
//       </div>
//     );
//   }
// }

// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements} />
//       )}
//     </ElementsConsumer>
//   );
// }
