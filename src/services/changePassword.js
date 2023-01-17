async function changePassword(credentials) {
  return fetch("http://localhost:3222/api/v1/user/change-password", {
    method: "POST",
    headers: {
      Content_Type: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default changePassword;
