import HexField from "./hex-field"

export default interface HexMap {
  name: string
  width: number
  height: number
  hexFields: HexField[]
}