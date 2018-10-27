$(function() {
  // 초기 문제 설정
  var first = matrix[0]
  $('.subject').text(first)

  // OK 누르면 시작
  $('.start-ok').on('click', function() {
    $('body').removeClass('start')
  })

  // 플레이 OK 누르면 학습 후 다음 문제
  $('.play-ok').on('click', function() {
      location.reload();
  })

  var intervalID = setInterval(function() {
    var canvasObj = document.getElementById("defaultCanvas0");
    var img = canvasObj.toDataURL();
    
    $.ajax({
      url: 'http://52.79.72.80/predict',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        image: img
      }),
      success: function(res) {
        var result = res.result;
        $('.predict').text(result)
      },
    })
  }, 5000);
})