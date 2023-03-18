import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import { useStore } from "usestore-ts";

export default function useCounterStore() {
  const store = container.resolve(CounterStore);

  return useStore(store);
}
