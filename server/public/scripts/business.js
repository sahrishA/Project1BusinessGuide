const renderBusinesses = async () => { 
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/business');
    const data = await response.json();
    const mainContent = document.getElementById('main-content');
    
    // Clear the existing content first
    mainContent.innerHTML = '';

    if (!isNaN(requestedID)) {
        // Detail view logic
        const business = data[requestedID];
        
        if (business) {
            // Create detail card
            const detailCard = document.createElement('div');
            detailCard.className = 'detail-card';  // Add PicoCSS card class

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
            image.style.width = '400px'; // Decrease the size of the logo
            image.style.height = 'auto'; // Maintain aspect ratio
            image.style.display = 'block';
            image.style.margin = '10px auto'; // Center image

            const submittedBy = document.createElement('p');
            submittedBy.textContent = `Submitted by: ${business.submitted_by}`;
            submittedBy.style.textAlign = 'center';

            // Add a Back to List button
            const backButton = document.createElement('a');
            backButton.href = '/';
            backButton.className = 'btn btn-primary';  // Use PicoCSS button class
            backButton.textContent = 'Back to List';

            // Append all elements to the detail card
            detailCard.appendChild(title);
            detailCard.appendChild(description);
            detailCard.appendChild(category);
            detailCard.appendChild(image);
            detailCard.appendChild(submittedBy);
            detailCard.appendChild(backButton);

            // Append the detail card to mainContent
            mainContent.appendChild(detailCard);
        } else {
            // Handle if the ID is invalid
            const errorMessage = document.createElement('h2');
            errorMessage.textContent = 'Business not found';
            mainContent.appendChild(errorMessage);
        }
    } else {
        // List view logic
        if (data.length === 0) {
            const noData = document.createElement('h2');
            noData.textContent = 'No Business Available';
            mainContent.appendChild(noData);
        } else {
            // Render each business as a card
            data.forEach((business, index) => {
                const card = document.createElement('div');
                card.className = 'card';
        
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
                image.style.width = '400px'; // Decrease the size of the logo
                image.style.height = 'auto'; // Maintain aspect ratio
                image.style.display = 'block';
                image.style.margin = '10px auto'; // Center image
        
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
        
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(category);
                card.appendChild(image);
                card.appendChild(submittedBy);
                card.appendChild(viewButton);
        
                mainContent.appendChild(card);
            });
        }
    }
};

renderBusinesses();
