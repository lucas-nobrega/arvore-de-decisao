/**
 * Controlador da Aplicação e Interface do Usuário (UI)
 * Simulador de Árvore de Decisão
 */

document.addEventListener("DOMContentLoaded", () => {
  // Instância do motor
  const engine = new DecisionTreeEngine();

  // Elementos do DOM - Cabeçalho
  const badgeCaseId = document.getElementById("badge-case-id");
  const badgeCaseDiff = document.getElementById("badge-case-diff");
  const textCaseCategory = document.getElementById("text-case-category");
  const caseSelector = document.getElementById("case-selector");
  const btnRestart = document.getElementById("btn-restart");
  const btnUndo = document.getElementById("btn-undo");
  const btnThemeToggle = document.getElementById("btn-theme-toggle");
  const themeIconDark = document.getElementById("theme-icon-dark");
  const themeIconLight = document.getElementById("theme-icon-light");

  // Elementos do DOM - Coluna Esquerda (Contexto)
  const mobileContextToggle = document.getElementById("mobile-context-toggle");
  const accordionArrow = document.getElementById("accordion-arrow");
  const contextDetails = document.getElementById("context-details");
  const textEnunciado = document.getElementById("text-enunciado");
  const textClientName = document.getElementById("text-client-name");
  const textClientStatus = document.getElementById("text-client-status");
  const textStepIndicator = document.getElementById("text-step-indicator");
  const textScoreCounter = document.getElementById("text-score-counter");
  const progressBar = document.getElementById("progress-bar");

  // Elementos do DOM - Diálogo
  const clientNameTag = document.getElementById("client-name-tag");
  const clientPromptText = document.getElementById("client-prompt-text");
  const clientBubble = document.getElementById("client-bubble");
  const optionsContainer = document.getElementById("options-container");

  // Elementos do DOM - Feedback
  const feedbackCard = document.getElementById("feedback-card");
  const feedbackScoreBadge = document.getElementById("feedback-score-badge");
  const feedbackQuote = document.getElementById("feedback-quote");
  const feedbackJustification = document.getElementById("feedback-justification");
  const btnContinueStep = document.getElementById("btn-continue-step");

  // Elementos do DOM - Quiz
  const quizContainer = document.getElementById("quiz-container");
  const quizBadgeLabel = document.getElementById("quiz-badge-label");
  const quizTitle = document.getElementById("quiz-title");
  const quizQuestionText = document.getElementById("quiz-question-text");
  const quizOptionsList = document.getElementById("quiz-options-list");
  const quizFeedback = document.getElementById("quiz-feedback");
  const btnQuizNext = document.getElementById("btn-quiz-next");

  // Elementos do DOM - Conclusão
  const completionContainer = document.getElementById("completion-container");
  const finalPercentage = document.getElementById("final-percentage");
  const finalRatingBadge = document.getElementById("final-rating-badge");
  const finalFeedbackText = document.getElementById("final-feedback-text");
  const btnRetry = document.getElementById("btn-retry");

  // Elementos do DOM - Painel de Desenvolvimento
  const devPanel = document.getElementById("dev-panel");
  const devJsonInput = document.getElementById("dev-json-input");
  const devValidationMsg = document.getElementById("dev-validation-msg");
  const btnDevTest = document.getElementById("btn-dev-test");
  const btnDevDownloadTemplate = document.getElementById("btn-dev-download-template");
  const btnDevLoadSample = document.getElementById("btn-dev-load-sample");

  // Estado Local da UI
  let activeQuizIndex = 0;
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Detectar Iframe para ajustes de incorporação
  if (window.self !== window.top) {
    document.body.classList.add("is-embedded");
  }

  // 2. Detectar Modo Desenvolvimento (?dev=true)
  const isDevMode = urlParams.get("dev") === "true" || urlParams.get("mode") === "admin";
  if (isDevMode && devPanel) {
    devPanel.classList.add("active");
  }

  // 3. Gerenciamento do Tema Claro / Escuro
  const savedTheme = localStorage.getItem("theme_preference") || "light";
  applyTheme(savedTheme);

  btnThemeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme_preference", newTheme);
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIconDark.style.display = "none";
      themeIconLight.style.display = "block";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeIconDark.style.display = "block";
      themeIconLight.style.display = "none";
    }
  }

  // 4. Acordeão de Enunciado no Mobile
  if (mobileContextToggle && contextDetails) {
    mobileContextToggle.addEventListener("click", () => {
      const isExpanded = contextDetails.classList.toggle("expanded");
      mobileContextToggle.setAttribute("aria-expanded", isExpanded);
      accordionArrow.textContent = isExpanded ? "▴" : "▾";
    });
  }

  // 5. Carregar Caso Inicial (via query param ou padrão)
  const initialCaseParam = urlParams.get("case");
  let selectedCaseKey = "26-CPA-0439";
  if (initialCaseParam && BUILT_IN_CASES[initialCaseParam]) {
    selectedCaseKey = initialCaseParam;
    caseSelector.value = initialCaseParam;
  }

  loadCaseByKey(selectedCaseKey);

  // Troca de Caso pelo Dropdown
  caseSelector.addEventListener("change", (e) => {
    loadCaseByKey(e.target.value);
  });

  // Reiniciar
  btnRestart.addEventListener("click", () => {
    engine.reset();
    activeQuizIndex = 0;
    renderCurrentState();
  });

  btnRetry.addEventListener("click", () => {
    engine.reset();
    activeQuizIndex = 0;
    renderCurrentState();
  });

  // Desfazer
  btnUndo.addEventListener("click", () => {
    if (engine.undo()) {
      renderCurrentState();
    }
  });

  // Avançar passo após ler feedback
  btnContinueStep.addEventListener("click", () => {
    engine.advance();
    renderCurrentState();
  });

  /**
   * Carrega um caso a partir da chave do dicionário
   */
  function loadCaseByKey(caseKey) {
    const caseData = BUILT_IN_CASES[caseKey];
    if (!caseData) return;

    engine.loadCase(caseData);
    activeQuizIndex = 0;

    // Atualiza metadados estáticos do caso
    badgeCaseId.textContent = caseData.id || "CPA";
    badgeCaseDiff.textContent = caseData.dificuldade || "Média";
    textCaseCategory.textContent = caseData.categoria || "Atendimento";
    textEnunciado.textContent = caseData.contexto || caseData.descricao || "";

    // Card do cliente
    if (caseData.cliente) {
      textClientName.textContent = caseData.cliente.nome || "Cliente";
      textClientStatus.textContent = caseData.cliente.operacao || caseData.cliente.perfil || caseData.cliente.situacao || "Em atendimento";
      clientNameTag.textContent = caseData.cliente.nome || "Cliente";
    } else {
      textClientName.textContent = "Cliente";
      textClientStatus.textContent = "Em atendimento";
      clientNameTag.textContent = "Cliente";
    }

    renderCurrentState();
  }

  /**
   * Renderiza a interface baseando-se no estado atual do motor
   */
  function renderCurrentState() {
    updateProgressAndScores();

    // Controle de exibição do botão Desfazer
    if (engine.history.length > 0 || engine.pendingStep) {
      btnUndo.style.display = "inline-flex";
    } else {
      btnUndo.style.display = "none";
    }

    // Estado: DIALOGUE
    if (engine.status === "DIALOGUE") {
      clientBubble.style.display = "block";
      optionsContainer.style.display = "flex";
      feedbackCard.style.display = "none";
      quizContainer.style.display = "none";
      completionContainer.style.display = "none";

      renderCurrentDialogueStep();
    }
    // Estado: PENDING_CONTINUE (Feedback da escolha)
    else if (engine.status === "PENDING_CONTINUE") {
      clientBubble.style.display = "block";
      optionsContainer.style.display = "none";
      feedbackCard.style.display = "flex";
      quizContainer.style.display = "none";
      completionContainer.style.display = "none";

      renderFeedbackCard();
    }
    // Estado: QUIZ
    else if (engine.status === "QUIZ") {
      clientBubble.style.display = "none";
      optionsContainer.style.display = "none";
      feedbackCard.style.display = "none";
      quizContainer.style.display = "flex";
      completionContainer.style.display = "none";

      renderQuizQuestion();
    }
    // Estado: COMPLETED
    else if (engine.status === "COMPLETED") {
      clientBubble.style.display = "none";
      optionsContainer.style.display = "none";
      feedbackCard.style.display = "none";
      quizContainer.style.display = "none";
      completionContainer.style.display = "flex";

      renderCompletionCard();
    }
  }

  /**
   * Renderiza o balão do cliente e a lista de botões de alternativas
   */
  function renderCurrentDialogueStep() {
    const step = engine.getCurrentStep();
    if (!step) return;

    clientPromptText.textContent = step.prompt;
    optionsContainer.innerHTML = "";

    const options = step.options || {};
    const sortedKeys = Object.keys(options).sort();

    sortedKeys.forEach((key, index) => {
      const opt = options[key];
      const btn = document.createElement("button");
      btn.className = "option-card-btn";
      btn.setAttribute("data-key", key);
      btn.setAttribute("aria-label", `Alternativa ${key}: ${opt.text}`);

      btn.innerHTML = `
        <span class="option-letter">${key}</span>
        <span class="option-content-text">${opt.text}</span>
      `;

      btn.addEventListener("click", () => {
        handleOptionSelected(key);
      });

      optionsContainer.appendChild(btn);
    });
  }

  /**
   * Executa a seleção de uma alternativa
   */
  function handleOptionSelected(key) {
    engine.selectOption(key);
    renderCurrentState();
  }

  /**
   * Renderiza os dados do feedback após a escolha
   */
  function renderFeedbackCard() {
    const pending = engine.pendingStep;
    if (!pending) return;

    feedbackQuote.textContent = `"${pending.optionText}"`;
    feedbackJustification.textContent = pending.justification || "Alternativa registrada.";

    feedbackScoreBadge.className = "score-badge";
    if (pending.score === 5) {
      feedbackScoreBadge.classList.add("optimal");
      feedbackScoreBadge.textContent = "+5 Pts • Excelente Escolha";
    } else if (pending.score === 3) {
      feedbackScoreBadge.classList.add("good");
      feedbackScoreBadge.textContent = "+3 Pts • Boa Escolha";
    } else if (pending.score === 1) {
      feedbackScoreBadge.classList.add("suboptimal");
      feedbackScoreBadge.textContent = "+1 Pt • Escolha Subótima";
    } else {
      feedbackScoreBadge.classList.add("wrong");
      feedbackScoreBadge.textContent = "0 Pts • Escolha Incorreta";
    }

    btnContinueStep.focus();
  }

  /**
   * Renderiza uma questão do Quiz final
   */
  function renderQuizQuestion() {
    const quizList = engine.caseData.quiz || [];
    if (activeQuizIndex >= quizList.length) {
      engine.status = "COMPLETED";
      renderCurrentState();
      return;
    }

    const currentQ = quizList[activeQuizIndex];
    quizBadgeLabel.textContent = `Fixação Conceitual (${activeQuizIndex + 1} de ${quizList.length})`;
    quizTitle.textContent = currentQ.title || `Questão ${activeQuizIndex + 1}`;
    quizQuestionText.textContent = currentQ.question;

    quizOptionsList.innerHTML = "";
    quizFeedback.style.display = "none";
    btnQuizNext.style.display = "none";

    const answersForQ = engine.quizAnswers[currentQ.id];
    const isAnswered = !!answersForQ;

    Object.entries(currentQ.options).forEach(([optKey, optText]) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opt-btn";
      btn.disabled = isAnswered;

      if (isAnswered) {
        if (optKey.toUpperCase() === currentQ.correct.toUpperCase()) {
          btn.classList.add("correct");
        } else if (optKey.toUpperCase() === answersForQ.selected.toUpperCase()) {
          btn.classList.add("incorrect");
        }
      }

      btn.innerHTML = `
        <span class="quiz-opt-letter">${optKey}</span>
        <span>${optText}</span>
      `;

      btn.addEventListener("click", () => {
        handleQuizAnswer(currentQ.id, optKey);
      });

      quizOptionsList.appendChild(btn);
    });

    if (isAnswered) {
      quizFeedback.style.display = "block";
      quizFeedback.innerHTML = `<strong>Justificativa do Gabarito:</strong> ${answersForQ.justification || currentQ.justification}`;
      btnQuizNext.style.display = "inline-flex";
      btnQuizNext.textContent = (activeQuizIndex + 1 < quizList.length) ? "Próxima Questão" : "Ver Resultado Final";
    }
  }

  /**
   * Processa a resposta do quiz
   */
  function handleQuizAnswer(questionId, optKey) {
    engine.answerQuizQuestion(questionId, optKey);
    renderQuizQuestion();
  }

  btnQuizNext.addEventListener("click", () => {
    const quizList = engine.caseData.quiz || [];
    if (activeQuizIndex + 1 < quizList.length) {
      activeQuizIndex++;
      renderQuizQuestion();
    } else {
      engine.status = "COMPLETED";
      renderCurrentState();
    }
  });

  /**
   * Renderiza o Card de Conclusão e envia notificação postMessage
   */
  function renderCompletionCard() {
    const summary = engine.getSummary();

    finalPercentage.textContent = `${summary.percentage}%`;
    finalRatingBadge.textContent = summary.rating;
    finalRatingBadge.className = `rating-badge ${summary.badgeClass}`;
    finalFeedbackText.textContent = summary.feedback;

    // Notificar a janela pai via postMessage caso esteja embutido (LMS/Portal)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: "DECISION_TREE_COMPLETED",
        caseId: summary.caseId,
        score: summary.totalScore,
        maxScore: summary.maxScore,
        percentage: summary.percentage,
        rating: summary.rating,
        timestamp: new Date().toISOString()
      }, "*");
    }
  }

  /**
   * Atualiza a barra de progresso e contadores
   */
  function updateProgressAndScores() {
    textScoreCounter.textContent = `${engine.currentScore + engine.quizScore} pts`;

    // Cálculo da etapa
    const stepsCount = Object.keys((engine.caseData && engine.caseData.steps) || {}).length || 4;
    const currentStepNum = parseInt(engine.currentStepId, 10) || 1;
    const progressPercent = Math.min(100, Math.round((engine.history.length / stepsCount) * 100));

    textStepIndicator.textContent = engine.status === "QUIZ" 
      ? `Quiz (${activeQuizIndex + 1})` 
      : (engine.status === "COMPLETED" ? "Concluído" : `Etapa ${engine.history.length + 1} de ~${stepsCount}`);

    progressBar.style.width = `${progressPercent}%`;
  }

  // 6. Atalhos de Teclado (1-4 ou A-D) para agilidade no atendimento
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;

    if (engine.status === "DIALOGUE") {
      const key = e.key.toUpperCase();
      let selectedOption = null;

      if (key === "1" || key === "A") selectedOption = "A";
      else if (key === "2" || key === "B") selectedOption = "B";
      else if (key === "3" || key === "C") selectedOption = "C";
      else if (key === "4" || key === "D") selectedOption = "D";

      if (selectedOption) {
        const step = engine.getCurrentStep();
        if (step && step.options && step.options[selectedOption]) {
          handleOptionSelected(selectedOption);
        }
      }
    } else if (engine.status === "PENDING_CONTINUE") {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        engine.advance();
        renderCurrentState();
      }
    }
  });

  // 7. Funções do Painel de Desenvolvimento (?dev=true)
  if (isDevMode) {
    btnDevLoadSample.addEventListener("click", () => {
      if (engine.caseData) {
        devJsonInput.value = JSON.stringify(engine.caseData, null, 2);
        devValidationMsg.textContent = "JSON atual carregado no editor com sucesso.";
        devValidationMsg.style.color = "#38bdf8";
      }
    });

    btnDevTest.addEventListener("click", () => {
      try {
        const parsed = JSON.parse(devJsonInput.value);
        const validation = DecisionTreeEngine.validateTree(parsed);

        if (!validation.valid) {
          devValidationMsg.textContent = "Erro de validação: " + validation.errors.join("; ");
          devValidationMsg.style.color = "#ef4444";
          return;
        }

        // Carrega o caso personalizado
        BUILT_IN_CASES[parsed.id] = parsed;

        // Adiciona ao dropdown se não existir
        if (!caseSelector.querySelector(`option[value="${parsed.id}"]`)) {
          const newOpt = document.createElement("option");
          newOpt.value = parsed.id;
          newOpt.textContent = `Personalizado: ${parsed.id}`;
          caseSelector.appendChild(newOpt);
        }

        caseSelector.value = parsed.id;
        loadCaseByKey(parsed.id);

        devValidationMsg.textContent = `Árvore '${parsed.id}' validada e carregada no simulador!`;
        devValidationMsg.style.color = "#10b981";
      } catch (err) {
        devValidationMsg.textContent = "JSON sintaticamente inválido: " + err.message;
        devValidationMsg.style.color = "#ef4444";
      }
    });

    btnDevDownloadTemplate.addEventListener("click", () => {
      fetch("dev/template.json")
        .then(res => res.json())
        .then(templateData => {
          const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "arvore_decisao_template.json";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        })
        .catch(() => {
          devValidationMsg.textContent = "Não foi possível carregar dev/template.json.";
          devValidationMsg.style.color = "#ef4444";
        });
    });
  }
});
