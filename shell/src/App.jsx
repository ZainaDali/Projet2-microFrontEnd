import React, { useState, useEffect, Suspense, lazy } from 'react';
import eventBus from 'shared/eventBus';
import './App.css';

const ProductGrid     = lazy(() => import('mfeProduct/ProductGrid'));
const Cart            = lazy(() => import('mfeCart/Cart'));
const Recommendations = lazy(() => import('mfeReco/Recommendations'));

// Ajout Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="loading-fallback">{this.props.fallback}</div>;
    }
    return this.props.children;
  }
}

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
          <ErrorBoundary fallback="Catalogue indisponible">
            <Suspense fallback={<LoadingFallback name="Products" />}>
              <ProductGrid />
            </Suspense>
          </ErrorBoundary>
        </section>
        <aside className="cart-area">
          <ErrorBoundary fallback="Panier indisponible">
            <Suspense fallback={<LoadingFallback name="Cart" />}>
              <Cart />
            </Suspense>
          </ErrorBoundary>
        </aside>
      </main>
      <section className="reco-area">
        <ErrorBoundary fallback="Recommandations indisponibles">
          <Suspense fallback={<LoadingFallback name="Recommendations" />}>
            <Recommendations />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}

export default App;