const { ForBidden } = require("../libs/errors");
const { userRepository } = require("../repositories");

exports.deleteUser = async (payload) => {
  const { id } = payload.user;
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw new ForBidden("User not found");
  }

  return await userRepository.softDelete({
    criteria: { id: id },
    options: { returning: true },
  });
};

exports.updateUser = async (payload) => {
  const { id } = payload.user;
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw new ForBidden("User not found");
  }
  return await userRepository.update({
    payload: payload.body,
    criteria: { id: id },
    options: { returning: true },
  });
};

