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
  const [Avatar, setAvatar] = useState('');
  const [imgChng, setImgChng] = useState('64');
  const [Username, setUsername] = useState('');
  const [Bio, setBio] = useState('');
  const [Langs, setLangs] = useState("");
  const [cPass, setcPass] = useState('');
  const [nPass, setnPass] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setUsername(authUser?.username || data.user.username || ""); // Fetch username from auth or data object
      setAvatar(data.avatar || "");
      setBio(data.bio || "");
      setLangs(data.languages || "");
    }
  }, [data, authUser]);

  const handleFileUpload = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [randomData, setRandomData] = useState({ number: null, char: null });

  const getRandomNumberAndChar = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    setRandomData({ number: randomNumber, char: randomChar });
  };

  const updateP = async () => {
    const frmData = new FormData();
    const response = await fetch(Avatar);
    const blob = await response.blob();
    getRandomNumberAndChar();
    frmData.append('avatar', blob, 'image.jpeg');
    frmData.append('languages', Langs);
    frmData.append('bio', Bio);
    frmData.append('username', Username); // Include username in the form data

    await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/client/${data.id}`, frmData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      dispatch(refresh_Account(randomData));
      console.log(res.data);
    }).catch((error) => { console.log(error); });
  };

  const ChangeToDesigner = async () => {
    const frmData = new FormData();
    const response = await fetch(Avatar);
    const blob = await response.blob();
    getRandomNumberAndChar();
    frmData.append('user_type', blob, 'designer');

    await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/client/${data.id}`, frmData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      dispatch(refresh_Account(randomData));
      console.log(res.data);
    }).catch((error) => { console.log(error); });
  };

  return (
    <div className="form-group-sett m-40 mb-172">
      <div className="form-group1">
        <div className="profile__img-upload">
          <div className='img-up jst'>
            {Avatar ?
              <Image
                className='uploadedImage'
                alt="not found"
                fill = {true}
                src={imgChng === '64' ?
                  `data:image/png;base64,${Avatar}`
                  : Avatar
                }
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
              placeholder=""
              name="myImage"
              className="inputfileupload2"
              onChange={(event) => {
                setImgChng('46');
                setAvatar(URL.createObjectURL(event.target.files[0]));
              }}
            />
          </div>
        </div>
        <div className="form-group w-100">
          <div>
            <label htmlFor="username">Username</label>
            <input value={Username} type="text" id="Username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="languages">Languages</label>
            <input
              onChange={(e) => setLangs(e.target.value)}
              value={Langs} type="text" id="Languages" />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="biography" className='mb-8'>Biography</label>
        <textarea value={Bio}
          onChange={(e) => setBio(e.target.value)}
          id="Biography"></textarea>
      </div>
      <div className='p-33'>
        <h1 id='nn'>Change Password:</h1>
        <div className='form-group1'>
          <div className="form-group w-40">
            <label htmlFor="passwordold">Current Password</label>
            <input
              value={cPass}
              onChange={(e) => setcPass(e.target.value)}
              type="password" className="form-control" id="passwordold" />
          </div>
          <div className="form-group w-40">
            <label htmlFor="passwordnew">New Password</label>
            <input
              value={nPass}
              onChange={(e) => setnPass(e.target.value)}
              type="password" className="form-control" id="passwordnew" />
          </div>
        </div>
      </div>

      <div className="profile__About-button">
        <button type='button' id='profile__About-button' onClick={ChangeToDesigner}>Convert To Designer</button>
      </div>
      <div className="profile__submit-button">
        <button className={'btn'} type={'button'} onClick={updateP}>Submit</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
