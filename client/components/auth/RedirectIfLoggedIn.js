import React from 'react';

export default function RedirectIfLoggedIn() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `if (JSON.parse(window.localStorage.getItem("mswSettings")).token) {
        window.location = "/account/home"
      }`
      }}
    />
  );
}
