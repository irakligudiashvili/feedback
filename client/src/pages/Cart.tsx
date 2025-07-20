import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import './cart.css'

function Cart(){
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    type CartItem = {
        id: number;
        name: string;
        ingredients: string;
        price: number;
        image_url: string;
        quantity: number;
    }

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost:8000/api/cart/get.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            const data = await response.json();

            if(!response.ok){
                setError('Failed to fetch data');
            } else {
                setCartItems(data || []);
            }
        } catch (err: any){
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const removeItem = async (id) => {
        try{
            const response = await fetch('http://localhost:8000/api/cart/remove.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({menu_item_id: id})
            });

            if(!response.ok){
                setError('Failed to remove item');
            }

            fetchData();
        } catch (err: any){
            setError(err);
        }
    }

    const increaseQuantity = async (id) => {
        try{
            const response = await fetch('http://localhost:8000/api/cart/update.php', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({menu_item_id: id, mode: 'increase'})
            });

            if(!response.ok){
                setError('Failed to remove item');
            }

            fetchData();
        } catch(err: any){
            setError(err);
        }
    }

    const decreaseQuantity = async (id) => {
        try{
            const response = await fetch('http://localhost:8000/api/cart/update.php', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({menu_item_id: id, mode: 'decrease'})
            });

            if(!response.ok){
                setError('Failed to remove item');
            }

            fetchData();
        } catch(err: any){
            setError(err);
        }
    }

    if(loading){
        return <h2>Loading...</h2>
    }

    if(error){
        return <h3>{error}</h3>
    }

    return <div className="cart-page">
        <div className="cart-container">
            {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                    <div className="cart-img-container">
                        <img src={item.image_url}></img>
                    </div>

                    <div className="cart-info-container">
                        <div>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                        </div>
                        <p>Total: ${item.price * item.quantity}</p>
                    </div>

                    <div className="cart-price-container">
                        <button onClick={() => removeItem(item.id)}>Remove Item</button>
                        <div>
                            <p>Quantity: {item.quantity}</p>
                            <div>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
            
        </div>

        <div className="checkout-container">
            <div className="checkout-list">
                {cartItems.map((item) => (
                    <div className="checkout-item" key={item.id}>
                        <p>{item.name} x{item.quantity}</p>
                        <p>${item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            <button>Checkout</button>
        </div>
    </div>
}

export default Cart