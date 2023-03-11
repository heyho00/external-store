import { singleton } from "tsyringe";
import BaseStore, { Action } from "./BaseStore";

export type State = typeof initialState;

const initialState = {
  count: 0,
  name: "harry",
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increase":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrease":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export function increase() {
  return { type: "increase" };
}
export function decrease() {
  return { type: "decrease" };
}

@singleton()
export default class Store extends BaseStore<State> {
  constructor() {
    super(initialState, reducer);
  }
}
