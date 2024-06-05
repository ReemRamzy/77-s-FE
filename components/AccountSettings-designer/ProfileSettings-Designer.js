import React, {useEffect, useState} from 'react'
import axiosInstance from "@/helpers/axios";
import {API_VERSION, BASE_URL} from "@/config";
import Image from 'next/image';
import useAuth from '@/contexts/auth.contexts';

const Profile = () => {
    const { authUser, loading } = useAuth();
    const [file, setFile] = useState(null);
    const [imgChng,setImgChng] = useState('64');
    const [error, setError] = useState(null);

    const [profileInfo, setProfileInfo] = useState({
        avatar: "",
        username: "",
        bio: "",
        languages: "",
        currentPassword: "",
        newPassword: ""
      });

    useEffect(() => {
        if (authUser) {
            axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`)
                .then(response => {
                    setProfileInfo(response.data);
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        axiosInstance.post(`${BASE_URL}/${API_VERSION}/user/profile/designer/`, {
                            user: authUser.id,
                            avatar: "",
                            username: "",
                            bio: "",
                            languages: "",
                            currentPassword: "",
                            newPassword: ""
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            }
                        }).then(response => {
                            setProfileInfo(response.data);
                        }).catch(createError => {
                            console.error('Error creating designer profile:', createError);
                        });
                    } else {
                        console.error('Error fetching designer profile:', error);
                    }
                });
        }
    }, [authUser]);

    const handleOnChangeInput = (key, value) => {
    setProfileInfo(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setProfileInfo(prevState => ({
      ...prevState,
      avatar: URL.createObjectURL(file)
    }));
    setImgChng('46');
  };


    const updateProfileInfo = async () => {
        const frmData = new FormData();
        const response = await fetch(profileInfo.avatar);
        const blob = await response.blob();
    
        frmData.append('avatar', blob, 'image.jpeg');
        frmData.append('username', profileInfo.username);
        frmData.append('languages', profileInfo.languages);
        frmData.append('bio', profileInfo.bio);
        if (profileInfo.currentPassword) {
          frmData.append('currentPassword', profileInfo.currentPassword);
        }
        if (profileInfo.newPassword) {
          frmData.append('newPassword', profileInfo.newPassword);
        }
    
        try {
          await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`, frmData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data'
            },
          });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
    
      if (loading || !authUser) {
        return <div>Loading...</div>;
      }


  return (
    <div className="form-group-sett m-40 mb-172">
      <div className="form-group1">
        <div className="profile__img-upload">
          <div className='img-up jst'>
            {profileInfo.avatar ?
              <Image
                className='uploadedImage'
                alt="not found"
                fill={true}
                src={imgChng === '64' ? `data:image/png;base64,${profileInfo.avatar}` : profileInfo.avatar}
              />
              :
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}>
                <span>Avatar</span>
                <span>200x200</span>
              </div>
            }
            <input
              type="file"
              name="myImage"
              className="inputfileupload2"
              onChange={(event) => handleFileUpload(event)}
            />
          </div>
        </div>
        <div className="form-group w-100">
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={authUser?.username}
              type="text"
              id="username"
              onChange={(e) => handleOnChangeInput('username', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="languages">Languages</label>
            <input
              onChange={(e) => handleOnChangeInput('languages', e.target.value)}
              value={profileInfo.languages}
              type="text"
              id="languages"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="biography" className='mb-8'>Biography</label>
        <textarea
          value={profileInfo.bio}
          onChange={(e) => handleOnChangeInput('bio', e.target.value)}
          id="biography"
        ></textarea>
      </div>
      <div className='p-33'>
        <h1 id='nn'>Change Password:</h1>
        <div className='form-group1'>
          <div className="form-group w-40">
            <label htmlFor="passwordold">Current Password</label>
            <input
              value={profileInfo.currentPassword}
              onChange={(e) => handleOnChangeInput('currentPassword', e.target.value)}
              type="password"
              className="form-control"
              id="passwordold"
            />
          </div>
          <div className="form-group w-40">
            <label htmlFor="passwordnew">New Password</label>
            <input
              value={profileInfo.newPassword}
              onChange={(e) => handleOnChangeInput('newPassword', e.target.value)}
              type="password"
              className="form-control"
              id="passwordnew"
            />
          </div>
        </div>
      </div>
      <div className="profile__About-button">
        <button type='button' id='profile__About-button' onClick={updateProfileInfo}>Submit</button>
      </div>
    </div>
  );
};

export default Profile;
