
export function getSchema(schemaName) {
  return require(`./${schemaName}`)
}
