'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import google from '../../../public/assets/google.svg';

const HeaderButtonsComponent = () => {
  const signInButton = () => signIn('google');
  return (
    <Button variant="header" onClick={signInButton}>
      <Image className="w-8 mr-2" src={google} alt="google" />
      Google
    </Button>
  );
};

export default HeaderButtonsComponent;
