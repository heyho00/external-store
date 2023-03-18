import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";
import { useEffect } from "react";

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    counterStore.forceUpdates.add(forceUpdate);

    return () => {
      counterStore.forceUpdates.delete(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
