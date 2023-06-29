//Variaveis

//medidas da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raioBolinha = diametro / 2;

//velocidade da Bolinha
let xSpdBolinha = 10;
let ySpdBolinha = 10;

//medidas da Minha Raquete
let xRaquete = 5;
let yRaquete = 150;
let widthRaquete = 10;
let heightRaquete = 90;

//colisao Raquete
let colidiu = false

//medidas da Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let widthRaqueteOponente = 10;
let heightRaqueteOponente = 90;

//pontos da partida
let meusPontos = 0;
let pontosOponente = 0;

//dificuldade
let dificuldadeOponente = 0;

//sons jogo
let pontoFeito;
let raquetada;

function preload() {
  pontoFeito = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  fill(255);
  showBolinha();
  moveBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  moveRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
  moveRaqueteOponente(); 
  placarJogo();
  marcaPonto();
  
}


function showBolinha() {
  circle(xBolinha, yBolinha, diametro);  
}

function moveBolinha() {
  xBolinha += xSpdBolinha;
  yBolinha += ySpdBolinha;
}

function verificaColisaoBolinha() {
  if (xBolinha + raioBolinha> width ||
     xBolinha - raioBolinha< 0){
    xSpdBolinha *= -1;
  }
  if (yBolinha + raioBolinha> height ||
     yBolinha - raioBolinha< 0){
    ySpdBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, widthRaquete, heightRaquete);  
}

function moveRaquete(){
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, widthRaquete, heightRaquete, xBolinha, yBolinha, raioBolinha);
  if (colidiu) {
    xSpdBolinha *= -1;
    raquetada.play();  
  }
}

function verificaColisaoRaqueteOponente(x, y) {
  colidiu = collideRectCircle(x, y, widthRaqueteOponente, heightRaqueteOponente, xBolinha, yBolinha, raioBolinha);
  if (colidiu) {
    xSpdBolinha *= -1;
    raquetada.play();  
  }
}

function moveRaqueteOponente() {
  ySpdOponente = yBolinha - yRaqueteOponente - heightRaquete / 2 - 60; {
    yRaqueteOponente += ySpdOponente + dificuldadeOponente
    calcErroOponente()
  }
  
function calcErroOponente() {
  if (pontosOponente >= meusPontos) {
    dificuldadeOponente += 1;
    if (dificuldadeOponente >= 39) {
      dificuldadeOponente = 40;
    }
    else {
      dificuldadeOponente -= 1;
    if (dificuldadeOponente <= 35){
      dificuldadeOponente = 35
    }  
    }
  }
}
  
}

function placarJogo() {
  stroke(0);
  fill(color(240,230,140))
  rect(125, 5, 50, 30, 4);
  rect(425, 5, 50, 30, 4);
  fill(0);  
  textAlign(CENTER);
  textSize(16);
  text(meusPontos, 150 , 25);
  text(pontosOponente, 450, 25); 
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
    pontoFeito.play();
  }
  if (xBolinha < 15 ){
    pontosOponente += 1;
    pontoFeito.play();
  }
}
