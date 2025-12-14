import {db} from "../db/client";
import {users} from "../db/schema";
import {eq} from "drizzle-orm";

export const getUserByEmail = async(email : string )=>{
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email,email))
    .limit(1);

    return result.length > 0 ? result[0] : null;
};


export const getUserById = async (id:string) =>{
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id,id))
    .limit(1);

    return result.length > 0 ? result[0] : null;
};

export const createUser = async(username:string, email:string , hashedPassword:string) =>{
  const result = await db
    .insert(users)
    .values({username,email,password : hashedPassword})
    .returning({id: users.id, username:users.username, email:users.email});

    return result[0];
};

export const updateUser = async (id:string, data: {username?: string, email?:string,password?:string})=>{
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id,id))
    .returning({id:users.id, username:users.username,email:users.email});

    return result[0];
};

export const deleteUser = async(id:string) =>{
  await db.delete(users).where(eq(users.id,id));
};
