let width = $(window).width()
let height = $(window).height()

function setup() {
  // 화면 크기에 맞게 캔버스 생성
  createCanvas(width, height);
  background(255);
  // background('rgba(255, 255, 255, 0)');

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
    // background('rgba(255, 255, 255, 0)');
  });
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (!$('body').hasClass('start') && mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}