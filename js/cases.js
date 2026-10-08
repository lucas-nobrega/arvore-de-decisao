/**
 * Banco de Casos Oficiais para o Simulador de Árvore de Decisão
 * Certificações Financeiras e Bancárias (CPA / ANBIMA)
 */
const BUILT_IN_CASES = {
  "26-CPA-0439": {
    "id": "26-CPA-0439",
    "certificacao": "CPA",
    "objeto": "PLDFT / KYC",
    "dificuldade": "Média",
    "categoria": "Relacionamento com o Cliente",
    "descricao": "Atendimento emergencial a cliente com transferência de alto valor bloqueada por desatualização cadastral (24+ meses).",
    "contexto": "Você é Mariana, gerente de relacionamento do Banco Horizonte. O dia está agitado quando o Sr. Roberto, um cliente antigo da agência, entra em sua sala visivelmente alterado. Ele relata que tentou realizar uma transferência eletrônica de R$ 85.000,00 para a compra de um veículo, mas a operação foi bloqueada pelo sistema de segurança. Ao acessar o prontuário do cliente, você identifica que o cadastro de Roberto não sofre atualizações há mais de 24 meses. De acordo com as normas de Prevenção à Lavagem de Dinheiro (PLDFT) e o princípio do 'Conheça seu Cliente' (KYC), transações de alto valor devem ser suspensas preventivamente quando o perfil transacional ou cadastral do cliente está desatualizado, visando mitigar riscos de fraude ou ilícitos financeiros. Seu objetivo é conduzir Roberto através do processo de atualização cadastral, explicando a obrigatoriedade regulatória, tratando sua resistência e garantindo a segurança de seus dados, tudo de forma ética e profissional.",
    "cliente": {
      "nome": "Sr. Roberto Almeida",
      "perfil": "Cliente Antigo (15 anos)",
      "operacao": "TED R$ 85.000,00 bloqueada"
    },
    "steps": {
      "1": {
        "prompt": "Minha transferência foi bloqueada! Quero resolver isso agora. O que está acontecendo? Preciso desse dinheiro para fechar um negócio hoje!",
        "options": {
          "A": {
            "text": "Sr. Roberto, entendo perfeitamente sua preocupação. Vou verificar imediatamente o motivo técnico desse bloqueio no sistema e explicar ao senhor o passo a passo para resolvermos isso agora.",
            "score": 5,
            "next": "2",
            "justification": "Melhor escolha – Abordagem empática, assertiva e orientada à solução imediata, acalmando o cliente sem repassar insegurança."
          },
          "B": {
            "text": "Acalme-se, Sr. Roberto. Provavelmente é apenas uma pendência cadastral simples. O senhor atualizou seus dados recentemente?",
            "score": 3,
            "next": "2",
            "justification": "Boa escolha – Tenta contemporizar e já investiga o cadastro, embora pedir diretamente para o cliente 'se acalmar' possa soar minimizador."
          },
          "C": {
            "text": "Se a operação foi bloqueada pelo sistema central, deve haver algum motivo regulatório grave por trás.",
            "score": 1,
            "next": "2b",
            "justification": "Escolha subótima – Tom alarmista que gera pânico desnecessário e suspeita infundada sobre a idoneidade do cliente."
          },
          "D": {
            "text": "Infelizmente, isso acontece quando o cliente não mantém seu cadastro atualizado. O senhor deveria ter vindo antes.",
            "score": 0,
            "next": "2b",
            "justification": "Escolha incorreta – Culpa abertamente o cliente em momento de crise, quebrando a relação de confiança e gerando atrito desnecessário."
          }
        }
      },
      "2": {
        "prompt": "Tudo bem, Mariana. Eu entendo, mas eu realmente preciso que essa transferência saia hoje sem falta. O que eu tenho que fazer?",
        "options": {
          "A": {
            "text": "Sr. Roberto, identifiquei que seu cadastro precisa de uma atualização obrigatória (24 meses). Assim que confirmarmos seus dados, o sistema libera automaticamente a operação.",
            "score": 5,
            "next": "3",
            "justification": "Melhor escolha – Esclarece o gatilho regulatório (24 meses) de forma didática e vincula a ação a um resultado prático e transparente."
          },
          "B": {
            "text": "Seu cadastro está desatualizado, por isso bloqueou. Precisamos preencher um novo formulário de KYC agora.",
            "score": 3,
            "next": "3",
            "justification": "Boa escolha – Aponta a causa real, mas usa jargão técnico bancário ('KYC') sem explicar o que significa para o cliente."
          },
          "C": {
            "text": "O sistema bloqueia por padrão nesses casos. É uma trava de segurança interna que eu não consigo pular sem os dados.",
            "score": 1,
            "next": "3",
            "justification": "Escolha subótima – Transfere a responsabilidade para uma burocracia mecânica do sistema, sem demonstrar consultoria ativa."
          },
          "D": {
            "text": "Sem a atualização cadastral completa, não há nada que eu possa fazer por aqui. São normas internas.",
            "score": 0,
            "next": "3",
            "justification": "Escolha incorreta – Postura passiva e intransigente que transmite desamparo ao cliente em uma situação crítica."
          }
        }
      },
      "2b": {
        "prompt": "Grave?! Você está insinuando que eu estou cometendo algum crime? Sou cliente deste banco há 15 anos! Exijo que liberem meu dinheiro imediatamente!",
        "options": {
          "A": {
            "text": "Peço sinceras desculpas pelo mal-entendido, Sr. Roberto. De forma alguma é uma suspeita sobre o senhor! Trata-se de uma proteção preventiva de segurança exigida pelas normas do Banco Central quando não há atualização há mais de 24 meses. Vamos regularizar juntos agora mesmo.",
            "score": 5,
            "next": "3",
            "justification": "Melhor escolha – Excelente gestão de crise: pede desculpas pelo ruído, valoriza a integridade do cliente e esclarece o fundamento da norma regulatória."
          },
          "B": {
            "text": "Não me entenda mal, Sr. Roberto. É apenas um procedimento técnico de rotina para validar seus dados.",
            "score": 3,
            "next": "3",
            "justification": "Boa escolha – Consegue baixar o tom da conversa, mas deixa de fundamentar a regra dos 24 meses."
          },
          "C": {
            "text": "Não é decisão minha, são leis federais rígidas contra lavagem de dinheiro que obrigam os bancos a travar a conta.",
            "score": 1,
            "next": "3",
            "justification": "Escolha subótima – Mencionar 'leis contra lavagem de dinheiro' a um cliente ofendido agrava a percepção de acusação."
          },
          "D": {
            "text": "O senhor pode reclamar com quem quiser, mas sem os novos dados eu não mexo uma linha no sistema.",
            "score": 0,
            "next": "3",
            "justification": "Escolha incorreta – Falta de postura profissional e grave descumprimento dos padrões de conduta e relacionamento."
          }
        }
      },
      "3": {
        "prompt": "Certo, entendi a exigência da norma. Mas eu preciso comprovar minha renda novamente? Estou apenas com meus documentos pessoais aqui na agência.",
        "options": {
          "A": {
            "text": "Para operações desse porte (R$ 85.000,00), a regulação de PLDFT exige compatibilidade entre o patrimônio/renda e as movimentações. O senhor pode nos enviar o comprovante de renda digitalmente pelo aplicativo enquanto conferimos seus dados cadastrais aqui no terminal.",
            "score": 5,
            "next": "4",
            "justification": "Melhor escolha – Fundamenta com precisão o princípio da capacidade financeira do KYC e oferece alternativa tecnológica ágil."
          },
          "B": {
            "text": "Sim, a comprovação é indispensável para esse valor. Podemos iniciar a atualização cadastral já e o senhor envia o comprovante por e-mail logo em seguida.",
            "score": 3,
            "next": "4",
            "justification": "Boa escolha – Mantém a conformidade e tenta agilizar, embora menos detalhada sobre os canais seguros."
          },
          "C": {
            "text": "Se não tiver comprovante de renda em mãos agora, a transferência só sairá amanhã ou depois.",
            "score": 1,
            "next": "4",
            "justification": "Escolha subótima – Cria rigidez desnecessária e desconsidera soluções digitais imediatas que o banco disponibiliza."
          },
          "D": {
            "text": "Como o senhor é cliente antigo, vou tentar desmarcar a exigência de renda no sistema para liberar logo.",
            "score": 0,
            "next": "4",
            "justification": "Escolha incorreta – Gravíssima infração de compliance: violar travas de PLDFT para favorecer cliente acarreta sanções administrativas e legais."
          }
        }
      },
      "4": {
        "prompt": "Ótimo, acabei de enviar meu informe de rendimentos mais recente pelo app do banco e validamos o endereço. A operação já pode ser concluída?",
        "options": {
          "A": {
            "text": "Documentação recebida e validada com sucesso no sistema, Sr. Roberto! A trava de segurança foi suspensa e a sua transferência de R$ 85.000,00 já foi processada. Agradeço imensamente sua colaboração para manter sua conta segura e em plena conformidade.",
            "score": 5,
            "next": "end",
            "justification": "Melhor escolha – Encerramento com chave de ouro: confirmação explícita da resolução, agradecimento e reforço da parceria e segurança."
          },
          "B": {
            "text": "Pronto, Sr. Roberto, o sistema liberou a transferência e o comprovante já está disponível no seu app. Tenha um bom negócio com o veículo!",
            "score": 3,
            "next": "end",
            "justification": "Boa escolha – Cordial e resolutiva, atende ao objetivo central do cliente."
          },
          "C": {
            "text": "Foi liberado. Da próxima vez, não espere 24 meses para atualizar o cadastro para evitar todo esse transtorno.",
            "score": 1,
            "next": "end",
            "justification": "Escolha subótima – Crítica desnecessária após o problema já ter sido superado, prejudicando o clima final do atendimento."
          },
          "D": {
            "text": "Liberou sim. Se demorar para cair no destinatário, não é mais comigo, é com a compensação central.",
            "score": 0,
            "next": "end",
            "justification": "Escolha incorreta – Descaso e descompromisso com a experiência final do cliente."
          }
        }
      }
    },
    "quiz": [
      {
        "id": 1,
        "title": "Fixação Regulatória: Prevenção à Lavagem de Dinheiro (PLDFT)",
        "question": "De acordo com a regulamentação do Banco Central (Circular 3.978/BACEN e CVM 50) e os princípios de Conheça seu Cliente (KYC), qual é a razão primordial para o bloqueio preventivo de operações expressivas em contas com cadastro desatualizado?",
        "options": {
          "A": "Garantir que a movimentação seja compatível com a capacidade econômico-financeira declarada do titular, prevenindo a utilização do sistema financeiro para fraudes ou lavagem de recursos.",
          "B": "Apenas forçar o comparecimento físico do correntista à agência para ofertar novos pacotes de tarifas bancárias.",
          "C": "Permitir que a agência retenha a liquidez do cliente até o encerramento do expediente bancário.",
          "D": "Cancelar automaticamente transferências acima de R$ 50.000,00 para clientes de perfil conservador."
        },
        "correct": "A",
        "justification": "A política de KYC e a abordagem baseada em risco (ABR) exigem que as instituições mantenham os perfis cadastrais e capacidades financeiras atualizados para detectar atipicidades e mitigar o risco de lavagem de dinheiro e financiamento do terrorismo."
      }
    ]
  },

  "043.02.CPA.001": {
    "id": "043.02.CPA.001",
    "certificacao": "CPA",
    "objeto": "3.1.5.5.",
    "dificuldade": "Média",
    "categoria": "Relacionamento com o Cliente",
    "descricao": "O gerente de relacionamento entra em contato com um cliente de perfil conservador, que já possui investimentos (~150k em ações e CDB), para oferecer um fundo educacional para descendentes.",
    "contexto": "Você é Lucas, gerente de relacionamento do Banco Capital. Você identificou que Carlos, um cliente que já possui investimentos, tem um filho pequeno. Seu objetivo é apresentar um fundo educacional como alternativa de planejamento financeiro. Sua abordagem deve ser ética, consultiva e respeitar os protocolos adequados.",
    "cliente": {
      "nome": "Carlos",
      "perfil": "Conservador (~150k em CDB e ações)",
      "situacao": "Possui filho pequeno"
    },
    "steps": {
      "1": {
        "prompt": "Bom dia. Quem é?",
        "options": {
          "A": {
            "text": "Bom dia, Carlos. Aqui é Lucas, seu gerente de relacionamento no Banco Capital. Podemos conversar um instante? Gostaria de apresentar uma oportunidade de planejamento financeiro para sua família.",
            "score": 5,
            "next": "2",
            "justification": "Melhor escolha – abordagem educada, clara e profissional, garantindo abertura para a conversa."
          },
          "B": {
            "text": "Olá, Carlos! Sou Lucas, gerente do Banco Capital. Tenho uma solução interessante para você. Podemos falar?",
            "score": 3,
            "next": "2",
            "justification": "Boa escolha – abordagem direta, mas falta clareza sobre o tema da conversa."
          },
          "C": {
            "text": "Oi, Carlos, sou do Banco Capital. Preciso falar com você sobre um investimento importante.",
            "score": 1,
            "next": "2b",
            "justification": "Escolha subótima – abordagem impessoal e vaga, pode gerar resistência no cliente."
          },
          "D": {
            "text": "Carlos, sou Lucas do Banco Capital. Precisamos conversar sobre algo essencial para o futuro da sua família.",
            "score": 0,
            "next": "2b",
            "justification": "Escolha incorreta – tom alarmista e agressivo, pode afastar o cliente."
          }
        }
      },
      "2": {
        "prompt": "Vou entrar em uma reunião agora, mas tenho dois minutinhos.",
        "options": {
          "A": {
            "text": "Trata-se de um fundo educacional que permite acumular recursos ao longo do tempo, com benefícios fiscais e flexibilidade para que você possa garantir os custos educacionais da sua filha sem comprometer outros investimentos.",
            "score": 5,
            "next": "3",
            "justification": "Melhor escolha – resume os principais diferenciais (benefício fiscal, horizonte e proteção de outros ativos) em formato objetivo."
          },
          "B": {
            "text": "Gostaria de conversar sobre como você pode garantir os custos de ensino da sua filha com um fundo específico para isso.",
            "score": 3,
            "next": "3",
            "justification": "Boa escolha – direta e focada no objetivo, embora menos informativa sobre vantagens tributárias."
          },
          "C": {
            "text": "Estou falando de um investimento que pode ser útil para o futuro da sua filha.",
            "score": 1,
            "next": "3",
            "justification": "Escolha subótima – muito genérica, sem elementos que justifiquem a atenção imediata do cliente."
          },
          "D": {
            "text": "Quero apresentar um produto de investimento que pode ajudar no planejamento da sua família.",
            "score": 0,
            "next": "3",
            "justification": "Escolha incorreta – foca na oferta do produto bancário ao invés da necessidade específica identificada."
          }
        }
      },
      "2b": {
        "prompt": "Não sei se entendi a que se refere, Lucas...",
        "options": {
          "A": {
            "text": "Refiro-me a um fundo educacional que oferece vantagens como isenção fiscal sobre os rendimentos, uma estrutura pensada para crescimento seguro e previsibilidade de resgate alinhada ao calendário educacional da sua filha.",
            "score": 5,
            "next": "3",
            "justification": "Melhor escolha – esclarece a proposta com segurança, demonstrando conhecimento técnico e planejamento estratégico."
          },
          "B": {
            "text": "Refiro-me a uma opção de investimento, alinhada ao seu perfil e situação, que podem lhe ser vantajosas.",
            "score": 3,
            "next": "3",
            "justification": "Boa escolha – postura prudente e alinhada ao perfil, porém ainda um pouco abstrata."
          },
          "C": {
            "text": "É um fundo de investimento para bancar a educação dos seus descendentes. Não oferece liquidez, mas os retornos compensam essa limitação.",
            "score": 1,
            "next": "3",
            "justification": "Escolha subótima – antecipa limitações de liquidez sem antes construir a percepção de valor do produto."
          },
          "D": {
            "text": "É um investimento rentável, feito para esse tipo de situação. A única ressalva é que se precisar do dinheiro rapidamente, terá que pagar penalidades para o resgate antecipado.",
            "score": 0,
            "next": "3",
            "justification": "Escolha incorreta – tom negativo centrado em penalidades, desestimulando a continuidade da conversa."
          }
        }
      },
      "3": {
        "prompt": "Eu agradeço, mas meu dinheiro já está investido.",
        "options": {
          "A": {
            "text": "Entendo, Carlos. O fundo pode complementar sua estratégia atual, trazendo benefícios fiscais e previsibilidade para a educação da sua filha.",
            "score": 5,
            "next": "4",
            "justification": "Melhor escolha – demonstra escuta ativa e posiciona a nova solução como complementar, não concorrente."
          },
          "B": {
            "text": "Acredito que esse fundo pode agregar valor à sua estratégia. Se quiser, posso explicar melhor.",
            "score": 3,
            "next": "4",
            "justification": "Boa escolha – respeitosa e consultiva, abrindo espaço para continuação."
          },
          "C": {
            "text": "Você pode estar perdendo uma boa oportunidade ao não considerar esse fundo.",
            "score": 1,
            "next": "4",
            "justification": "Escolha subótima – apelo por urgência (FOMO) desprovido de embasamento técnico que gera desconfiança."
          },
          "D": {
            "text": "Se seus investimentos são suficientes, talvez não precise desse fundo, mas posso mostrar os detalhes mesmo assim?",
            "score": 0,
            "next": "4",
            "justification": "Escolha incorreta – questiona a relevância do produto e demonstra insegurança profissional."
          }
        }
      },
      "4": {
        "prompt": "Entendi. Olha, eu já guardo uma quantia mensal e invisto em CDBs e ações para garantir o futuro da minha filha. O que esse fundo oferece de diferente em relação à estratégia que já sigo?",
        "options": {
          "A": {
            "text": "O fundo educacional oferece vantagens como isenção fiscal sobre os rendimentos, uma estrutura pensada para crescimento seguro e previsibilidade de resgate alinhada ao calendário educacional da sua filha.",
            "score": 5,
            "next": "5",
            "justification": "Melhor escolha – diferenciação técnica e tributária sólida contra a volatilidade de ações e tributação de CDBs."
          },
          "B": {
            "text": "É um fundo estruturado para longo prazo, que auxilia na formação de patrimônio para despesas educacionais.",
            "score": 3,
            "next": "5",
            "justification": "Boa escolha – resume o objetivo de longo prazo, mas deixa de explorar os ganhos fiscais comparativos."
          },
          "C": {
            "text": "É um tipo de investimento que ajuda a cobrir custos educacionais.",
            "score": 1,
            "next": "5",
            "justification": "Escolha subótima – não responde à dúvida do cliente sobre o diferencial frente à carteira existente."
          },
          "D": {
            "text": "Esse fundo pode ser uma alternativa para ajudar no planejamento financeiro da educação da sua filha, mas não garante diretamente o pagamento da faculdade.",
            "score": 0,
            "next": "5",
            "justification": "Escolha incorreta – resposta defensiva e contraproducente que gera insegurança sobre a utilidade do veículo financeiro."
          }
        }
      },
      "5": {
        "prompt": "Parece uma opção interessante. Quais são as alternativas que o banco oferece para esse tipo de investimento?",
        "options": {
          "A": {
            "text": "Temos diferentes modalidades de fundos educacionais, dependendo do seu perfil e objetivos. Podemos simular um plano ideal para você.",
            "score": 5,
            "next": "6",
            "justification": "Melhor escolha – alinha a oferta ao princípio da adequação (suitability) e propõe simulação consultiva."
          },
          "B": {
            "text": "Nosso banco oferece fundos específicos para esse fim, todos com boa rentabilidade no longo prazo.",
            "score": 3,
            "next": "6",
            "justification": "Boa escolha – transmite segurança institucional, mas promete rentabilidade genérica."
          },
          "C": {
            "text": "Temos algumas opções que podem se encaixar, posso te passar os detalhes se quiser, já considerando o seu perfil.",
            "score": 1,
            "next": "6",
            "justification": "Escolha subótima – linguagem vaga e com pouca proatividade técnica."
          },
          "D": {
            "text": "Temos um fundo muito popular que a maioria dos clientes escolhe, acho que vai lhe cair bem. Vou te mandar assim que terminarmos a conversa.",
            "score": 0,
            "next": "6",
            "justification": "Escolha incorreta – prática de empurrar o 'produto padrão' da instituição sem avaliar o perfil e os objetivos individuais."
          }
        }
      },
      "6": {
        "prompt": "Lucas, essa ideia faz sentido, mas não sei se quero comprometer um valor fixo mensal. Há flexibilidade nisso?",
        "options": {
          "A": {
            "text": "Sim, há opções que permitem contribuições flexíveis, ajustando conforme sua necessidade e planejamento financeiro.",
            "score": 5,
            "next": "7",
            "justification": "Melhor escolha – atende diretamente ao anseio de flexibilidade do cliente com clareza e precisão."
          },
          "B": {
            "text": "Podemos avaliar um plano que se adapte ao seu fluxo financeiro, sem compromissos rígidos.",
            "score": 3,
            "next": "7",
            "justification": "Boa escolha – acolhe a preocupação, porém um pouco menos detalhada sobre as formas de aporte."
          },
          "C": {
            "text": "O ideal é manter contribuições fixas, pois facilita o planejamento.",
            "score": 1,
            "next": "7",
            "justification": "Escolha subótima – insiste na rigidez quando o cliente acabou de manifestar receio com valores fixos."
          },
          "D": {
            "text": "Esse fundo exige contribuições regulares, sem margem para alterações.",
            "score": 0,
            "next": "7",
            "justification": "Escolha incorreta – informação errônea que impõe restrição inexistente e inviabiliza o avanço."
          }
        }
      },
      "7": {
        "prompt": "Legal, Lucas. Parece interessante. Como posso avaliar se esse fundo realmente faz sentido para mim?",
        "options": {
          "A": {
            "text": "Podemos agendar uma conversa com um especialista para avaliar a melhor estratégia para você.",
            "score": 5,
            "next": "8",
            "justification": "Melhor escolha – direcionamento profissional de alto nível, agregando valor com apoio de especialista."
          },
          "B": {
            "text": "Basta atualizarmos seu suitability e podemos iniciar o processo.",
            "score": 3,
            "next": "8",
            "justification": "Boa escolha – cita corretamente o suitability, mas adota tom meramente burocrático."
          },
          "C": {
            "text": "Se quiser, posso iniciar o processo para você agora, garantindo que esteja alinhado ao seu perfil e objetivos.",
            "score": 1,
            "next": "8",
            "justification": "Escolha subótima – precipitação comercial antes da devida reflexão e apresentação dos cenários."
          },
          "D": {
            "text": "Esse fundo é uma ótima oportunidade. Recomendo fechar hoje mesmo.",
            "score": 0,
            "next": "8",
            "justification": "Escolha incorreta – pressão agressiva para fechamento de venda imediata (antiético segundo os códigos ANBIMA)."
          }
        }
      },
      "8": {
        "prompt": "Lucas, gostei da ideia, mas ainda quero pensar mais antes de decidir. Por ora, preciso retomar minha agenda aqui.",
        "options": {
          "A": {
            "text": "Claro, Carlos. Podemos agendar um novo bate-papo para tirar dúvidas e revisar os detalhes quando for conveniente para você.",
            "score": 5,
            "next": "end",
            "justification": "Melhor escolha – Dá espaço para o cliente sem pressioná-lo, mantendo a porta aberta de forma elegante e prestativa."
          },
          "B": {
            "text": "Posso te enviar um material com mais informações para que avalie no seu tempo?",
            "score": 3,
            "next": "end",
            "justification": "Boa escolha – Sugere um próximo passo sem forçar a decisão."
          },
          "C": {
            "text": "Seria interessante decidir logo para não perder essa oportunidade.",
            "score": 1,
            "next": "end",
            "justification": "Escolha subótima – Tenta criar urgência artificial sem necessidade."
          },
          "D": {
            "text": "Se não decidir agora, pode acabar deixando isso de lado.",
            "score": 0,
            "next": "end",
            "justification": "Escolha incorreta – Tenta pressionar e pode afastar o cliente definitivamente."
          }
        }
      }
    },
    "quiz": [
      {
        "id": 1,
        "title": "Questão de múltipla escolha 1",
        "question": "Após a conversa, Carlos não demonstrou interesse imediato na adesão ao fundo educacional, mas se mostrou receptivo às informações e mencionou que avaliaria a proposta no futuro. Diante dessa situação, a melhor ação de Lucas para garantir um bom acompanhamento do cliente sem ser invasivo seria:",
        "options": {
          "A": "Registrar as informações da conversa no CRM do banco, programar um contato futuro e enviar um material explicativo sobre os benefícios do fundo, reforçando os pontos discutidos.",
          "B": "Ligar para Carlos no dia seguinte e insistir que ele aproveite à oportunidade o quanto antes, pois o fundo pode sofrer alterações.",
          "C": "Não entrar mais em contato e aguardar que Carlos procure o banco caso tenha interesse.",
          "D": "Oferecer a Carlos um desconto especial na taxa de administração do fundo para incentivá-lo a tomar uma decisão rápida."
        },
        "correct": "A",
        "justification": "Registrar no CRM e manter contato planejado e respeitoso assegura governança corporativa, respeito ao tempo de tomada de decisão do investidor e manutenção de um relacionamento consultivo sadio."
      },
      {
        "id": 2,
        "title": "Questão de múltipla escolha 2",
        "question": "A opção que melhor descreve as vantagens do fundo educacional em comparação à estratégia atual do cliente é:",
        "options": {
          "A": "Os CDBs e ações permitem acumular recursos ao longo do tempo, mas podem expor o cliente a riscos de mercado e falta de previsibilidade no resgate. O fundo educacional, por outro lado, oferece mais estabilidade e benefícios fiscais, tornando-se uma alternativa complementar interessante.",
          "B": "A estratégia atual do cliente pode ser suficiente, desde que ele acompanhe regularmente os riscos e a liquidez dos investimentos.",
          "C": "O fundo educacional tende a ser mais vantajoso para quem busca segurança e planejamento de longo prazo, enquanto os CDBs e ações podem oferecer maior flexibilidade.",
          "D": "Investimentos individuais como CDBs e ações geralmente oferecem boas oportunidades de crescimento, mas não necessariamente garantem que os recursos estarão disponíveis no momento certo para despesas educacionais."
        },
        "correct": "A",
        "justification": "Fundos com propósito previdenciário/educacional congregam eficiência tributária, gestão de risco parametrizada ao horizonte escolar do beneficiário e disciplina financeira, complementando adequadamente os riscos de mercado de ações e a tributação de curto/médio prazo de CDBs."
      }
    ]
  }
};

// Tornar disponível globalmente
if (typeof window !== "undefined") {
  window.BUILT_IN_CASES = BUILT_IN_CASES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BUILT_IN_CASES };
}
