import React, {Component} from 'react';
import "./fooditem.css"
// import foodimg from "../../helpers/media/fooditem.jpeg"
import { FaUtensils } from "react-icons/fa";
import lozad from 'lozad'
const placeholdImg = "/images/placeholder.png"

class FoodItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isExpanded: false
        }
    }

    componentDidMount(){
        const observer = lozad();
        observer.observe();
    }

    handleClick(){
        // e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight
        });
    }

    // addToPlate(sentFor, id){
    //     this.props.onAdd(sentFor, id)
    //     this.handleClick()
    // }

    render(){
        const {name, description, price, id, image} = this.props.food;
        const {isExpanded, height} = this.state;
        const currentHeight= isExpanded ? height:0;
        // const currentData = this.props.foodData.find(i => i.id === id)
        // let showData = currentData ? currentData : {note: "", quantity: 0}
        let onPlate = this.props.foodData.find(i => i.id === id)
        return(
             <div className={`each-item ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="mx-2"  
                    // onClick={() => this.handleClick()}
                     >
                {image ? <div className="food-img">
                    <img data-src={image}
                     src={placeholdImg} 
                     onError={(e) => {
                        e.target.onerror = null 
                        e.target.src = placeholdImg}}
                     className="lozad" alt="item"/>
                </div>
                : <div className="mb-1"></div>}
                <div className="food-heading mr-auto">
                    <h5><b>{name}</b></h5>
                   {description ? <div><small className="text-muted">{description}</small>
                    </div> : <br/>}
                    <div className="food-price">
                    <small>AUD$ {price}</small>
                    </div>
                </div>
                </div>
                {/* <div className="food-collapse"style={{height: currentHeight+'px'}} >
                    <div className="food-body px-0 pb-0" ref='inner'>
                    <div className="text-right ml-2">
                    {onPlate ? <button className="btn-sm btn-danger"
                        onClick={(e) => this.addToPlate("remove", id)}
                    >Remove</button>
                    : <button className="btn-sm brand-component"
                        onClick={(e) => this.addToPlate("add", id)}
                    >
                        <FaUtensils className="mr-1 mb-1" />
                        Add to Your Plate</button>}
                    </div>
                    </div>
                </div> */}
            </div>);
    }
}

export default FoodItem;