import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useObjectStore from "./useObjectStore";

export default function useCounterStore() {
  const store = container.resolve(CounterStore);

  return useObjectStore(store);
}
