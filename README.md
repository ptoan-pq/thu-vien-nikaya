# Thư viện Nikāya Pháp Toàn

Website: https://ptoan-pq.github.io/thu-vien-nikaya/

Bản phát hành website học kinh bằng tiếng Việt, truy cập công khai không cần đăng nhập.

Hiện có **199 bài phân tích: DN 1–34, MN 1–152 và SN 1.20, 2.23, 2.29, 3.18, 3.19, 3.21, 3.25, 4.25, 6.1, 6.10, 6.14, 7.9, 11.3**. SN 1.1–1.19 chuyển sang liên kết nguyên văn theo cách đọc dành cho kinh ngắn. Các bản thảo đã viết vẫn được giữ trong dự án nguồn.

Thư viện tách **Kinh dài · phân tích trước** và **Kinh ngắn · đọc nguyên văn**. Danh sách Tương Ưng/Tăng Chi được sơ tuyển theo độ dài nguồn; các nhóm nhiều số giữ riêng để rà tiếp. Đây chưa phải xác nhận đã đối chiếu mọi số kinh của toàn tạng. Chỉ các bài có nội dung mới được tính là hoàn tất.

Mỗi bài có bối cảnh, nội dung cốt lõi và phần ứng dụng. Các phần nguyên văn chỉ được dẫn về BuddhaSasana; kho này không chứa bộ nhớ đệm nguyên văn dùng khi nghiên cứu.

## Xuất bản

GitHub Pages dùng nhánh `main`, thư mục gốc `/`. `.nojekyll` giữ nguyên các tệp tĩnh.

Các tệp website được dựng từ dự án `nikaya-library` tại máy bằng `scripts/build_library.py` và kiểm tra với `scripts/check_library.cjs`. Sau khi dựng và kiểm tra, đồng bộ các tệp trong `dist/` cùng `CONTENT-STATUS.json` sang kho phát hành này rồi đẩy nhánh `main`.

`release.json` ghi mốc nguồn của bản hiện tại. Không đưa `source-cache/`, hồ sơ nghiên cứu, cấu hình riêng hoặc thông tin đăng nhập vào kho phát hành.
