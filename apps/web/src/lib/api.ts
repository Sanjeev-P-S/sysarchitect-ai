const API_URL = "http://127.0.0.1:8000";

export async function evaluateDiagram(diagram: unknown) {
  const response = await fetch(`${API_URL}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diagram),
  });

  if (!response.ok) {
    throw new Error("Failed to evaluate architecture.");
  }

  return response.json();
}