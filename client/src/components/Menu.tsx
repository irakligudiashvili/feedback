import { useEffect, useState } from 'react';
import './menu.css';
import Loading from './Loading';

function Menu(){
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    type MenuItem = {
        id: number;
        name: string;
        description: string;
        ingredients: string;
        price: string;
        available: boolean;
        image_url: string;
    }
    
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            
            try{
                const response = await fetch('http://localhost:8000/api/menu.php');

                if (!response.ok){
                    setError('Failed to fetch data');
                }

                const data = await response.json();

                setMenuItems(data);
            } catch (err: any){
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading){
        return <Loading />
    }

    const addToCart = async(id: number) => {
        try{
            const response = await fetch(`http://localhost:8000/api/cart/add.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({ menu_item_id: id})
            });

            if(!response.ok){
                setError("Couldn't add to cart");
            }


        } catch (err: any){
            setError(err);
        }
    }

    return (
        <div className="menu-container">
            {error && (
                <h2>{error}</h2>
            )}
            {menuItems.map((item) => (
                <div className="menu-item" key={item.id}>
                    <div className="menu-item-left">
                        <div className="img">
                            <img src={item.image_url} alt={item.name} />
                        </div>
                    </div>
                    <div className="menu-item-mid">
                        <p className="menu-item-title">{item.name}</p>
                        <p className="menu-item-description">{item.description}</p>
                        <p>Ingredients: {
                            item.ingredients
                            .replace(/[{}]/g, '')
                            .split(',')
                            .map(char => char.charAt(0).toUpperCase() + char.slice(1))
                            .join(', ')
                        }</p>
                    </div>
                    <div className="menu-item-right">
                        <p>${item.price}</p>
                        <button onClick={() => addToCart(item.id)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
    
}

export default Menu
