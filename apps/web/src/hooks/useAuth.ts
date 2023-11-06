import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_HOST } from "../config/general.config";


export const useAuth = (isProtected = false) => {
  const [profile, setProfile] = useState();
  
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response: any = await fetch(`${API_HOST}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const profileResponse = await response.json();
      setProfile(profileResponse);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogIn = async (pin: string, shouldGoToHome = false) => {
    try {
      const response: any = await fetch(`${API_HOST}/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pin": pin,
        })
      });
      console.log(response);
      const tokenResponse = await response.json();
      if (!tokenResponse.token) {
        return;
      }
      localStorage.setItem('token', tokenResponse.token);
      if (shouldGoToHome) {
        goToHome();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignUp = async (name: string, pin: string) => {
    try {
      const response: any = await fetch(`${API_HOST}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "pin": pin
        })
      });
      await handleLogIn(pin);
      await getProfile();
      goToHome();
    } catch (error) {
      console.error(error);
    }
  }

  const goToHome = () => {
    window.location.href = "/";
  }

  const handleLogOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    goToHome();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token, 'TOKEN');
    if (!token && isProtected) {
      goToHome();
    }

    if (!profile && token && token !== 'undefined') {
      getProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleLogIn,
    handleSignUp,
    handleLogOut,
    goToHome,
    profile
  };
}