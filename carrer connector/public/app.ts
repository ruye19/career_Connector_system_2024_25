
document
  .getElementById('signupForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullname = (document.getElementById('fullName') as HTMLInputElement)
      .value;
    const username = (document.getElementById('username') as HTMLInputElement)
      .value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const user = {
      fullname,
      username,
      email,
      password,
    };

    try {
    
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

 
      if (response.ok) {
       const successMessage = document.createElement('div');
       successMessage.className = 'success-message';
       successMessage.innerHTML = `
          <span style="color: green; font-size: 24px;">&#10003;</span> Login successful!`;

       const formContainer = document.getElementById('signupForm');
       if (formContainer) {
         formContainer.appendChild(successMessage);
       }
       
        window.location.href = 'login.html';
      } else {
        const errorMessage = await response.text();
        console.log('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    
    }
  });
