// manu hamburguer
const hamburguer = document.querySelector(".hamburguer");
const navList = document.querySelector(".nav-list");

hamburguer.addEventListener("click", () => {
  navList.classList.toggle("ativo");
  hamburguer.classList.toggle("ativo");
});

// carrossel
class Carrossel {
  constructor() {
    this.slidesContainer = document.querySelector('.carrossel-slides');
    this.images = [
      'img/Produtos-Esmalteria.jfif',
      'img/imagem carrossel1.jpeg', 
      'img/imagem carrossel2.jpeg',
      'img/imagem carrossel3.jpeg',
      'img/imagem carrossel4.jpeg'
    ];
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 segundos entre cada transição
    
    this.init();
  }
  
  init() {
    this.render();
    this.addEvents();
    this.startAutoPlay();
  }
  
  render() {
    this.slidesContainer.innerHTML = '';
    
    this.images.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Foto ${index + 1}`;
      img.style.display = 'none';
      this.slidesContainer.appendChild(img);
    });
    
    this.updateVisibleSlides();
  }
  
  updateVisibleSlides() {
    const allImages = this.slidesContainer.querySelectorAll('img');
    allImages.forEach(img => {
      img.style.display = 'none';
      img.classList.remove('active', 'left', 'right', 'entering', 'exiting');
    });
    
    const prevIndex = this.getPrevIndex();
    const nextIndex = this.getNextIndex();
    
    // coloca animação de entrada
    const leftImg = allImages[prevIndex];
    leftImg.style.display = 'block';
    leftImg.classList.add('left', 'entering');
    
    const centerImg = allImages[this.currentIndex];
    centerImg.style.display = 'block';
    centerImg.classList.add('active', 'entering');
    
    const rightImg = allImages[nextIndex];
    rightImg.style.display = 'block';
    rightImg.classList.add('right', 'entering');
    
    // tira a classe de [entering] após a animação, para evitar bugs, repetições ou conflito com futuras animações.
    setTimeout(() => {
      leftImg.classList.remove('entering');
      centerImg.classList.remove('entering');
      rightImg.classList.remove('entering');
    }, 600);
  }
  
  addEvents() {
    // Botão anterior
    document.querySelector('.carrossel-btn.anterior').addEventListener('click', () => {
      this.currentIndex = this.getPrevIndex();
      this.updateVisibleSlides();
      this.resetAutoPlay(); // Reinicia o auto-play quando o usuário interage
    });
    
    // Botão próximo
    document.querySelector('.carrossel-btn.proximo').addEventListener('click', () => {
      this.currentIndex = this.getNextIndex();
      this.updateVisibleSlides();
      this.resetAutoPlay(); // Reinicia o auto-play quando o usuário interage
    });
    
    // para o auto play quando o mouse esta em cima do carrossel
    this.slidesContainer.addEventListener('mouseenter', () => {
      this.pauseAutoPlay();
    });
    
    // volta o autoaplay quando o mouse sai do carrossel
    this.slidesContainer.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });
  }
  
  getPrevIndex() {
    return (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  
  getNextIndex() {
    return (this.currentIndex + 1) % this.images.length;
  }
  
  // Métodos para o auto-play

  // inicia o auto play, o carrossel troca os slides sozinho
  startAutoPlay() {
    if (this.autoPlayInterval) return; // rodando
    
    this.autoPlayInterval = setInterval(() => {
      this.currentIndex = this.getNextIndex();
      this.updateVisibleSlides();
    }, this.autoPlayDelay);
  }

  // pausa o auto play
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // auto play volta rodar
  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => new Carrossel());
// DOM = Document Object Model, é basicamente a estrutura completa de todos os elementos HTML da página, que o navegador cria internamente pra que o JavaScript consiga manipular as coisas (tipo pegar um botão, mudar textos, fazer animações, etc).
