import { container } from "tsyringe";
import useForceUpdate from "../hooks/useForceUpdate";
import CounterStore from "../stores/Store";

export default function CountControl() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    counterStore.count += 1;
    forceUpdate();
  };

  return (
    <>
      <div>{counterStore.count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
