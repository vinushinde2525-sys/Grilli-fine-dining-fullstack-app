import authReducer, {
  setCredentials, clearCredentials, updateUser,
  selectCurrentUser, selectIsAuth, selectIsAdmin, selectToken,
} from '../../src/store/authSlice';

describe('authSlice reducer', function() {
  beforeEach(function() {
    window.localStorage.clear();
  });

  var initial = { user: null, token: null, isAuthenticated: false };

  test('setCredentials logs the user in and persists to localStorage', function() {
    var payload = { user: { id: '1', name: 'Jane', role: 'customer' }, token: 'abc123' };
    var state = authReducer(initial, setCredentials(payload));
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('abc123');
    expect(state.user.name).toBe('Jane');
    expect(window.localStorage.getItem('grilli_token')).toBe('abc123');
  });

  test('clearCredentials logs the user out and clears localStorage', function() {
    var loggedIn = authReducer(initial, setCredentials({ user: { id: '1' }, token: 'abc' }));
    var state = authReducer(loggedIn, clearCredentials());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(window.localStorage.getItem('grilli_token')).toBeNull();
  });

  test('updateUser merges new fields into the existing user', function() {
    var loggedIn = authReducer(initial, setCredentials({ user: { id: '1', name: 'Jane' }, token: 'abc' }));
    var state = authReducer(loggedIn, updateUser({ phone: '12345' }));
    expect(state.user).toMatchObject({ id: '1', name: 'Jane', phone: '12345' });
  });

  test('selectors read the expected slices of state', function() {
    var rootState = { auth: { user: { id: '1', role: 'admin' }, token: 't', isAuthenticated: true } };
    expect(selectCurrentUser(rootState).id).toBe('1');
    expect(selectIsAuth(rootState)).toBe(true);
    expect(selectIsAdmin(rootState)).toBe(true);
    expect(selectToken(rootState)).toBe('t');
  });

  test('selectIsAdmin is false for a non-admin user', function() {
    var rootState = { auth: { user: { id: '1', role: 'customer' }, token: 't', isAuthenticated: true } };
    expect(selectIsAdmin(rootState)).toBe(false);
  });
});
