import { singleton } from "tsyringe";

@singleton()
export default class CounterStore {
  count = 0;
}
