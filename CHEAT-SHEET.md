# 📑 Git & GitHub Cheat Sheet (Bảng Tra Cứu Nhanh)

<p align="center">
  <strong>Tổng hợp các câu lệnh Git thường dùng nhất hàng ngày kèm ví dụ thực tế.</strong>
</p>

---

## 1. Khởi Tạo & Cấu Hình (Setup & Init)

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `git config --global user.name "Tên Bạn"` | Đặt tên hiển thị cho commit |
| `git config --global user.email "email@example.com"` | Đặt email liên kết với tài khoản GitHub |
| `git init` | Khởi tạo kho chứa Git mới tại thư mục hiện tại |
| `git clone <url>` | Tải toàn bộ mã nguồn của một repository từ GitHub về máy |

---

## 2. Vòng Đời Làm Việc Hàng Ngày (Daily Workflow)

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `git status` (hoặc `git status -s`) | Kiểm tra trạng thái các file (đã sửa, chưa lưu, đã staged) |
| `git add <file>` | Đưa một file cụ thể vào khu vực chờ commit (Staging Area) |
| `git add .` (hoặc `git add -A`) | Đưa tất cả các file thay đổi vào Staging Area |
| `git commit -m "Thông điệp"` | Lưu lại một mốc lịch sử (Snapshot) kèm ghi chú |
| `git push origin <branch>` | Đẩy các commit từ máy tính lên GitHub |
| `git pull origin <branch>` | Kéo code mới nhất từ GitHub về máy tính và tự động gộp |
| `git fetch origin` | Tải thông tin mới nhất từ GitHub về máy nhưng chưa gộp |

---

## 3. Quản Lý Nhánh (Branching & Merging)

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `git branch` | Xem danh sách tất cả các nhánh hiện có |
| `git branch -a` | Xem cả nhánh ở máy và nhánh trên GitHub |
| `git checkout -b <tên-nhánh>` | Tạo nhánh mới và chuyển ngay sang nhánh đó |
| `git switch -c <tên-nhánh>` | Lệnh mới tương đương `checkout -b` |
| `git switch <tên-nhánh>` | Chuyển sang nhánh đã có |
| `git merge <tên-nhánh>` | Gộp code từ nhánh khác vào nhánh hiện tại |
| `git branch -d <tên-nhánh>` | Xóa một nhánh ở máy sau khi đã gộp xong |
| `git push origin --delete <tên-nhánh>` | Xóa một nhánh trên GitHub |

---

## 4. Lưu Tạm Công Việc (Git Stash)

Khi đang code dở nhưng cần đổi nhánh gấp để sửa lỗi mà chưa muốn commit:

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `git stash` (hoặc `git stash push -m "ghi chú"`) | Cất tạm toàn bộ thay đổi chưa commit vào ngăn kéo bí mật |
| `git stash list` | Xem danh sách các lần stash |
| `git stash pop` | Lấy lại code đang làm dở ra tiếp tục làm việc và xóa khỏi ngăn kéo |
| `git stash apply` | Lấy lại code nhưng vẫn giữ bản sao trong ngăn kéo |
| `git stash drop` | Xóa bản stash không cần thiết |

---

## 5. Xem Lịch Sử & So Sánh (Inspect & History)

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `git log` | Xem toàn bộ lịch sử commit |
| `git log --oneline` | Xem lịch sử commit rút gọn 1 dòng |
| `git log -n 5` | Xem 5 commit gần nhất |
| `git diff` | So sánh thay đổi giữa code đang gõ và commit gần nhất |
| `git diff --staged` | So sánh những file đã `git add` với commit gần nhất |
| `git diff branchA..branchB` | So sánh sự khác nhau giữa 2 nhánh |

---

## 6. Sửa Chữa Sai Lầm & Quay Xe (Undo & Reset)

| Lệnh | Tác dụng | Khi nào nên dùng? |
| :--- | :--- | :--- |
| `git restore <file>` | Hủy bỏ thay đổi của 1 file chưa `git add` | Khi vừa lỡ tay sửa sai 1 file |
| `git restore --staged <file>` | Bỏ file ra khỏi Staging Area (`git unstage`) | Khi lỡ `git add` nhầm file |
| `git commit --amend -m "Sửa ghi chú"` | Sửa lại thông điệp commit gần nhất | Khi commit xong nhận ra viết sai chính tả |
| `git reset --soft HEAD~1` | Hủy commit gần nhất nhưng **vẫn giữ lại toàn bộ code** | Khi muốn gộp hoặc chia nhỏ commit |
| `git revert <commit-hash>` | Tạo commit mới đảo ngược lại commit cũ | Cách an toàn nhất khi code đã push lên GitHub |

---

## 7. Phím Tắt Thần Thánh Trên Trình Duyệt GitHub

- Bấm phím **`.`** (dấu chấm): Mở ngay giao diện VS Code nền web trên trình duyệt!
- Bấm phím **`t`**: Mở thanh tìm kiếm file thần tốc trong repository.
- Bấm phím **`b`**: Xem `git blame` (ai đã viết dòng code này và vào ngày nào).
- Bấm phím **`l`**: Nhảy đến một dòng code cụ thể.
- Bấm phím **`y`**: Tự động chuyển URL thành Permalink (liên kết vĩnh cửu không bị mất khi code đổi).
