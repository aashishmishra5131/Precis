"use server";

import { and, eq } from "drizzle-orm";
import { getUser } from "./actions/user";
import db from "./db/drizzle";
import { save } from "./db/schema";

// Define the User type
interface User {
  id: string;
}

export const checkFav = async (storyId: string) => {
  const user = (await getUser()) as User | null; // Type assertion

  if (!user) {
    throw new Error("User not found");
  }

  let fav;
  try {
    fav = await db.query.save.findFirst({
      where: and(eq(save.userId, user.id), eq(save.storyId, storyId)),
    });
  } catch (error) {
    return error;
  }
  return !!fav;
};
