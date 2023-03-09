import { container } from "tsyringe";
import CounterStore from "../stores/CounterStore";

export default function CountControl() {
  const store = container.resolve(CounterStore);

  const handleClickIncrease = () => {
    store.count += 1;
    store.publish();
  };

  const handleClickDecrease = () => {
    store.count -= 1;
    store.publish();
  };

  return (
    <div>
      <button type="button" onClick={handleClickIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleClickDecrease}>
        Decrease
      </button>
    </div>
  );
}
