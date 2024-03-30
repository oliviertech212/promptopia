import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt.model";

export async function GET(request: any, { params }: any) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ userId: params.id }).populate("userId");
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
}
