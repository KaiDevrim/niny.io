function genLink() {
  let vanity = document.getElementById("vanity").value;
  let urltoshorten = document.getElementById("urltoshorten").value;
  const data = { vanity: vanity, newlink: urltoshorten };
  fetch("/shortenlink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 409) {
        sendAlert("Error", "This vanity URL is already taken", "error");
      } else {
        sendAlert(
          "Error",
          "The link you want to shorten is not valid/is blacklisted",
          "error"
        );
      }
    })
    .then(json => {
        sendLink(
          "Success",
          json.status,
          "success",
          json.url
        );    });
}

var inputs = document.querySelectorAll('#vanity');
for(let i=0; i<inputs.length; i++){
    inputs[i].setAttribute('size',inputs[i].getAttribute('placeholder').length);
}
//temporary fix until i figure out server side redirect using a custom domain
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}