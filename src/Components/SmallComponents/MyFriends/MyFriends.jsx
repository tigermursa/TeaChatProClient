/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";

const MyFriends = ({ myFriendsIdArray }) => {
  const { data } = useGetUserByIDArrayQuery(myFriendsIdArray, {
    skip: !myFriendsIdArray,
  });

  const friendsArray = data?.data;

  return (
    <div className="mt-10">
      {friendsArray?.map((friend) => (
        <div key={friend?._id}>
          <Link to={`/profile/${friend?._id}`}>
            <div className="w-[180px] border border-primary p-3 rounded-md">
              <img src={friend?.userImage} />
              <div className="text-white text-center mt-3">
                <p>{friend?.username}</p>
                <p>{friend?.work}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyFriends;
