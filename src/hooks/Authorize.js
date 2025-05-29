import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { env } from "../utilities/function";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearCookie, setCookie } from "../utilities/cookies";
//import axios from 'axios';
//import { useMessage } from '../components/Header';
import { SocketProvider } from "./useSocket";

const authorizeContext = createContext();

const AuthorizationProvider = ({ children }) => {
  const [content, setContent] = useState(
    <Loading message="Please wait, logging you in..." />
  );
  const [user, setUser] = useState({});
  const [currentOrganization, setCurrentOrganization] = useState({});
  const navigate = useNavigate();
  // const { showError } = useMessage();

  const signOut = () => {
    clearCookie("accessToken");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("org");
    localStorage.removeItem("user");
    const redirectTo =
      env("AUTHENTICATION_CLIENT") +
      "/logout?redirectto=" +
      encodeURIComponent(env("DOMAIN")) +
      "&&referrer=" +
      encodeURIComponent(env("DOMAIN"));

    setContent(
      <Loading
        message="Some thing went worng please try again some time later"
        redirectTo={redirectTo}
      />
    );
  };

  const authorize = async (loggedIn, cb) => {
    if (loggedIn) {
      setContent(children);
    } else {
      const redirectTo =
        env("AUTHENTICATION_CLIENT") +
        "/login?redirectto=" +
        encodeURIComponent(window.location.href) +
        "&&referrer=" +
        window.location.href;
      setContent(
        <Loading
          message="Please wait, redirecting you to Clikkle Accounts"
          redirectTo={redirectTo}
        />
      );
    }
    if (typeof cb === "function") cb(setUser);
  };

  const checkUserSubscription = async (userId) => {
    try {
      const response = await axios.post(`/user/subscription/check`, {
        userId: userId,
      });
      let data = response.data;
      if (data.success) {
        localStorage.setItem("subscriptionId", data.subscriptionId);
        await checkOrganization();
      } else {
        navigate("/walkover");
      }
    } catch (e) {
      console.log("subscription/check Error:", e);
      navigate("/walkover");
    }
  };
  const getOrganizations = async () => {
    try {
      const response = await axios.get(`/hr/organization`);
      let data = response.data;
      if (data.success) {
        if (data.data.length === 0) {
          navigate("/walkover");
        } else {
          //navigate("/listOrganization");
          await checkOrganization();
        }
      }
    } catch (e) {
      console.log("Error List of Organization", e);
    }
  };

  const checkOrganization = async () => {
    let selectedOrg = localStorage.getItem("org");
    if (selectedOrg) {
      try {
        selectedOrg = JSON.parse(selectedOrg);
        const response = await axios.post(`/hr/organization/select`, {
          organizationId: selectedOrg._id,
        });

        let data = response.data;
        if (!data.success) {
          navigate("/listOrganization");
        } else {
          setCookie("orgToken", data.data);
          setCurrentOrganization(selectedOrg);
        }
      } catch (e) {
        console.log("Error select of Organization", e);
        navigate("/listOrganization");
      }
    } else {
      navigate("/listOrganization");
    }
  };

  const createSession = async (refreshToken, user) => {
    try {
      const response = await axios.post(`/open/session`, {
        refreshToken,
        userId: user._id,
        userType: "hr",
      });
      let data = response.data;
      if (data.success) {
        setCookie("refreshToken", data.token);
        //await checkUserSubscription(user.id);
        await getOrganizations();
        authorize(true, (setUser) => setUser(user));
      } else {
        authorize(true, (setUser) => setUser(user));
        // navigate("/walkover");
        setTimeout(() => {
          signOut();
        }, [600000]);
      }
    } catch (e) {
      authorize(true, (setUser) => setUser(user));
      // navigate("/walkover");
      setTimeout(() => {
        signOut();
      }, [600000000]);
    }
  };

  useEffect(() => {
    (async () => {
      // try {
      //     // Simulate fetching user data from server
      //     const dummyUser = { id: 123, name: 'Test', email: 'test@test.com', role: 'user' };
      //     setUser(dummyUser);
      //     authorize(true, setUser => setUser(dummyUser));
      // } catch (err) {
      //     console.log(err);
      //     handleAxiosError(err, showError);
      //     authorize(false);
      // }
      try {
        //  const loggedInUserEmail = getCookie('loggedInUserEmail');
        const queryParameters = new URLSearchParams(window.location.search);
        const userId = queryParameters.get("userId");
        console.log("userId :", userId);
        const refreshToken = queryParameters.get("refreshToken");
        console.log("refreshToken :", refreshToken);
        console.log(userId);

        if (userId) {
          var formData = new FormData();
          formData.append("id", userId);
          const response = await fetch(
            "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
            // "https://api.campaigns.clikkle.com/get_user_profile",
            // "http://localhost:5000/api/auth/get_user_profile",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("user found ...",responseData);
            let { user } = responseData;
            user.refreshToken = refreshToken;
            localStorage.setItem("user", JSON.stringify(user));
            await createSession(refreshToken, user);
            // authorize(true, (setUser) => setUser(user));
          } else {
            console.log("user not found");
          }
        } else if (localStorage.getItem("user")) {
          let user = JSON.parse(localStorage.getItem("user"));
          await createSession(user.refreshToken, user);
        } else {
          authorize(false);
        }
      } catch (err) {
        console.log(err);
        // handleAxiosError(err, showError);
        authorize(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <authorizeContext.Provider
      value={{ authorize, setUser, user, setContent, currentOrganization }}
    >
      <SocketProvider>{content}</SocketProvider>
    </authorizeContext.Provider>
  );
};

const useAuthorize = () => useContext(authorizeContext).authorize;
const useUser = () => useContext(authorizeContext)?.user;
const useOrganization = () => useContext(authorizeContext)?.currentOrganization;
const useSetUser = () => useContext(authorizeContext).setUser;
const useSetContent = () => useContext(authorizeContext).setContent;
const useEmployees = () => useContext(authorizeContext)?.employees;

export default AuthorizationProvider;
export {
  useAuthorize,
  useUser,
  useSetUser,
  useSetContent,
  useEmployees,
  useOrganization,
};
