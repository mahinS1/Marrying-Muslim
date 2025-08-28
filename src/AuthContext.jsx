import { createContext, useContext, useEffect, useState } from 'react';
import { auth, realtimeDb } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onDisconnect, set, serverTimestamp } from 'firebase/database';

const AuthContext = createContext({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      // Presence logic
      if (firebaseUser) {
        const userStatusDatabaseRef = ref(realtimeDb, '/status/' + firebaseUser.uid);
        const isOfflineForDatabase = {
          state: 'offline',
          last_changed: serverTimestamp(),
        };
        const isOnlineForDatabase = {
          state: 'online',
          last_changed: serverTimestamp(),
        };
        // Listen for connection state
        const connectedRef = ref(realtimeDb, '.info/connected');
        import('firebase/database').then(({ onValue }) => {
          onValue(connectedRef, (snap) => {
            if (snap.val() === false) {
              return;
            }
            // Set up onDisconnect
            onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
              set(userStatusDatabaseRef, isOnlineForDatabase);
            });
          });
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
