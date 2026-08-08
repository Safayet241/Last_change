import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Missing Hometown Flavors?</h2>

        <p>
          Taste your roots without leaving your room. Your district's best food,
          one click from your dorm.
        </p>

        <div className="header-buttons">
          <button>View Menu</button>

          <a
            href="https://wa.me/8801XXXXXXXXX?text=Hello!%20I%20would%20like%20to%20pre-order%20food."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="whatsapp-btn">
              Pre-Order
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;