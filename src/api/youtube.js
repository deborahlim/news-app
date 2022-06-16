// function youtubeSearch(term) {
  // 2. Initialize the JavaScript client library.
//   window.gapi.client
//     .init({
//       apiKey: "AIzaSyBIIjsqbgbSIv12TzL_4aKJliC17NhL3fk",
//     })
//     .then(function () {
//       // 3. Initialize and make the API request.
//       return window.gapi.client.request({
//         path: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}`,
//       });
//     })
//     .then(
//       function (response) {
//         console.log(response.result.items);
//         return response.result.items;
//       },
//       function (reason) {
//         console.log("Error: " + reason.result.error.message);
//       }
//     );
// }
// 1. Load the JavaScript client library.
import axios from "axios";

const KEY = "AIzaSyBIIjsqbgbSIv12TzL_4aKJliC17NhL3fk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: KEY,
  },
});

