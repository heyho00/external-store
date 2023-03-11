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
    this.count += step;
    // this.state.x = 1; // 이건 state 자체가 안바뀌는것.
    this.state = { ...this.state, x: this.state.x + 1 }; // 이 형태로 써줘야 함.
  }

  @Action()
  decrease(step = 1) {
    this.count -= step;
  }
}

// 비동기 함수에 @Action을 붙이면 다르게 동작할 수 있다는 점에 주의.
// 다 끝나고 publish 되는게 아니다.
// 별도의 액션을 만들면 신경쓸 부분이 줄어든다.
