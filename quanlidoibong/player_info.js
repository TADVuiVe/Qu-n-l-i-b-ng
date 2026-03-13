// player_info.js - Import/Export CSV và quản lý thông tin cầu thủ

const STORAGE_KEY = 'team_players_v1';

// Đọc dữ liệu từ localStorage
function loadPlayers() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Lỗi khi đọc dữ liệu:', e);
        return [];
    }
}

// Lưu dữ liệu vào localStorage
function savePlayers(players) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    } catch (e) {
        console.error('Lỗi khi lưu dữ liệu:', e);
        alert('Lỗi khi lưu dữ liệu!');
    }
}

// Hiển thị danh sách cầu thủ
function renderPlayerTable() {
    const tbody = document.getElementById('playerTableBody');
    if (!tbody) return;

    const players = loadPlayers();
    tbody.innerHTML = '';

    if (players.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="color:var(--muted);text-align:center;padding:20px">Chưa có dữ liệu. Hãy tải lên file CSV.</td></tr>';
        return;
    }

    players.forEach((player, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${player.id || ''}</td>
            <td style="text-align:left;padding-left:18px">${player.name || ''}</td>
            <td>${player.position || ''}</td>
            <td>${player.dob || ''}</td>
            <td>${player.height || ''}</td>
            <td>${player.weight || ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Xử lý import CSV
function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
        alert('Vui lòng chọn file CSV!');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const content = e.target.result;
            const lines = content.split(/\r?\n/).filter(line => line.trim());

            if (lines.length === 0) {
                alert('File CSV rỗng!');
                return;
            }

            // Bỏ qua header (dòng đầu)
            const dataLines = lines.slice(1);
            const players = [];

            dataLines.forEach((line, idx) => {
                const cols = line.split(',').map(c => c.trim());

                // Format: ID, Tên, Vị trí, Ngày sinh, Chiều cao, Cân nặng
                if (cols.length >= 3) {
                    players.push({
                        id: cols[0] || `P${idx + 1}`,
                        name: cols[1] || '',
                        position: cols[2] || '',
                        dob: cols[3] || '',
                        height: cols[4] || '',
                        weight: cols[5] || '',
                        number: cols[6] || ''
                    });
                }
            });

            if (players.length > 0) {
                savePlayers(players);
                renderPlayerTable();
                alert(`Đã nhập thành công ${players.length} cầu thủ!`);
            } else {
                alert('Không tìm thấy dữ liệu hợp lệ trong file CSV!');
            }

        } catch (error) {
            console.error('Lỗi khi đọc CSV:', error);
            alert('Lỗi khi đọc file CSV! Kiểm tra định dạng file.');
        }
    };

    reader.onerror = function () {
        alert('Lỗi khi đọc file!');
    };

    reader.readAsText(file, 'UTF-8');
}

// Export dữ liệu ra CSV
function exportToCSV() {
    const players = loadPlayers();

    if (players.length === 0) {
        alert('Không có dữ liệu để xuất!');
        return;
    }

    // Tạo header
    let csv = 'ID,Tên,Vị trí,Ngày sinh,Chiều cao,Cân nặng,Số áo\n';

    // Thêm dữ liệu
    players.forEach(p => {
        csv += `${p.id || ''},${p.name || ''},${p.position || ''},${p.dob || ''},${p.height || ''},${p.weight || ''},${p.number || ''}\n`;
    });

    // Tạo file và download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `players_${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Xóa toàn bộ dữ liệu
function clearAllData() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu cầu thủ?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderPlayerTable();
        alert('Đã xóa toàn bộ dữ liệu!');
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function () {
    renderPlayerTable();

    // Gắn sự kiện cho input file
    const csvInput = document.getElementById('csvInput');
    if (csvInput) {
        csvInput.addEventListener('change', handleCSVImport);
    }

    // Gắn sự kiện cho nút export (nếu có)
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }

    // Gắn sự kiện cho nút xóa (nếu có)
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllData);
    }
});
