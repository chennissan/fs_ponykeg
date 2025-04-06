export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to PonyKeg Home</h1>
      <video className="home-video" autoPlay muted playsInline>
        <source src="pkf1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
  }
  