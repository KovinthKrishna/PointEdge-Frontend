export async function login(email: string, password: string): Promise<string> {
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
    return data.token;
  }
  