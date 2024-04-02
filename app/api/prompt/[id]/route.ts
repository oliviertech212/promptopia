import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt.model";

export async function GET(request: any, { params }: any) {
  try {
    await connectToDB();
    const prompt = await Prompt.find({
      _id: params.id,
    }).populate("userId");
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
}

// update prompts by id
export async function PATCH(request: any, { params }: any) {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    const data = await request.json();
    const prompt = await Prompt.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
}

// delete prompts by id
export async function DELETE(request: any, { params }: any) {
  try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error: any) {
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
}
