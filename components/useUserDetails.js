import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '@/helpers/axios';
import { BASE_URL, API_VERSION } from '@/config';
import { user_info } from '@/app/Redux/Actions';

const useUserDetails = () => {
  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.user_details);

  useEffect(() => {
    const getUserdetail = async () => {
      try {
        const accesso = await AsyncStorage.getItem('access_token');
        console.log('accesso', accesso);

        if (accesso && !user_details.id) {
          console.log('no user detail');
          const response = await axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/details`, {
            headers: {
              Authorization: `Bearer ${accesso}`,
            },
          });

          console.log('res user detail', response.data);

          if (response.data.id) {
            dispatch(user_info(response.data));
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    getUserdetail();
  }, [dispatch]);

  return user_details;
};

export default useUserDetails;
