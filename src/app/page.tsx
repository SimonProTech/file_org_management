import BackgroundAnimation from '@/app/components/common/BackgroundAnimation';

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <div className="z-[9999] flex text-center max-w-6xl mx-auto justify-center items-center h-screen flex-col relative text-white">
        <h1 className="text-9xl mb-5">Organize your files better</h1>
        <p className="mt-2 max-w-3xl leading-8 text-lg">
          Our file storage app provides a simple and intuitive solution for storing your files securely.
          Whether you're a professional managing important documents or an individual looking to keep your
          memories safe, our app offers a straightforward way to store and access your files anytime,
          anywhere.
        </p>
      </div>
    </>

  );
}
