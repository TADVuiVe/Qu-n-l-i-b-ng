// app.js - shared logic (vanilla JS)
const app = (function () {
  const STORAGE_KEYS = {
    players: 'team_players_v1',
    matches: 'team_matches_v1',
    trainings: 'team_trainings_v1',
    settings: 'team_settings_v1',
    teamPlayersTemp: 'team_players_tmp_v1'
  };

  // Helpers
  const read = (k) => JSON.parse(localStorage.getItem(k) || '[]');
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const writeObj = (k, o) => localStorage.setItem(k, JSON.stringify(o || {}));
  const readObj = (k) => JSON.parse(localStorage.getItem(k) || '{}');

  /* ========== PLAYERS ========== */
  function renderPlayers() {
    const tbody = document.querySelector('#playersTable tbody');
    if (!tbody) return;
    const players = read(STORAGE_KEYS.players);
    tbody.innerHTML = '';
    players.forEach((p, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td style="text-align:left;padding-left:18px">${p.name}</td>
        <td>${p.position}</td>
        <td>${p.number}</td>
        <td>
          <button class="btn" onclick="app.editPlayer('${p.id}')">Sửa</button>
          <button class="btn btn-danger" onclick="app.deletePlayer('${p.id}')">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    // bind save button (if on players page)
    const saveBtn = document.querySelector('#savePlayerBtn');
    if (saveBtn) {
      saveBtn.onclick = savePlayer;
    }
    const clearBtn = document.querySelector('#clearPlayerBtn');
    if (clearBtn) clearBtn.onclick = clearPlayerForm;
  }

  function savePlayer() {
    const id = (document.getElementById('p_id') || {}).value?.trim();
    const name = (document.getElementById('p_name') || {}).value?.trim();
    const position = (document.getElementById('p_position') || {}).value;
    const number = (document.getElementById('p_number') || {}).value;
    if (!id || !name) { alert('Vui lòng nhập Mã và Tên cầu thủ.'); return; }
    let players = read(STORAGE_KEYS.players);
    // if exists -> update
    const existing = players.find(x => x.id === id);
    if (existing) {
      existing.name = name; existing.position = position; existing.number = number;
    } else {
      players.push({ id, name, position, number });
    }
    write(STORAGE_KEYS.players, players);
    renderPlayers();
    clearPlayerForm();
  }

  function editPlayer(id) {
    const players = read(STORAGE_KEYS.players);
    const p = players.find(x => x.id === id);
    if (!p) return;
    document.getElementById('p_id').value = p.id;
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_position').value = p.position;
    document.getElementById('p_number').value = p.number;
    // change button to update mode
    const saveBtn = document.getElementById('savePlayerBtn');
    if (saveBtn) saveBtn.textContent = 'Cập nhật';
    // ensure save will overwrite (savePlayer already does)
  }

  function deletePlayer(id) {
    if (!confirm('Bạn có chắc muốn xóa cầu thủ này?')) return;
    let players = read(STORAGE_KEYS.players);
    players = players.filter(x => x.id !== id);
    write(STORAGE_KEYS.players, players);
    renderPlayers();
  }

  function clearPlayerForm() {
    ['p_id', 'p_name', 'p_position', 'p_number'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { if (el.tagName === 'SELECT') el.selectedIndex = 0; else el.value = ''; }
    });
    const saveBtn = document.getElementById('savePlayerBtn');
    if (saveBtn) saveBtn.textContent = 'Thêm';
  }

  /* ========== MATCHES ========== */
  function renderMatches() {
    const tbody = document.querySelector('#matchesTable tbody');
    if (!tbody) return;
    const matches = read(STORAGE_KEYS.matches);
    tbody.innerHTML = '';
    matches.forEach((m, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:left;padding-left:18px">${m.enemy}</td>
        <td>${m.date}</td>
        <td>${m.stadium}</td>
        <td>
          <button class="btn btn-danger" onclick="app.deleteMatch('${m._id}')">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    const saveBtn = document.querySelector('#saveMatchBtn');
    if (saveBtn) saveBtn.onclick = saveMatch;
    const clearBtn = document.querySelector('#clearMatchBtn');
    if (clearBtn) clearBtn.onclick = clearMatchForm;
  }

  function saveMatch() {
    const enemy = (document.getElementById('m_enemy') || {}).value?.trim();
    const date = (document.getElementById('m_date') || {}).value;
    const stadium = (document.getElementById('m_stadium') || {}).value?.trim();
    if (!enemy || !date || !stadium) { alert('Vui lòng nhập đủ thông tin trận đấu'); return; }
    const matches = read(STORAGE_KEYS.matches);
    matches.push({ _id: 'M' + Date.now(), enemy, date, stadium });
    write(STORAGE_KEYS.matches, matches);
    renderMatches();
    clearMatchForm();
  }

  function deleteMatch(id) {
    if (!confirm('Xóa trận đấu?')) return;
    let matches = read(STORAGE_KEYS.matches);
    matches = matches.filter(x => x._id !== id);
    write(STORAGE_KEYS.matches, matches);
    renderMatches();
  }

  function clearMatchForm() {
    ['m_enemy', 'm_date', 'm_stadium'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
  }

  /* ========== TRAININGS ========== */
  function renderTrainings() {
    const tbody = document.querySelector('#trainingTable tbody');
    if (!tbody) return;
    const trainings = read(STORAGE_KEYS.trainings);
    tbody.innerHTML = '';
    trainings.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.date}</td><td style="text-align:left;padding-left:12px">${t.topic}</td><td>${t.place}</td><td><button class="btn btn-danger" onclick="app.deleteTraining('${t._id}')">Xóa</button></td>`;
      tbody.appendChild(tr);
    });
    const saveBtn = document.querySelector('#saveTraining');
    if (saveBtn) saveBtn.onclick = saveTraining;
  }

  function saveTraining() {
    const date = (document.getElementById('t_date') || {}).value;
    const topic = (document.getElementById('t_topic') || {}).value?.trim();
    const place = (document.getElementById('t_place') || {}).value?.trim();
    if (!date || !topic) { alert('Nhập ngày và nội dung'); return; }
    const trainings = read(STORAGE_KEYS.trainings);
    trainings.push({ _id: 'T' + Date.now(), date, topic, place });
    write(STORAGE_KEYS.trainings, trainings);
    renderTrainings();
    document.getElementById('t_date').value = ''; document.getElementById('t_topic').value = ''; document.getElementById('t_place').value = '';
  }

  function deleteTraining(id) {
    if (!confirm('Xóa lịch tập?')) return;
    let trainings = read(STORAGE_KEYS.trainings);
    trainings = trainings.filter(x => x._id !== id);
    write(STORAGE_KEYS.trainings, trainings);
    renderTrainings();
  }

  /* ========== STATS ========== */
  function renderStats() {
    // read basic data
    const players = read(STORAGE_KEYS.players);
    const matches = read(STORAGE_KEYS.matches);
    document.getElementById('k_totalPlayers').textContent = players.length;
    document.getElementById('k_totalMatches').textContent = matches.length;
    // Win rate is simulated here (you can compute from results later)
    const winRate = Math.round((matches.length ? (Math.min(100, Math.max(0, matches.length * 7 % 100))) : 0));
    document.getElementById('k_winRate').textContent = winRate + '%';
    document.getElementById('k_topScorer').textContent = players.length ? players[0].name : '—';
  }

  /* ========== SETTINGS ========== */
  function renderSettings() {
    const s = readObj(STORAGE_KEYS.settings);
    if (document.getElementById('s_clubName')) document.getElementById('s_clubName').value = s.clubName || '';
    if (document.getElementById('s_homeColor')) document.getElementById('s_homeColor').value = s.homeColor || '';
    if (document.getElementById('s_awayColor')) document.getElementById('s_awayColor').value = s.awayColor || '';
    const save = document.getElementById('saveSettings');
    if (save) save.onclick = saveSettings;
    const reset = document.getElementById('resetSettings');
    if (reset) reset.onclick = () => {
      if (confirm('Khôi phục cài đặt mặc định?')) {
        writeObj(STORAGE_KEYS.settings, { clubName: '', homeColor: '', awayColor: '' });
        renderSettings();
      }
    };
  }

  function saveSettings() {
    const clubName = (document.getElementById('s_clubName') || {}).value?.trim();
    const homeColor = (document.getElementById('s_homeColor') || {}).value?.trim();
    const awayColor = (document.getElementById('s_awayColor') || {}).value?.trim();
    writeObj(STORAGE_KEYS.settings, { clubName, homeColor, awayColor });
    alert('Lưu cài đặt thành công!');
  }

  /* ========== TEAM PLAYERS LIST (for teams page) ========== */
  function renderTeamPlayers() {
    const container = document.getElementById('teamPlayersList');
    if (!container) return;
    const players = read(STORAGE_KEYS.players);
    container.innerHTML = '';

    if (players.length === 0) {
      container.innerHTML = '<div style="color:var(--muted);padding:12px;text-align:center;">Chưa có cầu thủ. Vào Quản lý Cầu thủ để thêm.</div>';
      return;
    }

    players.forEach(p => {
      const el = document.createElement('div');
      el.className = 'draggable-player';
      el.draggable = true;
      el.dataset.playerId = p.id;
      el.dataset.playerName = p.name;
      el.dataset.playerPosition = p.position;
      el.dataset.playerNumber = p.number || '?';

      el.innerHTML = `
        <div style="font-weight:600;font-size:14px;">${p.name}</div>
        <div style="font-size:12px;color:var(--muted);">${p.position} • #${p.number || '?'}</div>
      `;

      container.appendChild(el);
    });
  }

  /* ========== FORMATION MANAGEMENT ========== */
  function saveFormation(formation) {
    writeObj('team_formation_v1', formation);
  }

  function loadFormation() {
    return readObj('team_formation_v1');
  }

  /* Public API */
  return {
    renderPlayers,
    renderMatches,
    renderTrainings,
    renderStats,
    renderSettings,
    renderTeamPlayers,
    editPlayer,
    deletePlayer,
    deleteMatch,
    deleteTraining,
    savePlayer,
    saveMatch,
    saveTraining,
    saveSettings,
    saveFormation,
    loadFormation
  };
})();

