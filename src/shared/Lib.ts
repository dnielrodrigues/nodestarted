export default {
  debug,
  isJsonString,
  isArray,
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

export function isJsonString(str: any) {
  if (isString(str)) {
    try {
      JSON.parse(String(str))
      return true
    } catch (error) {
      return false
    }
  }
  return false
}

export function isString(str: any) {
  return typeof str === 'string' || str instanceof String
}

// TODO - refactor
export function isArray(str: string) {
  try {
    const arr = JSON.parse(str)
    if (Array.isArray(arr)) return true
  } catch (error) {
    return false
  }
  return true
}

// test plain object
export function isPlainObject(obj) {
  return obj !== null && typeof obj === 'object' && obj.constructor === Object
}

// copy all the key/value data from an object to another
export function copyObjData(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// filter object (returns just the keys in second param)
export function filterObject(obj: any, keys: string[]) {
  const res: any = {}
  for (const key in obj) {
    if (keys.includes(key)) {
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
