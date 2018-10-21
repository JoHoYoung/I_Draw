$(function() {
  $('input').on('input', function() {
    var value = $(this).val()
    if ($.trim(value).length > 0) {
      $('.circle').css('display', 'flex')
    } else {
      $('.circle').css('display', 'none')
    }
  })
})