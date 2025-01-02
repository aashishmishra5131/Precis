import { getStoryById } from "@/actions/story";
import { getUserById } from "@/actions/user";
import StoryRender from "@/components/StoryRender";
import React from "react";

type Any = any;

const Published = async ({ params }: { params: { storyId: string } }) => {
  const publishedStory: Any = await getStoryById(params?.storyId, true);

  if (!publishedStory) {
    return <div>Not story found</div>;
  }

  const user: Any = await getUserById(publishedStory?.userId);

  return (
    <StoryRender
      username={user?.name}
      userImage={user?.image}
      publishedStory={publishedStory}
    />
  );
};

export default Published;