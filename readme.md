# External store

## Counter 연습

기본 모양

```js
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  };

  return (
    <>
      <div>{count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

리액트 컴포넌트 밖에 count 변수 선언.

state가 아니라 값이 변해도 렌더가 되지 않아서

forceUpdate라는 setState로 렌더를 유발하는 함수를 만들어

handleClick함수에 넣어줌.

```js
import { useEffect, useState } from "react";

let count = 0;

export default function Counter() {
  const [state, setState] = useState(0);

  const forceUpdate = () => {
    setState(state + 1);
  };

  useEffect(() => {
    console.log(count);
  }, [state]);

  const handleClick = () => {
    count += 1;
    forceUpdate();
  };

  return (
    <>
      <div>{count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

useForceUpdate 훅으로 뺀다

파일로 옮겨줌.

```js
import useForceUpdate from "../hooks/useForceUpdate";

let count = 0;

export default function Counter() {
  const { forceUpdate } = useForceUpdate();

  const handleClick = () => {
    count += 1;
    forceUpdate();
  };

  return (
    <>
      <div>{count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}

// useForceUpdate
function useForceUpdate() {
  const [state, setState] = useState(0);

  const forceUpdate = () => {
    setState(state + 1);
  };

  return { forceUpdate };
}
```

count 원시 데이터를 state 객체로 관리.

```js
import useForceUpdate from "../hooks/useForceUpdate";

const state = {
  count: 0,
};

export default function Counter() {
  const { forceUpdate } = useForceUpdate();

  const handleClick = () => {
    state.count += 1;
    forceUpdate();
  };

  return (
    <>
      <div>{state.count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

내부적으로 상태가 그대로면 리렌더하지 않는다.

```js
// useForceUpdate
function useForceUpdate() {
  const [state, setState] = useState(0);

  const forceUpdate = () => {
    // setState(state + 1);
    setState(state); //이렇게 상태가 변화하지 않고 그대로면 리렌더 안함.
  };

  return { forceUpdate };
}
```

```js
// useForceUpdate
function useForceUpdate() {
  const [state, setState] = useState({});

  const forceUpdate = () => {
    setState({ ...state }); // 1 씩 올려줄 필요없이 spread로 복사해서 넣어줘도 새 객체 이므로 리렌더한다.
  };

  return { forceUpdate };
}
```

useCallback 이용해 함수가 변하지 않게 해준다.

```js
//useForceUpdate.ts
import { useCallback, useState } from "react";

export default function useForceUpdate() {
  const [state, setState] = useState({});

  return useCallback(() => setState({ ...state }), []);
}
```

increase 함수만들어 줌.

비즈니스 로직과 ui 관심사의 분리.

```js
import useForceUpdate from "../hooks/useForceUpdate";

const state = {
  count: 0,
};

function increase() {
  state.count += 1;
}

export default function Counter() {
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    increase();
    forceUpdate();
  };

  return (
    <>
      <div>{state.count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

## Tsyringe

TypeScript용 DI 도구(IoC Container).

`External Store`를 관리하는데 활용할 수 있다. React 컴포넌트 입장에서는 “전역”처럼 여겨진다.

“Prop Drilling” 문제를 우아하게 해결할 수 있는 방법 중 하나(React로 한정하면 Context도 쓸 수 있다).

#### 설치

```bash
npm i tsyringe reflect-metadata
```

```js
// src/index.tsx, src/setupTests.ts

import "reflect-metadata"; // 폴리필 해줘야 한다.
```

싱글톤으로 관리할 CounterStore 클래스를 준비

```js
import { singleton } from "tsyringe";

@singleton()
export default class CounterStore {
  count = 0;
}
```

싱글톤 CounterStore 객체를 사용

```js
import { container } from "tsyringe";

const counterStore = container.resolve(CounterStore);
```

## Initial Files

```js
// src/components/Counter.tsx
// Refresh 버튼을 잠깐 붙여놓은 Counter 컴포넌트.
// counterStore에서 가져온 count를 화면에 그린다.

import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";

export default function Counter() {
  const counterStore = container.resolve(CounterStore);
  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    forceUpdate();
  };

  return (
    <>
      <div>Count: {counterStore.count}</div>
      <button type="button" onClick={handleClick}>
        Refresh
      </button>
    </>
  );
}
```

```js
// src/components/CountControl.tsx
// 클릭시 counterStore.count를 1씩 올리고,
// forceUpdate가 바로 실행되어 화면(count)이 리렌더된다.

import { container } from "tsyringe";
import useForceUpdate from "../hooks/useForceUpdate";
import CounterStore from "../stores/Store";

export default function CountControl() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    counterStore.count += 1;
    forceUpdate();
  };

  return (
    <>
      <div>{counterStore.count}</div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

```js
// src/hooks/useForceUpdate.ts
// 새 객체를 내부의 state로 set함으로써, force rerender 시키는 훅.

import { useCallback, useState } from "react";

export default function useForceUpdate() {
  const [state, setState] = useState({});

  return useCallback(() => setState({ ...state }), []);
}
```

## Store안에 interface를 정의한다

```js
import { singleton } from "tsyringe";

@singleton()
export default class CounterStore {
  count = 0;

  forceUpdate: () => void;

  update() {
    this.forceUpdate();
  }
}
```

forceUpdate 를 타입만 지정해주고 다른 컴포넌트에서 함수를 주입한다.

```js
//Counter.tsx

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  counterStore.forceUpdate = forceUpdate; // !!!

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
```

이제 CountControl은 버튼만 있도록 정리한다.

```js
// CountControl.tsx

import { container } from "tsyringe";
import CounterStore from "../stores/Store";

export default function CountControl() {
  const counterStore = container.resolve(CounterStore);

  const handleClick = () => {
    counterStore.count += 1;
    counterStore.forceUpdate();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

여기까지 잘 작동하는걸 볼 수 있다.

이제, 아무이유없이 그냥 Counter 컴포넌트를 하나 더 붙여보자.

```js
import "reflect-metadata";
import Counter from "./components/Counter";
import CountControl from "./components/CountControl";

export default function App() {
  return (
    <>
      <p>Hello, world!</p>
      <Counter />
      <Counter />
      <CountControl />
    </>
  );
}
```

이러면 위에 Counter는 0에 머물러있고,

아래만 숫자가 update된다.

위에께 등록을 해도 밑에서 덮어써서 그렇다.

아래 Counter의 forceUpdate가 store에 담기는 듯.

우선 아까부터 빨간줄쳐진 Store에 forceUpdate를 처리해준다.

forceUpdate 함수로 사용하던걸 forceUpdates set 객체로 만들어준다.

```js
// Store.ts
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

```

```js
// Counter.tsx

import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  counterStore.forceUpdates.add(forceUpdate);
  // 두 Counter 컴포넌트를 쓴다면, 두개의 각 forceUpdates를 넣어준다.

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
```

```js
// CountControl.tsx

import { container } from "tsyringe";
import CounterStore from "../stores/Store";

export default function CountControl() {
  const counterStore = container.resolve(CounterStore);

  const handleClick = () => {
    counterStore.count += 1;
    counterStore.update();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </>
  );
}
```

여기도 문제가 있다.

```js
import { container } from "tsyringe";
import CounterStore from "../stores/Store";
import useForceUpdate from "../hooks/useForceUpdate";

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  counterStore.forceUpdates.add(forceUpdate);

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
```

이렇게 그냥 넣으면 안된다.

set 객체이고 Store에서 useCallback을 써서 중복으로 들어가지 않지만

useEffect를 이용해주는게 좋다.

```js
이렇게;

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    counterStore.forceUpdates.add(forceUpdate);

    return () => {
      // clean up 까지 해줘야 렌더 끝났을때 혹시라도 forceUpdates가 불려도 문제가 없다.
      counterStore.forceUpdates.delete(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
```

여기까지 하면

store가 뭘 아무것도 갖고있지 않은 모양이 된다.

캡슐화를 해줄 수 있다고 한다.

이게 뭔말인지 한번 따라해보자.

```js
//Counter.tsx

export default function Counter() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // counterStore.addListener.forceUpdates.add(forceUpdate);
    counterStore.addListener(forceUpdate);

    return () => {
      // counterStore.forceUpdates.delete(forceUpdate);
      counterStore.removeListener(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  return (
    <>
      <div>Count: {counterStore.count}</div>
    </>
  );
}
```

```js
// Store.ts

import { singleton } from "tsyringe";

// type ForceUpdate = () => void;
type Listener = () => void;

@singleton()
export default class CounterStore {
  count = 0;

  // forceUpdates = new Set<ForceUpdate>();
  listeners = new Set<Listener>();

  update() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  // 추가
  addListener(listener:Listener){
    this.listeners.add(listener)
  }

  removeListener(listener: Listener) {
    this.listeners.delete(listener);
  }
}

```
