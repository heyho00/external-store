import { singleton } from "tsyringe";
import ObjectStore from "./ObjectStore";

@singleton()
export default class CounterStore extends ObjectStore {
  count = 0;

  /**
   * 카운트를 증가시킨다.
   * @param step
   */
  increase(step = 1) {
    this.count += step;
    this.publish();
  }

  decrease(step = 1) {
    this.count -= step;
    this.publish();
  }
}
