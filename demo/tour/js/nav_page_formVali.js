// 表单验证
//同意协议勾选后才可以提交
function btnEnabled(chb){
	var form=document.form[0];
	form.elements[form.length-1].disabled=!chb.checked;
}
function nameFocus(txt){
	getFocus(txt,"注册手机号");
}
function pwdFocus(txt){
	getFocus(txt,"六位数字");
}
function codeFocus(txt){
	getFocus(txt,"验证码");
}
//获得焦点，将默认文本置为空
function getFocus(txt,inner){
	txt.className="";
	if(txt.value==inner){
		txt.value="";
	}
}
function valiName(txt){
	var reg = /^1[34578]\d{9}$/;
	if(reg.test(txt.value)){
		$(notName).hide();
		return true;
	}else{
		// txt.className="focusthis";
		$(notName).show();
		txt.value="";
		return false;
	}
}
function valiPwd(txt){
	var reg=/^\d{6}$/;
	if(reg.test(txt.value)){
		$(notPass).hide();
		return true;
	}else{
		$(notPass).show();
		txt.className="";
		txt.value="";
		return false;
	}
}
function valiCode(txt){
	
}

document.forms[0].addEventListener("submit",valiAll);
function valiAll(e){
	var form=document.forms[0];
	var txtName=form.username;
	var rName=valiName(txtName);
	var txtPwd=form.password;
	var rPwd=valiPwd(txtPwd);
	!(rName&&rPwd)&&(e.preventDefault());
}