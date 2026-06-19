import { createSlice } from '@reduxjs/toolkit';

var loadUser = function() {
  try {
    var u = localStorage.getItem('grilli_user');
    return u ? JSON.parse(u) : null;
  } catch(e) { return null; }
};

var authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:  loadUser(),
    token: localStorage.getItem('grilli_token') || null,
    isAuthenticated: !!localStorage.getItem('grilli_token'),
  },
  reducers: {
    setCredentials: function(state, action) {
      state.user  = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('grilli_token', action.payload.token);
      localStorage.setItem('grilli_user',  JSON.stringify(action.payload.user));
      if (action.payload.refreshToken) {
        localStorage.setItem('grilli_refresh', action.payload.refreshToken);
      }
    },
    clearCredentials: function(state) {
      state.user  = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('grilli_token');
      localStorage.removeItem('grilli_user');
      localStorage.removeItem('grilli_refresh');
    },
    updateUser: function(state, action) {
      state.user = Object.assign({}, state.user, action.payload);
      localStorage.setItem('grilli_user', JSON.stringify(state.user));
    },
  },
});

export var { setCredentials, clearCredentials, updateUser } = authSlice.actions;

export var selectCurrentUser  = function(s) { return s.auth.user; };
export var selectIsAuth       = function(s) { return s.auth.isAuthenticated; };
export var selectIsAdmin      = function(s) { return s.auth.user && s.auth.user.role === 'admin'; };
export var selectToken        = function(s) { return s.auth.token; };

export default authSlice.reducer;
