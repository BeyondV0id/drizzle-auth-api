//updateUser
//getProfile
//deleteUser
import { Request, Response } from 'express';
import { deleteUser, getUserById, updateUser } from '../services/userService';
import { hashPassword } from '../helpers/auth';
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfileUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { username, email, password } = res.locals.payload;
    const updatedData: any = {};
    if (email) updatedData.email = email;
    if (username) updatedData.username = username;
    if (password) updatedData.password = await hashPassword(password);

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    const updated = await updateUser(userId, updatedData);
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'UserProfile Updated',
      user: {
        id: updated.id,
        email: updated.email,
        username: updated.username,
      },
    });
  } catch (error) {
  console.error('Get profile error: ', error);
  return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProfileUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    await deleteUser(userId);
    res.clearCookie('session_token');
    return res.sendStatus(204);
  } catch (error) {
    console.log('Delete profile error: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
