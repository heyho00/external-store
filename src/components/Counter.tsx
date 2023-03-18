import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";

export default function Counter() {
  const counterStore = container.resolve(CounterStore);
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    forceUpdate();
  };

  return (
    <>
      <div>Count: {counterStore.count}</div>
      <button type="button" onClick={handleClick}>
        Refresh
      </button>
    </>
  );
}
