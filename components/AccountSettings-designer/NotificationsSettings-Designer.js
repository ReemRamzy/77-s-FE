import React, { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axios";
import { BASE_URL, API_VERSION } from "@/config";
import useAuth from "@/contexts/auth.contexts";

const Notifications = () => {
  const { authUser, loading } = useAuth();
  const [notify, setNotify] = useState({
    notify: true,
    email_comments_messages: true,
    email_remind_deadlines: true,
    email_winner: true,
  });

  useEffect(() => {
    if (authUser) {
      axiosInstance
        .get(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`)
        .then((response) => {
          setNotify(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            axiosInstance
              .post(
                `${BASE_URL}/${API_VERSION}/user/profile/designer/`,
                {
                  user: authUser.id,
                  notify: true,
                  email_comments_messages: true,
                  email_remind_deadlines: true,
                  email_winner: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "access_token"
                    )}`,
                  },
                }
              )
              .then((response) => {
                setNotify(response.data);
              })
              .catch((createError) => {
                console.error(
                  "Error creating designer profile:",
                  createError
                );
              });
          } else {
            console.error("Error fetching designer profile:", error);
          }
        });
    }
  }, [authUser]);

  const handleOnChangeInput = (key, value) => {
    setNotify((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateNotify = async () => {
    try {
        const payload = {
            notify: notify.notify,
            email_comments_messages: notify.email_comments_messages,
            email_remind_deadlines: notify.email_remind_deadlines,
            email_winner: notify.email_winner
        };
        await axiosInstance.patch(`${BASE_URL}/${API_VERSION}/user/profile/designer/${authUser.id}`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

  return (
    <div>
      <form  className="form-group-sett1 m-40 mb-172" >
      <div>
        <p>
          Desktop and mobile
          <br /> Get browser notifications on your device, even when 77S design
          is closed.
        </p>
        <label className="switch">
          <input
            type="checkbox"
            onChange={(e) =>
              handleOnChangeInput("notify", e.target.checked)
            }
            checked={notify.notify}
          />
          <span className="slider round">
            Enable browser notifications on your device new (project/contest -
            rate - feedback)
          </span>
        </label>
      </div>
      <div className="notification-type">
        <p>Email notifications</p>
        <ul>
          <li>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleOnChangeInput(
                    "email_comments_messages",
                    e.target.checked
                  )
                }
                checked={notify.email_comments_messages}
              />
              <span className="slider round">Comments and Rate</span>
            </label>
          </li>
          <li>
            <label className="switch ">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleOnChangeInput(
                    "email_remind_deadlines",
                    e.target.checked
                  )
                }
                checked={notify.email_remind_deadlines}
              />
              <span className="slider round">
                Remind deadlines to complete projects
              </span>
            </label>
          </li>
          <li>
            <label className="switch ">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleOnChangeInput("email_winner", e.target.checked)
                }
                checked={notify.email_winner}
              />
              <span className="slider round">Who is winner</span>
            </label>
          </li>
        </ul>
      </div>
      <div className="profile__submit-button">
        <button
          type={"button"}
          onClick={updateNotify}
          className="btn btn-primary"
        >
          Continue
        </button>
      </div>
      </form>
    </div>
  );
};

export default Notifications;
