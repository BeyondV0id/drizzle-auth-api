import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

//user schema
export const users = pgTable("users",{
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

//session schema
export const sessions = pgTable("sessions",{
  id : uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull()
  .references(()=>users.id, {onDelete:"cascade"}),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
