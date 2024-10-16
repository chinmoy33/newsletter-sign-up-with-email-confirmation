const input=document.querySelector('input');
const span=document.querySelector('span');
const img1=document.getElementById('img1');
const img2=document.getElementById('img2');
const outerdiv=document.querySelector(".outerdiv");
const successdiv=document.getElementById("successdiv");
const p=successdiv.querySelector('p');
const btn2=successdiv.querySelector('button');

let w=window.matchMedia("(min-width: 400px)");

if(w.matches)
{
    img1.classList.add('hidden');
}
else
{
    img2.classList.add('hidden');
}

document.getElementById('emailform').addEventListener('submit', function(event) {

    event.preventDefault(); // Prevent form from submitting
    
    
    const value = input.value;
    // Check if the email input is valid
    if (input.checkValidity()) {
        span.classList.add('hidden');
        input.classList.remove('error');
        
        outerdiv.style.display="none";
        p.textContent="A confirmation email has been sent to "+value+". Please open it and click the button inside to confirm your subscription.";
        successdiv.classList.remove("hidden");

        //backend fetching request from local nodejs server

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: `${value}`,
                subject: 'Confirmation Email',
                message: 'This is your confirmation email!'
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        
        // You can now use the validated emailValue as needed
    } else {
        span.classList.remove('hidden');
        input.classList.add('error');
    }
});


btn2.addEventListener('click', function(e){
    successdiv.classList.add("hidden");
    input.value="email@company.com";
    if(w.matches)
    {
        outerdiv.style.display="flex";
    }
    else
    {
        outerdiv.style.display="block";
    }

});

// http://localhost:3000/send-email

// Frontend: Send request to backend Node.js server to trigger email sending







