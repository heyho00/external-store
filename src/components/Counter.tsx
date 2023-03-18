import useCounterStore from "../hooks/useCounterStore";

export default function Counter() {
  const store = useCounterStore();

  return (
    <>
      <div>Count: {store.count}</div>
    </>
  );
}
