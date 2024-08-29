import { useGetAllThoughtQuery } from "../../../redux/features/thought/thoughtApi";

const Thought = () => {
  const { data } = useGetAllThoughtQuery();
  console.log(data);
  return (
    <div>
      <p>Thought</p>
    </div>
  );
};

export default Thought;
