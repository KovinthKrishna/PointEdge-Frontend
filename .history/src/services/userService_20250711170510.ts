export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/register/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json(); // { firstName, lastName, ... }
}
