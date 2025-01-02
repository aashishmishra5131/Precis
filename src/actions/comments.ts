"use server";
import db from "@/db/drizzle";
import { comment, reply } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { getUser } from "./user";
import { getStoryById } from "./story";
import { revalidatePath } from "next/cache";

type Any = any;

export const NumberOfComments = async (storyId: string) => {
  try {
    const response = await db
      .select({ count: count() })
      .from(comment)
      .where(eq(comment.storyId, storyId));

    return response?.[0]?.count || 0;
  } catch (error) {
    return error;
  }
};

// add comment by story
export const commentStory = async (
  storyId: string,
  content: string,
  commentId?: string
) => {
  const user: Any = await getUser();

  if (!storyId || !content) {
    return { error: "something is missing" };
  }

  let Comment;

  try {
    await getStoryById(storyId, true);
    if (!commentId) {
      const data = {
        userId: user.id,
        storyId,
        content,

      };
      Comment = await db.insert(comment).values(data).returning();
    } else {
      const data: Any = {
        userId: user.id,
        commentId,
        content,
      };
      Comment = await db.insert(reply).values(data).returning();
      console.log(Comment)
    }
  
  } catch (error) {
    return error;
  }
  revalidatePath(`/published/${storyId}`);
};

// get all comments by story
export const getAllComments = async (storyId: string) => {
  if (!storyId) {
    return { error: "required data is not provided" };
  }

  let Comments;

  try {
    Comments = await db.query.comment.findMany({
      where: eq(comment.storyId, storyId),
      with: {
        clap: true,
        author: true,
        replies: { with: { clap: true, author: true } },
      },
    });

    if (!Comments?.length) {
      return { error: "No Comment" };
    }
  } catch (error) {
    return error;
  }
  revalidatePath(`published/${storyId}`);
  return Comments;
};