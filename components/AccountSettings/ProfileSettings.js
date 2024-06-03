import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh_Account } from "@/app/Redux/Actions";
import axiosInstance from "@/helpers/axios";
import { BASE_URL, API_VERSION } from "@/config";
import Image from "next/image";
import useAuth from "@/contexts/auth.contexts";

const ProfileSettings = ({ data, onDataChange }) => {
  const authUser = useAuth(); // Access the authenticated user
  const [file, setFile] = useState(null);
  const [imgChng, setImgChng] = useState('64');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [profileInfo, setProfileInfo] = useState({
    avatar: "",
    username: "",
    bio: "",
    languages: "",
    currentPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    if (data) {
      setProfileInfo({
        avatar: data.avatar || "",
        username: authUser?.username || data.user.username || "",
        bio: data.bio || "",
        languages: data.languages || "",
        currentPassword: "",
        newPassword: ""
      });
    }
  }, [data, authUser]);

  const handleOnChangeInput = (key, value) => {
    const newProfileInfo = { ...profileInfo, [key]: value };
    setProfileInfo(newProfileInfo);
    onDataChange(newProfileInfo);
  };

  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    handleOnChangeInput("avatar", URL.createObjectURL(e.target.files[0]));
  };

  const updateProfile = async () => {
    const frmData = new FormData();
    const response = await fetch(profileInfo.avatar);
    const blob = await response.blob();

    frmData.append('avatar', blob, 'image.jpeg');
    frmData.append('languages', profileInfo.languages);
    frmData.append('bio', profileInfo.bio);
    frmData.append('username', profileInfo.username);

    try {
      const accessToken = localStorage.getItem('access_token');
      await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/client/${data.user.id}`, frmData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        dispatch(refresh_Account());
        console.log(res.data);
      }).catch((error) => {
        console.log(error.response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
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
              onChange={(event) => {
                setImgChng('46');
                handleFileUpload(event);
              }}
            />
          </div>
        </div>
        <div className="form-group w-100">
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={profileInfo.username}
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
        <button type='button' id='profile__About-button' onClick={updateProfile}>Submit</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
