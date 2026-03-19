// post
/*
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(data)}`,
      //body: formBody,
    }
*/
export function ifetch(url, method = 'GET', data, options = {
  credentials: 'include',
  method: 'GET'
}) {

  // 设置默认值
  if (method) {
    options.method = method
    if (method == "POST") {
      if (options.headers['Content-Type'] == undefined) {
        options.headers['Content-Type'] = "application/x-www-form-urlencoded"
        options['body'] = `data=${encodeURIComponent(data)}`
      }
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url, options).then((response) => {
      if (response.ok) {
        var respct = response.headers.get("content-type")
        if (respct == "application/x-mpegURL") {
          response.text().then(data => {
            resolve(data)
          })
        } else if (respct == "application/json") {
          response.json().then((data) => {
            resolve(data)
          })
        } else {
          response.text().then(data => {
            if (isJson(data)) {
              resolve(JSON.parse(data))
            } else {
              resolve(data)
            }
          })
        }
      } else {
        reject(response)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}


export function objectToQueryString(obj) {
  return Object.keys(obj).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  }).join('&')
}

export function arrayToQueryString(dict) {
  var k, tmp, v;
  tmp = [];
  for (k in dict) {
    v = dict[k];
    tmp.push((encodeURIComponent(k)) + "=" + (encodeURIComponent(v)));
  }
  return tmp.join('&');
}


export function arrayToPostData(dict) {
  var k, tmp, v;
  tmp = [];
  for (k in dict) {
    v = dict[k];
    tmp.push(k + "=" + v);
  }
  return tmp.join('&');
}