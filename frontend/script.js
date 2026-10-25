// URLs das duas APIs
const API_CURSOS_ORIGINAL = 'https://catalogo-cursos-api.onrender.com/api/cursos';

// Alterna automaticamente entre o localhost (para testes) e o Render (quando publicado)
const API_MOODLE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5092/api/Moodle/cursos'
    : 'https://catalogo-cursos-api.onrender.com/api/Moodle/cursos';

const searchInput = document.getElementById('searchInput');
const categoriaFilter = document.getElementById('categoriaFilter');
const modalidadeFilter = document.getElementById('modalidadeFilter');
const statusFilter = document.getElementById('statusFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

const coursesGrid = document.getElementById('coursesGrid');
const resultsCount = document.getElementById('resultsCount');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const emptyState = document.getElementById('emptyState');

const modal = document.getElementById('courseModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalBody = document.getElementById('modalBody');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

document.addEventListener('DOMContentLoaded', fetchCursos);

if (searchInput) searchInput.addEventListener('input', fetchCursos);
if (categoriaFilter) categoriaFilter.addEventListener('change', fetchCursos);
if (modalidadeFilter) modalidadeFilter.addEventListener('change', fetchCursos);
if (statusFilter) statusFilter.addEventListener('change', fetchCursos);

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (categoriaFilter) categoriaFilter.value = '';
        if (modalidadeFilter) modalidadeFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        fetchCursos();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

async function fetchCursos() {
    showState('loading');

    const nomeVal = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const catVal = categoriaFilter ? categoriaFilter.value.toLowerCase() : '';
    const modVal = modalidadeFilter ? modalidadeFilter.value.toLowerCase() : '';
    const statVal = statusFilter ? statusFilter.value.toLowerCase() : '';

    let listaCursosTotal = [];

    // 1. Tenta buscar os cursos da API original
    try {
        const responseOriginal = await fetch(API_CURSOS_ORIGINAL);
        if (responseOriginal.ok) {
            const cursosOriginais = await responseOriginal.json();
            listaCursosTotal = listaCursosTotal.concat(cursosOriginais);
        }
    } catch (err) {
        console.warn('API original indisponível ou offline.');
    }

    // 2. Tenta buscar os cursos do Moodle através da tua API C#
    try {
        const responseMoodle = await fetch(API_MOODLE);
        if (responseMoodle.ok) {
            const moodleCursos = await responseMoodle.json();
            
            // Formata os dados do Moodle para o mesmo padrão do front-end
            const cursosMoodleFormatados = moodleCursos.map(curso => ({
                id: `moodle-${curso.id}`,
                nomeCompleto: curso.fullname,
                nomeBreve: curso.shortname,
                descricao: curso.summary ? curso.summary.replace(/<[^>]*>?/gm, '') : 'Curso integrado do MoodleCloud.',
                categoria: 'Tecnologia',
                modalidade: 'EAD',
                cargaHoraria: 40,
                publicoAlvo: 'Alunos gerais',
                status: 'Disponível',
                moodleUrl: `https://cted-cursos.moodlecloud.com/course/view.php?id=${curso.id}`
            }));

            listaCursosTotal = listaCursosTotal.concat(cursosMoodleFormatados);
        }
    } catch (err) {
        console.warn('API do Moodle indisponível.');
    }

    // Se nenhuma das duas APIs retornar dados, usa o fallback local (mockCursos)
    if (listaCursosTotal.length === 0 && typeof mockCursos !== 'undefined') {
        listaCursosTotal = mockCursos;
    }

    // Aplica os filtros de pesquisa
    const resultadoFiltrado = listaCursosTotal.filter(c => {
        const matchesNome = !nomeVal || c.nomeCompleto.toLowerCase().includes(nomeVal) || (c.nomeBreve && c.nomeBreve.toLowerCase().includes(nomeVal));
        const matchesCat = !catVal || (c.categoria && c.categoria.toLowerCase() === catVal);
        const matchesMod = !modVal || (c.modalidade && c.modalidade.toLowerCase() === modVal);
        const matchesStat = !statVal || (c.status && c.status.toLowerCase() === statVal);
        return matchesNome && matchesCat && matchesMod && matchesStat;
    });

    renderCursos(resultadoFiltrado);
}

function renderCursos(cursos) {
    if (!coursesGrid) return;
    coursesGrid.innerHTML = '';
    if (resultsCount) resultsCount.textContent = `Exibindo ${cursos.length} curso(s)`;

    if (cursos.length === 0) {
        showState('empty');
        return;
    }

    showState('content');

    const imagensLocais = {
        1: "assets/curso-aspnet.png",
        2: "assets/curso-sql.png",
        3: "assets/curso-scrum.png",
        4: "assets/curso-ux-ui.png",
        5: "assets/curso-seguranca.png",
        6: "assets/curso-lideranca.png"
    };

    cursos.forEach(curso => {
        const card = document.createElement('article');
        card.className = 'course-card';

        // Se for um curso do Moodle, define o link de redirecionamento direto, senão usa a página de detalhes normal
        const linkDetalhes = curso.moodleUrl ? curso.moodleUrl : `curso.html?id=${curso.id}`;
        const textoBotao = curso.moodleUrl ? 'Acessar no Moodle' : 'Ver detalhes do curso';
        const targetAttr = curso.moodleUrl ? 'target="_blank"' : '';

        const imgCaminho = curso.imagemUrl && !curso.imagemUrl.includes('via.placeholder') 
            ? curso.imagemUrl 
            : (imagensLocais[curso.id] || "assets/curso-aspnet.png");

        card.style.backgroundImage = `linear-gradient(180deg, rgba(140, 0, 0, 0.25) 0%, rgba(140, 0, 0, 0.92) 55%, #8c0000 100%), url('${imgCaminho}')`;

        card.innerHTML = `
            <span class="badge-category">${curso.categoria || 'TECNOLOGIA'}</span>
            <div class="course-body">
                <h3>${curso.nomeCompleto}</h3>
                <p>${curso.descricao}</p>
                <a href="${linkDetalhes}" ${targetAttr} class="btn-card-details">${textoBotao}</a>
            </div>
        `;
        coursesGrid.appendChild(card);
    });
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
}

function showState(state) {
    if (loadingState) loadingState.style.display = state === 'loading' ? 'block' : 'none';
    if (errorState) errorState.style.display = state === 'error' ? 'block' : 'none';
    if (emptyState) emptyState.style.display = state === 'empty' ? 'block' : 'none';
    if (coursesGrid) coursesGrid.style.display = state === 'content' ? 'flex' : 'none';
    if (state !== 'content' && resultsCount) resultsCount.textContent = '';
}

// Efeito de scroll do Navbar e menus mobile (mantidos idênticos)
const navbar = document.getElementById('navbar');
const navbarLogo = document.getElementById('navbarLogo');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (navbarLogo) navbarLogo.src = 'assets/logo-sesi-industria-primary.svg';
        } else {
            navbar.classList.remove('scrolled');
            if (navbarLogo) navbarLogo.src = 'assets/logo-sesi-industria-white.svg';
        }
    });
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Controles de cliques nas setas do Carrossel de Cursos
if (prevBtn && nextBtn && coursesGrid) {
    nextBtn.addEventListener('click', () => {
        coursesGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        coursesGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
}