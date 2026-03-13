# ⚽ Hệ Thống Quản Lý Đội Bóng

Ứng dụng quản lý đội bóng với các tính năng:

## 🎯 Tính năng chính

### 1. Import/Export CSV Cầu Thủ
- **Vị trí**: Cài đặt (player_info.html)
- **Chức năng**:
  - 📁 Import file CSV để thêm danh sách cầu thủ
  - 💾 Export dữ liệu ra file CSV
  - 🗑️ Xóa toàn bộ dữ liệu
  - Tự động lưu vào localStorage

### 2. Đội hình & Chiến thuật (Drag & Drop)
- **Vị trí**: Đội hình & Chiến thuật (teams.html)
- **Chức năng**:
  - **Chọn sơ đồ chiến thuật**: 6 sơ đồ phổ biến
    - 4-3-3 (Tấn công cân bằng)
    - 4-4-2 (Truyền thống)
    - 3-5-2 (Kiểm soát giữa sân)
    - 4-2-3-1 (Linh hoạt)
    - 3-4-3 (Tấn công mạnh)
    - 5-3-2 (Phòng thủ chắc chắn)
  - Kéo thả cầu thủ vào vị trí trên sân
  - Tự động lưu đội hình và sơ đồ vào localStorage
  - Hoán đổi vị trí giữa các cầu thủ
  - Reset toàn bộ đội hình

## 📋 Format CSV

File CSV cần có format sau (có thể tham khảo `sample_players.csv`):

```csv
ID,Tên,Vị trí,Ngày sinh,Chiều cao,Cân nặng,Số áo
P001,Nguyễn Văn A,GK,01/01/1995,185,78,1
P002,Trần Văn B,CB,15/03/1996,180,75,4
...
```

## 🚀 Hướng dẫn sử dụng

### Bước 1: Import dữ liệu cầu thủ
1. Vào **Cài đặt** (player_info.html)
2. Click nút "📁 Chọn file CSV"
3. Chọn file CSV có format như trên
4. Dữ liệu sẽ tự động lưu vào localStorage

### Bước 2: Sắp xếp đội hình
1. Vào **Đội hình & Chiến thuật** (teams.html)
2. Chọn sơ đồ chiến thuật từ dropdown (4-3-3, 4-4-2, 3-5-2, v.v.)
3. Kéo cầu thủ từ danh sách bên trái
4. Thả vào vị trí tương ứng trên sân (bên phải)
5. Đội hình và sơ đồ tự động lưu

### Bước 3: Quản lý
- Hoán đổi vị trí: Kéo cầu thủ từ vị trí này sang vị trí khác
- Reset: Click nút "🔄 Reset đội hình"
- Export: Vào Cài đặt, click "💾 Xuất CSV"

## 🎨 Vị trí trong đội hình

### Sơ đồ 4-3-3
- **GK**: Goalkeeper (Thủ môn)
- **LB**: Left Back (Hậu vệ trái)
- **CB**: Center Back (Trung vệ)
- **RB**: Right Back (Hậu vệ phải)
- **LM**: Left Midfielder (Tiền vệ trái)
- **CM**: Center Midfielder (Tiền vệ trung tâm)
- **RM**: Right Midfielder (Tiền vệ phải)
- **LW**: Left Winger (Cánh trái)
- **ST**: Striker (Tiền đạo)
- **RW**: Right Winger (Cánh phải)

### Sơ đồ 4-4-2
- **ST1, ST2**: Strikers (Tiền đạo)
- **LM, CM1, CM2, RM**: Tiền vệ
- **LB, CB1, CB2, RB**: Hậu vệ
- **GK**: Thủ môn

### Sơ đồ 3-5-2
- **ST1, ST2**: Strikers
- **LWB**: Left Wing Back (Hậu vệ cánh trái)
- **RWB**: Right Wing Back (Hậu vệ cánh phải)
- **LM, CM, RM**: Tiền vệ
- **CB1, CB2, CB3**: Trung vệ
- **GK**: Thủ môn

### Sơ đồ 4-2-3-1
- **ST**: Striker (Tiền đạo cắm)
- **LW, CAM, RW**: Attacking Midfielders
- **CDM1, CDM2**: Defensive Midfielders
- **LB, CB1, CB2, RB**: Hậu vệ
- **GK**: Thủ môn

### Sơ đồ 3-4-3
- **LW, ST, RW**: Hàng công
- **LM, CM1, CM2, RM**: Tiền vệ
- **CB1, CB2, CB3**: Trung vệ
- **GK**: Thủ môn

### Sơ đồ 5-3-2
- **ST1, ST2**: Strikers
- **LM, CM, RM**: Tiền vệ
- **LWB, CB1, CB2, CB3, RWB**: Hậu vệ
- **GK**: Thủ môn

## 💾 Lưu trữ

Tất cả dữ liệu được lưu trong **localStorage** của trình duyệt:
- `team_players_v1`: Danh sách cầu thủ
- `team_formation_v1`: Đội hình hiện tại
- `team_formation_type_v1`: Sơ đồ chiến thuật đã chọn
- `team_matches_v1`: Danh sách trận đấu
- `team_trainings_v1`: Lịch tập luyện
- `team_settings_v1`: Cài đặt hệ thống

## 📁 Cấu trúc file

```
quanlidoibong/
├── index.html              # Trang chủ
├── player_info.html        # Import/Export CSV
├── player_info.js          # Logic CSV
├── teams.html              # Đội hình & Chiến thuật
├── teams.js                # Logic drag & drop
├── app.js                  # Core logic
├── style.css               # Styles
├── sample_players.csv      # File CSV mẫu
└── README.md               # File này
```

## 🔧 Công nghệ

- HTML5
- CSS3 (Dark theme với neon effects)
- Vanilla JavaScript
- HTML5 Drag & Drop API
- LocalStorage API
- FileReader API

## 📝 Lưu ý

- Dữ liệu lưu trong localStorage, xóa cache trình duyệt sẽ mất dữ liệu
- Hãy export CSV định kỳ để backup
- File CSV cần có encoding UTF-8 để hiển thị tiếng Việt đúng
- Hỗ trợ tất cả trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)

---

