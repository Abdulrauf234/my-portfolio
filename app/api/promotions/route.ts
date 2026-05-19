// Route handler disabled for Static HTML Export compatibility.
// Client now queries and writes to localStorage via lib/storage.ts.

export async function GET() {
  return Response.json([]);
}
