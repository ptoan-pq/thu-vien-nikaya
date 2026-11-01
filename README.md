# Thư viện Nikāya Pháp Toàn

Website: https://ptoan-pq.github.io/thu-vien-nikaya/

Bản phát hành website học kinh bằng tiếng Việt, truy cập công khai không cần đăng nhập.

Hiện có **103 bài tóm lược: DN 1–34 và MN 1–69**. Toàn tạng chưa được tóm lược đầy đủ; các mục chưa có nội dung được ghi rõ trong giao diện.

Mỗi bài có bối cảnh, nội dung cốt lõi và phần ứng dụng. Các phần nguyên văn chỉ được dẫn về BuddhaSasana; kho này không chứa bộ nhớ đệm nguyên văn dùng khi nghiên cứu.

## Xuất bản

GitHub Pages dùng nhánh `main`, thư mục gốc `/`. `.nojekyll` giữ nguyên các tệp tĩnh.

Các tệp website được dựng từ dự án `nikaya-library` tại máy bằng `scripts/build_library.py` và kiểm tra với `scripts/check_library.cjs`. Sau khi dựng và kiểm tra, đồng bộ các tệp trong `dist/` cùng `CONTENT-STATUS.json` sang kho phát hành này rồi đẩy nhánh `main`.

`release.json` ghi mốc nguồn của bản hiện tại. Không đưa `source-cache/`, hồ sơ nghiên cứu, cấu hình riêng hoặc thông tin đăng nhập vào kho phát hành.
