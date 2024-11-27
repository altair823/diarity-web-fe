'use client';

import { useEffect, useState } from 'react';

interface LoginStatus {
  status: string;
  user: {
    email: string;
    name: string;
    role: string;
    picture: string;
  };
}

async function Refresh () {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  console.log(response);
  return response;
}

async function Login () {
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`;
}

async function Logout () {
  // Delete cookies
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  // Refresh page
  window.location.href = "/";
}

function LoginButton (loginStatus: string) {
  let buttonText = '';
  let handleLoginButton;
  let googleLogo;
  if (loginStatus && loginStatus === "success") {
    buttonText = "Logout";
    handleLoginButton = Logout;
  } else {
    googleLogo = (
      <img src="/g-logo.png" alt="Google Logo" className="w-5 h-5 float-left mr-3" />
    );
    buttonText = "Login with Google";
    handleLoginButton = Login;
  }
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <button onClick={handleLoginButton} className="google rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {googleLogo}
        {buttonText}
      </button>
    </div>
  );
}

function HelloUser({ user }: { user: { email: string; name: string; role: string; picture: string } }) {
  let helloText = ''
  if (user && user.name) {
    helloText = `Hello, ${user.name}!`
  } else {
    helloText = 'Hello, Guest!'
  }
  return (
    <div>
      <h2 className='text-3xl text-center font-semibold'>
        {helloText}
      </h2>
    </div>
  );
}

export default function Home() {
  const [loginStatus, setLoginStatus] = useState<LoginStatus | null>(null);
  const isUserLoggedIn = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 401) {
      const refreshResult = await Refresh();
      if (refreshResult.status === 201) {
        return isUserLoggedIn();
      }
      setLoginStatus({ status: "error", user: { email: "", name: "", role: "", picture: "" } });
      return;
    }
    const data = await response.json();
    setLoginStatus(data);
    
    return data;
  }
  
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  
  if (!loginStatus) {
    return <div className='text-3xl text-center font-semibold'>Loading...</div>;
  }
  let loginButton = LoginButton(loginStatus.status);
  return (
    <div>
      <HelloUser user={loginStatus.user} />
      {loginButton}
    </div>
  );
}
