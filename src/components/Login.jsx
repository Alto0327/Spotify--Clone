import React from 'react';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fbae3b0191774f28a48d431355216faf&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
function Login() {
  
    return (
    <>
        <button onClick={() => window.location = AUTH_URL}>Log into spotify</button>
    </>
  );
}

export default Login;
