/**
 * Motor de Execução da Árvore de Decisão
 * Gerencia nós, ramificações, cálculo de pontuação e transição para quiz final.
 */
class DecisionTreeEngine {
  constructor() {
    this.caseData = null;
    this.currentStepId = "1";
    this.history = [];
    this.currentScore = 0;
    this.maxDialogueScore = 0;
    this.status = "IDLE"; // IDLE, DIALOGUE, PENDING_CONTINUE, QUIZ, COMPLETED
    this.pendingStep = null;
    this.quizAnswers = {};
    this.quizScore = 0;
  }

  /**
   * Carrega e inicializa um novo caso
   */
  loadCase(caseData) {
    const validation = DecisionTreeEngine.validateTree(caseData);
    if (!validation.valid) {
      throw new Error("Estrutura inválida da árvore: " + validation.errors.join("; "));
    }

    this.caseData = JSON.parse(JSON.stringify(caseData));
    this.reset();
  }

  /**
   * Reinicia a simulação para o caso atual
   */
  reset() {
    this.currentStepId = "1";
    this.history = [];
    this.currentScore = 0;
    this.pendingStep = null;
    this.quizAnswers = {};
    this.quizScore = 0;
    this.status = "DIALOGUE";
    this.calculateMaxPotentialScore();
  }

  /**
   * Calcula a pontuação máxima possível considerando 5 pontos por etapa
   */
  calculateMaxPotentialScore() {
    // Estimativa baseada nas etapas da árvore
    const stepsCount = Object.keys(this.caseData.steps || {}).length;
    // Em árvores ramificadas, o caminho ideal costuma ter 4 a 8 passos.
    // Usaremos a soma das melhores escolhas do caminho percorrido + quiz.
    this.maxDialogueScore = 0;
  }

  /**
   * Obtém o passo atual da conversa
   */
  getCurrentStep() {
    if (!this.caseData || !this.caseData.steps) return null;
    return this.caseData.steps[this.currentStepId] || null;
  }

  /**
   * Registra a escolha do usuário em uma alternativa (A, B, C, D)
   */
  selectOption(optionKey) {
    if (this.status !== "DIALOGUE") return null;

    const currentStep = this.getCurrentStep();
    if (!currentStep || !currentStep.options || !currentStep.options[optionKey]) {
      throw new Error(`Alternativa ${optionKey} não encontrada no passo ${this.currentStepId}`);
    }

    const option = currentStep.options[optionKey];
    const score = typeof option.score === "number" ? option.score : 0;

    const stepResult = {
      stepId: this.currentStepId,
      prompt: currentStep.prompt,
      optionKey: optionKey,
      optionText: option.text,
      score: score,
      justification: option.justification || "",
      next: option.next
    };

    this.pendingStep = stepResult;
    this.status = "PENDING_CONTINUE";

    return stepResult;
  }

  /**
   * Confirma a leitura do feedback da alternativa e avança na árvore
   */
  advance() {
    if (this.status !== "PENDING_CONTINUE" || !this.pendingStep) return null;

    const stepResult = this.pendingStep;
    this.history.push(stepResult);
    this.currentScore += stepResult.score;
    this.pendingStep = null;

    const nextId = String(stepResult.next).trim().toLowerCase();

    // Verificação de encerramento do diálogo
    if (nextId === "end" || nextId === "quiz" || nextId === "fim" || !this.caseData.steps[stepResult.next]) {
      if (this.caseData.quiz && this.caseData.quiz.length > 0) {
        this.status = "QUIZ";
      } else {
        this.status = "COMPLETED";
      }
    } else {
      this.currentStepId = stepResult.next;
      this.status = "DIALOGUE";
    }

    return {
      status: this.status,
      currentStepId: this.currentStepId,
      currentScore: this.currentScore
    };
  }

  /**
   * Desfaz a última jogada realizada
   */
  undo() {
    if (this.history.length === 0) return false;

    // Se estiver em estado pendente, apenas cancela a pendência
    if (this.status === "PENDING_CONTINUE") {
      this.pendingStep = null;
      this.status = "DIALOGUE";
      return true;
    }

    // Se estava em QUIZ ou COMPLETED e quer voltar ao diálogo
    const lastStep = this.history.pop();
    this.currentScore -= lastStep.score;
    this.currentStepId = lastStep.stepId;
    this.status = "DIALOGUE";
    this.pendingStep = null;
    return true;
  }

  /**
   * Responde uma pergunta do quiz de múltipla escolha
   */
  answerQuizQuestion(questionId, selectedOption) {
    if (!this.caseData.quiz) return null;
    const question = this.caseData.quiz.find(q => q.id === questionId);
    if (!question) return null;

    const isCorrect = question.correct.toUpperCase() === selectedOption.toUpperCase();
    this.quizAnswers[questionId] = {
      selected: selectedOption,
      isCorrect: isCorrect,
      correct: question.correct,
      justification: question.justification
    };

    // Recalcula pontuação do quiz
    this.quizScore = Object.values(this.quizAnswers).filter(a => a.isCorrect).length * 5;

    // Se todas as questões foram respondidas, finaliza
    if (Object.keys(this.quizAnswers).length === this.caseData.quiz.length) {
      this.status = "COMPLETED";
    }

    return {
      isCorrect,
      justification: question.justification,
      quizAnswers: this.quizAnswers,
      status: this.status
    };
  }

  /**
   * Retorna resumo consolidado de desempenho
   */
  getSummary() {
    const dialogueStepsCount = this.history.length;
    const maxDialogue = dialogueStepsCount * 5;
    const quizCount = (this.caseData.quiz || []).length;
    const maxQuiz = quizCount * 5;
    const totalMax = maxDialogue + maxQuiz;
    const totalAchieved = this.currentScore + this.quizScore;
    const percentage = totalMax > 0 ? Math.round((totalAchieved / totalMax) * 100) : 100;

    let rating = "Excelente";
    let badgeClass = "badge-success";
    let feedback = "Desempenho exemplar! Condução ética, empática e plenamente alinhada às normas regulatórias e princípios consultivos da certificação.";

    if (percentage < 60) {
      rating = "Necessita Revisão";
      badgeClass = "badge-danger";
      feedback = "A abordagem gerou atritos com o cliente ou negligenciou aspectos regulatórios essenciais. Recomenda-se revisar as normas de conduta e refazer o caso.";
    } else if (percentage < 85) {
      rating = "Bom Desempenho";
      badgeClass = "badge-warning";
      feedback = "Boa condução com resolução do problema, porém algumas abordagens poderiam ser mais consultivas e menos alarmistas ou burocráticas.";
    }

    return {
      caseId: this.caseData ? this.caseData.id : "",
      caseTitle: this.caseData ? this.caseData.descricao : "",
      dialogueScore: this.currentScore,
      maxDialogueScore: maxDialogue,
      quizScore: this.quizScore,
      maxQuizScore: maxQuiz,
      totalScore: totalAchieved,
      maxScore: totalMax,
      percentage: percentage,
      rating: rating,
      badgeClass: badgeClass,
      feedback: feedback,
      history: this.history,
      quizAnswers: this.quizAnswers
    };
  }

  /**
   * Validador estrito da estrutura JSON da árvore de decisão
   */
  static validateTree(data) {
    const errors = [];
    if (!data || typeof data !== "object") {
      return { valid: false, errors: ["O arquivo deve conter um objeto JSON válido."] };
    }

    if (!data.id) errors.push("Campo obrigatório 'id' ausente.");
    if (!data.contexto) errors.push("Campo obrigatório 'contexto' ausente.");
    if (!data.steps || typeof data.steps !== "object" || Object.keys(data.steps).length === 0) {
      errors.push("Campo 'steps' deve conter ao menos um passo de diálogo.");
    } else {
      if (!data.steps["1"]) {
        errors.push("O passo inicial '1' é obrigatório no objeto 'steps'.");
      }

      for (const [stepKey, stepVal] of Object.entries(data.steps)) {
        if (!stepVal.prompt) {
          errors.push(`Passo '${stepKey}': campo 'prompt' ausente.`);
        }
        if (!stepVal.options || typeof stepVal.options !== "object") {
          errors.push(`Passo '${stepKey}': campo 'options' ausente ou inválido.`);
        } else {
          const optKeys = Object.keys(stepVal.options);
          if (optKeys.length < 2) {
            errors.push(`Passo '${stepKey}': deve conter pelo menos 2 alternativas em 'options'.`);
          }
          for (const [optKey, optVal] of Object.entries(stepVal.options)) {
            if (!optVal.text) {
              errors.push(`Passo '${stepKey}' -> Alternativa '${optKey}': 'text' ausente.`);
            }
            if (typeof optVal.score !== "number") {
              errors.push(`Passo '${stepKey}' -> Alternativa '${optKey}': 'score' numérico ausente.`);
            }
            if (!optVal.next) {
              errors.push(`Passo '${stepKey}' -> Alternativa '${optKey}': 'next' ausente.`);
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}

// Exportação global e modular
if (typeof window !== "undefined") {
  window.DecisionTreeEngine = DecisionTreeEngine;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DecisionTreeEngine };
}
