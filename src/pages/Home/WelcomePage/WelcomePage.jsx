import Thought from "../../../Components/PagesComponents/Thought/Thought";
import video from "../../../assets/bg-videos/bg-video.mp4"; // Correct the import

const WelcomePage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video} // Use the imported variable
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 w-full h-full overlay"></div>
      <Thought />
    </div>
  );
};

export default WelcomePage;
