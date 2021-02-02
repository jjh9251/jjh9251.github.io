//마우스 이벤트
document.addEventListener('mousemove', function(e) {
  let body = document.querySelector('body');
  let circle = document.createElement('span');
  let x = e.offsetX;
  let y = e.offsetY;
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  let size = Math.random() * 100;
  circle.style.width = 20 + size + "px";
  circle.style.height = 20 + size + "px";
  body.appendChild(circle);
  setTimeout(function() {
    circle.remove();
  }, 1800);
});

//회원 관리
function saveGuestBook() {
  var guestBook = new GuestBook($(id).val(), $(password).val(), $(username).val(),$("input[name='gender']:checked").val(), $(email).val(), $(tel).val(), $(year).val(), $(month).val(), $(day).val());
  console.log(guestBook);
  var arr = JSON.parse(localStorage.getItem("arr"));
  if(arr == null) arr = [];
  arr.push(guestBook);


  //배열로 저장
  var jsonStr = JSON.stringify(arr);
  localStorage.setItem("arr", jsonStr);

  //입력창 초기화 후
  //새로입력된 정보로 갱신
  $('#id').val('');
  $('#password').val('');
  $('#pwchecked').val('');
  $('#username').val('');
  $('#email').val('');
  $('#tel').val('');
  $('#year').val('');
  $('#month').val('january');
  $('#day').val('');
  loadGuestBook();
}

function GuestBook(id, pw, username, gender, email, tel, year, month, day){
  this.id = id;
  this.pw = pw;
  this.username = username;
  this.gender = gender;
  this.email = email;
  this.tel = tel;
  this.year = year;
  this.month = month;
  this.day = day;

  // this.time = new Date().getTime();//unix second로 시간 관리
}

// $(function(){
//   //방문자 정보 화면 출력하기
//   loadGuestBook();
// });

function loadGuestBook(){
  var arr = JSON.parse(localStorage.getItem("arr"));
  var $guestBook = $(guestBook);//table태그

  //헤더부분 추가
  $guestBook.html("<tr><th>No</th><th>아이디</th><th>이름</th><th>성별</th><th>연락처</th></tr>");

  //내용부분 추가
  if(arr == null){
  $guestBook.append("<tr><td colspan='5'>회원이 없습니다.</td></tr>");
  }
  else {
      arr.reverse();//방명록 내림차순
      $.each(arr, function(index, elem){
          var date = new Date(elem.time); //unix second -> date객체
          var tr = "<tr>";
          tr += "<td>" + (index + 1) + "</td>";
          tr += "<td>" + elem.id + "</td>";
          tr += "<td>" + elem.username + "</td>";
          tr += "<td>" + elem.gender + "</td>";
          tr += "<td>" + elem.tel.replaceAll("\n", "<br>") + "</td>";//개행 처리
          tr += "</tr>";
          $guestBook.append(tr);
      });
  }

}