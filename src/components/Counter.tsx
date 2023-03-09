import { useEffect } from "react";
import { container } from "tsyringe";
import useForceUpdate from "../hooks/useForceUpdate";
import CounterStore from "../stores/CounterStore";

function useStore() {
  const store = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => store.removeListener(forceUpdate);

    //화면이 사라질때 update 했을때 그 functioin 없는데? 하고 죽어라고
    // clean up 해준다.
  }, [store, forceUpdate]);

  return store;
}

export default function Counter() {
  const store = useStore();

  return (
    <div>
      <p>Count {store.count}</p>
    </div>
  );
}
