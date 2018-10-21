const len = 784;
const totalData = 1000;

let bear = {}, cat = {}, dog = {}, duck = {}, fish = {}, frog = {}, lion = {}, monkey = {}, rabbit = {}, sheep = {};
let bearData, catData, dogData, duckData, fishData, frogData, lionData, monkeyData, rabbitData, sheepData;
let nn;
let Animal = [bear, cat, dog, duck, fish, frog, lion, monkey, rabbit, sheep];
let AnimalName = ['bear', 'cat', 'dog', 'duck', 'fish', 'frog', 'lion', 'monkey', 'rabbit', 'sheep'];
let AnimalData = [bearData, catData, dogData, duckData, fishData, frogData, lionData, monkeyData, rabbitData, sheepData];

// let width = $(window).width()
// let height = $(window).height()
let width = 280;
let height = 280;

function preload() {
  // 학습한 데이터 미리 로드
  for (let i = 0; i < 10; i++) {
    AnimalData[i] = loadBytes(`data/${AnimalName[i]}.bin`)
  }
}

function setup() {
  // 화면 크기에 맞게 캔버스 생성
  createCanvas(width, height);
  background('rgba(255, 255, 255, 0)');

  // 데이터 준비
  for (let i = 0; i < 10; i++) {
    prepareData(Animal[i], AnimalData[i], i);
  }
  // 신경망 생성 
  // 28x28=784 픽셀을 64 KNN으로 
  // 결과는 총 10개
  nn = new NeuralNetwork(784, 64, 10);

  // Randomizing the data
  let training = [];
  for (let i = 0; i < 10; i++) {
    training = training.concat(Animal[i].training);
  }

  let testing = [];
  for (let i = 0; i < 10; i++) {
    testing = testing.concat(Animal[i].testing);
  }

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
    console.log(AnimalName[classification])
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

function train() {
  // 학습 시작
  // 데이터 랜덤화
  let training = [];
  let epochCounter = 0;
  for (let i = 0; i < 10; i++) {
    training = training.concat(Animal[i].training);
  }
  epochCounter++;
  console.log("Epoch: " + epochCounter);
  trainEpoch(training);
}

function guess() {
  // 추측 시작
  let inputs = [];
  let img = get(0, 0, width, height);
  // 이미지를 28x28 픽셀로 리사이즈
  img.resize(28, 28);
  img.loadPixels();
  
  for (let i = 0; i < len; i++) {
    let bright = img.pixels[i * 4];
    inputs[i] = (255 - bright) / 255.0;
  }
  
  let guess = nn.predict(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);
  let result = null
  
  result = AnimalName[classification];

  return result
}


function draw() {
  strokeWeight(8);
  stroke(0);
  if (!$('body').hasClass('start') && mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    // 추측 시작
    // let result = guess()
    // $('.predict').text(result)
  }
}