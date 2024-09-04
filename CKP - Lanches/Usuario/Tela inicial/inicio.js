const imagens = [
  '/Imagens/img1.png',
  '/Imagens/img2.png',
  '/Imagens/img3.png',
]

let index = 0;
const slideshow = document.getElementById('slideshow');
slideshow.src = imagens[index]

function mudaImagem() {
  slideshow.src = imagens[index]
  
  if(index == 2){
    index = 0
  }
  else{
    index += 1;
  }
}

setInterval(mudaImagem, 3000);