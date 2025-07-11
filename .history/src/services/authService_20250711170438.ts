export interface LoginResponse {
  token: string;
  role: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  // ✅ Ensure both token and role are returned
  return {
    token: data.token,
    role: data.role,
  };
}
