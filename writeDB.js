function post() {
    const xhttp = new XMLHttpRequest();
    const endPointRoot = "http://lab4.hostmatching.com";
    const name = document.getElementById("inputName").value;
    const score = document.getElementById("inputScore").value;
    const valid_msg = "Entered score is not a number. Enter a number as score.";

    console.log(name);
    console.log(score);

    // input validation: if score is not a number
    if (isNaN(score)) {
        document.getElementById("feedback").innerHTML = valid_msg;
        document.getElementById('inputScore').value = "";
    } else {
        const json = {
            "name": `${name}`,
            "score": `${score}`
        };


        xhttp.open("POST", endPointRoot, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(JSON.stringify(json));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("feedback").innerHTML =
                    this.responseText;
            }
        };
    }
}