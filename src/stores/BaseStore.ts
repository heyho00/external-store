export type Action = {
  type: string;
};

type Reducer<State> = (state: State, action: Action) => State;
type Listener = () => void;

export default class BaseStore<State> {
  state: State;
  reducer: Reducer<State>;
  listeners = new Set<Listener>();

  constructor(initialState: State, reducer: Reducer<State>) {
    this.state = initialState;
    this.reducer = reducer;
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  addListener(listener: Listener) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener) {
    this.listeners.delete(listener);
  }
}
