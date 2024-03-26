import BackgroundAnimation from '@/app/components/common/BackgroundAnimation';

export default function Home() {
  return (
    <div className="relative">
      <BackgroundAnimation />
      <div className="z-[9999] flex text-center md:max-w-6xl w-full mx-auto justify-center items-center p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col text-white">
        <h1 className="sm:text-9xl font-asap font-bold text-6xl mb-5">Organize your files better</h1>
        <p className="mt-2 max-w-3xl font-asap leading-8 text-lg">
          Our file storage app provides a simple and intuitive solution for storing your files securely.
          Whether you're a professional managing important documents or an individual looking to keep your
          memories safe, our app offers a straightforward way to store and access your files anytime,
          anywhere.
        </p>
      </div>
    </div>

  );
}
