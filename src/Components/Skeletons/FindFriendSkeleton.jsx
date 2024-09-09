import Loader from "../SmallComponents/Loader/Loader";

const skeletonData = [
  { id: 1 },
];

const FindFriendSkeleton = () => {
  return (
    <div className="bg-people-background h-screen">
    <div className="overlay h-screen pt-5">
      <div className="flex justify-center flex-wrap gap-8">
        {skeletonData.map((data) => (
          <div
            key={data.id}
            className="h-[225px] w-[220px] border border-primary rounded-md flex items-center justify-center"
          >
            <Loader />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default FindFriendSkeleton;
