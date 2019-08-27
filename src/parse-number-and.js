import { compose, flip } from 'yafu'
import parseTargetNumber from './parse-target-number'

export default flip(compose, parseTargetNumber)
