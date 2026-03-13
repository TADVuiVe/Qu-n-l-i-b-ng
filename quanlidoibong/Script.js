function addPlayer() {
    let table = document.getElementById("playerTable");

    let id = document.getElementById("playerId").value;
    let name = document.getElementById("playerName").value;
    let pos = document.getElementById("playerPosition").value;
    let num = document.getElementById("playerNumber").value;

    if (!id || !name || !num) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    let row = table.insertRow(-1);
    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${pos}</td>
        <td>${num}</td>
        <td><button class="btn-danger" onclick="deleteRow(this)">Xóa</button></td>
    `;
}

function addMatch() {
    let table = document.getElementById("matchTable");

    let enemy = document.getElementById("enemy").value;
    let date = document.getElementById("date").value;
    let stadium = document.getElementById("stadium").value;

    if (!enemy || !date || !stadium) {
        alert("Hãy điền đủ thông tin!");
        return;
    }

    let row = table.insertRow(-1);
    row.innerHTML = `
        <td>${enemy}</td>
        <td>${date}</td>
        <td>${stadium}</td>
        <td><button class="btn-danger" onclick="deleteRow(this)">Xóa</button></td>
    `;
}

function deleteRow(btn) {
    btn.parentNode.parentNode.remove();
}
