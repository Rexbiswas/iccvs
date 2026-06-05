async function runTests() {
  console.log("Testing endpoints...");
  try {
    const res1 = await fetch("http://localhost:5001/api");
    const text1 = await res1.text();
    console.log("GET /api status:", res1.status);
    console.log("GET /api body:", text1);

    const res2 = await fetch("http://localhost:5001/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "nonexistent@example.com", password: "wrong" })
    });
    const json2 = await res2.json();
    console.log("POST /api/users/login status:", res2.status);
    console.log("POST /api/users/login response:", json2);
  } catch (err) {
    console.error("Test execution failed:", err.message);
  }
}

runTests();
