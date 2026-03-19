import b64 from "base-64"

export function encode(params) {
  return b64.encode(params)
}

export function decode(params) {
  return b64.decode(params)
}