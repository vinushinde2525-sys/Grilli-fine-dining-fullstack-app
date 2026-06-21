import {
  store,
  addToCart, removeFromCart, increaseQty, decreaseQty, clearCart,
  selectCartItems, selectCartCount, selectCartSubtotal, selectCartTotal,
  selectDeliveryFee,
} from '../../src/store';

describe('cart slice', function() {
  beforeEach(function() {
    window.localStorage.clear();
    store.dispatch(clearCart());
  });

  test('addToCart adds a new item with quantity 1', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    var items = selectCartItems(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: 'item1', name: 'Pizza', price: 10, quantity: 1 });
  });

  test('addToCart increases quantity for an existing item instead of duplicating', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    var items = selectCartItems(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  test('increaseQty / decreaseQty adjust quantity, removing item at zero', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    store.dispatch(increaseQty('item1'));
    expect(selectCartItems(store.getState())[0].quantity).toBe(2);
    store.dispatch(decreaseQty('item1'));
    expect(selectCartItems(store.getState())[0].quantity).toBe(1);
    store.dispatch(decreaseQty('item1'));
    expect(selectCartItems(store.getState())).toHaveLength(0);
  });

  test('removeFromCart removes the specified item only', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    store.dispatch(addToCart({ id: 'item2', name: 'Pasta', price: 12 }));
    store.dispatch(removeFromCart('item1'));
    var items = selectCartItems(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('item2');
  });

  test('selectCartCount sums quantities across items', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    store.dispatch(addToCart({ id: 'item1', name: 'Pizza', price: 10 }));
    store.dispatch(addToCart({ id: 'item2', name: 'Pasta', price: 12 }));
    expect(selectCartCount(store.getState())).toBe(3);
  });

  test('selectCartSubtotal and selectCartTotal compute correct totals with free delivery threshold', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Steak', price: 60 }));
    var state = store.getState();
    expect(selectCartSubtotal(state)).toBe(60);
    expect(selectDeliveryFee(state)).toBe(0); // over $50 => free delivery
    expect(selectCartTotal(state)).toBe(63); // subtotal + 5% tax + free delivery
  });

  test('charges delivery fee under the free-delivery threshold', function() {
    store.dispatch(addToCart({ id: 'item1', name: 'Soup', price: 10 }));
    var state = store.getState();
    expect(selectDeliveryFee(state)).toBe(5);
  });
});
