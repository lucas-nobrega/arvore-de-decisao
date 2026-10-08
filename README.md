# Simulador de Árvore de Decisão Bancária (CPA / ANBIMA)

Aplicação web estática, responsiva e de alta performance desenvolvida para simulação de atendimentos e tomada de decisão em cenários bancários e de certificação financeira (ex: CPA-10, CPA-20, CEA).

Projetada com arquitetura **enxuta e mobile-first**, pronta para ser **hospedada no GitHub Pages** e **incorporada via iframe** em qualquer plataforma educacional ou LMS.

---

## 🚀 Como Publicar no GitHub Pages

A aplicação não requer compilação ou dependências de servidor (apenas HTML, CSS e JavaScript nativos).

1. Envie os arquivos para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: simulador de arvore de decisao cpa"
   git push origin main
   ```
2. No GitHub, abra seu repositório e clique na aba **Settings**.
3. No menu lateral esquerdo, acesse **Pages**.
4. Em **Build and deployment > Branch**:
   - Selecione a branch `main` (ou `master`).
   - Mantenha a pasta `/ (root)`.
   - Clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. O seu simulador estará disponível no endereço:
   ```
   https://<seu-usuario>.github.io/arvore-de-decisao/
   ```

---

## 📦 Como Incorporar em Outra Plataforma (LMS / Portal)

Por ser ultraleve e responsivo, o simulador se adapta automaticamente ao contêiner pai sem barras de rolagem duplas.

### Exemplo Básico de Incorporação:
```html
<iframe 
  src="https://<seu-usuario>.github.io/arvore-de-decisao/" 
  width="100%" 
  height="700px" 
  style="border: none; border-radius: 12px; overflow: hidden;"
  title="Simulador de Tomada de Decisão">
</iframe>
```

### Carregamento de Caso Específico via Parâmetro de URL:
Você pode direcionar o iframe diretamente para o caso desejado:
- **Caso 1 (Mariana & Roberto - PLDFT / KYC)**:
  `https://<seu-usuario>.github.io/arvore-de-decisao/?case=26-CPA-0439`
- **Caso 2 (Lucas & Carlos - Fundo Educacional)**:
  `https://<seu-usuario>.github.io/arvore-de-decisao/?case=043.02.CPA.001`

### Captura de Desempenho via `postMessage`:
Quando o aluno conclui a simulação, o simulador dispara um evento `postMessage` para a janela mãe:
```javascript
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DECISION_TREE_COMPLETED') {
    console.log('Caso Concluído:', event.data.caseId);
    console.log('Pontuação Obtida:', event.data.score, 'de', event.data.maxScore);
    console.log('Aproveitamento:', event.data.percentage + '%');
    console.log('Classificação:', event.data.rating);
    // Aqui você pode salvar a nota do aluno no seu banco de dados ou LMS
  }
});
```

---

## 📱 Responsividade e Mobile-First

- **Desktop & Tablets**: Layout em duas colunas (*Split-Screen*), com enunciado à esquerda e diálogo interativo à direita.
- **Smartphones**: Fluxo vertical otimizado, botões de resposta com área de toque mínima de 48px e **painel de enunciado retrátil em formato sanfona** para maximizar o espaço de tela do diálogo.

---

## 🛠️ Ambiente de Desenvolvimento (Importar / Exportar JSON)

Para preservar o foco do aluno e a integridade da avaliação, as ferramentas de importação e exportação de árvores de decisão **não são exibidas ao público geral**.

### Como acessar o Modo de Desenvolvimento:
Adicione o parâmetro `?dev=true` à URL:
```
https://<seu-usuario>.github.io/arvore-de-decisao/?dev=true
```
No rodapé da página aparecerá o **Painel de Desenvolvimento**, onde é possível:
1. **Colar qualquer árvore JSON** e testá-la ao vivo no simulador.
2. **Validar a integridade dos nós e alternativas** antes de homologar.
3. **Baixar o template padrão** (`arvore_decisao_template.json`).

O template canônico também se encontra na pasta [`dev/template.json`](dev/template.json).

---

## 📋 Estrutura dos Arquivos

```
arvore-de-decisao/
├── index.html          # Ponto de entrada do simulador (SPA estática)
├── css/
│   └── styles.css      # Design system, temas claro/escuro e regras de iframe
├── js/
│   ├── cases.js        # Casos nativos homologados (26-CPA-0439 e 043.02.CPA.001)
│   ├── engine.js       # Motor da árvore de decisão e ramificações
│   └── app.js          # Controlador da interface, teclado e eventos
├── dev/
│   └── template.json   # Template JSON canônico de referência
└── README.md           # Documentação técnica e de publicação
```