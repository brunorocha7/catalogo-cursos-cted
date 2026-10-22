const API_URL = 'https://catalogo-cursos-api.onrender.com/api/cursos';

const mockCursos = [
    {
        id: 1,
        nomeCompleto: "Desenvolvimento Web com ASP.NET Core",
        descricao: "Aprenda a criar APIs RESTful modernas e escaláveis com C# e .NET.",
        categoria: "Tecnologia",
        modalidade: "EAD",
        cargaHoraria: 60,
        status: "Disponível",
        imagemUrl: "assets/curso-aspnet.png"
    },
    {
        id: 2,
        nomeCompleto: "Fundamentos de Banco de Dados SQL",
        descricao: "Conceitos fundamentais de modelagem, criação de tabelas e consultas SQL.",
        categoria: "Tecnologia",
        modalidade: "Presencial",
        cargaHoraria: 40,
        status: "Disponível",
        imagemUrl: "assets/curso-sql.png"
    },
    {
        id: 3,
        nomeCompleto: "Gestão Ágil de Projetos com Scrum",
        descricao: "Domine o framework Scrum e otimize a entrega de produtos da sua equipa.",
        categoria: "Gestão",
        modalidade: "EAD",
        cargaHoraria: 30,
        status: "Em Breve",
        imagemUrl: "assets/curso-scrum.png"
    },
    {
        id: 4,
        nomeCompleto: "UX/UI Design: Interfaces Centradas no Utilizador",
        descricao: "Princípios de experiência do utilizador, prototipagem no Figma e usabilidade.",
        categoria: "Design",
        modalidade: "EAD",
        cargaHoraria: 50,
        status: "Disponível",
        imagemUrl: "assets/curso-ux-ui.png"
    },
    {
        id: 5,
        nomeCompleto: "Segurança da Informação no Ambiente Corporativo",
        descricao: "Boas práticas de segurança, conformidade e proteção contra ameaças digitais.",
        categoria: "Tecnologia",
        modalidade: "Presencial",
        cargaHoraria: 20,
        status: "Encerrado",
        imagemUrl: "assets/curso-seguranca.png"
    },
    {
        id: 6,
        nomeCompleto: "Liderança e Comunicação Assertiva",
        descricao: "Desenvolva inteligência emocional, escuta ativa e técnicas de feedback.",
        categoria: "Gestão",
        modalidade: "Presencial",
        cargaHoraria: 16,
        status: "Em Breve",
        imagemUrl: "assets/curso-lideranca.png"
    }
];

document.addEventListener('DOMContentLoaded', loadCourseDetail);

async function loadCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id')) || 1;

    let curso;
    try {
        const res = await fetch(`${API_URL}/${courseId}`);
        if (res.ok) curso = await res.json();
    } catch (e) {
        // Fallback local
    }

    if (!curso) {
        curso = mockCursos.find(c => c.id === courseId) || mockCursos[0];
    }

    // Preenche a página dinamicamente
    document.getElementById('courseCategoryBadge').textContent = (curso.categoria || 'TECNOLOGIA').toUpperCase();
    document.getElementById('courseTitle').textContent = curso.nomeCompleto;
    document.getElementById('courseAboutDescription').textContent = `${curso.descricao} Este programa foi cuidadosamente elaborado para capacitar profissionais e estudantes com foco no mercado industrial.`;
    document.getElementById('floatingCourseName').textContent = curso.nomeCompleto;

    if (curso.imagemUrl) {
        document.getElementById('courseMediaThumb').src = curso.imagemUrl;
    }
}

// Controle do Accordion (Módulos / Dúvidas)
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// Controle do Carrossel de Depoimentos da página do curso
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

const courseId = new URLSearchParams(window.location.search).get('id') || 1;
document.getElementById('enrollBtn').href = `ava.html?id=${courseId}`;
document.getElementById('floatingEnrollBtn').href = `ava.html?id=${courseId}`;