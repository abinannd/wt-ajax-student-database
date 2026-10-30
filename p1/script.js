function getStudent() {

    var regno = document.getElementById("regno").value;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "db.php?regno=" + encodeURIComponent(regno), true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {

            document.getElementById("result").innerHTML =
                xhr.responseText;

        }

    };

    xhr.send();
}