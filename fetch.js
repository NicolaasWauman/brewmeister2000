export function fetchReceptArray() {
  const jsonLeeg = JSON.stringify({});

  const paraOntvang = {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: jsonLeeg,
    method: 'POST',
  };

  return fetch('http://localhost:1880/receptUit', paraOntvang)
    .then(data => data.json())
    .then(res => {const receptArr = res;
        return receptArr})
    .catch(error => console.log(error));
}

