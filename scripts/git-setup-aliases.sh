#!/usr/bin/env bash
# ==============================================================================
# Script: git-setup-aliases.sh
# Description: Automatically install productivity Git Aliases for macOS / Linux
# Author: Dung Automation (https://github.com/Dungauto)
# ==============================================================================

echo -e "\033[1;36m🚀 Installing optimal Git productivity aliases for Unix/Linux/macOS...\033[0m"

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

echo -e "\033[1;32m✅ Git aliases installed successfully!\033[0m"
echo -e "\033[1;33mQuick Aliases Reference:\033[0m"
echo "  git s        -> git status -s"
echo "  git a        -> git add -A"
echo "  git c 'msg'  -> git commit -m 'msg'"
echo "  git p        -> git push"
echo "  git pl       -> git pull"
echo "  git cb name  -> git checkout -b name"
echo "  git lg       -> colorful visual graph log"
echo "  git undo     -> undo last commit keeping changes"
