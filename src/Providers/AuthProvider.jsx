import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Define GoogleAuthProvider instance

const AuthProvider = ({ children }) => {
  const axiosPublic = UseAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const update = (name) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
      }).catch((error) => {
        console.error("Error updating profile:", error.message);
        throw error; // Rethrow the error after logging it
      });
    } else {
      console.error("No authenticated user found.");
      return Promise.reject(new Error("No authenticated user found."));
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const saveUser = async (user) => {
    const currentUser = {
      email: user.email,
      role: "guest",
      status: "Verified",
    };
    try {
      const { data } = await axiosPublic.put("/users", currentUser);
      return data;
    } catch (error) {
      console.error("Error saving user:", error.message);
      throw error; // Rethrow the error after logging it
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        saveUser(currentUser).catch((error) => {
          console.error("Error saving user during auth state change:", error.message);
        });
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logIn,
    update,
    logOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
