import React, { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axios";
import { BASE_URL, API_VERSION } from "@/config";
import TimezoneSelect from 'react-timezone-select';
import useAuth from "@/contexts/auth.contexts";
import ReactFlagsSelect from 'react-flags-select'; // Assuming you are using this library for country selection
import PhoneInput from 'react-phone-input-2'; // Assuming you are using this library for phone input

const GeneralSettings = () => {
  const { authUser, loading } = useAuth();
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
    if (authUser) {
      axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/profile/client/${authUser?.id}`)
        .then(response => {
          setGInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [authUser]);

  const handleOnChangeInput = (key, value) => {
    setGInfo(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateGeneralInfo = async () => {
    try {
      await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/client/${authUser?.id}`, gInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
    <div>
      <form className="form-group-sett m-40 mb-172">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={authUser.email} className="form-control" id="email" readOnly />
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
            <TimezoneSelect
              value={gInfo.timezone}
              onChange={(timezone) => handleOnChangeInput('timezone', timezone)}
            />
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
