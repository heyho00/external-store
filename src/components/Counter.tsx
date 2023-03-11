import useStore from "../hooks/useStore";

export default function Counter() {
  const store = useStore();
  const { state } = store;

  return (
    <div>
      <p>Count {state.count}</p>
    </div>
  );
}
