import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { getRestaurantById } from '../services/restaurantService.js'; // TODO: Uncomment when API is ready
// import { getMenuByRestaurant } from '../services/menuService.js'; // TODO: Uncomment when API is ready
import './RestaurantMenu.css';

// Static data for demonstration
const restaurantData = {
  1: {
    id: 1,
    name: 'Pizza Paradise',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: 'https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Pizza+Paradise',
    description: 'Authentic Italian pizzas with fresh ingredients and traditional recipes'
  }
};

const staticMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 12.99,
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    image: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Margherita',
    available: true
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 14.99,
    description: 'Classic pepperoni with mozzarella cheese',
    image: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Pepperoni',
    available: true
  },
  {
    id: 3,
    name: 'Caesar Salad',
    category: 'Salads',
    price: 8.99,
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    image: 'https://via.placeholder.com/100x100/4ecdc4/ffffff?text=Caesar',
    available: true
  },
  {
    id: 4,
    name: 'Garlic Bread',
    category: 'Appetizers',
    price: 6.99,
    description: 'Toasted bread with garlic butter and herbs',
    image: 'https://via.placeholder.com/100x100/45b7d1/ffffff?text=Garlic+Bread',
    available: true
  },
  {
    id: 5,
    name: 'Tiramisu',
    category: 'Desserts',
    price: 7.99,
    description: 'Classic Italian dessert with coffee and mascarpone',
    image: 'https://via.placeholder.com/100x100/9b59b6/ffffff?text=Tiramisu',
    available: true
  },
  {
    id: 6,
    name: 'Coca Cola',
    category: 'Beverages',
    price: 2.99,
    description: 'Refreshing cola drink',
    image: 'https://via.placeholder.com/100x100/000000/ffffff?text=Coke',
    available: true
  }
];

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  React.useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        // const restaurantData = await getRestaurantById(id);
        // const menuData = await getMenuByRestaurant(id);

        // Using static data for now
        setTimeout(() => {
          setRestaurant(restaurantData[id]);
          setMenuItems(staticMenuItems);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleAddToCart = (item) => {
    // TODO: API call to add item to cart
    addItem({
      ...item,
      restaurantId: parseInt(id),
      restaurantName: restaurant?.name
    });

    // Show success message
    alert(`${item.name} added to cart!`);
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="restaurant-menu-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading restaurant menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-menu-page">
        <div className="error-message">
          <h3>Restaurant not found</h3>
          <button onClick={() => navigate('/restaurants')} className="btn btn-primary">
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-menu-page">
      {/* Restaurant Header */}
      <div className="restaurant-header">
        <div className="restaurant-info">
          <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
          <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p className="cuisine">{restaurant.cuisine}</p>
            <p className="description">{restaurant.description}</p>
            <div className="restaurant-meta">
              <span className="rating">⭐ {restaurant.rating}</span>
              <span className="delivery-time">{restaurant.deliveryTime}</span>
              <span className="delivery-fee">${restaurant.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="btn btn-primary checkout-btn"
        >
          View Cart
        </button>
      </div>

      {/* Menu Categories */}
      <div className="menu-categories">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-items">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <p>No items available in {activeCategory}</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="menu-item-card">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {!item.available && <div className="unavailable-badge">Unavailable</div>}
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-category">{item.category}</div>
                <div className="item-price">${item.price}</div>
              </div>
              <div className="item-actions">
                <button
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.available}
                >
                  {item.available ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
