const renderBusinesses = async () => {
    const urlSegments = window.location.pathname.split('/');
    const requestedID = urlSegments[urlSegments.length - 1];  // Extract the last segment of the URL
    const response = await fetch('/business');
    const data = await response.json();
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = '';  // Clear any existing content

    // Check if the requestedID is a valid number (for the detail view)
    if (!isNaN(requestedID) && requestedID !== "") {
        const business = data[parseInt(requestedID)];

        if (business) {
            // Create a detailed card view for the selected business
            const detailCard = document.createElement('div');
            detailCard.className = 'detail-card card';  // Apply PicoCSS card class

            const title = document.createElement('h3');
            title.textContent = business.title;
            title.style.textAlign = 'center';

            const description = document.createElement('p');
            description.textContent = business.text;
            description.style.textAlign = 'center';

            const category = document.createElement('p');
            category.textContent = `Category: ${business.category}`;
            category.style.textAlign = 'center';

            const image = document.createElement('img');
            image.src = business.image;
            image.alt = `${business.title} Image`;
            image.className = 'card-img';
            image.style.width = '400px';  // Image width
            image.style.height = 'auto';  // Maintain aspect ratio
            image.style.display = 'block';
            image.style.margin = '10px auto';  // Center image

            const submittedBy = document.createElement('p');
            submittedBy.textContent = `Submitted by: ${business.submitted_by}`;
            submittedBy.style.textAlign = 'center';

            // Add a Back to List button
            const backButton = document.createElement('a');
            backButton.href = '/';
            backButton.className = 'btn btn-primary';  // Apply PicoCSS button class
            backButton.textContent = 'Back to List';

            // Append elements to the detail card
            detailCard.appendChild(title);
            detailCard.appendChild(description);
            detailCard.appendChild(category);
            detailCard.appendChild(image);
            detailCard.appendChild(submittedBy);
            detailCard.appendChild(backButton);

            // Append the detail card to the main content
            mainContent.appendChild(detailCard);
        } else {
            // If no business is found for the ID, display an error message
            const errorMessage = document.createElement('h2');
            errorMessage.textContent = 'Business not found';
            mainContent.appendChild(errorMessage);
        }
    } else {
        // If no specific business ID, render the list of businesses
        if (data.length === 0) {
            const noData = document.createElement('h2');
            noData.textContent = 'No Business Available';
            mainContent.appendChild(noData);
        } else {
            // Loop through businesses and render each as a card
            data.forEach((business, index) => {
                const card = document.createElement('div');
                card.className = 'card';

                const title = document.createElement('h3');
                title.textContent = business.title;
                title.style.textAlign = 'center';
                title.style.padding='10px';
                title.style.textDecoration='underline'

                const description = document.createElement('p');
                description.textContent = business.text;
                description.style.textAlign = 'center';

                const category = document.createElement('p');
                category.textContent = `Category: ${business.category}`;
                category.style.textAlign = 'center';

                const image = document.createElement('img');
                image.src = business.image;
                image.alt = `${business.title} Image`;
                image.className = 'card-img';
                image.style.width = '400px';  // Image width
                image.style.height = 'auto';  // Maintain aspect ratio
                image.style.display = 'block';
                image.style.margin = '10px auto';  // Center image

                const submittedBy = document.createElement('p');
                submittedBy.textContent = `Submitted by: ${business.submitted_by}`;
                submittedBy.style.textAlign = 'center';

                const viewButton = document.createElement('button');
                viewButton.textContent = 'View Details';
                viewButton.className = 'btn';
                viewButton.style.textAlign = 'center';
                viewButton.onclick = () => {
                    window.location.href = `/business/${index}`;
                };

                // Append elements to the card
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(category);
                card.appendChild(image);
                card.appendChild(submittedBy);
                card.appendChild(viewButton);

                card.style.backgroundColor='lightblue'
                card.style.margin='40px'
                card.style.padding='40px';
                // Append the card to the main content
                mainContent.appendChild(card);
                mainContent.className = 'container grid';
                // card.className=' 2-row ';
                mainContent.style.display = 'flex';
                mainContent.style.flexWrap = 'wrap';
                mainContent.style.justifyContent = 'space-around';
                mainContent.style.alignItems = 'center';
            });
        }
    }
};

renderBusinesses();
