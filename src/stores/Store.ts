import { singleton } from "tsyringe";

@singleton() //데코레이터라함.
// 이걸 써주려면 tsconfig.json가서
// experimentalDecorators,
// emitDecoratorMetadata  각주를 풀어준다.
export default class Store {
  count = 0;

  forceUpdate!: () => void;

  update() {
    this.forceUpdate();
  }
}
