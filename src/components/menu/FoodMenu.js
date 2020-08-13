/* eslint-disable */

import React, { useState, useEffect, Fragment } from 'react'
import { connect } from "react-redux";
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Card, CardBody } from 'reactstrap';
import FoodItem from './FoodItem';
import store from '../../store';
import fetchFoodMenu from '../../actions/foodmenu/fetch_foodmenu';
import fetchCategory from '../../actions/category/fetch_category';
import { Loader } from '../../helpers/loader/PageLoader';
import MainLogo from '../../helpers/logo/MainLogo';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Waypoint } from 'react-waypoint';
import { userProfile } from '../../actions/admin/user_profile';
// import { GiKnifeFork } from "react-icons/gi";
import ReactPixel from 'react-facebook-pixel'

// import Orders from './Orders';
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");

function FoodMenu(props) {
    const slug= props.match.params.slug
    const [showCategory, setCategory] = useState("")
    // const [popup, setPopup] = useState(false)
    const [allCategories, setAllCategories] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [data, setData] = useState([])
    // const [total, setTotal] = useState(0)

    
    useEffect(() => {
        if(!userProfile.success){
            store.dispatch(userProfile(slug))
        }
        if(!fetchCategory.success){
            store.dispatch(fetchCategory(slug))
        }
    }, [])

    useEffect(() => {
        const {success} = props.userProfile
        if(success){
            document.title = success.data.name + ' | Menu and Prices'
            const options = {
                autoConfig: true, // set pixel's autoConfig
                debug: false, // enable logs
              };
            if(success.data.pixel){
                ReactPixel.init(success.data.pixel, options);
                ReactPixel.pageView(); 
            }
        }
    }, [props.userProfile])

    useEffect(() => {
        const {success} = props.fetchCategory
        if(success){
            if(success.data && success.data.length){
                setCategory(success.data[0].id)
                setAllCategories(success.data)
            }
        }
    }, [props.fetchCategory])

    useEffect(() => {
        const {success} = props.fetchFoodMenu
        if(success){
            if(success.data && success.data.length){
                let foodie = success.data
                // let foodie = success.data.filter(i => i.category_id === showCategory)
                if(props.fetchCategory.success){
                    let allItems = props.fetchCategory.success.data.map(i => {
                        let eachCat = foodie.filter(j => j.category_name === i.name)
                        return { name: i.name, items: eachCat }
                    })
                    setFoodItems(allItems)
                }
            }
        }
    }, [props.fetchFoodMenu])

    // function onAdd(sentFor, id){
    //     let currentData = [...data]
    //     if(sentFor === "remove"){
    //         let ind = currentData.findIndex(i => i.id === id)
    //         console.log(ind)
    //         currentData.splice(ind, 1)
    //     }else{
    //         let addItem = props.fetchFoodMenu.success.data.find(i => i.id === id)
    //         addItem.quantity = 1
    //         currentData.push(addItem)
    //     }
    //     updateTotal(currentData)
    //     setData(currentData)
    // }

    // function onUpdate(n, id){
    //     let allData = [...data]
    //     let ind = allData.findIndex(i => i.id === id)
    //     let quan = allData[ind].quantity + n
    //     allData[ind].quantity = quan < 0 ? 0 : quan
    //     updateTotal(allData)
    //     setData(allData) 
    // }

    // function updateTotal(items){
    //     let t = 0
    //     items.map(i => {
    //         t = t+ (i.quantity*i.price)
    //         return i
    //     })
    //     t= Math.round(t * 100) / 100
    //     setTotal(t)
    // }

    // function onComplete(){
    //     setPopup(!popup)
    // }

    function scrollNow(name){
        var element = document.getElementById(name);
        var headerOffset = 50;
        var elementPosition = element.offsetTop;
        var offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    function changeNav(name){
        let allcats = document.querySelectorAll("#food-categories div");
        for (var i = 0; i < allcats.length; ++i) {
            allcats[i].classList.remove('brand-color');
        }
        let activeCat = document.getElementById(`category-${name}`)
        activeCat.classList.add("brand-color")
        let thisWidth = activeCat.offsetWidth
        let windowWidth = window.innerWidth
        let num = Math.floor(windowWidth/thisWidth)
        let selectedCat = allCategories.findIndex(i => i.name === name)
        let categoryContainer = document.getElementById(`food-categories`)
        let scrollVal = (selectedCat + 1 - num)*thisWidth
        categoryContainer.scrollTo(scrollVal > 0 ? scrollVal : 0, window.scrollY)
    }

    return <div className="App">
        {/* <TopHeader /> */}
            <div className="restro-theme" >
                <Card className="mx-auto">
                    <CardBody>
                    <MainLogo photo={props.userProfile.success ? props.userProfile.success.data.photo : null} 
                        className="text-center my-0" />
                    <h3>
                        {props.userProfile.success && props.userProfile.success.data.name}</h3>
                    <div>
                    <FaMapMarkerAlt className="mr-1" />
                    {props.userProfile.success && 
                    `${props.userProfile.success.data.address} ${props.userProfile.success.data.city} ${props.userProfile.success.data.postal}`}
                    </div>
                    </CardBody>
                </Card>
            </div>
            {(props.fetchCategory.success && props.fetchFoodMenu.success) ? <Fragment>
            <div className="food-category container-fluid d-flex px-2" id="food-categories">
                    {allCategories.map(i => {
                        return <Col className={`px-2 py-3 `} id={`category-${i.name}`}
                            onClick={() => scrollNow(i.name)}
                             key={`cat-${i.name}`}
                             xs='4' md='2' lg='2' sm='3'>
                                 {i.name}
                        </Col>
                    })}
            </div>
            <div className="container-fluid">
            {
                foodItems.map((i,ind) => {
                    return <div key={`${i.name}-${ind}`} id={i.name}>
                        <h3 className="ml-3 mt-1">{i.name}</h3>
                        <Waypoint
                            onEnter={() => changeNav(i.name)}
                        />
                        <div className={`food-items text-left ${foodItems.length === (ind+1) ? "mb-5" : ""}`}>
                            <Row>
                                {i.items.map(j => {
                                    return <Col key={`food-${j.id}`}
                                        xs="12" sm="6" md="6" lg="4"
                                        className="mb-2">
                                        <FoodItem food={j}
                                            foodData={data}
                                            // onAdd={(x, y) => onAdd(x, y)}
                                             />
                                    </Col>
                                })}
                            </Row>
                            {/* <Waypoint
                            onLeave={() => console.log("left ", i.name)}
                        /> */}
                        </div>
                    </div>
                })
            }
            </div>            
            {/* {data.length ? <div className="bottom-menu">
                <div className="text-right">
                    <Button className="btn btn-sm brand-component" onClick={() => setPopup(true)}>
                    <GiKnifeFork className="mr-1"/>
                        Complete Order
                    </Button>
                </div>
            </div>
            :<div></div>} */}
            </Fragment>
            : <Loader />}
            {/* {popup && <Orders 
                    stripe={stripePromise}
                    popup={popup}
                    onComplete={() => onComplete()}
                    data={data}
                    total={total}
                    onUpdate={(x, y) => onUpdate(x, y)}
                />
            } */}
        </div>
    }

function mapStateToProps(state) {
    let { customerCheckin, fetchCategory, fetchFoodMenu, userProfile } = state
    return {
        customerCheckin, fetchCategory, fetchFoodMenu, userProfile
    }
}

export default connect(mapStateToProps)(FoodMenu)
