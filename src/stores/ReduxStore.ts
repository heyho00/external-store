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
      name: `${state.name}.`,
    };
  },
};

export function increase(step = 1) {
  return { type: "increase", payload: step };
}

export function decrease(step = 1) {
  return { type: "decrease", payload: step };
}

@singleton()
export default class ReduxStore extends BaseStore<State> {
  constructor() {
    super(initialState, reducers);
  }
}
