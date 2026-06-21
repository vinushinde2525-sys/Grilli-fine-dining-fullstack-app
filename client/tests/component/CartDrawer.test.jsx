import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../../src/store/authSlice';
import CartDrawer from '../../src/components/cart/CartDrawer';

// Build a fresh, isolated store per test (avoids the localStorage-backed
// singleton in src/store, which would leak state between test files).
function renderCartDrawer(preloadedItems) {
  var cartReducer = function(state, action) {
    state = state || { items: preloadedItems || [], isDrawerOpen: true };
    if (action.type === 'cart/increaseQty') {
      return Object.assign({}, state, {
        items: state.items.map(function(i) {
          return i.id === action.payload ? Object.assign({}, i, { quantity: i.quantity + 1 }) : i;
        }),
      });
    }
    if (action.type === 'cart/decreaseQty') {
      return Object.assign({}, state, {
        items: state.items
          .map(function(i) { return i.id === action.payload ? Object.assign({}, i, { quantity: i.quantity - 1 }) : i; })
          .filter(function(i) { return i.quantity > 0; }),
      });
    }
    if (action.type === 'cart/removeFromCart') {
      return Object.assign({}, state, { items: state.items.filter(function(i) { return i.id !== action.payload; }) });
    }
    if (action.type === 'cart/clearCart') {
      return Object.assign({}, state, { items: [] });
    }
    if (action.type === 'cart/closeCartDrawer') {
      return Object.assign({}, state, { isDrawerOpen: false });
    }
    return state;
  };

  var store = configureStore({ reducer: { auth: authReducer, cart: cartReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CartDrawer />
      </MemoryRouter>
    </Provider>
  );
  return store;
}

describe('CartDrawer', function() {
  test('shows an empty state when there are no items', function() {
    renderCartDrawer([]);
    expect(screen.getByText(/empty cart/i)).toBeInTheDocument();
  });

  test('renders cart items with name, price and quantity', function() {
    renderCartDrawer([{ id: 'i1', name: 'Margherita Pizza', price: 12, quantity: 2, image: '' }]);
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('$12.00')).toBeInTheDocument();
    expect(screen.getAllByText('$24.00').length).toBeGreaterThan(0); // line total: price * quantity
  });

  test('clicking the trash icon dispatches removeFromCart and removes the item', async function() {
    var user = userEvent.setup();
    renderCartDrawer([{ id: 'i1', name: 'Margherita Pizza', price: 12, quantity: 1, image: '' }]);
    var buttons = screen.getAllByRole('button');
    // Trash icon button has no accessible name beyond the svg, find by class fallback
    var removeBtn = buttons.find(function(b) { return b.className.includes('hover:text-red-400'); });
    await user.click(removeBtn);
    expect(screen.getByText(/empty cart/i)).toBeInTheDocument();
  });

  test('shows the checkout button and total when cart has items', function() {
    renderCartDrawer([{ id: 'i1', name: 'Pasta', price: 20, quantity: 1, image: '' }]);
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });
});
