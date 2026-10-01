# ==============================================================================
# Script: git-setup-aliases.ps1
# Description: Tự động cài đặt bộ Git Aliases giúp tối ưu tốc độ gõ lệnh x5 lần
# Author: Dung Automation (https://github.com/Dungauto)
# ==============================================================================

Write-Host "🚀 Đang thiết lập Git Aliases tối ưu tốc độ cho Windows..." -ForegroundColor Cyan

git config --global alias.s "status -s"
git config --global alias.st "status"
git config --global alias.a "add -A"
git config --global alias.c "commit -m"
git config --global alias.cm "commit -m"
git config --global alias.ca "commit --amend"
git config --global alias.p "push"
git config --global alias.pl "pull"
git config --global alias.co "checkout"
git config --global alias.cb "checkout -b"
git config --global alias.b "branch"
git config --global alias.d "diff"
git config --global alias.ds "diff --staged"
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
git config --global alias.undo "reset --soft HEAD~1"
git config --global alias.unstage "restore --staged"

Write-Host "✅ Đã cài đặt thành công bộ Git Aliases!" -ForegroundColor Green
Write-Host ""
Write-Host "Danh sách lệnh tắt mới của bạn:" -ForegroundColor Yellow
Write-Host "  git s        -> git status -s (xem nhanh file thay đổi)"
Write-Host "  git a        -> git add -A (thêm tất cả file)"
Write-Host "  git c 'msg'  -> git commit -m 'msg'"
Write-Host "  git p        -> git push"
Write-Host "  git pl       -> git pull"
Write-Host "  git cb name  -> git checkout -b name (tạo & chuyển nhánh)"
Write-Host "  git lg       -> git log dạng cây đồ họa màu cực đẹp"
Write-Host "  git undo     -> Hủy commit gần nhất nhưng vẫn giữ lại code"
