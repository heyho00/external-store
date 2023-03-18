import { singleton } from "tsyringe";

type ForceUpdate = () => void;

@singleton()
export default class CounterStore {
  count = 0;

  forceUpdates = new Set<ForceUpdate>();

  update() {
    this.forceUpdates.forEach((forceUpdate) => {
      forceUpdate();
    });
  }
}
