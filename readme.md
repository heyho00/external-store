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
