//get DOM elements
import { products } from './db';
const $root = document.querySelector('#root')
const $product = document.querySelector('#product')

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
            </tr>
        `
    )
}

//generate html Rows from bd.js
const htmlProducts = products.map(prod => genRowTable(prod)).join('')

//render in DOM
$product.innerHTML = htmlProducts;
