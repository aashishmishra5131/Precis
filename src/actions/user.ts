"use server";

import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

type Any = any;

export const getUser = async () => {
  const session: Any = await getAuthSession();
  if (!session) {
    return {
      error: "user not found",
    };
  }
  let userDetails;
  try {
    userDetails = await db.query.user.findFirst({
      where: eq(user?.email, session.user.email),
    });
    if (!userDetails) {
      return { error: "user not found" };
    }
  } catch (error) {
    return error;
  }
  return userDetails;
};

export const getUserById = async (userId: string) => {
  let userDetails;
  try {
    userDetails = await db.query.user.findFirst({
      where: eq(user?.id, userId),
    });
    if (!userDetails) {
      return { error: "user not found" };
    }
  } catch (error) {
    return error;
  }
  return userDetails;
};