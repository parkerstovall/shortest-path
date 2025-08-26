export type Grid = (number | null)[][]

export type Position = { x: number; y: number }

export type GridNode = Position & {
  g: number // Cost from start to current node
  h: number // Heuristic cost from current node to end
  f: number // Total cost (g + h)
  parent: GridNode | null // Parent node in the path
}
