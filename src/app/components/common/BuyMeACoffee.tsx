import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BuyMeACoffee = () => (
  <div className="fixed bottom-5 right-5 z-[999999999999]">
    <Link href={process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE as string} target="_blank" rel="noreferrer">
      <Image
        src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
        alt="Buy Me A Coffee"
        width={120}
        height={120}
        className="hover:scale-105 transition-all"
      />
    </Link>
  </div>
);

export default BuyMeACoffee;
