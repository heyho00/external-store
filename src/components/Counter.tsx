import useReduxStore from "../hooks/useReduxStore";

export default function Counter() {
  const store = useReduxStore();
  const { state } = store;

  return (
    <>
      <div>Count: {state.count}</div>
    </>
  );
}
