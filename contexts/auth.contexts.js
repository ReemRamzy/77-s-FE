// "use client";

// import axiosInstance from "@/helpers/axios";
// import { createContext,useContext, useState, useEffect} from "react";
// import {useDispatch,useSelector} from "react-redux";
// import { API_VERSION, BASE_URL } from "@/config";
// import Cookies from "js-cookie";
// import {user_info} from "@/app/Redux/Actions";
// const csrfToken = Cookies.get('77SDESIGN_CSRF_TOKEN');
// console.log(csrfToken);
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// export const AuthContext = createContext({
//   user: undefined,
//   setUser: async () => null,
// });

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(undefined);
//     const dispatch = useDispatch();

//     const storeUser = async() => {

//          let  accesso = true //await AsyncStorage.getItem('access_token');
//         if (accesso) {
//            await axiosInstance(`${BASE_URL}/${API_VERSION}/user/details/`,{
//                 headers:
//                     {
//                         'Authorization':accesso
//                     }
//             })
//                 .then((res) => {
//                     dispatch(user_detail(res.data)); // Dispatch the setUser action
//                 })
//                 .catch((err) => {
//                     dispatch(user_detail(undefined)); // Dispatch setUser with undefined on error
//                 });
//         }
//     };

//     useEffect(() => {
//         storeUser();
//     }, []);
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser: storeUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // const useAuth = () => useContext(AuthContext);
// const useAuth = () => {
//     const user = useSelector((state) => state.user_info.username);
//     const dispatch = useDispatch();

//     const setUserInRedux = (userData) => {
//         dispatch(user_info(userData));
//     };

//     return {
//         user,
//         setUser: setUserInRedux,
//     };
// };
// export default useAuth;


"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_VERSION, BASE_URL } from "@/config";
import Cookies from "js-cookie";
import { user_info } from "@/app/Redux/Actions";

export const AuthContext = createContext({
  user: undefined,
  setUser: async () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();

  const storeUser = async () => {
    const token = Cookies.get('access_token'); // Ensure token is correctly retrieved
    const csrfToken = Cookies.get('77SDESIGN_CSRF_TOKEN');
    
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/${API_VERSION}/user/details/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': csrfToken,
          },
        });
        dispatch(user_info(response.data)); // Dispatch the user info action
      } catch (err) {
        console.error('Error fetching user details:', err);
        dispatch(user_info(undefined)); // Dispatch undefined on error
      }
    }
  };

  useEffect(() => {
    storeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: storeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const user = useSelector((state) => state.user_info);
  const dispatch = useDispatch();

  const setUserInRedux = (userData) => {
    dispatch(user_info(userData));
  };

  return { user, setUser: setUserInRedux };
};

export default useAuth;
