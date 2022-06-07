'use strict'
const idError = document.querySelector(".idError")
const idInput = document.querySelector(".idInput")
const domain= document.getElementById("domain")
const year= document.getElementById("year")
const month= document.getElementById("month")
const day= document.getElementById("day")
const joinBtn = document.querySelector(".join")
const inputForm = document.querySelector('form')
const phoneInput = document.querySelector(".phoneInput")
const emailInput = document.querySelector(".emaillInput")
const passwordError = document.querySelector(".passwordError");
const wrongpassword = document.querySelector(".wrongpassword");
const passwordInputBox=document.querySelector(".passwordInput")
const passwordErrorInputBox= document.querySelector(".passwordErrorInput")
const REGPASSSWORD = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,20}$/;
const REGPHONENUMBER = /(\d{3}).*(\d{3}).*(\d{4})/;
const REGID = /^[a-z]+[a-z0-9]{5,19}$/g;

//event handler
inputForm.addEventListener("submit",formsubmit);
passwordInputBox.addEventListener("keyup",passwordCheck);
passwordErrorInputBox.addEventListener("keyup",passwordErrorCheck);
idInput.addEventListener("keyup",idCheck);
joinBtn.addEventListener("click",save_joindata);

//submit 이벤트
function formsubmit(event){
    event.preventDefault();
}

//시작하자마자 실행될 함수 
window.onload= function errorHide (){
    idError.style.display ='none';
    passwordError.style.display='none';
    wrongpassword.style.display='none';  
    
}
//아이디 형식
function idCheck(){
    if(!REGID.test(idInput.value)){
       idError.style.display= 'unset'
      }else(idError.style.display= 'none')};
   


  //비밀번호 형식 
   function passwordCheck(){
       if(passwordInputBox.value.length< 8 || passwordInputBox.value.length >20) {
        passwordError.style.display= 'unset';
        passwordError.innerHTML = "8이상 20자 이내로 입력해주세요";
       }else if(!REGPASSSWORD.test(passwordInputBox.value)){
    passwordError.style.display= 'unset';
    passwordError.innerHTML = "비밀번호는 문자, 숫자,특수문자 포함입니다"
   }else{passwordError.style.display='none';} };


//비밀번호 일치
function passwordErrorCheck(){
    if(passwordErrorInputBox.value===passwordInputBox.value){ 
     wrongpassword.style.display= 'none';
    }else{
     wrongpassword.style.display= 'unset'
    }};

//휴대폰 번호자동입력 
function autoHypenPhone(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}
phoneInput.onkeyup = function(event){
event = event || window.event;
var _val = this.value.trim();
this.value = autoHypenPhone(_val) ;
}


//버튼 활성화 
setInterval( function btnDisabled(){
if(
(idInput.value!=="" &&
 passwordInputBox.value!=="" && 
 passwordErrorInputBox.value!==""&&
year.options[year.selectedIndex].value !== "년도" &&
month.options[month.selectedIndex].value !== "월" &&
day.options[day.selectedIndex].value !== "일" &&
idError.style.display ==='none'&&
passwordError.style.display==='none'&&
wrongpassword.style.display==='none'&&
phoneInput.value !=="")===true) { 
joinBtn.disabled = false}
},1000)




//show_bucket()
/////////////////ajax
function save_joindata(){
    let id = $('.idInput').val()
    let password =$('.passwordInput').val()
    let email = emailInput.value+'@'+ domain.options[domain.selectedIndex].value
    let birthday = year.options[year.selectedIndex].value+"년"
         +month.options[month.selectedIndex].value+"월"
         +day.options[day.selectedIndex].value+"일"
    let cellphone= phoneInput.value
$.ajax({
type: "POST",
url: "/join",
data: {id_give: id, password_give: password, email_give:email, birthday_give:birthday,cellphone_give:cellphone},
success: function (response) {
alert(response["msg"])
window.location.reload()
}
});
}


function getid(){
    $.ajax({
    type: "GET",
    url: "/join",
    data: {},
    success: function (response) {
    let rows = response['id']
    for (let i=0 ; i<rows.length; i++){
        let alreadyId = rows[i]['id']
        if(alreadyId===$('.idInput').val()){
            idError.style.display ='unset' ;
            idError.innerHTML="중복된 아이디입니다.";
            idError.style.color ='red';
        }else {idError.style.display ='unset';
        idError.innerHTML="사용가능한 아이디입니다" ;
        idError.style.color ='blue';
    }
    }
    }
    });
    }




   