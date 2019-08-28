export default function splitDataByProportion (data, proportion) {
  const div = Math.ceil(data.length / proportion)
  const ln = (data.length / div)
  const remainder = (data.length % div)
  return Array.from({ length: ln + remainder },
    (_, i) => data.slice(i * div, ((i + 1) * div)))
}

