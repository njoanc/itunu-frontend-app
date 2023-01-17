async function loginUser(credentials) {
  return fetch("http://localhost:3222/api/v1/auth/login", {
    method: "POST",
    headers: {
      Content_Type: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default loginUser;
