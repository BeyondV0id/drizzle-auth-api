import { db } from '../db/client';
import { sessions} from '../db/schema';
import { eq } from 'drizzle-orm';

export const createSession = async (
  userId: string,
  token: string,
  expiresAt: Date
) => {
  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });
};

export const findSessionByToken = async (token: string) => {
  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, token))
    .limit(1);

  return result.length > 0 ? result[0] : null;
};

export const deleteSession = async (token: string) =>{
  await db.delete(sessions).where(eq(sessions.token,token));
}

export const deleteUserSessions = async (userId : string) =>{
  await db.delete(sessions).where(eq(sessions.userId,userId));
}
