import { FaHistory, FaTools, FaRegSmileWink } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
      {/* Main Container */}
      <div className="max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 md:p-10">
        {/* Project Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Project Tea Chat Pro
        </h1>

        {/* History Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaHistory className="text-xl text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">
              History of Creating this Website
            </h2>
          </div>
          <p className="text-gray-200 text-sm lg:text-lg leading-relaxed">
            I always wanted to create a chat application where I could chat with
            friends in real time. One day, during a company project, I was told
            to implement chat functionality. I had no experience with it, so I
            had to handle both the backend and frontend of the project.
            <br />I took about a week to learn through YouTube, exploring
            various tutorials and resources. Eventually, I successfully
            implemented the chat feature. This project was a huge learning
            experience for me!
          </p>
        </div>

        {/* Notice Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaTools className="text-xl text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">Notice</h2>
          </div>
          <p className="text-gray-200 text-sm lg:text-lg leading-relaxed">
            This app is still a work in progress. I am making it better every
            day. Currently, it`&apos;s not perfectly responsive, but I`&apos;m
            working on it. I`&apos;m also exploring many UI options to improve
            the overall design and experience. Thank you for your patience!
          </p>
        </div>

        {/* Ending Section */}
        <div className="flex items-center justify-center">
          <FaRegSmileWink className="text-3xl text-blue-600" />
          <p className="text-blue-600 font-semibold ml-2">Stay Tuned!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
