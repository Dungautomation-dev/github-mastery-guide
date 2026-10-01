/**
 * dictionary.js - Interactive Git & GitHub Dictionary Database
 * Comprehensive encyclopedia of Git commands and GitHub concepts
 * Created for Dung Automation (https://github.com/Dungauto)
 */

const GIT_DICTIONARY = [
  // --- BASIC COMMANDS ---
  {
    id: "git-init",
    name: "git init",
    category: "basic",
    summary: {
      vi: "Khởi tạo một kho chứa Git mới ngay tại thư mục hiện tại.",
      en: "Initialize a new, empty Git repository in the current folder."
    },
    syntax: "git init",
    usage: {
      vi: "Dùng khi bạn bắt đầu một dự án mới từ máy tính và muốn Git bắt đầu theo dõi lịch sử code.",
      en: "Use when starting a fresh local project and you want Git to track revisions."
    },
    tip: {
      vi: "Lệnh này sẽ tạo ra một thư mục ẩn tên là .git chứa toàn bộ cơ sở dữ liệu lịch sử.",
      en: "Creates a hidden .git directory containing all metadata and version history."
    }
  },
  {
    id: "git-clone",
    name: "git clone",
    category: "basic",
    summary: {
      vi: "Tải toàn bộ mã nguồn và lịch sử của một repository từ GitHub về máy tính.",
      en: "Clone and download an entire repository from GitHub to your local machine."
    },
    syntax: "git clone <repository-url>",
    usage: {
      vi: "Dùng khi bạn muốn lấy code của người khác về xem, hoặc tải project của công ty về máy làm việc.",
      en: "Use to download open-source projects or join an existing company codebase."
    },
    tip: {
      vi: "Bạn có thể chỉ định tên thư mục mới ở cuối lệnh: git clone <url> my-folder",
      en: "You can specify a custom destination directory: git clone <url> my-folder"
    }
  },
  {
    id: "git-status",
    name: "git status",
    category: "basic",
    summary: {
      vi: "Kiểm tra tình trạng hiện tại: file nào vừa sửa, file nào chưa được theo dõi, file nào đã staged.",
      en: "Check working tree status: modified files, untracked files, and staged changes."
    },
    syntax: "git status\n# Hoặc xem dạng ngắn gọn:\ngit status -s",
    usage: {
      vi: "Nên gõ lệnh này liên tục trước khi add hoặc commit để kiểm tra chính xác những gì mình vừa thay đổi.",
      en: "Run frequently before staging or committing to verify your modifications."
    },
    tip: {
      vi: "Dùng 'git status -s' để xem danh sách thu gọn: M (Modified), ?? (Untracked), A (Added).",
      en: "Use 'git status -s' for a concise, colored overview: M, ??, A."
    }
  },
  {
    id: "git-add",
    name: "git add",
    category: "basic",
    summary: {
      vi: "Đưa các file đã sửa vào khu vực chờ lưu (Staging Area).",
      en: "Add changed files to the staging area ready for the next commit."
    },
    syntax: "git add <file-name>\n# Thêm tất cả file thay đổi:\ngit add .",
    usage: {
      vi: "Dùng khi bạn đã viết xong một phần việc và muốn chọn lọc các file để chuẩn bị đóng gói commit.",
      en: "Use after modifying files to stage them before crafting a commit snapshot."
    },
    tip: {
      vi: "Dùng 'git add -p' để xem và chọn từng đoạn code nhỏ (hunk) trong file thay vì add cả file.",
      en: "Use 'git add -p' to interactively stage specific chunks of code."
    }
  },
  {
    id: "git-commit",
    name: "git commit",
    category: "basic",
    summary: {
      vi: "Chụp lại một mốc lịch sử vĩnh viễn (Snapshot) của các file trong Staging Area kèm thông điệp mô tả.",
      en: "Record a permanent historical snapshot of staged changes with a descriptive message."
    },
    syntax: "git commit -m \"feat: them tinh nang dang nhap\"",
    usage: {
      vi: "Dùng mỗi khi bạn hoàn thành một tính năng nhỏ hoặc sửa xong một lỗi cụ thể.",
      en: "Run whenever a discrete task, bug fix, or milestone is achieved."
    },
    tip: {
      vi: "Nên viết commit message theo chuẩn Conventional Commits (feat:, fix:, docs:, refactor:).",
      en: "Follow Conventional Commits standards (feat:, fix:, docs:, refactor:)."
    }
  },
  {
    id: "git-push",
    name: "git push",
    category: "basic",
    summary: {
      vi: "Đẩy các commit từ máy tính cá nhân lên kho chứa trên máy chủ GitHub.",
      en: "Upload local branch commits to the remote GitHub repository."
    },
    syntax: "git push origin <branch-name>\n# Lần đầu tiên đẩy nhánh mới:\ngit push -u origin <branch-name>",
    usage: {
      vi: "Dùng khi bạn muốn lưu trữ code lên đám mây hoặc chia sẻ code cho đồng nghiệp.",
      en: "Use to publish your local changes to GitHub for backup and team collaboration."
    },
    tip: {
      vi: "Cờ '-u' (upstream) giúp những lần sau bạn chỉ cần gõ 'git push' ngắn gọn.",
      en: "The '-u' flag tracks the remote branch, so subsequent pushes need only 'git push'."
    }
  },
  {
    id: "git-pull",
    name: "git pull",
    category: "basic",
    summary: {
      vi: "Kéo những commit mới nhất trên GitHub về máy tính và tự động gộp (merge) vào code của bạn.",
      en: "Fetch and merge the latest remote commits into your active local branch."
    },
    syntax: "git pull origin <branch-name>",
    usage: {
      vi: "Nên chạy lệnh này vào đầu mỗi buổi làm việc để cập nhật code mới nhất từ đồng đội.",
      en: "Run at the beginning of your workday to sync updates made by team members."
    },
    tip: {
      vi: "Dùng 'git pull --rebase' để giữ lịch sử commit thẳng hàng, không sinh commit merge rác.",
      en: "Use 'git pull --rebase' to keep a clean, linear git commit history."
    }
  },
  {
    id: "git-log",
    name: "git log",
    category: "basic",
    summary: {
      vi: "Xem lại toàn bộ cuốn nhật ký lịch sử các lần commit trong dự án.",
      en: "Display the commit history log of the current repository branch."
    },
    syntax: "git log --oneline\n# Xem dạng cây màu sắc đẹp mắt:\ngit log --graph --oneline --decorate",
    usage: {
      vi: "Dùng khi cần tra cứu xem ai đã sửa gì, mã hash commit là gì để quay xe khi gặp lỗi.",
      en: "Use to review past commits, find commit hashes, and trace author changes."
    },
    tip: {
      vi: "Dùng 'git log -n 5' để chỉ xem 5 commit gần nhất cho đỡ rối mắt.",
      en: "Limit output with '-n 5' to view only the 5 most recent commits."
    }
  },

  // --- BRANCH & MERGE ---
  {
    id: "git-branch",
    name: "git branch",
    category: "branch",
    summary: {
      vi: "Liệt kê, tạo mới hoặc xóa các nhánh (nhánh làm việc độc lập) trong dự án.",
      en: "List, create, or delete isolated development branches."
    },
    syntax: "git branch\n# Tạo nhánh mới:\ngit branch <branch-name>\n# Xóa nhánh an toàn:\ngit branch -d <branch-name>",
    usage: {
      vi: "Dùng khi bạn muốn tách ra một không gian riêng để thử nghiệm hoặc phát triển tính năng mới.",
      en: "Use to isolate feature development without affecting the stable main branch."
    },
    tip: {
      vi: "Nhánh trong Git siêu nhẹ, chỉ là một con trỏ 41 byte chỉ tới commit, tạo mất chưa tới 1 giây.",
      en: "Git branches are ultra-lightweight pointers (~41 bytes) created instantaneously."
    }
  },
  {
    id: "git-checkout",
    name: "git checkout / git switch",
    category: "branch",
    summary: {
      vi: "Chuyển đổi qua lại giữa các nhánh làm việc hoặc khôi phục file.",
      en: "Switch branches or restore working tree files."
    },
    syntax: "git switch <branch-name>\n# Tạo mới và chuyển ngay:\ngit switch -c <branch-name>\n# Cú pháp cũ quen thuộc:\ngit checkout -b <branch-name>",
    usage: {
      vi: "Dùng khi bạn muốn chuyển từ nhánh chính sang nhánh tính năng để bắt đầu viết code.",
      en: "Use to switch contexts between your features, bug fixes, and the main branch."
    },
    tip: {
      vi: "Git khuyến nghị dùng 'git switch' để đổi nhánh và 'git restore' để hủy sửa file thay cho checkout.",
      en: "Modern Git recommends 'git switch' for branches and 'git restore' for files."
    }
  },
  {
    id: "git-merge",
    name: "git merge",
    category: "branch",
    summary: {
      vi: "Gộp toàn bộ lịch sử và code từ một nhánh tính năng vào nhánh hiện tại.",
      en: "Integrate independent branch history into your current active branch."
    },
    syntax: "git checkout main\ngit merge feature/login",
    usage: {
      vi: "Dùng khi tính năng đã hoàn thiện, kiểm thử xong và muốn đưa vào nhánh chính (main).",
      en: "Use when a feature is complete and verified, merging it into production."
    },
    tip: {
      vi: "Nếu 2 nhánh cùng sửa một dòng code, Git sẽ báo Merge Conflict để bạn tự chọn giữ dòng nào.",
      en: "If conflicting lines exist, Git pauses and lets you resolve the conflict manually."
    }
  },
  {
    id: "git-rebase",
    name: "git rebase",
    category: "branch",
    summary: {
      vi: "Đổi gốc nhánh: Chuyển toàn bộ các commit của nhánh bạn lên đỉnh của nhánh đích để lịch sử thẳng tắp.",
      en: "Re-apply commits on top of another base tip for a clean linear history."
    },
    syntax: "git checkout feature/login\ngit rebase main",
    usage: {
      vi: "Dùng khi nhánh main đã có nhiều code mới và bạn muốn cập nhật nhánh của mình mà không tạo commit merge thừa.",
      en: "Use to keep feature branches up-to-date with main without cluttering merge commits."
    },
    tip: {
      vi: "Không bao giờ rebase các nhánh công khai mà nhiều người đang cùng làm việc!",
      en: "Never rebase public shared branches that other developers are working on."
    }
  },
  {
    id: "git-cherry-pick",
    name: "git cherry-pick",
    category: "branch",
    summary: {
      vi: "Chọn nhặt duy nhất một commit cụ thể từ nhánh khác áp dụng vào nhánh hiện tại.",
      en: "Apply the changes introduced by a specific existing commit into your current branch."
    },
    syntax: "git cherry-pick <commit-hash>",
    usage: {
      vi: "Dùng khi nhánh khác có một bản vá lỗi rất hay, bạn chỉ muốn lấy đúng commit sửa lỗi đó mà không lấy toàn bộ nhánh.",
      en: "Use to extract a hotfix or specific feature without merging the entire branch."
    },
    tip: {
      vi: "Có thể cherry-pick một khoảng commit: git cherry-pick A..B",
      en: "You can cherry-pick a range of commits using: git cherry-pick A..B"
    }
  },

  // --- UNDO & STASH ---
  {
    id: "git-stash",
    name: "git stash",
    category: "undo",
    summary: {
      vi: "Cất tạm toàn bộ code đang viết dở vào một ngăn kéo bí mật để thư mục sạch sẽ đổi nhánh khác.",
      en: "Temporarily shelve uncommitted changes so you can work on another branch cleanly."
    },
    syntax: "git stash\n# Lấy lại code ra làm tiếp:\ngit stash pop",
    usage: {
      vi: "Dùng khi đang code dở thì sếp bảo sửa gấp lỗi trên nhánh main. Stash code lại -> sửa xong -> pop ra code tiếp.",
      en: "Lifesaver when you need to switch branches urgently without losing incomplete work."
    },
    tip: {
      vi: "Nên đặt tên cho stash để dễ nhớ: git stash push -m \"dang lam do form dang ky\"",
      en: "Name your stash for clarity: git stash push -m 'wip registration form'"
    }
  },
  {
    id: "git-restore",
    name: "git restore",
    category: "undo",
    summary: {
      vi: "Hủy bỏ các sửa đổi trong file chưa commit hoặc đưa file ra khỏi Staging Area.",
      en: "Discard uncommitted local modifications or unstage files."
    },
    syntax: "# Hủy sửa đổi file:\ngit restore <file>\n# Bỏ file ra khỏi Staging (Unstage):\ngit restore --staged <file>",
    usage: {
      vi: "Dùng khi bạn lỡ tay xóa nhầm code trong file và muốn trả lại nguyên trạng như commit gần nhất.",
      en: "Use to safely revert file changes to the exact state of the latest commit."
    },
    tip: {
      vi: "Lệnh này thay thế cho 'git checkout -- file' trong các phiên bản Git cũ.",
      en: "Replaces the older, ambiguous 'git checkout -- file' command."
    }
  },
  {
    id: "git-reset",
    name: "git reset",
    category: "undo",
    summary: {
      vi: "Kéo lùi lịch sử về một commit cũ trong quá khứ.",
      en: "Reset current HEAD pointer to a specified state in history."
    },
    syntax: "# Hủy commit gần nhất nhưng GIỮ LẠI CODE:\ngit reset --soft HEAD~1\n# Hủy commit và XÓA SẠCH CODE (Cẩn thận!):\ngit reset --hard HEAD~1",
    usage: {
      vi: "Dùng khi bạn lỡ bấm commit nhưng quên thêm file hoặc muốn viết lại thông điệp commit.",
      en: "Use '--soft' to undo a premature commit while preserving your edited code."
    },
    tip: {
      vi: "Nếu lỡ tay dùng --hard làm mất code, hãy dùng 'git reflog' để cứu lại!",
      en: "If you accidentally lost work with '--hard', inspect 'git reflog' to recover it!"
    }
  },
  {
    id: "git-revert",
    name: "git revert",
    category: "undo",
    summary: {
      vi: "Tạo một commit MỚI đảo ngược lại toàn bộ thay đổi của một commit cũ trong quá khứ.",
      en: "Create a new commit that records the exact inverse of a previous commit."
    },
    syntax: "git revert <commit-hash>",
    usage: {
      vi: "Cách an toàn nhất để hủy bỏ một commit ĐÃ PUSH lên GitHub mà không làm hỏng lịch sử của người khác.",
      en: "The safest way to undo pushed commits without rewriting shared git history."
    },
    tip: {
      vi: "Khác với reset (xóa lịch sử), revert giữ nguyên lịch sử và bổ sung thêm commit hoàn tác.",
      en: "Unlike reset, revert preserves history and appends an explicit inverse commit."
    }
  },

  // --- GITHUB ECOSYSTEM & WORKFLOW ---
  {
    id: "github-projects",
    name: "GitHub Projects",
    category: "github",
    summary: {
      vi: "Công cụ quản lý dự án, theo dõi tiến độ công việc chuẩn Kanban/Gantt tích hợp ngay trên GitHub.",
      en: "Native customizable project planning, Kanban board, and roadmap tool on GitHub."
    },
    syntax: "https://github.com/users/<username>/projects",
    usage: {
      vi: "Dùng để lập danh sách việc cần làm (Todo), việc đang làm (In Progress), việc đã xong (Done) cho dự án.",
      en: "Use to organize issues, track sprint tasks, and align release roadmaps across repos."
    },
    tip: {
      vi: "Tự động hóa thông minh: Khi Pull Request được gộp (merge), thẻ việc tự động nhảy sang cột 'Done'.",
      en: "Supports workflow automations: moving items to 'Done' automatically when PRs merge."
    }
  },
  {
    id: "github-issues",
    name: "GitHub Issues",
    category: "github",
    summary: {
      vi: "Hệ thống theo dõi lỗi (Bug tracking) và đề xuất tính năng mới (Feature requests).",
      en: "Issue tracker for bug reporting, feature proposals, and task collaboration."
    },
    syntax: "https://github.com/<owner>/<repo>/issues",
    usage: {
      vi: "Dùng khi người dùng hoặc lập trình viên phát hiện lỗi trong phần mềm và muốn ghi lại để sửa.",
      en: "Use to document bugs with reproduction steps or request enhancements."
    },
    tip: {
      vi: "Trong commit message, nếu viết 'Fixes #12' thì khi push code lên, Issue số 12 sẽ tự động đóng lại!",
      en: "Writing 'Fixes #12' in a commit message automatically closes issue #12 upon merging!"
    }
  },
  {
    id: "github-pull-request",
    name: "Pull Request (PR)",
    category: "github",
    summary: {
      vi: "Yêu cầu gộp code từ nhánh tính năng của bạn vào nhánh chính, nơi diễn ra thảo luận và Code Review.",
      en: "A formal proposal to merge changes from one branch into another, enabling code review."
    },
    syntax: "https://github.com/<owner>/<repo>/pulls",
    usage: {
      vi: "Quy trình bắt buộc trong các công ty: Bạn code xong một tính năng sẽ mở PR để đồng đội duyệt code.",
      en: "Standard enterprise workflow for reviewing code quality before releasing to production."
    },
    tip: {
      vi: "Có thể tạo 'Draft Pull Request' khi code chưa xong hẳn nhưng muốn đồng nghiệp góp ý trước.",
      en: "Create a 'Draft Pull Request' to gather early feedback while code is still work-in-progress."
    }
  },
  {
    id: "github-actions",
    name: "GitHub Actions (CI/CD)",
    category: "github",
    summary: {
      vi: "Nền tảng tự động hóa: Tự động chạy test, build phần mềm, đóng gói và triển khai ứng dụng.",
      en: "Continuous Integration & Deployment (CI/CD) automation platform directly in GitHub."
    },
    syntax: ".github/workflows/deploy.yml",
    usage: {
      vi: "Dùng để tự động chạy kiểm thử mỗi khi mở PR hoặc tự động xuất bản website lên GitHub Pages.",
      en: "Automate automated testing, asset compilation, and zero-downtime server deployments."
    },
    tip: {
      vi: "Có hàng chục ngàn Action mẫu miễn phí trên GitHub Marketplace để bạn chỉ việc copy dùng ngay.",
      en: "Explore GitHub Marketplace for thousands of pre-built, community-verified action blocks."
    }
  },
  {
    id: "github-fork",
    name: "Fork",
    category: "github",
    summary: {
      vi: "Tạo một bản sao độc lập của một repository từ tài khoản của người khác về tài khoản của chính bạn.",
      en: "Create a personal copy of another user's repository on your own GitHub account."
    },
    syntax: "Bấm nút 'Fork' ở góc trên bên phải trang repository",
    usage: {
      vi: "Dùng khi bạn muốn đóng góp mã nguồn mở (Open Source) hoặc muốn phát triển tiếp một dự án theo ý mình.",
      en: "Use to contribute to open-source software or experiment independently with public code."
    },
    tip: {
      vi: "Sau khi Fork và sửa code trên repo của bạn, bạn có thể mở Pull Request ngược về repo gốc!",
      en: "You can open a Pull Request from your fork back to the upstream repository."
    }
  },
  {
    id: "github-pages",
    name: "GitHub Pages",
    category: "github",
    summary: {
      vi: "Dịch vụ lưu trữ và xuất bản website tĩnh (HTML/CSS/JS) hoàn toàn miễn phí trực tiếp từ repository.",
      en: "Free static website hosting directly from your GitHub repository."
    },
    syntax: "https://<username>.github.io/<repo-name>/",
    usage: {
      vi: "Dùng để đưa trang web cá nhân, portfolio, tài liệu hoặc thiệp online lên mạng cho mọi người truy cập.",
      en: "Deploy personal portfolios, interactive projects, blogs, and product documentation."
    },
    tip: {
      vi: "Bật tại: Settings > Pages > chọn nhánh main và thư mục /root rồi bấm Save.",
      en: "Enable via Settings > Pages > select branch 'main' and '/root' folder, then Save."
    }
  },

  // --- SECURITY & BEST PRACTICES ---
  {
    id: "pat-token",
    name: "Personal Access Token (PAT)",
    category: "security",
    summary: {
      vi: "Chuỗi mã khóa bí mật thay thế mật khẩu tài khoản khi thao tác với Git qua HTTPS hoặc API.",
      en: "Secret token replacing account passwords for secure Git HTTPS and API authentication."
    },
    syntax: "https://github.com/settings/tokens",
    usage: {
      vi: "Bắt buộc phải dùng từ 8/2021 khi chạy 'git push' qua dòng lệnh hoặc khi viết script tự động hóa.",
      en: "Mandatory since August 2021 for Git CLI operations over HTTPS."
    },
    tip: {
      vi: "Tuyệt đối không lưu token trực tiếp trong code hoặc push lên GitHub. Dùng biến môi trường!",
      en: "Never commit tokens directly in repository files. Store them in secure credential managers."
    }
  },
  {
    id: "ssh-key",
    name: "SSH Key (Ed25519)",
    category: "security",
    summary: {
      vi: "Phương thức xác thực bằng cặp khóa công khai / bí mật giúp push code an toàn mà không cần nhập token.",
      en: "Cryptographic key pair authentication enabling passwordless, highly secure Git operations."
    },
    syntax: "ssh-keygen -t ed25519 -C \"email@example.com\"",
    usage: {
      vi: "Dùng cho lập trình viên muốn clone và push code nhanh qua giao thức git@github.com.",
      en: "Recommended for seamless terminal workflows without entering tokens repeatedly."
    },
    tip: {
      vi: "Luôn ưu tiên chuẩn Ed25519 vì an toàn hơn và tốc độ mã hóa nhanh hơn RSA cũ.",
      en: "Always prefer Ed25519 over older RSA algorithms for stronger cryptographic resilience."
    }
  },
  {
    id: "gitignore",
    name: ".gitignore",
    category: "security",
    summary: {
      vi: "File văn bản liệt kê danh sách các thư mục, file rác hoặc nhạy cảm mà Git phải bỏ qua, không theo dõi.",
      en: "Configuration file declaring intentionally untracked files that Git should ignore."
    },
    syntax: "node_modules/\n.env\n*.log\n.DS_Store",
    usage: {
      vi: "Bắt buộc phải có trong mọi dự án để ngăn chặn việc lỡ tay push mật khẩu, file .env, file build nặng lên GitHub.",
      en: "Crucial for preventing credentials, secret API keys, and heavy build folders from leaking."
    },
    tip: {
      vi: "Truy cập gitignore.io để tạo nhanh file .gitignore chuẩn cho từng ngôn ngữ (Python, Node, C#, Java).",
      en: "Use gitignore.io to generate pre-configured templates for your tech stack."
    }
  }
];
