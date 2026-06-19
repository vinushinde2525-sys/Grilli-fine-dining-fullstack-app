import axios from "axios";
import { store } from "../store";
import { clearCredentials } from "../store/authSlice";


// MongoDB _id -> frontend id
function normalizeIds(data) {

  if (Array.isArray(data)) {
    return data.map(normalizeIds);
  }


  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date)
  ) {

    const result = {};

    for (const key in data) {

      result[key] = normalizeIds(data[key]);


      if (key === "_id") {
        result.id = data[key];
      }

    }

    return result;

  }


  return data;
}



// Production + Local API URL

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api`
      : "/api",


  timeout:15000,


  withCredentials:true

});





// Attach JWT token

api.interceptors.request.use(
  
  (config)=>{


    const token =
      store.getState().auth.token ||
      localStorage.getItem("grilli_token");


    if(token){

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error)=>Promise.reject(error)

);







// Response handling

api.interceptors.response.use(


  (response)=>{

    return normalizeIds(response.data);

  },


  (error)=>{


    if(
      error.response &&
      error.response.status === 401
    ){

      store.dispatch(
        clearCredentials()
      );

    }


    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";


    return Promise.reject(
      new Error(message)
    );

  }

);







// AUTH API

export const authApi = {


  register:(data)=>
    api.post("/auth/register",data),


  login:(data)=>
    api.post("/auth/login",data),


  logout:()=>
    api.post("/auth/logout"),


  me:()=>
    api.get("/auth/me"),


  updateProfile:(data)=>
    api.put("/auth/profile",data),


  changePassword:(data)=>
    api.put("/auth/change-password",data),


  forgotPassword:(data)=>
    api.post("/auth/forgot-password",data),


  resetPassword:(token,data)=>
    api.put(`/auth/reset-password/${token}`,data)

};







// MENU API

export const menuApi = {


  getAll:(params)=>
    api.get("/menu",{params}),


  getById:(id)=>
    api.get(`/menu/${id}`),


  getCategories:()=>
    api.get("/menu/categories"),


  getFeatured:()=>
    api.get("/menu/featured"),


  getSpecial:()=>
    api.get("/menu/special"),


  getPopular:()=>
    api.get("/menu/popular"),


  getRecommended:()=>
    api.get("/menu/recommended"),


  getTrending:()=>
    api.get("/menu/trending"),


  create:(data)=>
    api.post("/menu",data),


  update:(id,data)=>
    api.put(`/menu/${id}`,data),


  remove:(id)=>
    api.delete(`/menu/${id}`)

};







// ORDER API

export const orderApi = {


  create:(data)=>
    api.post("/orders",data),


  getAll:(params)=>
    api.get("/orders",{params}),


  getById:(id)=>
    api.get(`/orders/${id}`),


  updateStatus:(id,data)=>
    api.put(`/orders/${id}/status`,data),


  createPayment:(data)=>
    api.post("/orders/create-payment",data),


  verifyPayment:(data)=>
    api.post("/orders/verify-payment",data)

};







// RESERVATION API

export const reservationApi = {


  create:(data)=>
    api.post("/reservations",data),


  getByRef:(ref)=>
    api.get(`/reservations/${ref}`),


  getAll:(params)=>
    api.get("/reservations",{params}),


  updateStatus:(ref,data)=>
    api.put(`/reservations/${ref}/status`,data)

};







// CONTENT API

export const contentApi = {


  getEvents:()=>
    api.get("/content/events"),


  getEventById:(id)=>
    api.get(`/content/events/${id}`),


  getTestimonials:()=>
    api.get("/content/testimonials"),


  getStats:()=>
    api.get("/content/stats"),


  getAnalytics:()=>
    api.get("/content/analytics"),


  getNotifications:()=>
    api.get("/content/notifications"),


  markNotifRead:()=>
    api.put("/content/notifications/read-all"),


  createEvent:(data)=>
    api.post("/content/events",data),


  updateEvent:(id,data)=>
    api.put(`/content/events/${id}`,data),


  deleteEvent:(id)=>
    api.delete(`/content/events/${id}`),


  createTestimonial:(data)=>
    api.post("/content/testimonials",data),


  updateTestimonial:(id,data)=>
    api.put(`/content/testimonials/${id}`,data),


  deleteTestimonial:(id)=>
    api.delete(`/content/testimonials/${id}`)

};







// ADMIN API

export const adminApi = {


  getUsers:(params)=>
    api.get("/admin/users",{params}),


  updateUser:(id,data)=>
    api.put(`/admin/users/${id}`,data),


  deleteUser:(id)=>
    api.delete(`/admin/users/${id}`)

};





export default api;