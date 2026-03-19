export function makeOrderId(randomLen) {
  var random_no = "";
  for (var i = 0; i < randomLen; i++) {
    random_no += Math.floor(Math.random() * 10);
  }
  random_no = new Date().getTime() + random_no;
  return random_no;
}