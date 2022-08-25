import axios from "axios";

export const tokenApiService = {
  fetchTokens,
  fetchToken
};

const tokensBaseUrl = "https://tokens.webaverse.com";

// Temporary solution for now as we don't have an API endpoint the provides a List of tokens.
async function fetchTokens(from = 0, to) {
  let tokensArray = [];
  let i;
  for (i = 1; i < from + to + 1; i++) {
    await axios
      .get(`${tokensBaseUrl}/${i}`)
      .then(function (response) {
        tokensArray.push(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return tokensArray;
}

async function fetchToken(id) {
 return await axios
    .get(`${tokensBaseUrl}/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
