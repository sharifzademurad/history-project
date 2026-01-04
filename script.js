let correct = 0;
let wrong = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(questions => {
    const quizDiv = document.getElementById("quiz");

    questions.forEach((q, index) => {
      const qContainer = document.createElement("div");
      qContainer.className = "question";

      const qText = document.createElement("h2");
      qText.textContent = `${index + 1}. ${q.question}`;
      qContainer.appendChild(qText);

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";

      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

      let answeredCorrectly = false;
      let countedWrong = false;

      shuffledOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;

        btn.addEventListener("click", () => {
          if (answeredCorrectly) return;

          if (opt === q.correctText) {
            btn.classList.remove("wrong");
            btn.classList.add("correct");
            answeredCorrectly = true;
            correct++;

            // Düz tapıldıqda hamısını disable et
            optionsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
          } else {
            btn.classList.add("wrong");

            // səhv yalnız 1 dəfə sayılsın
            if (!countedWrong) {
              wrong++;
              countedWrong = true;
            }
          }

          document.getElementById("scoreboard").textContent =
            `Düz: ${correct} | Səhv: ${wrong}`;
        });

        optionsDiv.appendChild(btn);
      });

      qContainer.appendChild(optionsDiv);
      quizDiv.appendChild(qContainer);
    });
  });
