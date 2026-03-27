import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import PRODUCTS from 'shared/products';
import './Recommendations.css';

function Recommendations() {
  const [recos, setRecos] = useState(PRODUCTS.slice(0, 3));

  useEffect(() => {
    const unsubscribe = eventBus.on('cart:updated', (cart) => {
      console.log('Panier reçu dans reco:', cart);

      if (cart.items.length === 0) {
        setRecos(PRODUCTS.slice(0, 3));
      } else {
        // exemple simple : filtrer produits non déjà dans le panier
        const cartIds = cart.items.map(item => item.id);

        const filtered = PRODUCTS.filter(p => !cartIds.includes(p.id));

        setRecos(filtered.slice(0, 3));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddReco = (product) => {
    eventBus.emit('cart:add', product);
  };

  return (
    <div className="recommendations">
      <h2>Les joueurs achetent aussi</h2>

      <div className="reco-list">
        {recos.map(p => (
          <div
            key={p.id}
            className="reco-card"
            onClick={() => handleAddReco(p)}
          >
            <div className="reco-image" data-category={p.category}>
              {p.category}
            </div>
            <span className="reco-name">{p.name}</span>
            <span className="reco-price">{p.price} EUR</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
