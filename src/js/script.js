// Pegando os elementos HTML que vamos usar
const menuButton = document.getElementById('menu-toggle');        // Botão do menu
const menuList = document.getElementById('menuItems');           // Lista de itens do menu
const menuLinks = menuList.querySelectorAll('a');               // Links do menu
const menu = document.querySelector('.menu');                    // Menu inteiro

// Função para abrir e fechar o menu no celular
function toggleMenu() {
  menuButton.classList.toggle('active');    // Adiciona/remove classe para animar o botão
  menuList.classList.toggle('active');      // Adiciona/remove classe para mostrar o menu
}

// Quando clicar no botão do menu
menuButton.addEventListener('click', (event) => {
  toggleMenu();
  event.stopPropagation();  // Evita que o clique feche o menu imediatamente
});

// Fecha o menu quando clicar em qualquer link
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuList.classList.remove('active');    // Esconde o menu
    menuButton.classList.remove('active');  // Remove animação do botão
  });
});

// Fecha o menu quando clicar fora dele
document.addEventListener('click', (event) => {
  // Se clicou fora do menu e do botão
  if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
    menuList.classList.remove('active');    // Esconde o menu
    menuButton.classList.remove('active');  // Remove animação do botão
  }
});

// Controle do menu durante o scroll da página
let ultimoScroll = 0;                      // Guarda a última posição do scroll
const distanciaParaEsconder = 50;          // Quantidade de pixels para esconder o menu

// Quando a página é rolada
window.addEventListener('scroll', () => {
  const scrollAtual = window.pageYOffset;   // Posição atual do scroll
  
  // Se a página não está no topo
  if (scrollAtual > 0) {
    menu.classList.add('scrolled');         // Adiciona fundo escuro ao menu
    menuList.classList.add('scrolledZeroGap');  // Remove espaços entre itens
  } else {
    menu.classList.remove('scrolled');      // Remove fundo escuro
    menuList.classList.remove('scrolledZeroGap');// Volta espaços entre itens
  }
  
  // Controle para esconder/mostrar menu durante scroll
  if (scrollAtual > distanciaParaEsconder) {
    if (scrollAtual > ultimoScroll) {
      menu.classList.add('hidden');         // Esconde menu quando rola para baixo
    } else {
      menu.classList.remove('hidden');      // Mostra menu quando rola para cima
    }
  } else {
    menu.classList.remove('hidden');        // Sempre mostra menu no topo da página
  }
  
  ultimoScroll = scrollAtual;              // Guarda posição atual para próxima vez
});

// Quando a página carrega
window.addEventListener('load', () => {
  menu.classList.remove('hidden');          // Garante que o menu esteja visível
  if (window.pageYOffset > 0) {            // Se a página não está no topo
    menu.classList.add('scrolled');         // Adiciona fundo escuro ao menu
    menuList.classList.add('scrolledZeroGap');  // Remove espaços entre itens
  }
});

// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();                     // Impede o comportamento padrão do link
    const secao = document.querySelector(this.getAttribute('href')); // Encontra a seção
    if (secao) {
      secao.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a seção
    }
  });
});
