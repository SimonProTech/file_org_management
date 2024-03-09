'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';
import google from '../../../public/assets/google.svg';

const HeaderButtonsComponent = () => {
  const signInButton = async () => {
    try {
      await signIn('google', {
        redirect: true,
        callbackUrl: '/files',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Problem with logging',
        description: 'There was an error logging in. Please try again',
      });
    }
  };

  return (
    <Button variant="header" onClick={signInButton}>
      <Image className="w-8 mr-2" src={google} alt="google" />
      Google
    </Button>
  );
};

export default HeaderButtonsComponent;
