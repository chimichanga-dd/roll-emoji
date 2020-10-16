
const userSockets = {}

const isUsedName = (name) => {
  return !!Object.values(userSockets).includes(name)
}

module.exports = {
  userSockets,
  isUsedName
}