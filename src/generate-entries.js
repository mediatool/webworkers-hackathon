import {
  assoc,
  reduce,
  times,
} from 'ramda'

/*
 * Generates a number of entries with random number values for the given keys
 *
 * [String] -> Number -> [entry]
 */
function generateEntries (keys, nbrEntries) {
  const entries = times(() => {
    const entry = reduce((acc, item) => {
      const val = Math.floor(Math.random() * 1000000)
      return assoc(item, val, acc)
    }, {}, keys)
    return entry
  }, nbrEntries)
  return entries
}

export default generateEntries
