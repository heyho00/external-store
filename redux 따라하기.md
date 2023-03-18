# redux 따라하기

readme 에선 Tsyringe를 이용한 external store를 구현해봤다.

이제 redux를 따라해 볼꺼다.

먼저, 만들어 놓은 CounterStore를 복사해 ReduxStore를 만든다.

```js
// src/stores/ReduxStore

import { singleton } from "tsyringe";

type Listener = () => void;

@singleton()
export default class ReduxStore {

  //count = 0 상태를 객체로 만들어 처리하자.
  state ={
    count: 0,
  }

  reducer =(state, action) => ({ //
    ...state,
  })

  dispatch(action){
    this.state = this.reducer(this.state, action)
    this.publish()
  }

  listeners = new Set<Listener>();

  publish() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

// 없애 !!
//   increase() {
//     this.count += 1;
//     this.publish();
//   }

//   decrease() {
//     this.count -= 1;
//     this.publish();
//   }

  addListener(listener: Listener) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener) {
    this.listeners.delete(listener);
  }
}

```

state, reducer를 갖는다.

reducer는 state와 action을 받아 새로운 state를 반환한다.

dispatch도 추가해준다. action을 받아 reducer를 실행해주는 함수다.

dispatch가 reducer를 이용해 새로 return된 state를 this.state에 넣는다.

그러고 this.publish() 까지 해준다.

count같은 상태를 직접 관리하지말고 객체로 만들어 관리하는 방식이다.

```js
// reducer 함수만 보자.
// action 객체는 type이 있다.

reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
```

## 여기까지 코드

```js
import { singleton } from "tsyringe";

type Listener = () => void;

@singleton()
export default class ReduxStore {
// 여기만 바뀔 부분 -----------------------------------
  state = {
    count: 0,
  };

  reducer = (state, action) => {
    switch (action.type) {
      case "increase":
        return {
          ...state,
          count: state.count + 1,
        };
      default:
        return state;
    }
  };

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.publish();
  }

// ------------------------------------------------

// 아래 코드는 바뀌는거 없이 그대로 쓰는거

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

```

바뀌지 않는 부분을 빼서 BaseStore를 만들어주고, 상속받아 사용하려고 한다.

```js
// BaseStore.ts

type Listener = () => void;

export default class BaseStore {
  state: any;

  reducer: (state: any, action: any) => any;

  dispatch(action: any) {
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
```

이런 형태의 것들을 상속받아 쓰자구

```js
// ReduxStore.ts

import { singleton } from "tsyringe";
import BaseStore from "./BaseStore";

type Listener = () => void;

@singleton()
export default class ReduxStore extends BaseStore {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    this.reducer = (state, action) => {
      switch (action.type) {
        case "increase":
          return {
            ...state,
            count: state.count + 1,
          };
        default:
          return state;
      }
    };
  }
}

//   this.state, this.reducer 를 constructor안에서 처리해주고

//   나머지는 다 필요없어 지운다.
```

이렇다.

여기서 constructor 안쪽을 정리해준다.

```js
// Redustore.ts

import { singleton } from "tsyringe";
import BaseStore from "./BaseStore";

type Listener = () => void;

const initialState = { // initialState로 밖으로 빼주고 super()를 통해 전달.
  count: 0,
};

@singleton()
export default class ReduxStore extends BaseStore {
  constructor() {
    super(initialState);

    this.reducer = (state, action) => {
      switch (action.type) {
        case "increase":
          return {
            ...state,
            count: state.count + 1,
          };
          .
          .
          .
```

```js
// BaseStore.ts

type Listener = () => void;

export default class BaseStore {
  state: any;

  reducer: (state: any, action: any) => any;

  constructor(initialState: any) {
    this.state = initialState;
  }

```

자식에서 전달받은 initialState를 부모 class의 this.state에 넣는다.

이 state는 물론 자식으로 상속.

### BaseStore.ts 타입 잡고 가자

```js
type Listener = () => void;

type Action = {
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
  .
  .
  .
```

### ReduxStore 정리

```js
import { singleton } from "tsyringe";
import BaseStore from "./BaseStore";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

@singleton()
export default class ReduxStore extends BaseStore<State> {
  constructor() {
    // super(initialState);   reducer 추가 !
    super(initialState, reducer);
  }
}
```

BaseStore가 State를 알아야 함

타입 지정해주는 방법이 2가지 있다.

1.

```js
import { singleton } from "tsyringe";
import BaseStore from "./BaseStore";

type State = {
  count: number,
};
.
.
.
```

2. initialState 이용하는법

```js
type State = typeof initialState;
```

Action은 BassStore에 선언해논거 가져와 쓴다.

```js
type Listener = () => void;

export type Action = { //여기
  type: string;
};

type Reducer<State> = (state: State, action: Action) => State;

export default class BaseStore<State> {
  state: State;
  .
  .
  .
```

### decrease 추가

```js
// ReduxStore.ts/reducer
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
```

### 이제 만든 store를 이용해보자.

useReduxStore 훅을 만들어준다.

```js
import { container } from "tsyringe";
import { useEffect } from "react";
import useForceUpdate from "../hooks/useForceUpdate";
import ReduxStore from "../stores/ReduxStore";

export default function useReduxStore() {
  const store = container.resolve(ReduxStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return store;
}
```

### CountControl을 바꿔보자.

#### 1차 변형

```js
// CountControl.tsx

// import useCounterStore from "../hooks/useCounterStore";
import useReduxStore from "../hooks/useReduxStore";

export default function CountControl() {
  //   const counterStore = useCounterStore();
  const store = useReduxStore();

  //   const increase = () => {
  //     counterStore.increase();
  //   };
  //   const decrease = () => {
  //     counterStore.decrease();
  //   };
  const increase = () => {
    store.dispatch({ type: "increase" });
  };
  const decrease = () => {
    store.dispatch({ type: "decrease" });
  };

  return (
    <>
      <p>{store.state.count}</p>
      <button type="button" onClick={increase}>
        Increase
      </button>

      <button type="button" onClick={decrease}>
        Decrease
      </button>
    </>
  );
}
```

```js
// Counter.tsx

// import useCounterStore from "../hooks/useCounterStore";
import useReduxStore from "../hooks/useReduxStore";

export default function Counter() {
  //   const counterStore = useCounterStore();
  const store = useReduxStore();
  const { state } = store;

  return (
    <>
      // <div>Count: {counterStore.count}</div>
      <div>Count: {state.count}</div>
    </>
  );
}
```

#### 2차 변형

dispatch를 이렇게 쓰는것보다 함수로 만들어 사용하길 원함.

dispatch의 역할이 action 객체를 reducer함수에 넣고 흔들어 새로 반환받은 state를

스토어의 state로 저장하고 publish 하는 것이니,

**action을 인자로 받아 dispatch함수에 전달하는 함수를 만드는 것.**

```js
// CountControl.tsx

// 생성
function useDispatch() {
  const store = useReduxStore();

  return (action: Action) => {
    store.dispatch(action);
  };
}

export default function CountControl() {
  //   const store = useReduxStore();
  const dispatch = useDispatch();

  const { state } = useReduxStore();

  //   const increase = () => {
  //     store.dispatch({ type: "increase" });
  //   };
  //   const decrease = () => {
  //     store.dispatch({ type: "decrease" });
  //   };

  const increase = () => {
    dispatch({ type: "increase" });
  };
  const decrease = () => {
    dispatch({ type: "decrease" });
  };

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={increase}>
        Increase
      </button>

      <button type="button" onClick={decrease}>
        Decrease
      </button>
    </>
  );
}
```

#### 3차 변형

```js
import useReduxStore from "../hooks/useReduxStore";
import { Action } from "../stores/BaseStore";
import ReduxStore from "../stores/ReduxStore";

function useDispatch() {
  const store = useReduxStore();

  return (action: Action) => {
    store.dispatch(action);
  };
}

export default function CountControl() {
  const dispatch = useDispatch();

  const { state } = useReduxStore();

  // 얘네도 다 없애 !!!
  //    const increase = () => {
  //     dispatch({ type: "increase" });
  //   };
  //   const decrease = () => {
  //     dispatch({ type: "decrease" });
  //   };

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch({ type: "increase" })}>
        Increase
      </button>

      <button type="button" onClick={() => dispatch({ type: "decrease" })}>
        Decrease
      </button>
    </>
  );
}
```

별로다. !@

#### 4차 변형

`action creator`를 만들어 정리해보자.

```js
// CountControl.tsx
import useReduxStore from "../hooks/useReduxStore";
import { Action } from "../stores/BaseStore";
import ReduxStore from "../stores/ReduxStore";

function useDispatch() {
  const store = useReduxStore();

  return (action: Action) => {
    store.dispatch(action);
  };
}
// 추가 -----------------------------------------
function increase() {
  return { type: "increase" };
}

function decrease() {
  return { type: "decrease" };
}

// ---------------------------------------------

export default function CountControl() {
  const dispatch = useDispatch();

  const { state } = useReduxStore();

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch(increase())}>
        Increase
      </button>

      <button type="button" onClick={() => dispatch(decrease())}>
        Decrease
      </button>
    </>
  );
}
```

개인적으론 사실 increase, decrease 함수 안쪽에 dispatch 있는거보다 막 엄청 나은 것 같아 보이진 않는다..

일단,

지금 만든 `action creator` increase, decrease도 ReduxStore에 정리하는게 낫다.

그쪽에 action.type을 받아 처리하는 reducer 구현체가 있기때문에 모아두는건 좋아보인다.

보이지 않을 건 같이 모아놓고 인터페이스만 꺼내 쓰는 개념으로.

```js
//CountControl.tsx

import useReduxStore from "../hooks/useReduxStore";
import { Action } from "../stores/BaseStore";
import { decrease, increase } from "../stores/ReduxStore";
// import 해서 씀.

// ------------------------------------------
//이것도 따로 파일로 빼준다.

function useDispatch() {
  const store = useReduxStore();

  return (action: Action) => {
    store.dispatch(action);
  };
}
---------------------------------------------
export default function CountControl() {
  const dispatch = useDispatch();

  const { state } = useReduxStore();

  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch(increase())}>
        Increase
      </button>

      <button type="button" onClick={() => dispatch(decrease())}>
        Decrease
      </button>
    </>
  );
}
```

```js
// ReduxStore.ts

import { singleton } from "tsyringe";
import BaseStore, { Action } from "./BaseStore";

type State = typeof initialState;

const initialState = {
  count: 0,
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

// 추가 -----------------------------------
export function increase() {
  return { type: "increase" };
}

export function decrease() {
  return { type: "decrease" };
}

// ---------------------------------------

@singleton()
export default class ReduxStore extends BaseStore<State> {
  constructor() {
    super(initialState, reducer);
  }
}
```
