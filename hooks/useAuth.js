// import { loginStart, loginSuccess, loginFailed } from '../redux/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { addUser } from '../redux/slices/userSlice';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null)
  const dispatch = useDispatch();
  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({userEmail: data.email, userName: data.userName, userURL: data.userURL, userId: data.userId})
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user=>{    
      if (user){
        setUser(user);
        updateUserData(user.uid);
        //dispatch(addUser(userInfo));
      }else{
        setUser(null);
      }
    });
    return unsub;
  },[]);

  return { user }
}