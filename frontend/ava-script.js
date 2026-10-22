const mockCursos = [
    { id: 1, nomeCompleto: "Desenvolvimento Web com ASP.NET Core", imagemUrl: "assets/curso-aspnet.png" },
    { id: 2, nomeCompleto: "Fundamentos de Banco de Dados SQL", imagemUrl: "assets/curso-sql.png" },
    { id: 3, nomeCompleto: "Gestão Ágil de Projetos com Scrum", imagemUrl: "assets/curso-scrum.png" },
    { id: 4, nomeCompleto: "UX/UI Design: Interfaces Centradas no Utilizador", imagemUrl: "assets/curso-ux-ui.png" },
    { id: 5, nomeCompleto: "Segurança da Informação no Ambiente Corporativo", imagemUrl: "assets/curso-seguranca.png" },
    { id: 6, nomeCompleto: "Liderança e Comunicação Assertiva", imagemUrl: "assets/curso-lideranca.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id')) || 1;

    const curso = mockCursos.find(c => c.id === courseId) || mockCursos[0];

    document.getElementById('avaCourseTitle').textContent = curso.nomeCompleto;
    if (curso.imagemUrl) {
        document.getElementById('avaBannerImg').src = curso.imagemUrl;
    }
});