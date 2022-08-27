//get DOM elements
import { products } from './db';
const $root = document.querySelector('#root')
const $product = document.querySelector('#product')
const $order = document.querySelector('#order')

// variables initializacion
let orders = []

//dom listeners
$root.addEventListener('click', (event) => {
    const className = event.target.className

    //capture click add "event" button
    if (className === 'btn-add') {
        const id = event.target.id
        addCart(id)
    }
})

// app methods

//find product stored in database
const addCart = (id) => {
    const product = products.find(prod => prod.id == id)

    //check if prduct already exists in order list
    //replace with some method
    const exist = orders.includes(prod => prod.id == product.id)

    if (exist) {
        //accumulate amount and price
        const orderExist = orders.find(order => order.id == product.id)
        const accOrderProduct = OrderProduct(product, orderExist.amount+1)
        //TODO: remove old order product before
        orders = [...orders, accOrderProduct]
    }else{
        //update order list with selected product
        const newOrderProduct = OrderProduct(product)
        orders = [...orders, newOrderProduct]
    }
    //generate dom elements for print in html
    const htmlOrder = orders.map(order => genRowOrder(order)).join('')
    //render in html
    $order.innerHTML = htmlOrder
}

const OrderProduct = (product, amount=1, subtotal=null) => {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        flavors: product.flavors,
        price: 500,
        amount: amount,
        subtotal: 1000
    }
}

//DOM generators
const genRowTable = (product) => {
    const {name, price, id} = product
    return (
        `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${price}</td>
                <td>flavor list</td>
                <td>
                    <button class="btn-add" id="${id}">add</button>
                </td>
            </tr>
        `
    )
}

const genRowOrder = (orderProduct) => {
    const {name, price, flavors, amount, subtotal} = orderProduct
    return(
        `
            <tr>
                <td>${name}</td>
                <td>${flavors}</td>
                <td>${price}</td>
                <td>${amount}</td>
                <td>${subtotal}</td>
            </tr>
        `
    )
}

//generate html Rows from bd.js
const htmlProducts = products.map(prod => genRowTable(prod)).join('')

//render in DOM
$product.innerHTML = htmlProducts;
