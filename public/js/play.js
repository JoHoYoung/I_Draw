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
  })
})