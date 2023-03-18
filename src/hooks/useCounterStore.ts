import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";
import { useEffect } from "react";

export default function useCounterStore() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    counterStore.addListener(forceUpdate);

    return () => {
      counterStore.removeListener(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  return counterStore;
}
