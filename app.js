document.addEventListener('DOMContentLoaded', () => {
    // ================= BANCO DE DADOS SIMULADO =================
    const ARTWORKS = [
        {
            id: 'girl-pearl-earring',
            name: 'Girl with a Pearl Earring',
            artist: 'Johannes Vermeer',
            year: '1665',
            continent: 'europa',
            rarity: 'epica',
            image: 'assets/europe_painting_1.jpg',
            description: 'Uma das obras-primas de Johannes Vermeer, conhecida por seu uso brilhante da luz e pelo olhar enigmático da jovem com o famoso brinco de pérola.',
            unlocked: true
        },
        {
            id: 'loves-shadow',
            name: "Love's Shadow",
            artist: 'Frederick Sandys',
            year: '1867',
            continent: 'europa',
            rarity: 'rara',
            image: 'assets/europe_painting_2.jpg',
            description: 'Uma obra pré-rafaelita marcante de Frederick Sandys, retratando o sentimento intenso de amor e nostalgia através de detalhes expressivos da natureza e expressão.',
            unlocked: true
        },
        {
            id: 'sunflowers',
            name: 'Girassóis',
            artist: 'Vincent Van Gogh',
            year: '1888',
            continent: 'europa',
            rarity: 'comum',
            image: 'assets/van_gogh_sunflowers.webp',
            description: 'Uma das mais icônicas pinturas de natureza-morta do mundo, onde Van Gogh utiliza tons vibrantes de amarelo para evocar sentimentos de calor, amizade e gratidão.',
            unlocked: true
        },
        {
            id: 'starry-night-rhone',
            name: 'Starry Night Over the Rhône',
            artist: 'Vincent Van Gogh',
            year: '1888',
            continent: 'europa',
            rarity: 'epica',
            image: 'assets/vangogh.jpg',
            description: 'Pintada às margens do rio Ródano em Arles, esta obra captura a beleza das luzes artificiais brilhando sobre as águas escuras sob um céu estrelado espetacular.',
            unlocked: false
        },
        {
            id: 'great-wave',
            name: 'A Grande Onda',
            artist: 'Katsushika Hokusai',
            year: '1831',
            continent: 'asia',
            rarity: 'rara',
            image: 'assets/europe_painting_2.jpg',
            description: 'Esta xilogravura é a obra-prima de Hokusai. Ela retrata ondas gigantes ameaçando barcos na baía de Tóquio, com o Monte Fuji ao fundo.',
            unlocked: false
        },
        {
            id: 'cherry-blossom',
            name: 'Cerejeiras em Flor',
            artist: 'Utagawa Hiroshige',
            year: '1850',
            continent: 'asia',
            rarity: 'comum',
            image: 'assets/europe_painting_1.jpg',
            description: 'Uma representação serena da flora japonesa no período Edo, demonstrando a conexão profunda da cultura com os ciclos da natureza.',
            unlocked: false
        },
        {
            id: 'tribal-mask',
            name: 'Máscara Real Kuba',
            artist: 'Artista Kuba Desconhecido',
            year: 'Século XIX',
            continent: 'africa',
            rarity: 'rara',
            image: 'assets/europe_painting_1.jpg',
            description: 'Usadas em cerimônias reais e rituais sagrados, essas máscaras são famosas por seus padrões geométricos e rica mistura de conchas, miçangas e tecidos.',
            unlocked: false
        },
        {
            id: 'aboriginal-dots',
            name: 'Pintura de Pontos',
            artist: 'Artista Aborígene',
            year: 'Tradicional',
            continent: 'oceania',
            rarity: 'comum',
            image: 'assets/europe_painting_2.jpg',
            description: 'A arte dos povos nativos da Austrália conta histórias sagradas de criação e mapeamento do território através de um padrão complexo de pequenos pontos.',
            unlocked: false
        },
        {
            id: 'inca-sun',
            name: 'Disco Solar de Ouro',
            artist: 'Ourives Inca',
            year: '1450',
            continent: 'america',
            rarity: 'epica',
            image: 'assets/van_gogh_sunflowers.webp',
            description: 'Este disco de ouro representava o Inti, o deus do Sol dos Incas, e brilhava intensamente no Templo de Coricancha em Cusco antes da colonização.',
            unlocked: false
        }
    ];

    const ACCESSORIES = [];

    const QUIZ_QUESTIONS = [
        {
            question: "Quem pintou os famosos 'Girassóis' em 1888?",
            image: "assets/van_gogh_sunflowers.webp",
            options: ["Leonardo da Vinci", "Vincent Van Gogh", "Claude Monet", "Tarsila do Amaral"],
            correctIndex: 1
        },
        {
            question: "Qual técnica Vermeer utilizou brilhantemente na obra 'Girl with a Pearl Earring'?",
            image: "assets/europe_painting_1.jpg",
            options: ["Pontilhismo", "Uso brilhante da luz e sombra", "Colagem", "Grafite moderno"],
            correctIndex: 1
        },
        {
            question: "Quem pintou a expressiva obra pré-rafaelita 'Love's Shadow'?",
            image: "assets/europe_painting_2.jpg",
            options: ["Dante Gabriel Rossetti", "Frederick Sandys", "John Everett Millais", "William Morris"],
            correctIndex: 1
        }
    ];

    // ================= ESTADOS DO JOGADOR =================
    let userCoins = 150;
    let equippedAccessories = ['item-acc-glasses']; // Óculos iniciais equipados
    let currentQuizIndex = 0;
    let quizTimerInterval = null;
    let quizTimeLeft = 30;

    // ================= SELETORES GERAIS DO APP =================
    const views = document.querySelectorAll('.view');
    const navItems = document.querySelectorAll('.bottom-nav-item');

    // Botões e Containers
    const btnOnboardingStart = document.getElementById('btn-onboarding-start');
    const bannerDailyCard = document.getElementById('banner-daily-card');
    const btnDailyArtBack = document.getElementById('btn-daily-art-back');
    const btnDailyArtCollect = document.getElementById('btn-daily-art-collect');
    const btnContinentBack = document.getElementById('btn-continent-back');
    const btnMissionContinue = document.getElementById('btn-mission-continue');

    // Drawer do Continente
    const continentIslands = document.querySelectorAll('.continent-island');
    const drawerOverlay = document.getElementById('continent-drawer-overlay');
    const drawerClose = document.getElementById('btn-drawer-close');
    const drawerExplore = document.getElementById('btn-drawer-explore');
    const drawerTitle = document.getElementById('drawer-continent-name');
    const drawerProgressCircle = document.getElementById('drawer-progress-circle');
    const drawerProgressText = document.getElementById('drawer-progress-text');
    const drawerLockedCount = document.getElementById('drawer-locked-count');
    const drawerLockedGrid = document.getElementById('drawer-locked-grid');

    let activeContinent = 'europa';

    // ================= ROTAS E NAVEGAÇÃO =================
    function showView(viewId) {
        views.forEach(view => {
            if (view.id === viewId) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Atualiza estado ativo da barra inferior
        navItems.forEach(item => {
            if (item.getAttribute('data-view') === viewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Trigger de lógicas específicas de cada view
        if (viewId === 'view-collection') {
            renderCollectionGrid();
        } else if (viewId === 'view-quiz') {
            startQuizFlow();
        }
    }

    // CLIQUES NA BARRA INFERIOR
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.getAttribute('data-view');
            showView(viewId);
        });
    });

    // BOTOES DE TRANSIÇÃO SIMPLES
    const btnInicioStart = document.getElementById('btn-inicio-start');
    if (btnInicioStart) {
        btnInicioStart.addEventListener('click', () => showView('view-onboarding'));
    }
    if (btnOnboardingStart) {
        btnOnboardingStart.addEventListener('click', () => showView('view-home'));
    }
    if (bannerDailyCard) {
        bannerDailyCard.addEventListener('click', () => showView('view-daily-art'));
    }
    if (btnDailyArtBack) {
        btnDailyArtBack.addEventListener('click', () => showView('view-home'));
    }
    if (btnDailyArtCollect) {
        btnDailyArtCollect.addEventListener('click', () => showView('view-mission-complete'));
    }
    if (btnMissionContinue) {
        btnMissionContinue.addEventListener('click', () => showView('view-home'));
    }
    if (btnContinentBack) {
        btnContinentBack.addEventListener('click', () => showView('view-home'));
    }

    // ================= INTERAÇÃO COM MAPA E DRAWER =================
    continentIslands.forEach(island => {
        island.addEventListener('click', () => {
            const continentId = island.id.replace('island-', '');
            activeContinent = continentId;

            const names = {
                'america': 'América',
                'europa': 'Europa',
                'asia': 'Ásia',
                'africa': 'África',
                'oceania': 'Oceania'
            };

            if (drawerTitle) drawerTitle.textContent = names[continentId] || continentId;

            // Calcula progresso do continente
            const continentArts = ARTWORKS.filter(art => art.continent === continentId);
            const total = continentArts.length;
            const unlocked = continentArts.filter(art => art.unlocked).length;
            const locked = total - unlocked;

            // Atualiza o progresso visual no círculo e textos do drawer
            if (drawerProgressCircle) {
                const percentage = total > 0 ? (unlocked / total) * 100 : 0;
                // stroke-dashoffset original é 60 (vazio) e 0 (cheio)
                const offset = 100 - percentage;
                drawerProgressCircle.style.strokeDashoffset = offset;
            }

            if (drawerProgressText) {
                drawerProgressText.textContent = `${unlocked} / ${total} desbloqueadas`;
            }

            if (drawerLockedCount) {
                drawerLockedCount.textContent = locked;
            }

            // Popula os mini blocos cinzas trancados
            if (drawerLockedGrid) {
                drawerLockedGrid.innerHTML = '';
                for (let i = 0; i < locked; i++) {
                    const block = document.createElement('div');
                    block.className = 'mini-locked-item';
                    block.textContent = '?';
                    drawerLockedGrid.appendChild(block);
                }
            }

            if (drawerOverlay) drawerOverlay.classList.add('active');
        });
    });

    if (drawerClose) {
        drawerClose.addEventListener('click', () => {
            if (drawerOverlay) drawerOverlay.classList.remove('active');
        });
    }

    if (drawerExplore) {
        drawerExplore.addEventListener('click', () => {
            if (drawerOverlay) drawerOverlay.classList.remove('active');

            const detailName = document.getElementById('continent-detail-name');
            const detailHeader = document.getElementById('continent-detail-header');

            if (detailName) {
                const names = {
                    'america': 'AMÉRICA',
                    'europa': 'EUROPA',
                    'asia': 'ÁSIA',
                    'africa': 'ÁFRICA',
                    'oceania': 'OCEANIA'
                };
                detailName.textContent = names[activeContinent] || activeContinent;
            }

            if (detailHeader) {
                detailHeader.className = 'continent-detail-header';
                const colors = {
                    'america': 'pink',
                    'europa': 'blue',
                    'asia': 'green',
                    'africa': 'yellow',
                    'oceania': 'pink'
                };
                detailHeader.classList.add(colors[activeContinent] || 'pink');
            }

            renderContinentArtworks();
            showView('view-continent-detail');
        });
    }

    // ================= RENDERIZAR QUADROS DO CONTINENTE =================
    function renderContinentArtworks() {
        const container = document.getElementById('continent-detail-artworks');
        if (!container) return;

        container.innerHTML = '';
        const arts = ARTWORKS.filter(art => art.continent === activeContinent);

        arts.forEach(art => {
            const card = document.createElement('div');
            card.className = `continent-artwork-card ${art.unlocked ? '' : 'locked'}`;

            card.innerHTML = `
                <div class="continent-artwork-thumb">
                    ${art.unlocked
                    ? `<img src="${art.image}" alt="${art.name}">`
                    : `<div class="gallery-locked-icon">🔒</div>`}
                </div>
                <div class="continent-artwork-info">
                    <span class="continent-artwork-name">${art.unlocked ? art.name : 'Bloqueado'}</span>
                    <span class="continent-artwork-meta">${art.unlocked ? art.artist : 'Descubra jogando'}</span>
                </div>
            `;

            if (art.unlocked) {
                card.addEventListener('click', () => openGalleryDetailModal(art));
            }
            container.appendChild(card);
        });
    }

    // ================= GALERIA / COLEÇÃO INTERATIVA =================
    let filterContinent = 'all';
    let filterRarity = 'all';
    let currentCollectionPage = 1;
    const cardsPerPage = 4;

    function renderCollectionGrid() {
        const grid = document.getElementById('collection-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = ARTWORKS.filter(art => {
            const matchContinent = filterContinent === 'all' || art.continent === filterContinent;
            const matchRarity = filterRarity === 'all' || art.rarity === filterRarity;
            return matchContinent && matchRarity;
        });

        const totalPages = Math.ceil(filtered.length / cardsPerPage);
        
        // Adjust current page if out of range
        if (currentCollectionPage > totalPages) {
            currentCollectionPage = Math.max(1, totalPages);
        }

        // Empty state check
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-collection" style="grid-column: span 2; width: 100%;">
                    <span>🎨</span>
                    <p>Nenhuma obra encontrada nesta categoria.</p>
                </div>
            `;
            updatePaginationControls(0, 0);
            return;
        }

        // Get current page items
        const startIndex = (currentCollectionPage - 1) * cardsPerPage;
        const pageItems = filtered.slice(startIndex, startIndex + cardsPerPage);

        pageItems.forEach(art => {
            const item = document.createElement('div');
            item.className = `gallery-card ${art.unlocked ? '' : 'locked'}`;

            item.innerHTML = `
                <div class="gallery-card-image">
                    ${art.unlocked
                        ? `<img src="${art.image}" alt="${art.name}">`
                        : `<div class="gallery-locked-icon">🔒</div>`}
                </div>
                <div class="gallery-card-footer">
                    <div class="gallery-card-title">${art.unlocked ? art.name : 'Bloqueada'}</div>
                    <div class="gallery-card-artist">${art.unlocked ? art.artist : '???'}</div>
                    ${art.unlocked ? `<span class="gallery-card-rarity">${art.rarity === 'epica' ? '★★★ Épica' : art.rarity === 'rara' ? '★★ Rara' : '★ Comum'}</span>` : ''}
                </div>
            `;

            if (art.unlocked) {
                item.addEventListener('click', () => openGalleryDetailModal(art));
            }
            grid.appendChild(item);
        });

        updatePaginationControls(currentCollectionPage, totalPages);
    }

    function updatePaginationControls(currentPage, totalPages) {
        const prevBtn = document.getElementById('pagination-prev');
        const nextBtn = document.getElementById('pagination-next');
        const infoSpan = document.getElementById('pagination-info');
        const dotsContainer = document.getElementById('pagination-dots-container');
        const paginationWrapper = document.getElementById('collection-pagination');

        if (!paginationWrapper) return;

        if (totalPages <= 1) {
            paginationWrapper.style.opacity = '0.5';
            paginationWrapper.style.pointerEvents = 'none';
        } else {
            paginationWrapper.style.opacity = '1';
            paginationWrapper.style.pointerEvents = 'auto';
        }

        if (infoSpan) {
            infoSpan.textContent = totalPages > 0 ? `${currentPage} / ${totalPages}` : '0 / 0';
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = `pagination-dot ${i === currentPage ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    currentCollectionPage = i;
                    renderCollectionGrid();
                });
                dotsContainer.appendChild(dot);
            }
        }
    }

    // Setup pagination event listeners once
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentCollectionPage > 1) {
                currentCollectionPage--;
                renderCollectionGrid();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const filteredCount = ARTWORKS.filter(art => {
                const matchContinent = filterContinent === 'all' || art.continent === filterContinent;
                const matchRarity = filterRarity === 'all' || art.rarity === filterRarity;
                return matchContinent && matchRarity;
            }).length;
            const totalPages = Math.ceil(filteredCount / cardsPerPage);

            if (currentCollectionPage < totalPages) {
                currentCollectionPage++;
                renderCollectionGrid();
            }
        });
    }

    // Filtros de Continente na Coleção
    const tabButtons = document.querySelectorAll('#collection-continent-tabs .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterContinent = btn.getAttribute('data-continent');
            currentCollectionPage = 1;
            renderCollectionGrid();
        });
    });

    // Filtros de Raridade na Coleção
    const rarityButtons = document.querySelectorAll('.rarity-filters .rarity-btn');
    rarityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            rarityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterRarity = btn.getAttribute('data-rarity');
            currentCollectionPage = 1;
            renderCollectionGrid();
        });
    });

    // Modal de Detalhe da Obra de Arte
    const detailModal = document.getElementById('gallery-detail-modal');
    const btnDetailClose = document.getElementById('btn-detail-close');
    const btnDetailHighlight = document.getElementById('btn-detail-highlight');

    function openGalleryDetailModal(art) {
        if (!detailModal) return;

        document.getElementById('detail-modal-title').textContent = art.name;
        document.getElementById('detail-modal-img').src = art.image;
        document.getElementById('detail-modal-author').textContent = `${art.artist} (${art.year})`;
        document.getElementById('detail-modal-desc').textContent = art.description;

        detailModal.classList.add('active');
    }

    if (btnDetailClose) {
        btnDetailClose.addEventListener('click', () => {
            if (detailModal) detailModal.classList.remove('active');
        });
    }

    if (btnDetailHighlight) {
        btnDetailHighlight.addEventListener('click', () => {
            alert('Esta obra foi colocada em destaque no seu perfil de Artista!');
            if (detailModal) detailModal.classList.remove('active');
        });
    }

    // ================= QUIZ DIÁRIO INTERATIVO =================
    const quizQuestionCounter = document.getElementById('quiz-question-counter');
    const quizTimerVal = document.getElementById('quiz-timer-countdown');
    const quizImage = document.getElementById('quiz-question-image');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsContainer = document.getElementById('quiz-options-container');
    const btnQuizNext = document.getElementById('btn-quiz-next');

    function startQuizFlow() {
        currentQuizIndex = 0;
        loadQuizQuestion();
    }

    function loadQuizQuestion() {
        if (quizTimerInterval) clearInterval(quizTimerInterval);
        if (btnQuizNext) btnQuizNext.style.display = 'none';

        const q = QUIZ_QUESTIONS[currentQuizIndex];
        if (!q) {
            // Fim do Quiz
            showView('view-mission-complete');
            return;
        }

        if (quizQuestionCounter) {
            quizQuestionCounter.textContent = `Pergunta ${currentQuizIndex + 1}/${QUIZ_QUESTIONS.length}`;
        }

        if (quizImage) quizImage.src = q.image;
        if (quizQuestionText) quizQuestionText.textContent = q.question;

        // Limpa e popula opções
        if (quizOptionsContainer) {
            quizOptionsContainer.innerHTML = '';
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option-card';
                btn.textContent = opt;
                btn.addEventListener('click', () => selectQuizOption(btn, idx, q.correctIndex));
                quizOptionsContainer.appendChild(btn);
            });
        }

        // Timer
        quizTimeLeft = 30;
        if (quizTimerVal) quizTimerVal.textContent = `00:${String(quizTimeLeft).padStart(2, '0')}`;

        quizTimerInterval = setInterval(() => {
            quizTimeLeft--;
            if (quizTimerVal) quizTimerVal.textContent = `00:${String(quizTimeLeft).padStart(2, '0')}`;
            if (quizTimeLeft <= 0) {
                clearInterval(quizTimerInterval);
                revealCorrectQuizAnswers();
            }
        }, 1000);
    }

    function selectQuizOption(element, selectedIndex, correctIndex) {
        clearInterval(quizTimerInterval);

        const optionCards = quizOptionsContainer.querySelectorAll('.quiz-option-card');
        optionCards.forEach(card => card.style.pointerEvents = 'none');

        if (selectedIndex === correctIndex) {
            element.classList.add('correct');
            userCoins += 10;
        } else {
            element.classList.add('wrong');
            // Revela a correta
            optionCards[correctIndex].classList.add('correct');
        }

        if (btnQuizNext) btnQuizNext.style.display = 'block';
    }

    function revealCorrectQuizAnswers() {
        const q = QUIZ_QUESTIONS[currentQuizIndex];
        const optionCards = quizOptionsContainer.querySelectorAll('.quiz-option-card');
        optionCards.forEach((card, idx) => {
            card.style.pointerEvents = 'none';
            if (idx === q.correctIndex) {
                card.classList.add('correct');
            }
        });
        if (btnQuizNext) btnQuizNext.style.display = 'block';
    }

    if (btnQuizNext) {
        btnQuizNext.addEventListener('click', () => {
            currentQuizIndex++;
            loadQuizQuestion();
        });
    }



    // ================= ATUALIZAÇÃO DO RELÓGIO DA BARRA DE STATUS =================
    const timeDisplay = document.getElementById('simulated-time');
    if (timeDisplay) {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeDisplay.textContent = `${hours}:${minutes}`;
        };
        updateClock();
        setInterval(updateClock, 60000);
    }
});
