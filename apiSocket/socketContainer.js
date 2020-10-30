
const userSockets = {}

const isUsedName = (name) => {
  return !!Object.values(userSockets).includes(name)
}

const removeUserById = (socketId) => {
  delete userSockets[socketId]
}

const removeUserByName = (userName) => {
  for(const [socketId, user] of Object.entries(userSockets)){
    if(user == userName){
      delete userSockets[socketId]
      break
    }
  }
}

module.exports = {
  userSockets,
  isUsedName,
  removeUserByName,
  removeUserById
}