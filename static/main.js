'use strict'
const idError = document.querySelector(".idError")
const inputForm = document.querySelector('form')
const passwordError = document.querySelector(".passwordError");
const wrongpassword = document.querySelector(".wrongpassword");
const passwordInputBox=document.querySelector(".passwordInput")
const passwordErrorInputBox= document.querySelector(".passwordErrorInput")
const REGPASSSWORD = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,20}$/;
const REGPHONENUMBER = /(\d{3}).*(\d{3}).*(\d{4})/;
const REGID = /^[a-z]+[a-z0-9]{5,19}$/g;

//event handler
inputForm.addEventListener("submit",formsubmit);
passwordInputBox.addEventListener("change",passwordCheck);
passwordErrorInputBox.addEventListener("change",passwordErrorCheck);

//시작하자마자 실행될 함수 
window.onload= function errorHide (){
    idError.style.display = 'none';
    passwordError.style.display= 'none';
    wrongpassword.style.display = 'none';
    
}
//submit 이벤트
function formsubmit(event){
    event.preventDefault();
}

  //비밀번호 형식 
   function passwordCheck(){
 if(!REGPASSSWORD.test(passwordInputBox.value)){
    passwordError.style.display= 'unset';
   } 
};
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
var phoneInput = document.querySelector(".phoneInput")
phoneInput.onkeyup = function(event){
event = event || window.event;
var _val = this.value.trim();
this.value = autoHypenPhone(_val) ;
}






///////테스트
// setInterval(() => test3(), 1000);
// //실패
// function test3(){

// switch (passwordInputBox.value){
//   case passwordInputBox.value.length< 9 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;
//  case passwordInputBox.value.length< 10 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;
//  case passwordInputBox.value.length< 11 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 12 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 13 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 14 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 15 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 16 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;

//  case passwordInputBox.value.length< 17 && REGPASSSWORD.test(passwordInputBox.value):
//         passwordError.style.display= 'none';
//         break;

//  case passwordInputBox.value.length< 18 && REGPASSSWORD.test(passwordInputBox.value):
//     passwordError.style.display= 'none';
//     break;
// } }


// function passwordCheck(){
//   if(passwordInputBox.value.length <8 || passwordInputBox.value.length > 20 ){
//      passwordError.style.display= 'unset';
//     } else if(!REGPASSSWORD.test(passwordInputBox.value)){
//      passwordError.innertext = "양식에 맞게 입력해주세요"
//     }