import ReactFlagsSelect from "react-flags-select";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axios";
import { BASE_URL, API_VERSION } from "@/config";
import TimezoneSelect from 'react-timezone-select';
import useAuth from "@/contexts/auth.contexts";

const GeneralSettings2 = () => {
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
        gender: "",
        birth_date: "",
        rating: 0,  
        sample_designs: []
    });

    useEffect(() => {
        if (authUser) {
            // Try fetching designer profile
            axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`)
                .then(response => {
                    setGInfo(response.data);
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        // Designer profile not found, create one
                        axiosInstance.post(`${BASE_URL}/${API_VERSION}/user/profile/designer/`, {
                            user: authUser.id,
                            firstname: "",
                            lastname: "",
                            country: "",
                            city: "",
                            timezone: "",
                            address: "",
                            state: "",
                            zip_code: "",
                            phone: "",
                            gender: "",
                            birth_date: "",
                            rating: 0,
                            sample_designs: []
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                            }
                        }).then(response => {
                            setGInfo(response.data);
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
        setGInfo(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const updateG = async () => {
        try {
            await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`, gInfo, {
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
          <input type="email" value={authUser?.email} className="form-control" id="name" readOnly />
        </div>
        <div className='form-group1'>
          <div className="form-group w-40">
            <label htmlFor="first-name">First Name</label>
            <input
              onChange={(e) => { handleOnChangeInput('firstname', e.target.value); }}
              type="text" value={gInfo.firstname} className="form-control" id="first-name" />
          </div>
          <div className="form-group w-40">
            <label htmlFor="last-name">Last Name</label>
            <input
              onChange={(e) => { handleOnChangeInput('lastname', e.target.value); }}
              type="text" value={gInfo.lastname} className="form-control" id="last-name" />
          </div>
        </div>
        <div className='form-group1'>
          <div className="form-group w-40">
            <label htmlFor="birth-date">Month / Day / Year of Birth</label>
            <input
              onChange={(e) => { handleOnChangeInput('birth_date', e.target.value); }}
              type="date" value={gInfo.birth_date} className="form-control" id="birth-date" />
          </div>
          <div className="form-group w-40">
            <label htmlFor="gender">Gender</label>
            <select id='gender'
              onChange={(e) => { handleOnChangeInput('gender', e.target.value); }}
              value={gInfo.gender}>
              <option disabled value="">Please Select</option>
              <option value='M'>Male</option>
              <option value='F'>Female</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address details</label>
          <input
            onChange={(e) => { handleOnChangeInput('address', e.target.value); }}
            type="text" value={gInfo.address} className="form-control" id="address" />
        </div>
        <div className='form-group1'>
          <div className="form-group w-30">
            <label htmlFor="country">Country</label>
            <ReactFlagsSelect
              selected={gInfo.country}
              onSelect={(code) => {
                setSelected(code);
                handleOnChangeInput('country', code);
              }}
              selectButtonClassName='SelectCountry'
              searchable
            />
          </div>
          <div className="form-group w-30">
            <label htmlFor="city">City</label>
            <input
              onChange={(e) => { handleOnChangeInput('city', e.target.value); }}
              value={gInfo.city} type="text" className="form-control" id="city" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="timezone">Time Zone</label>
            <TimezoneSelect
              value={gInfo.timezone}
              onChange={(timezone) => handleOnChangeInput('timezone', timezone)}
            />
          </div>
        </div>
        <div className='form-group1'>
          <div className="form-group w-30">
            <label htmlFor="state">State (opt.)</label>
            <input
              onChange={(e) => { handleOnChangeInput('state', e.target.value); }}
              value={gInfo.state} type="text" className="form-control" id="state" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="zip">Zip (opt.)</label>
            <input
              onChange={(e) => { handleOnChangeInput('zip_code', e.target.value); }}
              value={gInfo.zip_code} type="text" className="form-control" id="zip" />
          </div>
          <div className="form-group w-30">
            <label htmlFor="phone">Phone Number</label>
            <input
              onChange={(e) => { handleOnChangeInput('phone', e.target.value); }}
              value={gInfo.phone} type="text" className="form-control" id="phone" />
          </div>
        </div>
                <div className='profile__submit-button mt-192'>
                    <button type={'button'} onClick={updateG} className="btn btn-primary">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default GeneralSettings2;
