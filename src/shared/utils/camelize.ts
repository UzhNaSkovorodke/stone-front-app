// get from https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase

const toCamel = (str: string): string => {
  return str.replace(/([_-][a-z])/gi, ($1: string) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

const isArray = function (
  input: Record<string, unknown> | Record<string, unknown>[] | unknown
): input is Record<string, unknown>[] {
  return Array.isArray(input)
}

const isObject = function (
  obj: Record<string, unknown> | Record<string, unknown>[] | unknown
): obj is Record<string, unknown> {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

export const camelize = function <T>(input: T): T {
  return (function recurse<K extends Record<string, unknown> | Record<string, unknown>[] | unknown>(
    input: K
  ): K {
    if (isObject(input)) {
      // @ts-ignore
      return Object.keys(input).reduce((acc, key) => {
        // @ts-ignore
        return Object.assign(acc, { [toCamel(key)]: recurse(input[key]) })
      }, {} as K)
    } else if (isArray(input)) {
      return input.map((i) => recurse(i)) as K
    }
    return input
  })(input)
}
