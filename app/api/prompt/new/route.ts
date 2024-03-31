import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt.model";

export async function POST(request: any) {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();

    const newPrompt = await Prompt.create({
      prompt: prompt,
      tag: tag,
      userId: userId,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error: any) {
    // throw new Error(error.message);
    return new Response("Failed to create a new prompt ", {
      status: 500,
    });

    console.log("error while creating prompt", error);
  }
}
