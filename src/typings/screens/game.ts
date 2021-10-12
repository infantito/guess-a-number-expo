export type GameProps = {
  userChoice: number
  handleGameOver: (rounds: number) => void
}

export type DirectionType = 'lower' | 'greater'
