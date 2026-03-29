import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getRestaurants } from '../api/jsonServerApi.js';
// API Expected:
// Endpoint: GET /api/restaurants?cuisine={cuisine}&sort={sortBy}&search={searchTerm}
// Response: { success: true, data: [{ id, name, cuisine, rating, reviews, deliveryTime, minOrder, deliveryFee, image, cuisines, isOpen }] }
import './RestaurantList.css';

// Static data for now - will be replaced with API call
const staticRestaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.5,
    reviews: 245,
    deliveryTime: 30,
    minOrder: 15,
    deliveryFee: 2.99,
    image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Pizza+Paradise",
    description: "Authentic Italian pizzas with fresh ingredients",
    cuisines: ["Italian", "Pasta", "Fast Food"],
    isOpen: true
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.7,
    reviews: 189,
    deliveryTime: 25,
    minOrder: 10,
    deliveryFee: 1.99,
    image: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Burger+Barn",
    description: "Juicy burgers and classic American comfort food",
    cuisines: ["American", "Burgers", "Fast Food"],
    isOpen: true
  },
  {
    id: 3,
    name: "Sushi Spot",
    cuisine: "Japanese",
    rating: 4.8,
    reviews: 312,
    deliveryTime: 40,
    minOrder: 20,
    deliveryFee: 3.99,
    image: "https://via.placeholder.com/300x200/45b7d1/ffffff?text=Sushi+Spot",
    description: "Fresh sushi and Japanese delicacies",
    cuisines: ["Japanese", "Asian", "Sushi"],
    isOpen: true
  },
  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    reviews: 156,
    deliveryTime: 28,
    minOrder: 12,
    deliveryFee: 2.49,
    image: "https://via.placeholder.com/300x200/f39c12/ffffff?text=Taco+Fiesta",
    description: "Authentic Mexican tacos and burritos",
    cuisines: ["Mexican", "Tacos", "Latin"],
    isOpen: false
  },
  {
    id: 5,
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "40-50 min",
    deliveryFee: 3.49,
    image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Curry+House",
    description: "Traditional Indian curries and tandoori dishes"
  },
  {
    id: 6,
    name: "Noodle Bowl",
    cuisine: "Chinese",
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "https://via.placeholder.com/300x200/9b59b6/ffffff?text=Noodle+Bowl",
    description: "Classic Chinese noodles and stir-fry dishes"
  }
];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);

        // Pull actual restaurants from json-server
        const response = await getRestaurants({ location });
        if (response?.data) {
          const list = Array.isArray(response.data)
            ? response.data
            : response.data.data;
          setRestaurants(Array.isArray(list) ? list : staticRestaurants);
        } else {
          setRestaurants(staticRestaurants);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to load restaurants', err);
        setError(err.message || 'Could not load restaurants');
        setRestaurants(staticRestaurants);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  if (loading) return (
    <div className="restaurant-list-page">
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading restaurants...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="restaurant-list-page">
      <div className="error-message">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="restaurant-list-page">
      <header className="restaurant-list-header">
        <h1>Restaurants {location ? `near ${location}` : 'in your area'}</h1>
        <p>Choose your favorite place and order in a few clicks.</p>
      </header>

      <div className="filters-section">
        <div className="filter-tabs">
          <button className="filter-tab active">All</button>
          <button className="filter-tab">Italian</button>
          <button className="filter-tab">American</button>
          <button className="filter-tab">Japanese</button>
          <button className="filter-tab">Mexican</button>
          <button className="filter-tab">Indian</button>
          <button className="filter-tab">Chinese</button>
        </div>
        <div className="sort-options">
          <select className="sort-select">
            <option>Sort by: Recommended</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Delivery Time</option>
            <option>Sort by: Delivery Fee</option>
          </select>
        </div>
      </div>

      <div className="restaurant-grid">
        {restaurants.length === 0 ? (
          <div className="no-results">
            <h3>No restaurants found</h3>
            <p>Try adjusting your location or filters</p>
            <button className="btn btn-primary">Browse All Restaurants</button>
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <Link to={`/restaurant/${restaurant.id}`} className="restaurant-link">
                <div className="restaurant-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="restaurant-badge">
                    {restaurant.deliveryTime}
                  </div>
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine}</p>
                  <p className="description">{restaurant.description}</p>
                  <div className="restaurant-meta">
                    <div className="rating">
                      ⭐ {restaurant.rating}
                    </div>
                    <div className="delivery-info">
                      <span className="time">{restaurant.deliveryTime}</span>
                      <span className="fee">${restaurant.deliveryFee} delivery</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
