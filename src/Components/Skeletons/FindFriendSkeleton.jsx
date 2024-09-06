import Loader from "../SmallComponents/Loader/Loader";

const skeletonData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
];

const FindFriendSkeleton = () => {
  return (
    <div className="flex">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {skeletonData.map((data) => (
          <div
            key={data.id}
            className="h-[220px] w-[180px] border border-primary rounded-md flex items-center justify-center"
          >
            <Loader />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriendSkeleton;
