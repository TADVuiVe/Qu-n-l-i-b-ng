const transfers = [];

document.getElementById("transferForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const transfer = {
        player: player.value,
        from: fromTeam.value,
        to: toTeam.value,
        date: date.value,
        fee: fee.value
    };

    transfers.push(transfer);
    renderTransfers();
    this.reset();
});

function renderTransfers() {
    const table = document.getElementById("transferTable");
    table.innerHTML = "";

    transfers.forEach(t => {
        table.innerHTML += `
            <tr>
                <td>${t.player}</td>
                <td>${t.from}</td>
                <td>${t.to}</td>
                <td>${t.date}</td>
                <td>${t.fee || "—"}</td>
            </tr>
        `;
    });
}
