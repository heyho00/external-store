import { singleton } from "tsyringe";
import BaseStore, { Action } from "./BaseStore";

export type State = typeof initialState;

const initialState = {
  count: 0,
  name: "harry",
};

const reducers = {
  increase(state: State, action: Action<number>) {
    return {
      ...state,
      count: state.count + (action.payload ?? 1),
    };
  },
  decrease(state: State, action: Action<number>) {
    return {
      ...state,
      count: state.count - (action.payload ?? 1),
    };
  },
};

export function increase(step?: number) {
  return { type: "increase", payload: step };
}
export function decrease(step?: number) {
  return { type: "decrease", payload: step };
}

@singleton()
export default class Store extends BaseStore<State> {
  constructor() {
    super(initialState, reducers);
  }
}
