import * as bcrypt from "bcrypt";

const encPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export { encPassword };
