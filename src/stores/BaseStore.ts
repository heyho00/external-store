type Listener = () => void;

export type Action = {
  type: string;
};

type Reducer<State> = (state: State, action: Action) => State;

export default class BaseStore<State> {
  state: State;

  reducer: Reducer<State>;

  constructor(initialState: State, reducer: Reducer<State>) {
    this.state = initialState;
    this.reducer = reducer;
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.publish();
  }

  listeners = new Set<Listener>();

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
