import useCounterStore from "../hooks/useCounterStore";

export default function Counter() {
  // const [state, store] = useCounterStore();
  const [{ count }] = useCounterStore();

  return (
    <div>
      <p>Count {count}</p>
    </div>
  );
}
