// import axios from "axios";

// const BASE_URL = "http://localhost:7000/api/";
// const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDFhMjRlN2RiZWIyY2Q1MGM5OGFmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTE5OTI1MiwiZXhwIjoxNjQxNDU4NDUyfQ.uhXNq15a4Nj3CJpLsdFH4dcPdTaT_d2Gjwe920Dmsjs";

// // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// // const currentUser = user && JSON.parse(user).currentUser;
// // const TOKEN = currentUser?.accessToken;

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });
 
import axios from "axios";

const BASE_URL = "http://localhost:7000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});