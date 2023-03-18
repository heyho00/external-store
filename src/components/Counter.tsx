import useSelector from "../hooks/useSelector";

export default function Counter() {
  const count = useSelector((state) => state.count);

  return (
    <>
      <div>Count: {count}</div>
    </>
  );
}
