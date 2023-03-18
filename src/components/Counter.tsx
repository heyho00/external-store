import useCounterStore from "../hooks/useCounterStore";

export default function Counter() {
  const counterStore = useCounterStore();
  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
