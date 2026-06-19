import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './authSlice';

var loadLS = function(key, fallback) {
  try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e) { return fallback; }
};
var saveLS = function(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
};

// ── Cart ──────────────────────────────────────────────────────────────────────
var cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadLS('grilli_cart', []), isDrawerOpen: false },
  reducers: {
    addToCart: function(state, action) {
      var payload = action.payload;
      var id = payload.id || payload._id;
      var existing = state.items.find(function(i) { return (i.id || i._id) === id; });
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id:       id,
          name:     payload.name,
          price:    payload.price,
          image:    payload.image || '',
          category: payload.category || '',
          quantity: 1,
        });
      }
      saveLS('grilli_cart', state.items);
    },
    removeFromCart: function(state, action) {
      var id = action.payload;
      state.items = state.items.filter(function(i) { return (i.id || i._id) !== id; });
      saveLS('grilli_cart', state.items);
    },
    increaseQty: function(state, action) {
      var id = action.payload;
      var item = state.items.find(function(i) { return (i.id || i._id) === id; });
      if (item) { item.quantity += 1; saveLS('grilli_cart', state.items); }
    },
    decreaseQty: function(state, action) {
      var id = action.payload;
      var idx = state.items.findIndex(function(i) { return (i.id || i._id) === id; });
      if (idx >= 0) {
        if (state.items[idx].quantity === 1) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].quantity -= 1;
        }
        saveLS('grilli_cart', state.items);
      }
    },
    clearCart: function(state) { state.items = []; saveLS('grilli_cart', []); },
    openCartDrawer:   function(state) { state.isDrawerOpen = true; },
    closeCartDrawer:  function(state) { state.isDrawerOpen = false; },
    toggleCartDrawer: function(state) { state.isDrawerOpen = !state.isDrawerOpen; },
  },
});

// ── Wishlist ──────────────────────────────────────────────────────────────────
var wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadLS('grilli_wishlist', []) },
  reducers: {
    toggleWishlist: function(state, action) {
      var id = action.payload.id || action.payload._id;
      var idx = state.items.findIndex(function(i) { return (i.id || i._id) === id; });
      if (idx >= 0) { state.items.splice(idx, 1); }
      else { state.items.push(Object.assign({}, action.payload, { id: id })); }
      saveLS('grilli_wishlist', state.items);
    },
    removeFromWishlist: function(state, action) {
      state.items = state.items.filter(function(i) { return (i.id || i._id) !== action.payload; });
      saveLS('grilli_wishlist', state.items);
    },
  },
});

// ── Recently Viewed ───────────────────────────────────────────────────────────
var recentSlice = createSlice({
  name: 'recent',
  initialState: { ids: loadLS('grilli_recent', []) },
  reducers: {
    addRecentlyViewed: function(state, action) {
      var id = action.payload;
      state.ids = [id].concat(state.ids.filter(function(i) { return i !== id; })).slice(0, 8);
      saveLS('grilli_recent', state.ids);
    },
  },
});

// ── UI ────────────────────────────────────────────────────────────────────────
var uiSlice = createSlice({
  name: 'ui',
  initialState: { navOpen: false, activeSection: 'home' },
  reducers: {
    toggleNav:        function(state)        { state.navOpen = !state.navOpen; },
    closeNav:         function(state)        { state.navOpen = false; },
    setActiveSection: function(state, action){ state.activeSection = action.payload; },
  },
});

// ── Reservation ───────────────────────────────────────────────────────────────
var reservationSlice = createSlice({
  name: 'reservation',
  initialState: { lastRef: null },
  reducers: {
    setLastRef: function(state, action) { state.lastRef = action.payload; },
  },
});

// ── Store ─────────────────────────────────────────────────────────────────────
export var store = configureStore({
  reducer: {
    auth:        authReducer,
    cart:        cartSlice.reducer,
    wishlist:    wishlistSlice.reducer,
    recent:      recentSlice.reducer,
    ui:          uiSlice.reducer,
    reservation: reservationSlice.reducer,
  },
});

// ── Cart exports ──────────────────────────────────────────────────────────────
export var {
  addToCart, removeFromCart, increaseQty, decreaseQty,
  clearCart, openCartDrawer, closeCartDrawer, toggleCartDrawer,
} = cartSlice.actions;

export var selectCartItems    = function(s) { return s.cart.items; };
export var selectCartCount    = function(s) { return s.cart.items.reduce(function(t,i) { return t + i.quantity; }, 0); };
export var selectCartSubtotal = function(s) { return Math.round(s.cart.items.reduce(function(t,i) { return t + i.price * i.quantity; }, 0) * 100) / 100; };
export var selectIsDrawerOpen = function(s) { return s.cart.isDrawerOpen; };
export var selectIsInCart     = function(id) { return function(s) { return s.cart.items.some(function(i) { return (i.id || i._id) === id; }); }; };
export var selectCartTax      = function(s) { return Math.round(selectCartSubtotal(s) * 0.05 * 100) / 100; };
export var selectDeliveryFee  = function(s) { return selectCartSubtotal(s) >= 50 ? 0 : 5; };
export var selectCartTotal    = function(s) { return Math.round((selectCartSubtotal(s) + selectCartTax(s) + selectDeliveryFee(s)) * 100) / 100; };

// ── Wishlist exports ──────────────────────────────────────────────────────────
export var { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export var selectWishlistItems = function(s) { return s.wishlist.items; };
export var selectWishlistCount = function(s) { return s.wishlist.items.length; };
export var selectIsWishlisted  = function(id) { return function(s) { return s.wishlist.items.some(function(i) { return (i.id || i._id) === id; }); }; };

// ── Recent exports ────────────────────────────────────────────────────────────
export var { addRecentlyViewed } = recentSlice.actions;
export var selectRecentIds = function(s) { return s.recent.ids; };

// ── UI exports ────────────────────────────────────────────────────────────────
export var { toggleNav, closeNav, setActiveSection } = uiSlice.actions;

// ── Reservation exports ───────────────────────────────────────────────────────
export var { setLastRef } = reservationSlice.actions;
