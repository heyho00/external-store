import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";

export default function CountControl() {
  const counterStore = container.resolve(CounterStore);

  const handleClick = () => {
    counterStore.count += 1;
    counterStore.update();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
