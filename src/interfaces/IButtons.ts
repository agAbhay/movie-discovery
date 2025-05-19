export interface IButton {
    label: string
   onClick?: (() => void) | ((ids: number[]) => void) | undefined
    genreIds: number[]
}
