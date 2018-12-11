import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './Shop.css';

class Shop extends Component{
constructor(props){
    super(props);

    this.state={
        redirectCart:false,
        itemsInShop:[],
        quantityArray:[]
    }
}

async componentDidMount(){
    let a = await axios.get(`/api/getproducts`);
    this.setState({itemsInShop:a.data})
    let b = [];
    this.state.itemsInShop.forEach((element,index,arr)=>{b.push(0)});
    this.setState({quantityArray:b})
    console.log(this.state.itemsInShop);
}

redirectCart(){
    if (this.state.redirectCart){
        return <Redirect to={`/cart`}/>
    }
}

makeRedirectCartTrue(){
    this.setState({redirectCart:true})
}

async addItemToCart(id,quantity){
    await axios.post(`/api/addtocart`,{id,quantity})
}

setQuantity(e,index){
let a = this.state.quantityArray.slice();
a[index] = e.target.value;
this.setState({quantityArray:a});
}

displayItemsInShop(){
 return this.state.itemsInShop.map((element,index,arr)=>{
    return (
        <div className = 'product-box'>
            <h4>Product Id: {this.state.itemsInShop[index].id}</h4>
            <h3>Product Name: {this.state.itemsInShop[index].name}</h3>
            <div className = 'image-box'>
            <img className = 'image' src = {this.state.itemsInShop[index].image} alt />
            </div>
            <h3>Price: ${this.state.itemsInShop[index].price.toString().length < 2?`0.0${this.state.itemsInShop[index].price}`:this.state.itemsInShop[index].price.toString().length < 3?`0.${this.state.itemsInShop[index].price}`:`${this.state.itemsInShop[index].price.toString().substring(0,this.state.itemsInShop[index].price.toString().length-2)}.${this.state.itemsInShop[index].price.toString().slice(-2)}`}</h3>
            <h4>Quantity:<input value={this.state.quantityArray[index]} onChange={e=>this.setQuantity(e,index)} type="number" className='input'/><button onClick={()=>this.addItemToCart(this.state.itemsInShop[index].id,this.state.quantityArray[index])}>Add To Cart</button></h4>
        </div>
    )
 })
}

    render(){
        return (
            <div>
                {this.redirectCart()}
                <h4><button onClick={()=>this.makeRedirectCartTrue()}>View Cart</button></h4>
                <h1>This is your shop</h1>
                {this.displayItemsInShop()}
            </div>
        )
    }
}

export default Shop;