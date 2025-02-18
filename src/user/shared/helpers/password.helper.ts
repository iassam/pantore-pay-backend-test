import * as bcrypt from "bcrypt";

/**
 * Encrypts a password using bcrypt.
 * @param password - The password to encrypt.
 * @returns The encrypted password.
 */
const encPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export { encPassword };
