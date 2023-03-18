type Listener = () => void;

export type Action<Payload> = {
  type: string;
  payload?: Payload;
};

type Reducer<State, Payload> = (state: State, action: Action<Payload>) => State;

type Reducers<State> = Record<string, Reducer<State, any>>;

export default class BaseStore<State> {
  state: State;

  reducer: Reducer<State, any>;

  constructor(initialState: State, reducers: Reducers<State>) {
    this.state = initialState;

    this.reducer = (state: State, action: Action<any>) => {
      const f = Reflect.get(reducers, action.type);
      if (!f) {
        return state;
      }
      return f(state, action);
    };
  }

  dispatch(action: Action<any>) {
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
