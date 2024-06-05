import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GeneralSettings from "@/components/AccountSettings/GeneralSettings";
import MembershipSettings from "@/components/AccountSettings/MembershipSettings";
import IDVerificationSettings from "@/components/AccountSettings/IDVerificationSettings";
import NotificationsSettings from "@/components/AccountSettings/NotificationsSettings";
import ProfileSettings from "@/components/AccountSettings/ProfileSettings";

const AccountSettings = () => {
  const [activeComponent, setActiveComponent] = useState("General");

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
          {activeComponent === "General" && <GeneralSettings />}
          {activeComponent === "Profile" && <ProfileSettings />}
          {activeComponent === "Notifications" && <NotificationsSettings  />}
          {activeComponent === "ID Verification" && <IDVerificationSettings  />}
          {activeComponent === "Membership" && <MembershipSettings />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;
