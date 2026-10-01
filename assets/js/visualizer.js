/**
 * visualizer.js - Interactive Git Tree & Branching Simulator
 * Lets beginners visualize how Git commits, branches, and merges work under the hood
 * Author: Dung Automation (https://github.com/Dungauto)
 */

class GitVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.commits = [];
    this.branches = {};
    this.activeBranch = "main";
    this.commitCounter = 1;

    this.initCanvas();
    this.resetToInitialState();
    this.bindWindowEvents();
  }

  initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 680;
    this.height = 240;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  bindWindowEvents() {
    window.addEventListener("resize", () => {
      this.initCanvas();
      this.render();
    });
  }

  resetToInitialState() {
    this.commits = [
      { id: "c1", hash: "a1b2c3", msg: "Initial commit", branch: "main", x: 80, y: 120, parents: [] },
      { id: "c2", hash: "d4e5f6", msg: "feat: setup project", branch: "main", x: 180, y: 120, parents: ["c1"] }
    ];
    this.branches = {
      "main": "c2"
    };
    this.activeBranch = "main";
    this.commitCounter = 3;
    this.updateLog("init", "Đã khởi tạo kho chứa Git với 2 commit ban đầu trên nhánh main (HEAD -> main).");
    this.render();
  }

  createCommit(customMsg) {
    const parentId = this.branches[this.activeBranch];
    const parent = this.commits.find(c => c.id === parentId);
    if (!parent) return;

    const id = `c${this.commitCounter++}`;
    const hash = Math.random().toString(16).substring(2, 8);
    const msg = customMsg || `feat: update ${this.activeBranch} (#${this.commitCounter - 1})`;

    let newX = parent.x + 95;
    let newY = this.activeBranch === "main" ? 120 : 60;

    // Check if newX exceeds canvas width
    if (newX > this.width - 90) {
      // Shift all commits to the left
      const shift = 100;
      this.commits.forEach(c => c.x -= shift);
      newX -= shift;
    }

    const newCommit = {
      id,
      hash,
      msg,
      branch: this.activeBranch,
      x: newX,
      y: newY,
      parents: [parentId],
      isNew: true
    };

    this.commits.push(newCommit);
    this.branches[this.activeBranch] = id;

    this.updateLog(
      `git commit -m "${msg}"`,
      `Commit mới [${hash}] được tạo trên nhánh [${this.activeBranch}]. Con trỏ HEAD và nhánh [${this.activeBranch}] tự động tiến lên phía trước.`
    );

    this.render();
  }

  createBranch(branchName = "feature/login") {
    if (this.branches[branchName]) {
      this.updateLog(`git branch ${branchName}`, `Nhánh [${branchName}] đã tồn tại từ trước!`);
      return;
    }

    const currentCommitId = this.branches[this.activeBranch];
    this.branches[branchName] = currentCommitId;
    this.activeBranch = branchName;

    this.updateLog(
      `git checkout -b ${branchName}`,
      `Đã tạo nhánh mới [${branchName}] tại commit hiện tại và chuyển HEAD trỏ sang [${branchName}]. Mọi commit tiếp theo sẽ nằm trên nhánh này!`
    );

    this.render();
  }

  switchBranch(branchName) {
    if (!this.branches[branchName]) {
      this.updateLog(`git switch ${branchName}`, `Nhánh [${branchName}] không tồn tại!`);
      return;
    }
    this.activeBranch = branchName;
    this.updateLog(
      `git switch ${branchName}`,
      `Đã chuyển nhánh thành công sang [${branchName}]. Con trỏ HEAD hiện đang trỏ vào nhánh này.`
    );
    this.render();
  }

  mergeBranch(sourceBranch = "feature/login") {
    if (this.activeBranch === sourceBranch) {
      this.updateLog(`git merge ${sourceBranch}`, `Không thể tự gộp nhánh vào chính nó! Hãy chuyển về nhánh main trước.`);
      return;
    }
    if (!this.branches[sourceBranch]) {
      this.updateLog(`git merge ${sourceBranch}`, `Nhánh [${sourceBranch}] không tồn tại để gộp!`);
      return;
    }

    const currentTargetId = this.branches[this.activeBranch];
    const sourceCommitId = this.branches[sourceBranch];

    if (currentTargetId === sourceCommitId) {
      this.updateLog(`git merge ${sourceBranch}`, `Nhánh đã đồng bộ sẵn, không có commit mới nào cần gộp (Already up to date).`);
      return;
    }

    const targetCommit = this.commits.find(c => c.id === currentTargetId);
    const sourceCommit = this.commits.find(c => c.id === sourceCommitId);

    const id = `c${this.commitCounter++}`;
    const hash = Math.random().toString(16).substring(2, 8);
    const newX = Math.max(targetCommit.x, sourceCommit.x) + 95;
    const newY = 120; // main branch line

    const mergeCommit = {
      id,
      hash,
      msg: `Merge branch '${sourceBranch}' into ${this.activeBranch}`,
      branch: this.activeBranch,
      x: newX,
      y: newY,
      parents: [currentTargetId, sourceCommitId],
      isMerge: true
    };

    this.commits.push(mergeCommit);
    this.branches[this.activeBranch] = id;

    this.updateLog(
      `git merge ${sourceBranch}`,
      `Đã gộp thành công nhánh [${sourceBranch}] vào [${this.activeBranch}]! Commit gộp [${hash}] có 2 nút cha nối từ cả hai nhánh.`
    );

    this.render();
  }

  resetHard() {
    const currentId = this.branches[this.activeBranch];
    const commit = this.commits.find(c => c.id === currentId);
    if (!commit || commit.parents.length === 0) {
      this.updateLog("git reset --hard HEAD~1", "Không thể lùi commit gốc ban đầu!");
      return;
    }

    const prevId = commit.parents[0];
    this.branches[this.activeBranch] = prevId;

    this.updateLog(
      "git reset --hard HEAD~1",
      `Đã kéo lùi nhánh [${this.activeBranch}] và HEAD về commit trước đó [${prevId}]. Commit [${commit.hash}] đã bị tách khỏi nhánh.`
    );

    this.render();
  }

  updateLog(command, explanation) {
    const cmdEl = document.getElementById("visualizer-cmd-text");
    const expEl = document.getElementById("visualizer-exp-text");
    if (cmdEl) cmdEl.textContent = command;
    if (expEl) expEl.textContent = explanation;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw branch background guidelines
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);

    // Main line guide
    this.ctx.beginPath();
    this.ctx.moveTo(30, 120);
    this.ctx.lineTo(this.width - 20, 120);
    this.ctx.stroke();

    // Feature line guide
    this.ctx.beginPath();
    this.ctx.moveTo(30, 60);
    this.ctx.lineTo(this.width - 20, 60);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw parent connectors
    this.commits.forEach(commit => {
      commit.parents.forEach(pId => {
        const parent = this.commits.find(c => c.id === pId);
        if (!parent) return;

        this.ctx.beginPath();
        this.ctx.strokeStyle = commit.branch === "main" ? "#00e5ff" : "#ff4081";
        this.ctx.lineWidth = 3;

        if (parent.y === commit.y) {
          this.ctx.moveTo(parent.x, parent.y);
          this.ctx.lineTo(commit.x, commit.y);
        } else {
          // Curved connector between different vertical branch lines
          this.ctx.moveTo(parent.x, parent.y);
          this.ctx.bezierCurveTo(
            parent.x + 40, parent.y,
            commit.x - 40, commit.y,
            commit.x, commit.y
          );
        }
        this.ctx.stroke();
      });
    });

    // Draw commit nodes
    this.commits.forEach(commit => {
      const isHead = this.branches[this.activeBranch] === commit.id;
      const color = commit.branch === "main" ? "#00e5ff" : "#ff4081";

      // Outer glow for active commit
      if (isHead) {
        this.ctx.beginPath();
        this.ctx.arc(commit.x, commit.y, 22, 0, Math.PI * 2);
        this.ctx.fillStyle = commit.branch === "main" ? "rgba(0, 229, 255, 0.25)" : "rgba(255, 64, 129, 0.25)";
        this.ctx.fill();
      }

      // Main node circle
      this.ctx.beginPath();
      this.ctx.arc(commit.x, commit.y, 14, 0, Math.PI * 2);
      this.ctx.fillStyle = "#120924";
      this.ctx.fill();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      // Inner dot
      this.ctx.beginPath();
      this.ctx.arc(commit.x, commit.y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();

      // Commit Hash text below node
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      this.ctx.font = "bold 11px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText(commit.hash, commit.x, commit.y + 26);
    });

    // Draw Branch & HEAD Badges
    Object.entries(this.branches).forEach(([bName, cId]) => {
      const commit = this.commits.find(c => c.id === cId);
      if (!commit) return;

      const isCurrentActive = this.activeBranch === bName;
      const badgeY = commit.y - 25;
      const badgeColor = bName === "main" ? "#00e5ff" : "#ff4081";

      this.ctx.save();
      this.ctx.font = "bold 10px sans-serif";
      const text = isCurrentActive ? `HEAD -> ${bName}` : bName;
      const textWidth = this.ctx.measureText(text).width;
      const pad = 8;
      const bW = textWidth + pad * 2;
      const bH = 18;

      // Badge background pill
      this.ctx.fillStyle = isCurrentActive ? badgeColor : "rgba(255, 255, 255, 0.15)";
      this.ctx.beginPath();
      this.ctx.roundRect(commit.x - bW / 2, badgeY - bH + 4, bW, bH, 8);
      this.ctx.fill();

      // Badge text
      this.ctx.fillStyle = isCurrentActive ? "#0d041c" : "#ffffff";
      this.ctx.textAlign = "center";
      this.ctx.fillText(text, commit.x, badgeY);
      this.ctx.restore();
    });
  }
}

// Global visualizer instance
let gitVisualizer = null;

function initGitVisualizer() {
  gitVisualizer = new GitVisualizer("git-canvas-tree");
}
