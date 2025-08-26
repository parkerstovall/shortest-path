import { shortestPath } from '../shortest-path'

test('shortestPath - No weight', () => {
  const grid = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ]

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})

test('shortestPath - With weight', () => {
  const grid = [
    [0, 0, 10, 0],
    [1, 5, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ]

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})

test('shortestPath - With null weights', () => {
  const grid = [
    [0, 0, null, 0],
    [null, 0, null, 0],
    [0, 0, null, 0],
    [0, 0, 0, 0],
  ]

  const expected = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ]

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})

test('shortestPath - No path', () => {
  const grid = [
    [0, null, 0, 0],
    [null, null, null, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected: { x: number; y: number }[] = []

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})

test('shortestPath - Start equals end', () => {
  const grid = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected = [{ x: 2, y: 2 }]

  const start = { x: 2, y: 2 }
  const end = { x: 2, y: 2 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})

test('shortestPath - Start or end out of bounds', () => {
  const grid = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected: { x: number; y: number }[] = []

  const start = { x: -1, y: 0 }
  const end = { x: 3, y: 3 }

  let path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)

  const start2 = { x: 0, y: 0 }
  const end2 = { x: 4, y: 3 }

  path = shortestPath(grid, start2, end2)
  expect(path).toEqual(expected)
})

test('shortestPath - Start or end on obstacle', () => {
  const grid = [
    [null, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ]

  const expected: { x: number; y: number }[] = []

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  let path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)

  const start2 = { x: 0, y: 0 }
  const end2 = { x: 1, y: 1 }

  path = shortestPath(grid, start2, end2)
  expect(path).toEqual(expected)
})

test('shortestPath - Empty grid', () => {
  const grid: (number | null)[][] = []

  const expected: { x: number; y: number }[] = []

  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }

  const path = shortestPath(grid, start, end)
  expect(path).toEqual(expected)
})
