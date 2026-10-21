const API_URL = 'https://catalogo-cursos-api.onrender.com/api/cursos';

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

// Carregar cursos ao iniciar
document.addEventListener('DOMContentLoaded', fetchCursos);

// Eventos de Filtro e Busca
searchInput.addEventListener('input', fetchCursos);
categoriaFilter.addEventListener('change', fetchCursos);
modalidadeFilter.addEventListener('change', fetchCursos);
statusFilter.addEventListener('change', fetchCursos);

clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoriaFilter.value = '';
    modalidadeFilter.value = '';
    statusFilter.value = '';
    fetchCursos();
});

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

async function fetchCursos() {
    showState('loading');

    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.append('nome', searchInput.value.trim());
    if (categoriaFilter.value) params.append('categoria', categoriaFilter.value);
    if (modalidadeFilter.value) params.append('modalidade', modalidadeFilter.value);
    if (statusFilter.value) params.append('status', statusFilter.value);

    try {
        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Erro na requisição');

        const cursos = await response.json();
        renderCursos(cursos);
    } catch (err) {
        showState('error');
    }
}

function renderCursos(cursos) {
    coursesGrid.innerHTML = '';
    resultsCount.textContent = `Exibindo ${cursos.length} curso(s)`;

    if (cursos.length === 0) {
        showState('empty');
        return;
    }

    showState('content');

    cursos.forEach(curso => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${curso.imagemUrl}" alt="${curso.nomeCompleto}" class="course-img">
            <div class="course-info">
                <span class="badge ${curso.status.toLowerCase().replace(' ', '-')}">${curso.status}</span>
                <h3>${curso.nomeBreve}</h3>
                <p>${curso.descricao}</p>
                <div class="meta">
                    <span><strong>Categoria:</strong> ${curso.categoria}</span>
                    <span><strong>Carga Horária:</strong> ${curso.cargaHoraria}h</span>
                </div>
                <button onclick="openDetails(${curso.id})" class="details-btn">Ver Detalhes</button>
            </div>
        `;
        coursesGrid.appendChild(card);
    });
}

async function openDetails(id) {
    try {
        let curso;
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (response.ok) curso = await response.json();
        } catch (e) {
            curso = mockCursos.find(c => c.id === id);
        }

        if (!curso) curso = mockCursos.find(c => c.id === id);

        modalBody.innerHTML = `
            <h2>${curso.nomeCompleto}</h2>
            <p><strong>Descrição:</strong> ${curso.descricao}</p>
            <p><strong>Categoria:</strong> ${curso.categoria}</p>
            <p><strong>Modalidade:</strong> ${curso.modalidade}</p>
            <p><strong>Carga Horária:</strong> ${curso.cargaHoraria} horas</p>
            <p><strong>Público-alvo:</strong> ${curso.publicoAlvo}</p>
            <p><strong>Status:</strong> ${curso.status}</p>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    } catch (err) {
        alert('Não foi possível carregar os detalhes do curso.');
    }
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function showState(state) {
    loadingState.style.display = state === 'loading' ? 'block' : 'none';
    errorState.style.display = state === 'error' ? 'block' : 'none';
    emptyState.style.display = state === 'empty' ? 'block' : 'none';
    coursesGrid.style.display = state === 'content' ? 'grid' : 'none';
    if (state !== 'content') resultsCount.textContent = '';
}