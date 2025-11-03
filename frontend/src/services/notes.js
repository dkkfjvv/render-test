// //services 디렉토리에 백엔드서버와 통신하는 별도의 모듈을 만드네? 그걸 servies에 하는걸까나?
// import axios from "axios";
// const baseUrl = "http://localhost:3001/notes";

// // const getAll = () => {
// //   return axios.get(baseUrl);
// // };
// const getAll = () => {
//   const request = axios.get(baseUrl);
//   const nonExisting = {
//     id: 10000,
//     content: "This note is not saved to server",
//     important: true,
//   };
//   return request.then((response) => response.data.concat(nonExisting));
// };

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject).then(response => {response.data});
// };

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject);
// };

// export default {
//   // getAll: getAll,
//   // create: create,
//   // update: update,
//   getAll,
//   create,
//   update,
// };

import axios from "axios";
// const baseUrl = "http://localhost:3001/notes";
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
