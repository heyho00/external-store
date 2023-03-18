import { singleton } from "tsyringe";
import { Action, Store } from "usestore-ts";

@singleton()
@Store()
export default class CounterStore {
  count = 0;

  state = {
    x: 1,
  };

  @Action()
  increase(step = 1) {
    this.state.x += 1;
  }

  @Action()
  decrease(step = 1) {
    this.count -= step;
  }
}
