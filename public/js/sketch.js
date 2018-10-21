const len = 784;
const totalData = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let catsData;
let trainsData;
let rainbowsData;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

function preload() {
  // 학습한 데이터 미리 로드
  catsData = loadBytes('data/cats1000.bin');
  trainsData = loadBytes('data/trains1000.bin');
  rainbowsData = loadBytes('data/rainbows1000.bin');
}

function setup() {
  // 그림 그릴 준비
  let width = $(window).width()
  let height = $(window).height()

  createCanvas(width, height);
  background('rgba(255, 255, 255, 0)');

  // 데이터 준비
  prepareData(cats, catsData, CAT);
  prepareData(rainbows, rainbowsData, RAINBOW);
  prepareData(trains, trainsData, TRAIN);

  // 신경망 생성
  nn = new NeuralNetwork(784, 64, 3);

  // 데이터 랜덤화
  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(trains.testing);

  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });


  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    // console.log(guess);
    let m = max(guess);
    let classification = guess.indexOf(m);
    if (classification === CAT) {
      console.log("cat");
    } else if (classification === RAINBOW) {
      console.log("rainbow");
    } else if (classification === TRAIN) {
      console.log("train");
    }

    //image(img, 0, 0);
  });

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
  });
  // for (let i = 1; i < 6; i++) {
  //   trainEpoch(training);
  //   console.log("Epoch: " + i);
  //   let percent = testAll(testing);
  //   console.log("% Correct: " + percent);
  // }
}

function guess() {
  // 추측 시작
  let inputs = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  for (let i = 0; i < len; i++) {
    let bright = img.pixels[i * 4];
    inputs[i] = (255 - bright) / 255.0;
  }

  let guess = nn.predict(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);
  let result = '...'
  if (classification === CAT) {
    result = '고양이'
  } else if (classification === RAINBOW) {
    result = '무지개'
  } else if (classification === TRAIN) {
    result = '기차'
  }

  return result
}


function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    // 추측 시작
    let result = guess()
    $('.predict').text(result)
  }
}