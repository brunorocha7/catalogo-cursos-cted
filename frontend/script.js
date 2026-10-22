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

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Dados fictícios de Fallback caso a API esteja offline/hibernando
const mockCursos = [
    {
        id: 1,
        nomeCompleto: "Desenvolvimento Web com ASP.NET Core",
        nomeBreve: "Dev Web ASP.NET",
        descricao: "Aprenda a criar APIs RESTful modernas e escaláveis com C# e .NET.",
        categoria: "Tecnologia",
        modalidade: "EAD",
        cargaHoraria: 60,
        publicoAlvo: "Estudantes e desenvolvedores iniciantes",
        status: "Disponível",
        imagemUrl: "assets/curso-aspnet.png"
    },
    {
        id: 2,
        nomeCompleto: "Fundamentos de Banco de Dados SQL",
        nomeBreve: "Banco de Dados SQL",
        descricao: "Conceitos fundamentais de modelagem, criação de tabelas e consultas SQL.",
        categoria: "Tecnologia",
        modalidade: "Presencial",
        cargaHoraria: 40,
        publicoAlvo: "Profissionais de TI e entusiastas",
        status: "Disponível",
        imagemUrl: "assets/curso-sql.png"
    },
    {
        id: 3,
        nomeCompleto: "Gestão Ágil de Projetos com Scrum",
        nomeBreve: "Scrum e Gestão Ágil",
        descricao: "Domine o framework Scrum e otimize a entrega de produtos da sua equipa.",
        categoria: "Gestão",
        modalidade: "EAD",
        cargaHoraria: 30,
        publicoAlvo: "Gestores, líderes de equipa e Scrum Masters",
        status: "Em Breve",
        imagemUrl: "assets/curso-scrum.png"
    },
    {
        id: 4,
        nomeCompleto: "UX/UI Design: Interfaces Centradas no Utilizador",
        nomeBreve: "UX/UI Design",
        descricao: "Princípios de experiência do utilizador, prototipagem no Figma e usabilidade.",
        categoria: "Design",
        modalidade: "EAD",
        cargaHoraria: 50,
        publicoAlvo: "Designers e front-end developers",
        status: "Disponível",
        imagemUrl: "assets/curso-ux-ui.png"
    },
    {
        id: 5,
        nomeCompleto: "Segurança da Informação no Ambiente Corporativo",
        nomeBreve: "Segurança da Informação",
        descricao: "Boas práticas de segurança, conformidade e proteção contra ameaças digitais.",
        categoria: "Tecnologia",
        modalidade: "Presencial",
        cargaHoraria: 20,
        publicoAlvo: "Colaboradores e equipas administrativas",
        status: "Encerrado",
        imagemUrl: "assets/curso-seguranca.png"
    },
    {
        id: 6,
        nomeCompleto: "Liderança e Comunicação Assertiva",
        nomeBreve: "Liderança Assertiva",
        descricao: "Desenvolva inteligência emocional, escuta ativa e técnicas de feedback.",
        categoria: "Gestão",
        modalidade: "Presencial",
        cargaHoraria: 16,
        publicoAlvo: "Líderes de equipa e gestores",
        status: "Em Breve",
        imagemUrl: "assets/curso-lideranca.png"
    }
];

document.addEventListener('DOMContentLoaded', fetchCursos);

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

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

async function fetchCursos() {
    showState('loading');

    const nomeVal = searchInput.value.trim().toLowerCase();
    const catVal = categoriaFilter.value.toLowerCase();
    const modVal = modalidadeFilter.value.toLowerCase();
    const statVal = statusFilter.value.toLowerCase();

    try {
        const params = new URLSearchParams();
        if (nomeVal) params.append('nome', searchInput.value.trim());
        if (catVal) params.append('categoria', categoriaFilter.value);
        if (modVal) params.append('modalidade', modalidadeFilter.value);
        if (statVal) params.append('status', statusFilter.value);

        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('API indisponível');

        const cursos = await response.json();
        renderCursos(cursos);
    } catch (err) {
        let resultado = mockCursos.filter(c => {
            const matchesNome = !nomeVal || c.nomeCompleto.toLowerCase().includes(nomeVal) || c.nomeBreve.toLowerCase().includes(nomeVal);
            const matchesCat = !catVal || c.categoria.toLowerCase() === catVal;
            const matchesMod = !modVal || c.modalidade.toLowerCase() === modVal;
            const matchesStat = !statVal || c.status.toLowerCase() === statVal;
            return matchesNome && matchesCat && matchesMod && matchesStat;
        });

        renderCursos(resultado);
    }
}

// Substitua a função renderCursos no script.js
function renderCursos(cursos) {
    coursesGrid.innerHTML = '';
    resultsCount.textContent = `Exibindo ${cursos.length} curso(s)`;

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
        
        const imgCaminho = curso.imagemUrl && !curso.imagemUrl.includes('via.placeholder') 
            ? curso.imagemUrl 
            : (imagensLocais[curso.id] || "assets/curso-aspnet.png");

        card.style.backgroundImage = `linear-gradient(180deg, rgba(140, 0, 0, 0.25) 0%, rgba(140, 0, 0, 0.92) 55%, #8c0000 100%), url('${imgCaminho}')`;

        card.innerHTML = `
            <span class="badge-category">${curso.categoria || 'TECNOLOGIA'}</span>
            <div class="course-body">
                <h3>${curso.nomeCompleto}</h3>
                <p>${curso.descricao}</p>
                <a href="curso.html?id=${curso.id}" class="btn-card-details">Ver detalhes do curso</a>
            </div>
        `;
        coursesGrid.appendChild(card);
    });
}

window.openDetails = async function(id) {
    let curso;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            curso = await response.json();
        }
    } catch (e) {
        // Fallback
    }

    if (!curso) {
        curso = mockCursos.find(c => c.id === id);
    }

    if (!curso) {
        alert('Curso não encontrado.');
        return;
    }

    modalBody.innerHTML = `
        <h2>${curso.nomeCompleto}</h2>
        <p><strong>Descrição:</strong> ${curso.descricao}</p>
        <p><strong>Categoria:</strong> ${curso.categoria}</p>
        <p><strong>Modalidade:</strong> ${curso.modalidade}</p>
        <p><strong>Carga Horária:</strong> ${curso.cargaHoraria} horas</p>
        <p><strong>Público-alvo:</strong> ${curso.publicoAlvo}</p>
        <p><strong>Status:</strong> ${curso.status}</p>
    `;
    
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
};

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function showState(state) {
    loadingState.style.display = state === 'loading' ? 'block' : 'none';
    errorState.style.display = state === 'error' ? 'block' : 'none';
    emptyState.style.display = state === 'empty' ? 'block' : 'none';
    coursesGrid.style.display = state === 'content' ? 'flex' : 'none';
    if (state !== 'content') resultsCount.textContent = '';
}

// Efeito de troca do Header no Scroll
const navbar = document.getElementById('navbar');
const navbarLogo = document.getElementById('navbarLogo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        if (navbarLogo) navbarLogo.src = 'assets/logo-sesi-industria-primary.svg';
    } else {
        navbar.classList.remove('scrolled');
        if (navbarLogo) navbarLogo.src = 'assets/logo-sesi-industria-white.svg';
    }
});

// Controle de cliques nas setas do Carrossel de Cursos
if (prevBtn && nextBtn && coursesGrid) {
    nextBtn.addEventListener('click', () => {
        coursesGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        coursesGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

// Controle de cliques nas setas do Carrossel de Depoimentos
const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
const testimonialNextBtn = document.getElementById('testimonialNextBtn');

if (testimonialPrevBtn && testimonialNextBtn && testimonialsCarousel) {
    testimonialNextBtn.addEventListener('click', () => {
        testimonialsCarousel.scrollBy({ left: 280, behavior: 'smooth' });
    });

    testimonialPrevBtn.addEventListener('click', () => {
        testimonialsCarousel.scrollBy({ left: -280, behavior: 'smooth' });
    });
}