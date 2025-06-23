import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    return await bcrypt.hash(password, saltRounds);
  } catch (error: any) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    if (!password || !hash) {
      throw new Error('Password and hash are required');
    }
    return await bcrypt.compare(password, hash);
  } catch (error: any) {
    throw new Error(`Error comparing password: ${error.message}`);
  }
};
