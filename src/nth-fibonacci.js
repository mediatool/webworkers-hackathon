/*
 * A really inefficcient way to calculate the nth fibonacci number.
 */
function nthFibonacci (n) {
  return n < 2 ? 1 : nthFibonacci(n - 1) + nthFibonacci(n - 2)
}

export default nthFibonacci
