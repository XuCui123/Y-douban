$(document).ready(function() {
  		$('#btn-submit').attr("disabled", "disabled");
  		$('form :input').blur(function() {
  			var $parent = $(this).parent().parent();
  			$parent.find(".prompt-info").remove();
  			//验证用户名
  			if(this.id === 'username') {
  				if( this.value == "" || this.value.length < 6 || this.value.length > 11) {
  					var erroMsg = '请输入6-11位的用户名';
  					$parent.append('<div class="col-sm-3 prompt-info error">' + erroMsg + '</div>');
  				}else{
  					var correctMsg = 'OK';
  					$parent.append('<div class="col-sm-3 prompt-info correct"><span class="glyphicon glyphicon-ok">' + correctMsg + '</span></div>');
  				}
  			}
  			//验证密码长度
  			if(this.id === 'password') {
  				var value = $('#password').val();
  				var num = 0;
  				var number = 0;
  				var upperCase = 0;
  				var lowerCase = 0;
  				if(value.search(/[0-9]/) != -1) {
  					num += 1;
  					number = 1;
  				}
  				if(value.search(/[A-Z]/) != -1) {
  					num += 1;
  					upperCase = 1;
  				}
  				if(value.search(/[a-z]/) != -1) {
  					num += 1;
  					lowerCase = 1;
  				}
  				if(num >= 2 && (value.length >= 6 && value.length <= 16)) {
  					var correctMsg = 'OK';
  					$parent.append('<div class="col-sm-3 prompt-info correct"><span class="glyphicon glyphicon-ok">' + correctMsg + '</span></div>');
  				}else if(value.length < 6 || value.length > 16) {
  					var erroMsg = '密码由6-16个字符组成';
  					$parent.append('<div class="col-sm-3 prompt-info error">' + erroMsg + '</div>');
  				}else if(num == 1) {
  					if(number == 1) {
  					var erroMsg = '不能全为数字!';
  					$parent.append('<div class="col-sm-3 prompt-info error">' + erroMsg + '</div>');
  					}
  					if(upperCase == 1 || lowerCase == 1) {
  					var erroMsg = '不能全为字母!';
  					$parent.append('<div class="col-sm-3 prompt-info error">' + erroMsg + '</div>');
  					}
  				}
  			}
  			//验证确认密码和密码是否一致
  			if(this.id == 'confirmPassword') {
  				var password = $('#password').val();
  				var confirmPassword = $('#confirmPassword').val();
  				if(password != '' && password === confirmPassword) {
  					var correctMsg = 'OK';
  					$parent.append('<div class="col-sm-3 prompt-info correct"><span class="glyphicon glyphicon-ok">' + correctMsg + '</span></div>');
  				}else{
  					var erroMsg = '两次密码输入不一致!';
  					$parent.append('<div class="col-sm-3 prompt-info error">' + erroMsg + '</div>');
  					}
  				}
			var numError = $('form .error').length;
	      	if(numError){
	        	$('#btn-submit').attr("disabled", "disabled");
	      	}else{
	      		$('#btn-submit').removeAttr("disabled", "disabled");
	      	} 	
  		});

  		//重置按钮
         $('#btn-reset').click(function(){
                $('.prompt-info').remove();
                var formGroups = $('.form-group');
                for(var i = 0; i < 3;i++) {
                	var erroMsg = '两次密码输入不一致!';
                	console.log(formGroups[i]);
                	$(formGroups[i]).append('<div class="col-sm-3 glyphicon glyphicon-asterisk prompt-info error"></div>');
                }
         });
  	});