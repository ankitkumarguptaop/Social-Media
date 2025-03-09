const { BadRequest, ForBidden, UnAuthorized } = require("../libs/errors");
const {userRepository} = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (payload) => {
  const { name, email, password } = payload.body;

  if (!name || !email || !password ) {
    throw new BadRequest("data is not given");
  }
  const path  = payload?.file?.path || null;

  if (await userRepository.findOne({ email: email })) {
    throw new ForBidden("User alredy exists");
  }
  const response = await userRepository.create({
    name: name,
    email: email,
    password: password,
    profile_picture:path ,
  });
  return response;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.signIn = async (payload) => {
  const { email, password } = payload.body;

  if (!email || !password) {
    throw new BadRequest("data is not given");
  }

  const user = await userRepository.findOne({ email: email });
  if (!user) {
    throw new ForBidden("Need to register first");
  }
  const validate = await bcrypt.compare(password, user.password);

  if (!validate) {
    throw new UnAuthorized("Unauthorised access Password not matched!");
  }
   
  return { token: generateToken(user.id), user: user };
};
