import axios from 'axios';
import { store } from '../store';
import { clearCredentials } from '../store/authSlice';

// Recursively normalize _id → id (MongoDB → frontend)
function normalizeIds(data) {
  if (Array.isArray(data)) return data.map(normalizeIds);
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    var result = {};
    for (var k in data) {
      result[k] = normalizeIds(data[k]);
      if (k === '_id') result.id = data[k];
    }
    return result;
  }
  return data;
}

var api = axios.create({ baseURL: '/api', timeout: 15000 });

api.interceptors.request.use(function(config) {
  var token = store.getState().auth.token || localStorage.getItem('grilli_token');
  if (token) config.headers['Authorization'] = 'Bearer ' + token;
  return config;
});

api.interceptors.response.use(
  function(res) {
    return normalizeIds(res.data);
  },
  function(err) {
    if (err.response && err.response.status === 401) store.dispatch(clearCredentials());
    var msg = (err.response && err.response.data && err.response.data.message) || err.message || 'Something went wrong';
    return Promise.reject(new Error(msg));
  }
);

export var authApi = {
  register:       function(d)     { return api.post('/auth/register', d); },
  login:          function(d)     { return api.post('/auth/login', d); },
  logout:         function()      { return api.post('/auth/logout'); },
  me:             function()      { return api.get('/auth/me'); },
  updateProfile:  function(d)     { return api.put('/auth/profile', d); },
  changePassword: function(d)     { return api.put('/auth/change-password', d); },
  forgotPassword: function(d)     { return api.post('/auth/forgot-password', d); },
  resetPassword:  function(t, d)  { return api.put('/auth/reset-password/' + t, d); },
};

export var menuApi = {
  getAll:        function(p)     { return api.get('/menu', { params: p }); },
  getById:       function(id)    { return api.get('/menu/' + id); },
  getCategories: function()      { return api.get('/menu/categories'); },
  getFeatured:   function()      { return api.get('/menu/featured'); },
  getSpecial:    function()      { return api.get('/menu/special'); },
  getPopular:    function()      { return api.get('/menu/popular'); },
  getRecommended:function()      { return api.get('/menu/recommended'); },
  getTrending:   function()      { return api.get('/menu/trending'); },
  create:        function(d)     { return api.post('/menu', d); },
  update:        function(id, d) { return api.put('/menu/' + id, d); },
  remove:        function(id)    { return api.delete('/menu/' + id); },
};

export var orderApi = {
  create:        function(d)     { return api.post('/orders', d); },
  getAll:        function(p)     { return api.get('/orders', { params: p }); },
  getById:       function(id)    { return api.get('/orders/' + id); },
  updateStatus:  function(id, d) { return api.put('/orders/' + id + '/status', d); },
  createPayment: function(d)     { return api.post('/orders/create-payment', d); },
  verifyPayment: function(d)     { return api.post('/orders/verify-payment', d); },
};

export var reservationApi = {
  create:       function(d)      { return api.post('/reservations', d); },
  getByRef:     function(ref)    { return api.get('/reservations/' + ref); },
  getAll:       function(p)      { return api.get('/reservations', { params: p }); },
  updateStatus: function(ref, d) { return api.put('/reservations/' + ref + '/status', d); },
};

export var contentApi = {
  getEvents:        function()      { return api.get('/content/events'); },
  getEventById:     function(id)    { return api.get('/content/events/' + id); },
  getTestimonials:  function()      { return api.get('/content/testimonials'); },
  getStats:         function()      { return api.get('/content/stats'); },
  getAnalytics:     function()      { return api.get('/content/analytics'); },
  getNotifications: function()      { return api.get('/content/notifications'); },
  markNotifRead:    function()      { return api.put('/content/notifications/read-all'); },
  createEvent:      function(d)     { return api.post('/content/events', d); },
  updateEvent:      function(id, d) { return api.put('/content/events/' + id, d); },
  deleteEvent:      function(id)    { return api.delete('/content/events/' + id); },
  createTestimonial:function(d)     { return api.post('/content/testimonials', d); },
  updateTestimonial:function(id, d) { return api.put('/content/testimonials/' + id, d); },
  deleteTestimonial:function(id)    { return api.delete('/content/testimonials/' + id); },
};

export var adminApi = {
  getUsers:   function(p)     { return api.get('/admin/users', { params: p }); },
  updateUser: function(id, d) { return api.put('/admin/users/' + id, d); },
  deleteUser: function(id)    { return api.delete('/admin/users/' + id); },
};

export default api;
