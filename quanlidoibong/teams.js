// teams.js - Xử lý kéo thả đội hình và lưu chiến thuật

const FORMATION_KEY = 'team_formation_v1';
const FORMATION_TYPE_KEY = 'team_formation_type_v1';
const PLAYERS_KEY = 'team_players_v1';

// Định nghĩa các sơ đồ chiến thuật
const FORMATIONS = {
    '4-3-3': {
        name: '4-3-3',
        rows: [
            ['LW', 'ST', 'RW'],
            ['LM', 'CM', 'RM'],
            ['LB', 'CB1', 'CB2', 'RB'],
            ['GK']
        ]
    },
    '4-4-2': {
        name: '4-4-2',
        rows: [
            ['ST1', 'ST2'],
            ['LM', 'CM1', 'CM2', 'RM'],
            ['LB', 'CB1', 'CB2', 'RB'],
            ['GK']
        ]
    },
    '3-5-2': {
        name: '3-5-2',
        rows: [
            ['ST1', 'ST2'],
            ['LWB', 'LM', 'CM', 'RM', 'RWB'],
            ['CB1', 'CB2', 'CB3'],
            ['GK']
        ]
    },
    '4-2-3-1': {
        name: '4-2-3-1',
        rows: [
            ['ST'],
            ['LW', 'CAM', 'RW'],
            ['CDM1', 'CDM2'],
            ['LB', 'CB1', 'CB2', 'RB'],
            ['GK']
        ]
    },
    '3-4-3': {
        name: '3-4-3',
        rows: [
            ['LW', 'ST', 'RW'],
            ['LM', 'CM1', 'CM2', 'RM'],
            ['CB1', 'CB2', 'CB3'],
            ['GK']
        ]
    },
    '5-3-2': {
        name: '5-3-2',
        rows: [
            ['ST1', 'ST2'],
            ['LM', 'CM', 'RM'],
            ['LWB', 'CB1', 'CB2', 'CB3', 'RWB'],
            ['GK']
        ]
    }
};

// Load cầu thủ từ localStorage
function loadPlayers() {
    try {
        const data = localStorage.getItem(PLAYERS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Lỗi khi đọc dữ liệu cầu thủ:', e);
        return [];
    }
}

// Load đội hình đã lưu
function loadFormation() {
    try {
        const data = localStorage.getItem(FORMATION_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Lỗi khi đọc đội hình:', e);
        return {};
    }
}

// Lưu đội hình
function saveFormation(formation) {
    try {
        localStorage.setItem(FORMATION_KEY, JSON.stringify(formation));
    } catch (e) {
        console.error('Lỗi khi lưu đội hình:', e);
    }
}

// Lưu loại sơ đồ
function saveFormationType(type) {
    try {
        localStorage.setItem(FORMATION_TYPE_KEY, type);
    } catch (e) {
        console.error('Lỗi khi lưu loại sơ đồ:', e);
    }
}

// Load loại sơ đồ
function loadFormationType() {
    try {
        return localStorage.getItem(FORMATION_TYPE_KEY) || '4-3-3';
    } catch (e) {
        console.error('Lỗi khi đọc loại sơ đồ:', e);
        return '4-3-3';
    }
}

// Tạo sân theo sơ đồ
function buildFormationField(formationType) {
    const field = document.getElementById('formationField');
    const title = document.getElementById('formationTitle');

    if (!field) return;

    field.innerHTML = '';
    if (title) title.textContent = `Sân (Sơ đồ ${formationType})`;

    const formation = FORMATIONS[formationType];
    if (!formation) return;

    const savedFormation = loadFormation();
    const players = loadPlayers();

    formation.rows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'formation-row';

        row.forEach(position => {
            const slot = document.createElement('div');
            slot.className = 'formation-slot';
            slot.dataset.pos = position;

            // Kiểm tra xem vị trí này có cầu thủ chưa
            const playerId = savedFormation[position];

            if (playerId) {
                const player = players.find(p => p.id === playerId);
                if (player) {
                    const card = createPlayerCard(player);
                    slot.appendChild(card);
                } else {
                    slot.innerHTML = `<div class="slot-label">${position}</div>`;
                }
            } else {
                slot.innerHTML = `<div class="slot-label">${position}</div>`;
            }

            // Gắn sự kiện drag & drop
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('dragenter', handleDragEnter);
            slot.addEventListener('dragleave', handleDragLeave);
            slot.addEventListener('drop', handleDrop);

            rowDiv.appendChild(slot);
        });

        field.appendChild(rowDiv);
    });
}

// Hiển thị danh sách cầu thủ có thể kéo
function renderPlayersList() {
    const container = document.getElementById('teamPlayersList');
    if (!container) return;

    const players = loadPlayers();
    const formation = loadFormation();

    // Lọc cầu thủ chưa được xếp vào đội hình
    const assignedIds = Object.values(formation);
    const availablePlayers = players.filter(p => !assignedIds.includes(p.id));

    container.innerHTML = '';

    if (availablePlayers.length === 0) {
        container.innerHTML = '<div style="color:var(--muted);padding:12px;text-align:center;">Tất cả cầu thủ đã được xếp vào đội hình hoặc chưa có cầu thủ.</div>';
        return;
    }

    availablePlayers.forEach(player => {
        const playerEl = document.createElement('div');
        playerEl.className = 'draggable-player';
        playerEl.draggable = true;
        playerEl.dataset.playerId = player.id;
        playerEl.dataset.playerName = player.name;
        playerEl.dataset.playerPosition = player.position;
        playerEl.dataset.playerNumber = player.number || '?';

        playerEl.innerHTML = `
            <div style="font-weight:600;font-size:14px;">${player.name}</div>
            <div style="font-size:12px;color:var(--muted);">${player.position} • #${player.number || '?'}</div>
        `;

        // Drag events
        playerEl.addEventListener('dragstart', handleDragStart);
        playerEl.addEventListener('dragend', handleDragEnd);

        container.appendChild(playerEl);
    });
}

// Hiển thị đội hình đã lưu (đã được tích hợp vào buildFormationField)
function renderFormation() {
    const formationType = loadFormationType();
    buildFormationField(formationType);
    renderPlayersList();
}

// Tạo card cầu thủ trong slot
function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.draggable = true;
    card.dataset.playerId = player.id;
    card.dataset.playerName = player.name;
    card.dataset.playerPosition = player.position;
    card.dataset.playerNumber = player.number || '?';

    card.innerHTML = `
        <div class="player-number">${player.number || '?'}</div>
        <div class="player-name">${player.name}</div>
        <div class="player-pos">${player.position}</div>
    `;

    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
}

// Biến lưu trạng thái kéo
let draggedElement = null;

// Xử lý khi bắt đầu kéo
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

// Xử lý khi kết thúc kéo
function handleDragEnd(e) {
    e.target.style.opacity = '1';
    draggedElement = null;
}

// Xử lý khi kéo qua slot
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Xử lý khi vào slot
function handleDragEnter(e) {
    this.classList.add('drag-over');
}

// Xử lý khi rời slot
function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

// Xử lý khi thả vào slot
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    this.classList.remove('drag-over');

    if (!draggedElement) return false;

    const slot = this;
    const position = slot.dataset.pos;

    // Lấy thông tin cầu thủ đang kéo
    const playerId = draggedElement.dataset.playerId;
    const playerName = draggedElement.dataset.playerName;
    const playerPosition = draggedElement.dataset.playerPosition;
    const playerNumber = draggedElement.dataset.playerNumber;

    // Kiểm tra xem slot đã có cầu thủ chưa
    const existingCard = slot.querySelector('.player-card');

    if (existingCard) {
        // Nếu slot đã có cầu thủ, swap hoặc return về danh sách
        const existingId = existingCard.dataset.playerId;

        // Xóa cầu thủ cũ khỏi slot
        existingCard.remove();

        // Nếu cầu thủ đang kéo từ slot khác, swap
        const fromSlot = draggedElement.closest('.formation-slot');
        if (fromSlot) {
            // Đưa cầu thủ cũ vào slot cũ của cầu thủ đang kéo
            const oldPlayer = loadPlayers().find(p => p.id === existingId);
            if (oldPlayer) {
                const oldCard = createPlayerCard(oldPlayer);
                fromSlot.innerHTML = '';
                fromSlot.appendChild(oldCard);
            } else {
                fromSlot.innerHTML = `<div class="slot-label">${fromSlot.dataset.pos}</div>`;
            }
        }
    }

    // Tạo card mới cho slot
    const player = loadPlayers().find(p => p.id === playerId);
    if (player) {
        slot.innerHTML = '';
        const newCard = createPlayerCard(player);
        slot.appendChild(newCard);
    }

    // Lưu đội hình
    updateFormation();

    // Cập nhật danh sách cầu thủ
    renderPlayersList();

    return false;
}

// Cập nhật và lưu đội hình
function updateFormation() {
    const formation = {};

    document.querySelectorAll('.formation-slot').forEach(slot => {
        const position = slot.dataset.pos;
        const card = slot.querySelector('.player-card');

        if (card) {
            formation[position] = card.dataset.playerId;
        }
    });

    saveFormation(formation);
}

// Reset đội hình
function resetFormation() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ đội hình?')) {
        localStorage.removeItem(FORMATION_KEY);

        // Render lại đội hình
        renderFormation();
        alert('Đã reset đội hình!');
    }
}

// Lưu đội hình thủ công
function saveFormationManual() {
    updateFormation();
    const formationType = loadFormationType();
    alert(`Đã lưu đội hình ${formationType}!`);
}

// Thay đổi sơ đồ chiến thuật
function changeFormation(newType) {
    const oldFormation = loadFormation();
    const hasPlayers = Object.keys(oldFormation).length > 0;

    if (hasPlayers) {
        const confirm = window.confirm('Thay đổi sơ đồ sẽ xóa đội hình hiện tại. Bạn có chắc muốn tiếp tục?');
        if (!confirm) {
            // Khôi phục lại select về giá trị cũ
            const select = document.getElementById('formationSelect');
            if (select) {
                select.value = loadFormationType();
            }
            return;
        }
        // Xóa đội hình cũ
        localStorage.removeItem(FORMATION_KEY);
    }

    // Lưu loại sơ đồ mới
    saveFormationType(newType);

    // Render lại
    renderFormation();
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function () {
    // Load sơ đồ đã chọn
    const savedFormationType = loadFormationType();
    const formationSelect = document.getElementById('formationSelect');
    if (formationSelect) {
        formationSelect.value = savedFormationType;
        formationSelect.addEventListener('change', (e) => {
            changeFormation(e.target.value);
        });
    }

    // Render đội hình đã lưu
    renderFormation();

    // Gắn sự kiện cho nút reset
    const resetBtn = document.getElementById('resetFormationBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFormation);
    }

    // Gắn sự kiện cho nút save
    const saveBtn = document.getElementById('saveFormationBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveFormationManual);
    }
});
