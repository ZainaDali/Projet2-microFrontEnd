import React, { useState, useEffect, Suspense, lazy } from 'react';
import eventBus from 'shared/eventBus';
import './App.css';

const ProductGrid = lazy(() =>
  import('mfeProduct/ProductGrid').catch(() => ({
    default: () => <div className="loading-fallback">Catalogue indisponible</div>
  }))
);

const Cart = lazy(() =>
  import('mfeCart/Cart').catch(() => ({
    default: () => <div className="loading-fallback">Panier indisponible</div>
  }))
);

const Recommendations = lazy(() =>
  import('mfeReco/Recommendations').catch(() => ({
    default: () => <div className="loading-fallback">Recommandations indisponibles</div>
  }))
);



function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsub = eventBus.on('cart:updated', ({ count }) => {
      setCartCount(count);
    });
    return unsub;
  }, []);

  return (
    <div className="shell">
      <header className="shell-header">
        <h1 className="logo">RetroShop</h1>
        <div className="cart-badge">Panier ({cartCount})</div>
      </header>
      <main className="shell-main">
        <section className="product-area">
            <Suspense fallback={<LoadingFallback name="Products" />}>
              <ProductGrid />
            </Suspense>
        </section>
        <aside className="cart-area">
            <Suspense fallback={<LoadingFallback name="Cart" />}>
              <Cart />
            </Suspense>
        </aside>
      </main>
      <section className="reco-area">
          <Suspense fallback={<LoadingFallback name="Recommendations" />}>
            <Recommendations />
          </Suspense>
      </section>
    </div>
  );
}

export default App;