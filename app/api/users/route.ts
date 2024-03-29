export async function GET(request: any) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    let users = await res.json();
    // console.log("user", users, new Response(JSON.stringify(users)));
    return new Response(JSON.stringify(users));
  } catch (error: any) {
    throw new Error(error.message);
    console.log("error while getting user", error);
  }
}
