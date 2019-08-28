function zipObj (keys, values) {
  return keys.reduce((acc, item, i) => {
    acc[item] = values[i]
    return acc
  }, {})
}
function assoc (key, value, obj) {
  const base = {
    [key]: value,
  }
  return Object.assign({}, obj, base)
}

function times (fn, n) {
  const result = []
  for (let i = 0; i < n; i += 1) {
    result.push(fn(i))
  }
  return result
}

function K (a) {
  return () => a
}

/*
 * Summarizes the values for the keys of all entries into one sum object
 *
 * [String] -> [entry] -> entry
 */
function summarizeEntries (keys, entries) {
  const initialEntry = zipObj(keys, times(K(0), keys.length))
  return entries.reduce((acc, item) => {
    const sum = keys.reduce((innerAcc, key) => (
      assoc(key, innerAcc[key] + item[key], innerAcc)
    ), acc)
    return sum
  }, initialEntry)
}

onmessage = function (e) {
  const { keys, entries, timeSent } = e.data
  postMessage({ res: summarizeEntries(keys, entries), timeSent: Date.now() })
}
