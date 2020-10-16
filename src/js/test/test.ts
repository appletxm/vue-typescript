const mm = '123456'
const txm = false

export const checkString = function (param: number): number {
  console.info('checkString:', param)
  return param + 123
}

export default { txm, mm }
