// todo: import auth from state and use it here

export default function api(endpoint, { method = "GET", body, headers } = {}) {
    console.log('using api for endpoint', { endpoint })
    return fetch(`http://localhost:3000/${endpoint}`, {
        method: method,
        headers,
        // headers: {
        //     "Content-Type": "application/json",
        //     //   Authorization: `Bearer ${jwt}`,
        //     ...headers,
        // },
        body,
    });
}
