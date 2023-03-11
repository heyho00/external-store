import { useEffect } from "react";
import { container } from "tsyringe";
import useForceUpdate from "../hooks/useForceUpdate";
import CounterStore from "../stores/CounterStore";

export default function useCounterStore() {
  const store = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => store.removeListener(forceUpdate);

    // clean up 해준다.
  }, [store, forceUpdate]);

  return store;
}
