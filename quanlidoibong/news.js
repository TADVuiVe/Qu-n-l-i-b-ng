const newsData = [
    // ===== VIỆT NAM =====
    {
        title: "Đội tuyển Việt Nam thắng đậm tại AFF Cup",
        category: "vn",
        date: "2025-01-10",
        image: "https://cdnmedia.webthethao.vn/uploads/2021-09-12/aff-cup.jpg",
        description: "Đội tuyển Việt Nam có chiến thắng ấn tượng trước đối thủ khu vực."
    },
    {
        title: "U23 Việt Nam vào chung kết giải Đông Nam Á",
        category: "vn",
        date: "2025-02-05",
        image: "https://phapluatxahoi.kinhtedothi.vn/stores/news_dataimages/2023/082023/26/15/link-xem-truc-tiep-chung-ket-u23-dong-nam-a-u23-viet-nam-vs-u23-indonesia-20h-hom-nay-2682023.jpg?rt=20230826150116",
        description: "U23 Việt Nam thi đấu thuyết phục và giành vé vào chung kết."
    },
    {
        title: "HLV Troussier công bố danh sách triệu tập đội tuyển",
        category: "vn",
        date: "2025-03-02",
        image: "https://media.vov.vn/sites/default/files/styles/large/public/2023-06/hlv_troussier.jpg",
        description: "Danh sách đội tuyển Việt Nam chuẩn bị cho vòng loại World Cup."
    },
    {
        title: "V-League 2025 khởi tranh với nhiều bất ngờ",
        category: "vn",
        date: "2025-03-20",
        image: "https://tse1.mm.bing.net/th/id/OIP._ZHyij4XUDA05PoxslEzEAHaGs?pid=Api&P=0&h=180",
        description: "Các đội bóng lớn gặp nhiều khó khăn ngay vòng đấu đầu tiên."
    },

    // ===== THẾ GIỚI =====
    {
        title: "Real Madrid vô địch Champions League",
        category: "world",
        date: "2025-02-01",
        image: "https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%205/Ng%C3%A0y_29/Nga/C9BC35AE-364F-4A25-8427-64203F01E7F3.jpg",
        description: "Real Madrid tiếp tục khẳng định vị thế tại châu Âu."
    },
    {
        title: "Messi giành Quả bóng vàng lần thứ 9",
        category: "world",
        date: "2025-01-15",
        image: "https://cdn-img.thethao247.vn/origin_842x0/storage/files/camhm/2023/10/31/chinh-thuc-lionel-messi-gianh-qua-bong-vang-2023-349205.jpg",
        description: "Lionel Messi tiếp tục đi vào lịch sử bóng đá thế giới."
    },
    {
        title: "Manchester City bảo vệ thành công chức vô địch Premier League",
        category: "world",
        date: "2025-04-10",
        image: "https://i0.wp.com/sportexpress.vn/wp-content/uploads/2022/05/Man-City-vo-dich-Premier-league-2021-2022.jpg?ssl=1",
        description: "Man City tiếp tục thể hiện sức mạnh vượt trội tại nước Anh."
    },
    {
        title: "Mbappé chính thức gia nhập Real Madrid",
        category: "world",
        date: "2025-06-01",
        image: "https://tse1.mm.bing.net/th/id/OIP.MBFfAmAHF6WqTh-6QdKMaQHaFs?pid=Api&P=0&h=180",
        description: "Bom tấn chuyển nhượng gây chấn động làng bóng đá thế giới."
    }
];


function displayNews(list) {
    const container = document.getElementById("newsList");
    container.innerHTML = "";

    list.forEach(news => {
        container.innerHTML += `
            <div class="news-card">
                <img src="${news.image}" alt="">
                <h3>${news.title}</h3>
                <p><i>${news.date}</i></p>
                <p>${news.description}</p>
            </div>
        `;
    });
}

function filterNews(type) {
    if (type === "all") {
        displayNews(newsData);
    } else {
        displayNews(newsData.filter(n => n.category === type));
    }
}

// load mặc định
displayNews(newsData);
