import React from "react";
import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

//contexto
const AuthContext = createContext();

//?Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext)
}


const AuthProvider = ({ children }) => {
  const [userLogin, SetUserLogin] = useState(null)
  const [userLoading, SetuserLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUserLogin(user)
      } else {
        SetUserLogin(null)
      }
      SetuserLoading(false)
    })
  }, [])

  const login = async () => {
    const GoogleProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, GoogleProvider)
  }

  const cerrarSesion = () => {
    signOut(auth)
  }

  return <AuthContext.Provider value={{ login, userLogin, cerrarSesion, userLoading }}>
    {children}
  </AuthContext.Provider>
}

export { AuthContext, AuthProvider, useAuth }