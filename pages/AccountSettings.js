import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GeneralSettings from "@/components/AccountSettings/GeneralSettings";
import MembershipSettings from "@/components/AccountSettings/MembershipSettings";
import IDVerificationSettings from "@/components/AccountSettings/IDVerificationSettings";
import NotificationsSettings from "@/components/AccountSettings/NotificationsSettings";
import ProfileSettings from "@/components/AccountSettings/ProfileSettings";
import { BASE_URL, API_VERSION } from "@/config";
import Cookies from "js-cookie";
import useAuth from "@/contexts/auth.contexts";
import { useDispatch, useSelector } from "react-redux";
import { user_client, user_info, refresh_Account } from "@/app/Redux/Actions";

const AccountSettings = () => {
  const { user } = useAuth();
  const [activeComponent, setActiveComponent] = useState("General");
  const user_c = useSelector((state) => state.user_client);
  const revo = useSelector((state) => state.refresh_Account);
  const csrfToken = Cookies.get("77SDESIGN_CSRF_TOKEN");
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    general: {},
    profile: {},
    notifications: {},
    idVerification: {},
    membership: {},
  });

  useEffect(() => {
    const getAccount = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await fetch(`${BASE_URL}/${API_VERSION}/user/profile/client/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (data.user) {
          dispatch(user_client(data));
          setUserData(data);
          setFormData({
            general: data,
            profile: data,
            notifications: data,
            idVerification: data,
            membership: data,
          });
        } else {
          console.log("data fetched sucess");
        }
      }
    };

    getAccount();
  }, [revo, user, dispatch, csrfToken]);

  const handleFormDataChange = (tab, newData) => {
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        ...newData,
      },
    }));
  };

  return (
    <div className="settings-container">
      <div className="home_section mainscr">
        <Navbar />
        <div className="max mt-133">
          <div className="my-workkk mb-46">
            <h3 id="title">Account Settings</h3>
          </div>

          <div className="settings-nav">
            <button
              className={` ${activeComponent === "General" ? "active nav-btn" : "nav-btn"}`}
              onClick={() => setActiveComponent("General")}
            >
              General
            </button>
            <button
              className={`nav-btn ${activeComponent === "Profile" ? "active" : ""}`}
              onClick={() => setActiveComponent("Profile")}
            >
              Profile
            </button>
            <button
              className={`nav-btn ${activeComponent === "Notifications" ? "active" : ""}`}
              onClick={() => setActiveComponent("Notifications")}
            >
              Notifications
            </button>
            <button
              className={`nav-btn ${activeComponent === "ID Verification" ? "active" : ""}`}
              onClick={() => setActiveComponent("ID Verification")}
            >
              ID Verification
            </button>
            <button
              className={`nav-btn ${activeComponent === "Membership" ? "active" : ""}`}
              onClick={() => setActiveComponent("Membership")}
            >
              Membership
            </button>
          </div>
        </div>
      </div>

      <div className="mainscr h-60v">
        <div className="settings-content">
          {activeComponent === "General" && <GeneralSettings data={formData.general} onDataChange={(newData) => handleFormDataChange("general", newData)} />}
          {activeComponent === "Profile" && <ProfileSettings data={formData.profile} onDataChange={(newData) => handleFormDataChange("profile", newData)} />}
          {activeComponent === "Notifications" && <NotificationsSettings data={formData.notifications} onDataChange={(newData) => handleFormDataChange("notifications", newData)} />}
          {activeComponent === "ID Verification" && <IDVerificationSettings data={formData.idVerification} onDataChange={(newData) => handleFormDataChange("idVerification", newData)} />}
          {activeComponent === "Membership" && <MembershipSettings data={formData.membership} onDataChange={(newData) => handleFormDataChange("membership", newData)} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;
