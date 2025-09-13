export async function signup(userData) {
  const res = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function login(credentials) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch("http://localhost:5000/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
