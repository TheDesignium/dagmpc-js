import { minimumPathCover } from './index.js';

describe('minimumPathCover', () => {
  const testCases: {
    // Input
    nNode: number;
    edges: readonly (readonly [number, number])[];

    // Expected output
    nMPCPath: number;
  }[] = [
    {
      nNode: 7,
      edges: [
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
      ],
      nMPCPath: 3,
    },
    {
      nNode: 0,
      edges: [],
      nMPCPath: 0,
    },
    {
      nNode: 1,
      edges: [],
      nMPCPath: 1,
    },
    {
      nNode: 2,
      edges: [],
      nMPCPath: 2,
    },
    {
      nNode: 2,
      edges: [
        [1, 0],
      ],
      nMPCPath: 1,
    },
  ];

  for (const [i, testCase] of testCases.entries()) {
    test(`#${i}`, () => {
      const mpc = minimumPathCover(testCase.nNode, testCase.edges);
      expect(mpc.length).toBe(testCase.nMPCPath);
      // Assert the mpc covers all nodes.
      const visit = Array(testCase.nNode).fill(false);
      for (const path of mpc) {
        for (let j = 0; j < path.length; j++) {
          expect(visit[path[j]]).toBe(false); // Ensure it visits each node exactly once respectively.
          visit[path[j]] = true;
          if (j === 0) continue;
          expect(testCase.edges).toContainEqual([path[j-1], path[j]]); // Ensure the path exists.
        }
      }
    });
  }
});
