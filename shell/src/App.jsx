import React, { useState, useEffect, Suspense, lazy } from 'react';
import eventBus from 'shared/eventBus';
import './App.css';

const ProductGrid     = lazy(() => import('mfeProduct/ProductGrid'));
const Cart            = lazy(() => import('mfeCart/Cart'));
const Recommendations = lazy(() => import('mfeReco/Recommendations'));

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsub = eventBus.on('cart:updated', ({ count }) => {
      setCartCount(count);
    });
    return unsub; // cleanup
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