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

async function refresh () {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  console.log(response);
  return response;
}

async function logout () {
  // Delete cookies
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  // Refresh page
  window.location.href = "/";
}

export default function Home() {
  const [loginStatus, setLoginStatus] = useState<LoginStatus | null>(null);
  const handleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`;
  }
  const isUserLoggedIn = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/status`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 401) {
      const refreshResult = await refresh();
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
    return <div>Loading...</div>;
  }

  if (loginStatus && loginStatus.status === "success") {
    return (
      <div>
        <h1>Diarity</h1>
        <h4>Powered by NestJS</h4>
        <h2>Welcome, {loginStatus.user.name}!</h2>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Diarity</h1>
        <h4>Powered by NestJS</h4>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    );
  }
}
