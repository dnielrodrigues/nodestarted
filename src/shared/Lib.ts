export default {
  debug,
  isJsonString,
  isArray,
  isArrayString,
  isPlainObject,
  copyObjData,
  filterObject,
  normalizeText
}

export function debug(obj: any, msg = 'debug') {
  const separator =
    '\n--------------------------------------------------------------------------------\n'
  console.log('START - ' + msg + separator)
  console.log(obj)
  console.log(separator + 'END - ' + msg)
}

export function isJsonString(str: any): boolean {
  if (isString(str)) {
    try {
      JSON.parse(String(str))
      return true
    } catch {
      return false
    }
  }
  return false
}

export function isString(str: any) {
  return typeof str === 'string' || str instanceof String
}

// test array string
export function isArrayString(str: string): boolean {
  try {
    const arr = JSON.parse(str) as unknown
    if (Array.isArray(arr)) return true
  } catch {
    return false
  }
  return true
}

export function isArray(arr: any): boolean {
  return Array.isArray(arr)
}

// test plain object
export function isPlainObject(obj: any): obj is { [key: string]: any } {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}

// test UUID string
export function isUUIDv4(val: string): boolean {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return regex.test(val)
}

// copy all the key/value data from an object to another
export function copyObjData<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

// filter object (returns just the keys in second param)
export function filterObject<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const res = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}

export function normalizeText(str: string) {
  return str
    .normalize('NFD') // Decompõe caracteres acentuados (ex: "á" → "a" + "´")
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w]/gi, '') // Remove TUDO que não for letra/número
    .toLowerCase() // Padroniza para minúsculas
}
