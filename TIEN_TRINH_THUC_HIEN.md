# Nhật Ký & Tiến Trình Thực Hiện Dự Án: Wishlist Của Em Iu

**Thư mục dự án:** `/Users/tangminhthao/Documents/Wishlist Gift by MT Web`  
**Trạng thái Git:** Đã khởi tạo nhánh `main` và commit toàn bộ mã nguồn.

---

## 1. Các Tính Năng Đã Hoàn Thành

### Giao Diện & Phong Cách Chủ Đạo (Tone Hồng Tình Yêu)
- **Thiết kế tổng thể:** Tone màu hồng pastel – rose gold ngọt ngào, hiệu ứng thẻ kính mờ (`glassmorphism`), nút bấm phát sáng và hiệu ứng tim/hoa nét mảnh bay lơ lửng trên nền.
- **Hệ thống Icon:** Toàn bộ icon trên trang (thanh điều hướng, bộ lọc, nhãn món quà, vòng quay, nút bấm, cửa sổ popup) đã được chuyển sang **SVG Outline Icons** (icon nét mảnh đồng bộ) tinh tế, hiện đại.
- **Căn chỉnh UI:**
  - Chỉnh mũi tên chọn (`select` dropdown) của tất cả các bộ lọc lùi vào trong khung cân đối (`padding-right: 38px`, icon mũi tên SVG hồng đậm).
  - Rút gọn chữ trên các nút hành động (`Sẽ mua`, `Đã chốt`, `Đã tặng`, `Sửa`, `Xoá`) và chống xuống dòng (`white-space: nowrap`) để nút luôn gọn trên 1 hàng.

### Giao Diện Dành Cho Bạn Trai (Kích Thích Chốt Đơn)
- **Thanh "Chỉ số Hạnh Phúc của Em":** Tự động cộng điểm ngọt ngào mỗi khi bạn trai đánh dấu *"Sẽ mua"* hoặc *"Đã tặng"*.
- **Đồng hồ đếm ngược dịp đặc biệt:** Hiển thị số ngày còn lại tới dịp kỷ niệm/sinh nhật sắp tới để nhắc khéo bạn trai chuẩn bị quà.
- **Bộ lọc thông minh:** Lọc món quà theo **Dịp tặng** (Sinh nhật, Kỷ niệm, Valentine, 8/3 & 20/10, Giáng sinh, Tặng vô điều kiện), **Mức độ khao khát** (`Cần gấp lắm rồi`, `Mê chữ ê kéo dài`, `Thích sương sương`), **Tầm giá** và **Trạng thái**.
- **Hiệu ứng "Thao túng tâm lý":** Mỗi món quà có lời nhắn nhõng nhẽo riêng + hộp *"Đặc quyền thưởng cho anh"* + nút **Chốt Đơn Cho Bé Iu** dẫn thẳng tới link mua hàng (Shopee/Lazada/TikTok/Web hãng).

### Vòng Quay Định Mệnh Tình Yêu (`Spin Wheel`)
- Cho phép bạn trai lọc trước theo **Dịp sắp tới**, **Ngân sách**, và **Mức độ ưu tiên** ngay trong cửa sổ Vòng Quay.
- Vòng quay Canvas mượt mà kèm âm thanh quay số Web Audio API và pháo hoa giấy (`confetti`) khi tìm ra món quà chiến thắng.

### Chế Độ Quản Lý Admin Của Bạn
- Mở khoá bằng mã PIN (mặc định: **`1402`**, có thể đổi trong Cài đặt).
- Thêm, sửa, xoá món quà dễ dàng; hỗ trợ **tải ảnh trực tiếp từ máy tính/điện thoại** (tự động nén ảnh mượt mà) hoặc dán link ảnh.
- Hỗ trợ **Đồng bộ Đám mây (1-Click Cloud Sync)**, xuất/nhập file `.json` sao lưu, và tạo **Link chia sẻ kèm lời nhắn ngọt ngào** gửi cho bạn trai.

---

## 2. Danh Sách Các File Trong Dự Án

| Tên file | Mô tả chức năng |
| :--- | :--- |
| `index.html` | Cấu trúc giao diện chính, bộ SVG Outline Icon Sprite và các cửa sổ Modal (Vòng quay, Chi tiết quà, Form Admin, Cài đặt, Chia sẻ). |
| `styles.css` | Toàn bộ định dạng giao diện màu hồng pastel, hiệu ứng chuyển động, căn chỉnh khung chọn (`select`) và responsive cho điện thoại/máy tính. |
| `app.js` | Logic xử lý danh sách quà, bộ lọc, Vòng quay may mắn, hiệu ứng âm thanh/pháo hoa, nén ảnh tải lên và đồng bộ dữ liệu. |
| `server.js` | Server cục bộ tự động lưu dữ liệu vào file JSON khi chạy bằng Node.js. |
| `HUONG_DAN_SU_DUNG.md` | Hướng dẫn chi tiết cách sử dụng Admin, Vòng quay và chia sẻ link cho bạn trai. |
| `TIEN_TRINH_THUC_HIEN.md` | File tổng hợp toàn bộ tiến trình và lịch sử hoàn thiện dự án. |

---

## 3. Lịch Sử Commit Git Trên Máy (`main`)

1. `Initial commit: Romantic Pink Gift Wishlist & Lucky Wheel Web App` — Khởi tạo toàn bộ tính năng gốc của web.
2. `Fix select dropdown arrow padding and alignment inside borders` — Căn chỉnh dấu mũi tên trong các khung lọc.
3. `Convert all icons and floating decorations to clean SVG outline icons` — Chuyển toàn bộ icon sang dạng nét mảnh (outline).
4. `Shorten reserve button labels and prevent button text wrapping` — Rút gọn chữ trên nút hành động cho gọn đẹp trên 1 dòng.

---

## 4. Cách Push Lên GitHub Bằng GitHub Desktop (Có Sẵn Trên Máy Bạn)

Vì máy bạn đã cài sẵn ứng dụng **GitHub Desktop** (tài khoản `tangminhthao2511`), bạn có thể đẩy lên GitHub chỉ với 2 cú click:

1. Mở ứng dụng **GitHub Desktop** trên máy Mac.
2. Trên thanh menu trên cùng, chọn **File** ➔ **Add Local Repository...** ➔ Chọn thư mục `/Users/tangminhthao/Documents/Wishlist Gift by MT Web` ➔ Bấm **Add Repository**.
3. Bấm nút màu xanh **Publish repository** ở góc trên bên phải (bỏ tích ô *Keep this code private* nếu muốn bật link web GitHub Pages công khai cho bạn trai xem) ➔ Bấm **Publish Repository** là hoàn tất!
