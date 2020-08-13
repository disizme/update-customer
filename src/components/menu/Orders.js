// import React, { useState, useRef } from 'react'
// import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { Elements } from "@stripe/react-stripe-js";
// import InjectedCheckoutForm from './CheckoutForm';

// export default function Orders(props){
//     const paymentdetail = useRef(null);
//     const [expand, setExpand] = useState(false)
//     const [high, setHeight] = useState(0)

//     function startPayment(){
//         setExpand(!expand)
//         setHeight(paymentdetail.current.clientHeight + 10)
//     }

//     return <Modal isOpen={props.popup} toggle={props.onComplete}>
//     <ModalHeader className="brand-color">Your Order</ModalHeader>
//     <ModalBody>
//         <Row className="mb-2 mx-1">
//             <Col className="col-md-6 col-3"></Col>
//             <Col className="col-md-3 col-6 text-center">Quantity</Col>
//             <Col className="col-3 text-right">Price (AUD)</Col>
//         </Row>
//         {props.data.map(i => {
//             return <Row className="mb-2 mx-1" key={i.id}>
//                 <Col className="col-md-6 col-3">
//                 {i.name}
//                 </Col>
//                 <Col className="col-md-3 col-6 text-center">
//                     {/* <input className="form-control form-control-sm food-note d-inline-block" 
//                             type="text" placeholder="Add Note" 
//                             value={showData.note}
//                             onChange={(e) => this.props.onUpdate(0, id, e)}/> */}
//                     <button className="btn-sm minus-btn"
//                         onClick={(e) => props.onUpdate(-1, i.id)}
//                         disabled={i.quantity === 0}
//                     >-</button>
//                     <div className="btn-sm d-inline-block food-quantity">{i.quantity}</div>
//                     <button className="btn-sm plus-btn"
//                         onClick={(e) => props.onUpdate(1, i.id)}>+</button>
//                 </Col>
//                 <Col className="col-3 text-right">
//                 {Math.round(i.price*i.quantity * 100) / 100}
//                 </Col>
//             </Row>
//         })}
//         <hr className="mb-2"/>
//         <Row className="mb-2 mx-1">
//             <Col className="col-9">Total</Col>
//             <Col className="col-3 text-right">
//                 {props.total}
//             </Col>
//         </Row>

//         <div className={`${expand ? 'is-expanded' : ''}`}>

//             <div className="food-collapse" style={{height: high+"px"}}>
//                 <div ref={paymentdetail}>
//                 <Elements stripe={props.stripe}>
//             <InjectedCheckoutForm />
//           </Elements>
//                 </div>
//             </div>
//             {!expand && <div className="text-right mx-2 mb-3">
//                     <Button className="brand-component btn-sm" 
//                         disabled={props.total === 0}
//                         onClick={() => startPayment()}>Make Payment
//                     </Button>
//             </div>}
//         </div>
//     </ModalBody>
// </Modal>
// }