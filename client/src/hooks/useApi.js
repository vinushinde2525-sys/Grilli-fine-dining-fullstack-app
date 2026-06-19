import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials } from '../store/authSlice';
import { menuApi, orderApi, reservationApi, contentApi, authApi, adminApi } from '../services/api';
import toast from 'react-hot-toast';

export var useLogin = function() {
  var dispatch = useDispatch();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: function(res) {
      dispatch(setCredentials({ user: res.user, token: res.token, refreshToken: res.refreshToken }));
    },
  });
};
export var useRegister = function() {
  var dispatch = useDispatch();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: function(res) {
      dispatch(setCredentials({ user: res.user, token: res.token, refreshToken: res.refreshToken }));
    },
  });
};
export var useLogout = function() {
  var dispatch = useDispatch();
  var qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: function() { dispatch(clearCredentials()); qc.clear(); },
  });
};
export var useForgotPassword = function() { return useMutation({ mutationFn: authApi.forgotPassword }); };
export var useResetPassword  = function() {
  return useMutation({ mutationFn: function(d) { return authApi.resetPassword(d.token, { password: d.password }); } });
};
export var useUpdateProfile  = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: authApi.updateProfile, onSuccess: function() { qc.invalidateQueries(['me']); toast.success('Profile updated'); } });
};
export var useChangePassword = function() {
  return useMutation({ mutationFn: authApi.changePassword, onSuccess: function() { toast.success('Password changed'); } });
};

export var useMenu = function(params) {
  return useQuery({ queryKey: ['menu', params], queryFn: function() { return menuApi.getAll(params || {}); }, select: function(d) { return d.data; } });
};
export var useMenuItem = function(id) {
  return useQuery({ queryKey: ['menu-item', id], queryFn: function() { return menuApi.getById(id); }, select: function(d) { return d.data; }, enabled: !!id });
};
export var useMenuCategories = function() {
  return useQuery({ queryKey: ['menu-categories'], queryFn: menuApi.getCategories, select: function(d) { return d.data; }, staleTime: 5 * 60 * 1000 });
};
export var useFeaturedMenu  = function() { return useQuery({ queryKey: ['menu-featured'],    queryFn: menuApi.getFeatured,    select: function(d) { return d.data; } }); };
export var useSpecialDish   = function() { return useQuery({ queryKey: ['menu-special'],     queryFn: menuApi.getSpecial,     select: function(d) { return d.data; } }); };
export var usePopularDishes = function() { return useQuery({ queryKey: ['menu-popular'],     queryFn: menuApi.getPopular,     select: function(d) { return d.data; } }); };
export var useRecommended   = function() { return useQuery({ queryKey: ['menu-recommended'], queryFn: menuApi.getRecommended, select: function(d) { return d.data; } }); };
export var useTrending      = function() { return useQuery({ queryKey: ['menu-trending'],    queryFn: menuApi.getTrending,    select: function(d) { return d.data; } }); };

export var useCreateMenuItem = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: menuApi.create, onSuccess: function() { qc.invalidateQueries(['menu']); toast.success('Item created'); } });
};
export var useUpdateMenuItem = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: function(d) { return menuApi.update(d._id || d.id, d); }, onSuccess: function() { qc.invalidateQueries(['menu']); toast.success('Item updated'); } });
};
export var useDeleteMenuItem = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: menuApi.remove, onSuccess: function() { qc.invalidateQueries(['menu']); toast.success('Item deleted'); } });
};

export var useCreateOrder = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: orderApi.create, onSuccess: function() { qc.invalidateQueries(['orders']); } });
};
export var useOrders = function(params) {
  return useQuery({ queryKey: ['orders', params], queryFn: function() { return orderApi.getAll(params); }, select: function(d) { return d; } });
};
export var useOrder = function(orderId) {
  return useQuery({ queryKey: ['order', orderId], queryFn: function() { return orderApi.getById(orderId); }, select: function(d) { return d.data; }, enabled: !!orderId });
};
export var useUpdateOrderStatus = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: function(d) { return orderApi.updateStatus(d.orderId, { status: d.status }); }, onSuccess: function() { qc.invalidateQueries(['orders']); toast.success('Status updated'); } });
};

export var useCreateReservation = function() { return useMutation({ mutationFn: reservationApi.create }); };
export var useReservation = function(refId) {
  return useQuery({ queryKey: ['reservation', refId], queryFn: function() { return reservationApi.getByRef(refId); }, select: function(d) { return d.data; }, enabled: !!refId });
};
export var useReservations = function(params) {
  return useQuery({ queryKey: ['reservations', params], queryFn: function() { return reservationApi.getAll(params); }, select: function(d) { return d; } });
};
export var useUpdateReservationStatus = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: function(d) { return reservationApi.updateStatus(d.refId, d); }, onSuccess: function() { qc.invalidateQueries(['reservations']); toast.success('Status updated'); } });
};

export var useEvents       = function() { return useQuery({ queryKey: ['events'],       queryFn: contentApi.getEvents,       select: function(d) { return d.data; } }); };
export var useEvent        = function(id) { return useQuery({ queryKey: ['event', id], queryFn: function() { return contentApi.getEventById(id); }, select: function(d) { return d.data; }, enabled: !!id }); };
export var useTestimonials = function() { return useQuery({ queryKey: ['testimonials'], queryFn: contentApi.getTestimonials, select: function(d) { return d.data; } }); };
export var useStats        = function() { return useQuery({ queryKey: ['stats'],        queryFn: contentApi.getStats,        select: function(d) { return d.data; } }); };
export var useAnalytics    = function() { return useQuery({ queryKey: ['analytics'],    queryFn: contentApi.getAnalytics,    select: function(d) { return d.data; }, refetchInterval: 30000 }); };
export var useNotifications= function() { return useQuery({ queryKey: ['notifications'],queryFn: contentApi.getNotifications,select: function(d) { return d.data; }, refetchInterval: 15000 }); };

export var useAdminUsers = function(params) {
  return useQuery({ queryKey: ['admin-users', params], queryFn: function() { return adminApi.getUsers(params); }, select: function(d) { return d; } });
};
export var useDeleteUser = function() {
  var qc = useQueryClient();
  return useMutation({ mutationFn: adminApi.deleteUser, onSuccess: function() { qc.invalidateQueries(['admin-users']); toast.success('User deleted'); } });
};
