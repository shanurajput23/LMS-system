var enrollBts = document.querySelectorAll('.enroll');

enrollBts.forEach(function(btn){
  btn.addEventListener('click', function(){
    alert("thank you for enrolling in this course ☺");
  });
});