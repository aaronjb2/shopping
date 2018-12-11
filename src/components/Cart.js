import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Cart extends Component{
constructor(props){
    super(props);

    this.state={
        redirectShop:false,
        myCart:[],
        quantityArray:[],
        subtotal:0
    }
}

async componentDidMount(){
let arr = await axios.get(`/api/getcart`);
this.setState({myCart:arr.data});
let otherArr = [];
this.state.myCart.forEach((element,index,arr)=>{otherArr.push('')})
this.setState({quantityArray:otherArr})
this.setSubtotal();
}

redirectShop(){
    if (this.state.redirectShop){
        return <Redirect to={`/`}/>
    }
}

makeRedirectShopTrue(){
    this.setState({redirectShop:true})
}

setQuantity(e,index){
let q = this.state.quantityArray.slice();
q[index] = e.target.value;
this.setState({quantityArray:q});
}

async changeQuantity(id,quantity){
    let a = await axios.put(`/api/updatequantity`,{id,quantity});
    this.setState({myCart:a.data});
    this.setSubtotal()
}

async deleteItem(id){
    let a = await axios.delete(`/api/deletefromcart/${id}`);
    this.setState({myCart:a.data});
    this.setSubtotal();
}

setSubtotal(){
let a = 0;
this.state.myCart.forEach((element,index,arr)=>{a+=(this.state.myCart[index].price*this.state.myCart[index].quantity)})
this.setState({subtotal:a})
}

displayMyCart(){
    return this.state.myCart.map((element,index,arr)=>{
       return (
           <div className = 'product-box'>
               <h4>Product Id: {this.state.myCart[index].id}</h4>
               <h3>Product Name: {this.state.myCart[index].name}</h3>
               <div className = 'image-box'>
               <img className = 'image' src = {this.state.myCart[index].image} alt />
               </div>
               <h3>Price: ${this.state.myCart[index].price.toString().length < 2?`0.0${this.state.myCart[index].price}`:this.state.myCart[index].price.toString().length < 3?`0.${this.state.myCart[index].price}`:`${this.state.myCart[index].price.toString().substring(0,this.state.myCart[index].price.toString().length-2)}.${this.state.myCart[index].price.toString().slice(-2)}`} Quantity: {this.state.myCart[index].quantity} </h3>
               <h4>Change Quantity:<input value={this.state.quantityArray[index]} onChange={e=>this.setQuantity(e,index)} type="number" className='input'/><button onClick={()=>this.changeQuantity(this.state.myCart[index].id,this.state.quantityArray[index])}>Change</button><button onClick={()=>this.deleteItem(this.state.myCart[index].id)}>Delete</button></h4>
           </div>
       )
    })
   }

   async deleteAll(){
    let a = await axios.delete(`/api/deleteall/`);
    this.setState({myCart:a.data});
    this.setSubtotal();
   }

    render(){
        return (
            <div>
                <h4><button onClick={()=>this.makeRedirectShopTrue()}>Shop More</button></h4>
                {this.redirectShop()}
                <h1>This is your cart</h1>
                {this.displayMyCart()}
                <h4>Subtotal: ${this.state.subtotal==0?`0.00`:this.state.subtotal.toString().length < 2?`0.0${this.state.subtotal.price}`:this.state.subtotal.toString().length < 3?`0.${this.state.subtotal.price}`:`${this.state.subtotal.toString().substring(0,this.state.subtotal.toString().length-2)}.${this.state.subtotal.toString().slice(-2)}`}</h4>
                <h4><button onClick={()=>this.deleteAll()}>Check Out</button></h4>
            </div>
        )
    }
}

export default Cart;