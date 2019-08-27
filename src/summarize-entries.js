import { K } from 'yafu'
import {
  assoc,
  reduce,
  times,
  zipObj,
} from 'ramda'

/*
 * Summarizes the values for the keys of all entries into one sum object
 *
 * [String] -> [entry] -> entry
 */
function summarizeEntries (keys, entries) {
  const initialEntry = zipObj(keys, times(K(0), keys.length))
  return reduce((acc, item) => {
    const sum = reduce((innerAcc, key) => (
      assoc(key, innerAcc[key] + item[key], innerAcc)
    ), acc, keys)
    return sum
  }, initialEntry, entries)
}

export default summarizeEntries
