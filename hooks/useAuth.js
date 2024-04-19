// import { loginStart, loginSuccess, loginFailed } from '../redux/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, dailyRef, db } from '../config/firebase';
import { doc, getDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { addUser } from '../redux/slices/userSlice';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [dailyData, setDailyData] = useState([])
  const dispatch = useDispatch();  
  const updateUserData = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      let data = userSnap.data();
      dispatch(addUser(data))
    }
  }
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user=>{    
      if (user){
        setUser(user);
        updateUserData(user.uid);
        getDailyData(user.uid)
        }else{
          setUser(null);
        }
      });
      return unsub;
    },[]);

  const getDailyData = (id) => {
    const q = query(
      dailyRef, where("userId", "==", id));
    let unsub = onSnapshot(q, (snapshot) => {
      let allDaily = snapshot.docs.map(doc=>{
        return doc.data();
      });
      setDailyData([...allDaily])
    });

    return unsub;
  }
    
  return { user, dailyData }
}