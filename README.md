# dagmpc: Algorithm to find a [Minimum Path Cover](https://en.wikipedia.org/wiki/Path_cover) of an arbitary DAG.

dagmpc provides a function which finds a minimum path cover of a DAG. This can't list all answers but find an example. This works on both of browser and node.

## Example Usage

Consider an DAG like this figure.

![Example DAG](https://i.imgur.com/PKDYC7L.png)

Input the number of node and the all edges to this library, like here:

```typescript
import { minimumPathCover } from 'dagmpc';

const n = 7;
const edges = [
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 0],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [6, 4],
];

const paths = minimumPathCover(n, edges);
console.log(paths);
```

It outputs:

```
[ [ [ 1, 0, 3 ], [ 2, 5 ], [ 6, 4 ] ] ]
```

This means the calcurated MPC is the 3 paths, `1 -> 0 -> 3`, `2 -> 5` and `6 -> 4`. As figure:

![Example MPC](https://i.imgur.com/zD6H4L6.png)

## Installation

```
npm i @thedesignium/dagmpc
```

## Documentation

It is documented as JSDoc so read it through your editor, or read [index.ts](./index.ts) directly.
