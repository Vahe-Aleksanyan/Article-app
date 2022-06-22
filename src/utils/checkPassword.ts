import * as bcrypt from 'bcrypt';

const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> =>
    await bcrypt.compare(password, hashedPassword);

export default checkPassword;