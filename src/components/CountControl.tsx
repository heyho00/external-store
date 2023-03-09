import { container } from "tsyringe";
import Store from "../stores/Store";

export default function CountControl() {
  const store = container.resolve(Store);

  const handleClick = () => {
    store.count += 1;
    store.forceUpdate();
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}
