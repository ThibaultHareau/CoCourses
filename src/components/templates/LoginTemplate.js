import React from 'react';

import LoginForm from '../molecules/LoginForm';

export default function LoginTemplate({signInOnPress}) {
  
  return (
    <LoginForm signInOnPress={signInOnPress}/>
  );
}
