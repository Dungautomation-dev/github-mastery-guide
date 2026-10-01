/**
 * quiz.js - Interactive Beginner Git & GitHub Knowledge Quiz
 * Interactive self-assessment for beginners to reinforce learning
 * Author: Dung Automation (https://github.com/Dungauto)
 */

const QUIZ_QUESTIONS = [
  {
    question: {
      vi: "Bạn vừa viết xong tính năng và muốn đưa tất cả file đã sửa vào Staging Area để chuẩn bị commit. Bạn dùng lệnh nào?",
      en: "You modified files and want to stage all changes for the next commit. Which command should you run?"
    },
    options: [
      { text: "git push -u origin main", correct: false },
      { text: "git add .", correct: true },
      { text: "git commit -m 'all'", correct: false },
      { text: "git checkout -b main", correct: false }
    ],
    explanation: {
      vi: "Chính xác! 'git add .' (hoặc 'git add -A') sẽ quét toàn bộ thư mục hiện tại và đưa mọi thay đổi vào Staging Area.",
      en: "Correct! 'git add .' stages all current directory modifications ready to be committed."
    }
  },
  {
    question: {
      vi: "Bạn vừa commit xong và phát hiện viết sai chính tả thông điệp. Lệnh nào sửa lại thông điệp nhanh nhất?",
      en: "You just committed and noticed a typo in your commit message. What is the quickest way to fix it?"
    },
    options: [
      { text: "git commit --amend -m 'Lời nhắn mới'", correct: true },
      { text: "git reset --hard HEAD", correct: false },
      { text: "git revert HEAD", correct: false },
      { text: "git pull --rebase", correct: false }
    ],
    explanation: {
      vi: "Chính xác! Cờ '--amend' cho phép bạn ghi đè và sửa chữa commit gần nhất mà không sinh commit rác.",
      en: "Correct! The '--amend' flag allows you to replace the tip commit with an updated message."
    }
  },
  {
    question: {
      vi: "Sự khác biệt quan trọng nhất giữa 'git fetch' và 'git pull' là gì?",
      en: "What is the critical difference between 'git fetch' and 'git pull'?"
    },
    options: [
      { text: "git fetch chỉ tải dữ liệu về máy nhưng CHƯA gộp; còn git pull vừa tải vừa tự động gộp (merge)", correct: true },
      { text: "git fetch dùng cho SSH, còn git pull dùng cho HTTPS", correct: false },
      { text: "git fetch xóa code cũ, còn git pull giữ lại code cũ", correct: false },
      { text: "Hai lệnh này giống hệt nhau không có gì khác", correct: false }
    ],
    explanation: {
      vi: "Chuẩn xác! 'git pull' thực chất là chạy 'git fetch' sau đó tự động chạy tiếp 'git merge' vào nhánh bạn đang đứng.",
      en: "Exactly! 'git pull' is essentially 'git fetch' immediately followed by 'git merge'."
    }
  },
  {
    question: {
      vi: "Tính năng 'GitHub Projects' trên trang cá nhân hoặc repository có công dụng chính là gì?",
      en: "What is the primary purpose of the 'GitHub Projects' feature?"
    },
    options: [
      { text: "Quản lý tiến độ công việc, task dạng bảng Kanban (Todo, In Progress, Done) như Trello/Jira", correct: true },
      { text: "Nơi lưu trữ file cài đặt .exe của phần mềm", correct: false },
      { text: "Trình biên dịch mã nguồn trực tuyến", correct: false },
      { text: "Nơi quét virus và mã độc của máy tính", correct: false }
    ],
    explanation: {
      vi: "Rất chính xác! GitHub Projects là bảng điều phối công việc linh hoạt, giúp bạn theo dõi việc cần làm, tiến độ và roadmap.",
      en: "Spot on! GitHub Projects is a native board (Kanban / Table / Roadmap) tracking work progress."
    }
  },
  {
    question: {
      vi: "Khi đang xem bất kỳ kho code nào trên web GitHub, bạn bấm phím nào trên bàn phím để mở ngay VS Code trực tuyến?",
      en: "When viewing any repository on GitHub in your browser, which key launches online VS Code instantly?"
    },
    options: [
      { text: "Phím dấu chấm (.)", correct: true },
      { text: "Phím cách (Space)", correct: false },
      { text: "Phím Enter", correct: false },
      { text: "Phím Escape (Esc)", correct: false }
    ],
    explanation: {
      vi: "Tuyệt vời! Bấm phím dấu chấm '.' trên bất kỳ repository nào sẽ đưa bạn tới trình soạn thảo web github.dev trong 1 giây!",
      en: "Awesome! Pressing '.' on any GitHub repository opens the full web-based VS Code environment!"
    }
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let quizAnswered = false;

function renderQuizQuestion() {
  const container = document.getElementById("quiz-card-container");
  if (!container) return;

  if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
    // Show results
    const isEn = typeof currentLang !== "undefined" && currentLang === "en";
    container.innerHTML = `
      <div class="quiz-result-box">
        <div class="quiz-trophy"><i class="fa-solid fa-trophy" style="color:#ffd700; font-size:3rem;"></i></div>
        <h3>${isEn ? "Quiz Completed!" : "Hoàn Thành Thử Thách!"}</h3>
        <p class="quiz-score">${isEn ? "Your Score" : "Điểm số của bạn"}: <strong>${userScore} / ${QUIZ_QUESTIONS.length}</strong></p>
        <p>${userScore === QUIZ_QUESTIONS.length 
          ? (isEn ? "🌟 Outstanding! You have mastered the fundamentals of Git & GitHub!" : "🌟 Xuất sắc! Bạn đã nắm vững các kiến thức nền tảng quan trọng nhất của Git & GitHub!")
          : (isEn ? "Good effort! Review the chapters above to achieve a perfect 5/5 score." : "Khá tốt! Hãy đọc lại các chương bài học ở trên để đạt điểm tuyệt đối 5/5 nhé.")}
        </p>
        <button class="btn-primary" onclick="restartQuiz()" style="margin-top:16px;">
          <i class="fa-solid fa-rotate-right"></i> ${isEn ? "Try Again" : "Làm Lại Bài Test"}
        </button>
      </div>
    `;
    return;
  }

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isEn = typeof currentLang !== "undefined" && currentLang === "en";
  quizAnswered = false;

  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="quiz-option-btn" onclick="selectQuizAnswer(${idx})">
        <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="opt-text">${opt.text}</span>
      </button>
    `;
  });

  container.innerHTML = `
    <div class="quiz-header">
      <span class="quiz-step-tag">${isEn ? "Question" : "Câu hỏi"} ${currentQuestionIndex + 1} / ${QUIZ_QUESTIONS.length}</span>
      <span class="quiz-score-tag">${isEn ? "Current Score" : "Điểm hiện tại"}: ${userScore}</span>
    </div>
    <h4 class="quiz-question-title">${isEn ? q.question.en : q.question.vi}</h4>
    <div class="quiz-options-list" id="quiz-options-list">
      ${optionsHtml}
    </div>
    <div class="quiz-feedback-box" id="quiz-feedback-box" style="display:none;"></div>
  `;
}

function selectQuizAnswer(index) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isEn = typeof currentLang !== "undefined" && currentLang === "en";
  const buttons = document.querySelectorAll(".quiz-option-btn");
  const selectedBtn = buttons[index];
  const isCorrect = q.options[index].correct;

  if (isCorrect) {
    userScore++;
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
    // Highlight correct one
    q.options.forEach((opt, idx) => {
      if (opt.correct) buttons[idx].classList.add("correct");
    });
  }

  const feedbackBox = document.getElementById("quiz-feedback-box");
  feedbackBox.style.display = "block";
  feedbackBox.className = `quiz-feedback-box ${isCorrect ? "success" : "warning"}`;
  feedbackBox.innerHTML = `
    <p><strong>${isCorrect ? (isEn ? "🎉 Correct!" : "🎉 Chính xác!") : (isEn ? "❌ Incorrect!" : "❌ Chưa chính xác!")}</strong> ${isEn ? q.explanation.en : q.explanation.vi}</p>
    <button class="btn-next-quiz" onclick="nextQuizQuestion()">
      ${isEn ? "Next Question" : "Câu tiếp theo"} <i class="fa-solid fa-arrow-right"></i>
    </button>
  `;
}

function nextQuizQuestion() {
  currentQuestionIndex++;
  renderQuizQuestion();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  renderQuizQuestion();
}
