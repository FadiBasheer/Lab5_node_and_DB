function get () {
    const xhttp = new XMLHttpRequest();
    const endPointRoot = "http://lab4.hostmatching.com";

    xhttp.open("GET", endPointRoot, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objJson = JSON.parse(this.responseText);

            for (let key in objJson) {
                if (objJson.hasOwnProperty(key)) {

                    let myPara = document.createElement("p");
                    myPara.innerHTML = objJson[key].name + ": "+ objJson[key].score;
                    document.getElementById("feedback").appendChild(myPara);
                }
            }
        } 
    };
}

get();