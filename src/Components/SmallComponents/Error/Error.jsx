const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg">
          An unexpected error occurred. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default Error;
