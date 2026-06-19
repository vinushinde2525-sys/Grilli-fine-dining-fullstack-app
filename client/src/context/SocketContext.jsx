import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuth } from '../store/authSlice';

var SocketContext = createContext(null);

// Singleton socket - survives React re-renders and route changes
var socketSingleton = null;

export function SocketProvider({ children }) {
  var socketRef = useRef(null);
  var user      = useSelector(selectCurrentUser);
  var isAuth    = useSelector(selectIsAuth);

  // Stable primitive deps: user id string + isAuth boolean
  var userId   = user ? (user.id || user._id) : null;
  var userRole = user ? user.role : null;

  useEffect(function() {
    var SOCKET_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:3001';

    // Create the singleton only once, ever. Do NOT tear down and recreate it
    // on every effect re-run (auth change, StrictMode double-invoke, etc) —
    // that's what was closing a socket while it was still mid-handshake
    // (readyState CONNECTING), producing "WebSocket closed before connection
    // was established". A socket that's connecting or already open should
    // simply be reused; socket.io's own reconnection logic handles drops.
    if (!socketSingleton) {
      socketSingleton = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 2000,
        reconnectionAttempts: 5,
      });
    }

    socketRef.current = socketSingleton;

    var onConnect = function() {
      if (userRole === 'admin') {
        socketSingleton.emit('join_admin');
      }
      if (userId) {
        socketSingleton.emit('join_user', userId);
      }
    };

    // Remove old listener before adding new one
    socketSingleton.off('connect', onConnect);
    socketSingleton.on('connect', onConnect);

    // If already connected, join rooms now
    if (socketSingleton.connected) {
      onConnect();
    }

    // Cleanup only removes THIS effect run's listener — never disconnects
    // the singleton. The socket's lifetime is the whole app session, not
    // any single component's mount/unmount cycle (including StrictMode's
    // synthetic double mount in dev, which is what triggered the warning).
    return function() {
      socketSingleton.off('connect', onConnect);
    };
  // Only re-run when auth identity changes (not on every render)
  }, [userId, userRole, isAuth]);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
}

export var useSocket = function() { return useContext(SocketContext); };

// Safe teardown for genuine end-of-session scenarios (e.g. logout).
// Only closes if the socket is actually connected — never tears down
// a socket that's still mid-handshake, which is what produces
// "WebSocket closed before the connection was established".
export var disconnectSocket = function() {
  if (socketSingleton && socketSingleton.connected) {
    socketSingleton.disconnect();
  }
  socketSingleton = null;
};
