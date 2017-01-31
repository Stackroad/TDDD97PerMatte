displayView = function(nameOfPage){

	var openPage =	document.getElementById(nameOfPage).innerHTML;

	document.getElementById('body').innerHTML = openPage;



 // the code required to display a view
};

function validateSignInForm(event)
{
	console.log('Hejsan');
	event.preventDefault();

	var emailLogIn = document.getElementById('emailLogIn').value;

	var passwordLogIn = document.getElementById('passwordLogIn').value;
	var limitLength = passwordLogIn.length;

	if (limitLength < 5) {
		alert('Lösenordet måste innehålla minst 6 tecken');
	}
	else {
		var loginObject = serverstub.signIn(emailLogIn, passwordLogIn);
		tokenUser = loginObject.data;
		tokenUserSuccess = loginObject.success;

		console.log(tokenUser)
		localStorage.setItem("token", tokenUser);

		if (tokenUserSuccess === false) {
			alert('Wrong password or email')
		}
		else {
			displayView("userView");
			attachHandlersUser();
		}


	}
}

function validateSignUpForm(event)
{
	console.log('HejsanSIGNUP');
	event.preventDefault();

	var password = document.getElementById('password').value;
	var repeatPSW = document.getElementById('repeatPSW').value;
	var firstname = document.getElementById('firstName').value;
	var familyname = document.getElementById('familyName').value;
	var gender = document.getElementById('gender').value;
	var city = document.getElementById('city').value;
	var country = document.getElementById('country').value;
	var email = document.getElementById('email').value;
	var objectSignUp = {email, password, firstname, familyname, gender, city, country};

	var limitLength = password.length;

	if (limitLength < 5) {
		alert('Lösenordet måste innehålla minst 6 tecken');
	}
	else if (repeatPSW =! password) {
		alert('De två lösenorden stämmer inte överens');
	}
	else {
		// var signUpCall = document.getElementById('signUpForm');
		// var formData = new FormData(signUpCall);

		var signUpCall = serverstub.signUp(objectSignUp);
		console.log(objectSignUp)
		console.log(signUpCall)
		//alert(JSON.stringify(signUpCall));
		// JSON.parse(document.getElementById('signUpForm'))
	}

}

function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

function validateNewPassForm(event) {
	event.preventDefault();

	var newPass = document.getElementById('newPass').value;
	var repeatNewPass = document.getElementById('repeatNewPass').value;
	var oldPass = document.getElementById('oldPass').value;
	var limitLength = newPass.length;

	if (limitLength < 5) {
		alert('Lösenordet måste innehålla minst 6 tecken');
	}
	else if (newPass =! repeatNewPass) {
		alert('De två lösenorden stämmer inte överens');
	}
	else {
		var token = localStorage.getItem("token");

		console.log(newPass)

		var changePassCall = serverstub.changePassword(token, oldPass, newPass)
		console.log(changePassCall)


	}
}

var attachHandlersUser = function() {

	var updatePassForm = document.getElementById("changePass")

	if (updatePassForm != null) {
		updatePassForm.addEventListener('submit', validateNewPassForm);
	}
}

var attachHandlersWelcome = function() {

	var logInForm = document.getElementById("logInForm")

	var signUpForm = document.getElementById("signUpForm")



	if (logInForm != null) {
		logInForm.addEventListener('submit', validateSignInForm);
	}

	if (signUpForm != null) {
		signUpForm.addEventListener('submit', validateSignUpForm);
	}


}


window.onload = function(){
 //code that is executed as the page is loaded.
 //You shall put your own custom code here.
 //window.alert() is not allowed to be used in your implementation.
 // window.alert("Hello TDDD97!");
 displayView("welcomeView");
 attachHandlersWelcome();

};