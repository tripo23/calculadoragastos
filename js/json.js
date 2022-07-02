let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/62c0b1ee449a1f3821298256/1>", true);
req.setRequestHeader("X-Master-Key", "$2b$10$/d6FWxUERnGDLYwU150y0ekj49kjrOZbMTQ0UzH2vj7Sx2xkVoGfS");
req.send();