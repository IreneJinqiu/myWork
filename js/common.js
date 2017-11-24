$(function(){
	var mydate=new Date();
	var newYear=mydate.getFullYear();
	var age=Number(newYear)-1991;
	$(".ageSpan").html(age);
})