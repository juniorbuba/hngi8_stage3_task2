$(document).ready(function(){
    $("#successAlert").hide();

    $("#sendBTN").click(function(){
        if($("#fullname").val() && $("#email").val() && $("#subject").val() && $("#message").val()){
        
           setTimeout(function(){
               $("#successAlert").fadeIn(1000);
           }, 3000) 
        }
    });
});