import { useParams } from "react-router-dom";

const DynamicProfilePage = () => {
  const { id } = useParams();
  console.log(id);

  return <div>hi</div>;
};

export default DynamicProfilePage;
