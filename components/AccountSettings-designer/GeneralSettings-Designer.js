import ReactFlagsSelect from "react-flags-select";
import React, {useEffect, useState} from "react";
import 'react-phone-input-2/lib/style.css'

import PhoneInput from 'react-phone-input-2'
import {useSelector} from "react-redux";
import axiosInstance from "@/helpers/axios";
import {API_VERSION, BASE_URL} from "@/config";
import useAuth from "@/contexts/auth.contexts";

// import TimezoneSelect from 'react-timezone-select'


const GeneralSettings2 = () => {
  const { authUser, loading } = useAuth();
  console.log("the user is" + authUser?.name)
  const [selected, setSelected] = useState("EG");
  const [value, setValue] = useState()
  


  // "sample_designs": []

    const [gInfo,setgInfo]= useState(
        {
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
            phone: "",
    });

    useEffect(() => {
      if (authUser) {
        axiosInstance.get(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser?.id}`)
          .then(response => {
            setgInfo(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    }, [authUser]);

  const handleOnChangeInput= (key, value) => {
          setgInfo(prevState => ({
              ...prevState,
              [key]: value,
          }));

  }
  const updateG =async ()=>{
    try {
      await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser?.id}`, gInfo, {
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
          <input
              type="email" value={authUser?.email} className="form-control" id="name" />
        </div>
        
        <div className='form-group1'> 
          <div className="form-group w-40">
                <label htmlFor="first-name">First Name</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('firstname',e.target.value)}}

                    type="text" value={gInfo.firstname} className="form-control" id="first-name" />
            </div>
            <div className="form-group w-40">
                <label htmlFor="last-name">Last Name</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('lastname',e.target.value)}}

                    type="text" value={gInfo.lastname} className="form-control" id="last-name" />
            </div>
        </div>
        <div className='form-group1'> 
          <div className="form-group w-40">
                <label htmlFor="birth-date">Month / Day /	Year of Birth</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('birth_date',e.target.value)}}

                    type="Date" value={gInfo.birth_date} className="form-control" id="birth-date" />
            </div>
            <div className="form-group w-40">
                <label htmlFor="gender">Gender</label>
                <select id={'gender'}
                    onChange={(e)=>{handleOnChangeInput('gender',e.target.value)}}

                    value={gInfo.gender}>
                    <option disabled value="">Please Select</option>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                </select>
            </div>
        </div>
        {/*<div className="form-group">*/}
        {/*  <label htmlFor="text">Link your portfolio (behance, dribbble, etc)</label>*/}
        {/*  <input type="text" className="form-control" id="Address" />*/}
        {/*  <input type="text" className="form-control" id="Address" />*/}
        {/*</div>*/}
        {/*<div className="form-group">*/}
        {/*  <label htmlFor="text">Social media</label>*/}
        {/*  <input type="text" className="form-control" id="social" />*/}
        {/*</div>*/}
        <div className="form-group">
          <label htmlFor="address">Address details</label>
          <input
              onChange={(e)=>{handleOnChangeInput('address',e.target.value)}}

              type="text" value={gInfo.address} className="form-control" id="address" />
        </div>

       <div className='form-group1'> 

            <div className="form-group w-30">
                <label htmlFor="last-name">Country</label>
                                <ReactFlagsSelect
                                    selected={gInfo.country}
                                    onSelect={(code) => {
                                        setSelected(code);
                                        handleOnChangeInput('country',code)
                                    }}

                                    selectButtonClassName='SelectCountry'
                                    searchable
                                />
            </div>
            <div className="form-group w-30">
                <label htmlFor="last-name">City</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('city',e.target.value)}}

                    value={gInfo.city} type="text" className="form-control" id="City" />
            </div>
            <div className="form-group w-30">
                <label htmlFor="first-name">Time Zone</label>
                <input value={gInfo.timezone} type="text"
                       onChange={(e)=>{handleOnChangeInput('timezone',e.target.value)}}

                       className="form-control" id="Time-Zone" />
                {/*<TimezoneSelect*/}
                {/*  value={selectedTimezone}*/}
                {/*  onChange={(e)=>{handleOnChangeInput('timezone',e.value)}}*/}
                {/*  // selectButtonClassName='SelectCountry'*/}
                {/*/>*/}
            </div>
        </div>
        <div className='form-group1'> 
          <div className="form-group w-30">
                <label htmlFor="State">State(opt.)</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('state',e.target.value)}}

                    value={gInfo.state} type="text" className="form-control" id="State" />
            </div>
            <div className="form-group w-30">
                <label htmlFor="Zip">Zip(opt.)</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('zip_code',e.target.value)}}

                    value={gInfo.zip_code} type="text" className="form-control" id="Zip" />
            </div>
            <div className="form-group w-30">
                <label htmlFor="Phone-Number">Phone Number</label>
                <input
                    onChange={(e)=>{handleOnChangeInput('phone',e.target.value)}}

                    value={gInfo.phone} type="text" className="form-control" id="Phone-Number" />
            </div>
        </div>
        <div className='profile__submit-button mt-192' >
          <button type={'button'} onClick={()=>{updateG()}}  className="btn btn-primary">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings2;
