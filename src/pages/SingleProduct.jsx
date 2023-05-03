
import { useParams } from "react-router";
import {useEffect, useState} from "react";
import "../assets/styles/singleProduct.css"


const SingleProduct = () => {

    const [product,setProduct] = useState([]);
    
    useEffect(() => {
        async function getProduct(){
            try{
                const response = await fetch('/products.json'); {/* get data from the products.json file*/}
                const jsonResponse = await response.json(); {/* convert to array of objects */}
                setProduct(jsonResponse);
            } catch(error){
                console.log(error);
            }         
        }
        getProduct();
    
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();

        let addedItem = {
            id: e.target.id.value,
            image_url: e.target.image_url.value,
            name: e.target.name.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value
        }
        localStorage.setItem('cartItems',JSON.stringify(addedItem));
        window.location.href = '/cart';
      }

      if (!product || product.length === 0){ {/* verify that the product data has been found */}
        return <div>Loading...</div>
      }
    

    const {id} = useParams();
    const selectedProduct = product.find((item) => item.pk === Number(id));
    const { image_url, name, price, rating, description} = selectedProduct.fields
    return (
        <form onSubmit={handleSubmit} className="product-holder">
            <section className='section-product'>
                <img src={image_url}></img>
                <h4>{name}</h4>
                <h5>Price: ${price}</h5>
                <h5>Rating: {rating}/5</h5>
                <p className="description-single-product">{description}</p>
                <label htmlFor="quantity">Quantity: </label>
                <input type="number" id="quantity" className="quantity-input" min="0" required></input>
                <input type="hidden" id="product-id" className="product-id" value={selectedProduct.pk}></input>
                <input type="hidden" id="image_url" className="image_url" value={image_url}></input>
                <input type="hidden" id="price" className="price" value={price}></input>
                <button type="submit" className="add-cart-btn">Add to Cart</button>
            </section>
        </form>
        
    ) 
}

export default SingleProduct;