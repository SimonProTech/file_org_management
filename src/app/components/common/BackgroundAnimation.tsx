const BackgroundAnimation = () => (
  <div className="background-video">
    <div className="fixed left-0 top-0 bg-black/50 w-full h-full z-50" />
    <video className="w-full h-full object-cover" autoPlay muted loop>
      <source src="../assets/bg.mov" type="video/mp4" />
    </video>
  </div>
);

export default BackgroundAnimation;
