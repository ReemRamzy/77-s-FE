import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { user_info } from "@/app/Redux/Actions"; // Assuming user_info is an action for updating user information
import axiosInstance from "@/helpers/axios";
import { BASE_URL, API_VERSION } from "@/config";
import useAuth from "@/contexts/auth.contexts";
import ReactFlagsSelect from 'react-flags-select'; // Assuming you are using this library for country selection
import PhoneInput from 'react-phone-input-2'; // Assuming you are using this library for phone input

const GeneralSettings = ({ data, onDataChange }) => {
  const authUser = useAuth();
  const [Email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [gInfo, setGInfo] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    timezone: "",
    address: "",
    state: "",
    zip_code: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setGInfo({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        country: data.country || "",
        city: data.city || "",
        timezone: data.timezone || "",
        address: data.address || "",
        state: data.state || "",
        zip_code: data.zip_code || "",
        phone: data.phone || "",
      });
      setEmail( data.user?.email || "");
    }
  }, [data]);

  const handleOnChangeInput = (key, value) => {
    const newGInfo = { ...gInfo, [key]: value };
    setGInfo(newGInfo);
    onDataChange(newGInfo);
  };

  const updateGeneralInfo = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/client/${data.user.id}`, gInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        dispatch(user_info(res.data));
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
    <div>
      <form className="form-group-sett m-40 mb-172">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={Email} className="form-control" id="email" readOnly />
        </div>

        <div className="form-group1">
          <div className="form-group w-40">
            <label htmlFor="first-name">First Name</label>
            <input onChange={(e) => handleOnChangeInput('firstname', e.target.value)} type="text" value={gInfo.firstname} className="form-control" id="first-name" />
          </div>
          <div className="form-group w-40">
            <label htmlFor="last-name">Last Name</label>
            <input onChange={(e) => handleOnChangeInput('lastname', e.target.value)} type="text" value={gInfo.lastname} className="form-control" id="last-name" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address details</label>
          <input onChange={(e) => handleOnChangeInput('address', e.target.value)} type="text" value={gInfo.address} className="form-control" id="address" />
        </div>

        <div className="form-group1">
          <div className="form-group w-30">
            <label htmlFor="country">Country</label>
            <ReactFlagsSelect
              selected={gInfo.country}
              onSelect={(code) => handleOnChangeInput('country', code)}
              selectButtonClassName="SelectCountry"
              searchable
            />
          </div>
          <div className="form-group w-30">
            <label htmlFor="city">City</label>
            <input onChange={(e) => handleOnChangeInput('city', e.target.value)} value={gInfo.city} type="text" className="form-control" id="city" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="timezone">Time Zone</label>
            <input onChange={(e) => handleOnChangeInput('timezone', e.target.value)} value={gInfo.timezone} type="text" className="form-control" id="timezone" />
          </div>
        </div>

        <div className="form-group1">
          <div className="form-group w-30">
            <label htmlFor="state">State (opt.)</label>
            <input onChange={(e) => handleOnChangeInput('state', e.target.value)} value={gInfo.state} type="text" className="form-control" id="state" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="zip">Zip (opt.)</label>
            <input onChange={(e) => handleOnChangeInput('zip_code', e.target.value)} value={gInfo.zip_code} type="text" className="form-control" id="zip" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput country={'us'} value={gInfo.phone} onChange={(phone) => handleOnChangeInput('phone', phone)} />
          </div>
        </div>

        <div className="profile__submit-button mt-192">
          <button type="button" onClick={updateGeneralInfo} className="btn btn-primary">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
