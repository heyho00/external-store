import { singleton } from "tsyringe";
import ObjectStore from "./ObjectStore";

@singleton()
export default class CounterStore extends ObjectStore {
  count = 0;

  increase(step = 1) {
    this.count += step;
    this.publish();
  }

  decrease(step = 1) {
    this.count -= step;
    this.publish();
  }
}
