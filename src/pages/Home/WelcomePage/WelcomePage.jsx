import Thought from "../../../Components/PagesComponents/Thought/Thought";
import videoMp4 from "../../../assets/bg-videos/bg-video.mp4"; // MP4 format
import fallbackImage from "../../../assets/fallbackImage.webp";

const WelcomePage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage} // Fallback image while the video loads
      >
        <source src={videoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full overlay"></div>
      <Thought />
    </div>
  );
};

export default WelcomePage;
