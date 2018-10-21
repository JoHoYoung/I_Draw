$(function() {
  // 초기 문제 설정
  var first = matrix[0]
  $('.subject').text(first)

  // OK 누르면 시작
  $('.start-ok').on('click', function() {
    $('body').removeClass('start')
  })
})

// $(function() {
//   var width = $(document).width()
//   var height = $(document).height()

//   $('canvas').attr('width', width).attr('height', height)
//   $('#sketch_canvas').sketch();
// })

// function getPrediction() {
//   // 인공지능 예측 관련 불려오기
//   var canvas = $('#sketch_canvas')[0];
//   var image = canvas.toDataURL("image/png");
//   $.get("/api/guess", { image:  image}, function (data, status){
//       $("#guess_field").text("Guess: " + data.guess);
//   });
// }

// function clearSketch() {
//   var canvas = document.getElementById('sketch_canvas');
//   canvas.getContext('2d').clearRect(0,0,400,400);
//   $('#sketch_canvas').sketch('actions',[]);
//   $("#guess_field").text("");
// }