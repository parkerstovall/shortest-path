import { Grid, GridNode, Position } from './types'

/**
 * Find the shortest path between two points in a grid using the A* algorithm.
 * @param grid The grid to search. Numbers represent walkable cells, null represents obstacles.
 * @param start The starting position.
 * @param end The ending position.
 * @returns The shortest path as an array of positions.
 */
export function shortestPath(
  grid: Grid,
  start: Position,
  end: Position,
): Position[] {
  const startNode = getNode(grid, start, 0, end, null)
  if (!startNode) return []

  if (start.x === end.x && start.y === end.y) {
    return [start]
  }

  if (grid[end.y][end.x] === null) {
    return []
  }

  if (grid[start.y][start.x] === null) {
    return []
  }

  const openList: GridNode[] = [startNode]
  const closedList: Set<string> = new Set()

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f)
    const currentNode = openList.shift()
    if (!currentNode) break

    closedList.add(`${currentNode.x},${currentNode.y}`)

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path: Position[] = []
      let node: GridNode | null = currentNode
      while (node) {
        path.push({ x: node.x, y: node.y })
        node = node.parent
      }

      //console.log('Path found:', path.reverse())
      return path.reverse()
    }

    const neighbors = [
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x, y: currentNode.y + 1 },
      { x: currentNode.x, y: currentNode.y - 1 },
    ]

    for (const neighborPos of neighbors) {
      if (closedList.has(`${neighborPos.x},${neighborPos.y}`)) {
        continue
      }

      const neighborNode = getNode(
        grid,
        neighborPos,
        currentNode.g,
        end,
        currentNode,
      )
      if (!neighborNode) {
        continue
      }

      const existingNodeIndex = openList.findIndex(
        (node) => node.x === neighborNode.x && node.y === neighborNode.y,
      )
      if (existingNodeIndex >= 0) {
        if (neighborNode.g < openList[existingNodeIndex].g) {
          openList[existingNodeIndex] = neighborNode
        }
      } else {
        openList.push(neighborNode)
      }
    }
  }

  return []
}

function heuristic(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function getNode(
  grid: Grid,
  position: Position,
  currentCost: number,
  goal: Position,
  parent: GridNode | null,
): GridNode | null {
  const { x, y } = position
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
    return null
  }

  const weight = grid[y][x]
  if (weight === null) {
    return null
  }

  const g = currentCost + weight
  const h = heuristic(position, goal)
  const f = g + h

  return { ...position, g, h, f, parent }
}
