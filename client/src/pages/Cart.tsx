import { useEffect, useState } from "react"

function Cart(){
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    type CartItem = {
        id: number;
        name: string;
        quantity: number;
        price: string;
        image_url: string;
    }

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch('http://localhost:8000/api/cart/get.php');

                if(!response.ok){
                    setError('Failed to fetch data');
                }
            } catch (err: any){
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if(loading){
        return <h2>Loading...</h2>
    }

    return <div className="cart-page">
        <div className="cart-container">
            <div className="cart-item">

            </div>
        </div>

        <div className="checkout-container">
            <div className="checkout-list">
                <div className="checkout-item">
                    <p>burger</p>
                    <p>$9.99</p>
                </div>
            </div>

            <button>Checkout</button>
        </div>
    </div>
}

export default Cart