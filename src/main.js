jQuery(function ($) {
    window.portfolio = {
        submitForm: function(){
            var self = window.portfolio;
            $('#SubmitForm').on('click', function(e){
              e.preventDefault();
                //form validation
                var name = $('input[name=fullname]');
                var email = $('input[name=email]');
                var subject = $('input[name=subject]');
                var message = $('textarea[name=message]');
                var formValid = self.validateForm(name, email, subject, message);

                if(!formValid){
                  return;
                 }

                var formData = {
                    'name' : name.val(),
                    'email': email.val(),
                    'subject' : subject.val(),
                    'message' : message.val()
                  };

                $.ajax({
                    url: "https://formspree.io/basnataliia@gmail.com",
                    method: "POST",
                    data: formData,
                    dataType: "json",
                    success: function(data, status){
                        console.log('success');
                        $('.form').hide();
                        $('.thankyou').show();
                    },
                    error: function(xhr, status, errorThrown){
                        console.log(xhr);
                    }
                });
              });
            },

        //form validation
        validateForm: function(name, email, subject, msg){
            var emailvalue = email.val();
            var inputFields = [name, email, subject, msg];
            var valid = false;
            inputFields.forEach( function(input) {
               if(!input.val()) {
                  valid =  false;
                  input.addClass('not-valid');
                }
                else {
                  valid = true;
                }
            });

            //check email againsr regular expression
            function validateEmail(email) {
              var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return re.test(email);
            }

            var testemail = validateEmail(emailvalue)
            if (!testemail) {
                valid = false;
                email.addClass('not-valid');
            }
            return valid;
        },

        //remove red border from input fields
        clearValidation: function(){
            $('#ContactForm input').on('keyup', function(){
                $(this).removeClass('not-valid');
            });
            $('#ContactForm textarea').on('keyup', function(){
                 $(this).removeClass('not-valid');
            });
        },

        smoothScroll: function(){
             $('#PortfolioLink').on('click', function () {
                if (this.hash !== "") {
                  // Prevent default anchor click behavior
                  event.preventDefault();
                  var hash = this.hash;
                  $('html, body').animate({
                    scrollTop: $(hash).offset().top
                  }, 800, function(){
                    window.location.hash = hash;
                  });
                } // End if
            });
        },

        init: function(){
            var self = window.portfolio;
            self.submitForm();
            self.clearValidation();
            self.smoothScroll();
        }
    }
    portfolio.init();
});
