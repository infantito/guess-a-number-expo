export type GameProps = {
  userChoice: number
  handleGameOver: (rounds: number) => void
}

export type Item = {
  id: string
  value: number
}

export type DirectionType = 'lower' | 'greater'
