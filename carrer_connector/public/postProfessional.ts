document.addEventListener('DOMContentLoaded', async () => {
  const professionalsContainer = document.querySelector('.container.mb-4');
  const searchInput = document.querySelector(
    '#searchInput',
  ) as HTMLInputElement;
  const searchForm = document.querySelector('#searchForm') as HTMLFormElement;

  if (!professionalsContainer) {
    console.error('Container for professionals not found.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/post/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch professionals: ${response.statusText}`);
    }

    const professionals = await response.json();

    if (!Array.isArray(professionals)) {
      console.error(
        'Invalid response format: Expected an array of professionals.',
      );
      return;
    }

    function renderProfessionals(filteredProfessionals: any[]) {
      professionalsContainer.innerHTML = ''; 

      filteredProfessionals.forEach((professional) => {
        const profileCard = document.createElement('div');
        profileCard.className = 'row d-flex align-items-center mb-4';

        const imagePath =
          professional.gender === 'Male'
            ? 'image/Boy_Avatar.jpg'
            : 'image/Girl_Avar.png';

        profileCard.innerHTML = `
          <div class="col-lg-4 col-md-6 mb-4 mb-md-0 p-5">
            <img src="${imagePath}" alt="${professional.user?.name || 'Unknown'}" class="img-fluid rounded-circle">
          </div>
          <div class="col-lg-8 col-md-6 pt-lg-6">
            <h5 class="card-title text-primary">${professional.user?.fullname || 'Unknown'}</h5>
            <h6>${professional.profession}</h6>
            <h6>Contact: ${professional.phone_number}</h6>
            <p class="p-3 pt-1">
              ${professional.description.substring(0, 450)}...
              <a href="details.html?id=${professional.cv}">View more</a>
            </p>
          </div>
        `;

        professionalsContainer.appendChild(profileCard);
      });
    }

 
    renderProfessionals(professionals);

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); 

      const query = searchInput.value.trim().toLowerCase();
  
      const filteredProfessionals = professionals.filter((professional) =>
        professional.profession.toLowerCase().startsWith(query),
      );

      renderProfessionals(filteredProfessionals);
    });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    professionalsContainer.innerHTML = `<p class="text-center text-danger">Failed to load professionals. Please try again later.</p>`;
  }
});
