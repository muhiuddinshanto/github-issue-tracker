

document.getElementById('login-btn')
    .addEventListener('click', function() {
    
        const numberInput=document.getElementById('input-username');
        const contactNumber = numberInput.value;

       

        const pinInput = document.getElementById('input-password');
        const pin = pinInput.value;
      

        if(contactNumber == "admin" && pin == "admin123"){
            alert('you are login sucessful')
            window.location.assign("home.html");
        }else{
            alert('you are not login')
            return
        }
        

        
        
    })
