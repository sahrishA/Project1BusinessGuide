const header = document.querySelector('header');
const headerContainer = document.createElement('div');
headerContainer.className='header-container';
const leftContainer = document.createElement('div');
leftContainer.className='header-left';
const rightContainer = document.createElement('div');
rightContainer.className='header-right';
const headerButton = document.createElement('button');
headerButton.textContent='Home';
headerButton.addEventListener('click',function handleClick(event){
    window.location='/';
})
const logo = document.createElement('img');
logo.src="/images/business-logo.png";
logo.alt="Business Guide Logo";
logo.className='logoImg'
logo.style.width = '150px'; // Decrease the size of the logo
logo.style.height = 'auto'; // Maintain aspect ratio
logo.style.margin = '10px'; // Add some spacing
const headerTitle = document.createElement('h1');
headerTitle.textContent="Business Guide";
// add css classes using picoCSs
headerContainer.className = 'container grid';
leftContainer.className='col';
rightContainer.className='col';
headerContainer.style.display = 'flex';
headerContainer.style.justifyContent = 'space-between';
headerContainer.style.alignItems = 'center';
leftContainer.appendChild(logo);
leftContainer.appendChild(headerTitle);
rightContainer.appendChild(headerButton)
headerContainer.appendChild(leftContainer);
headerContainer.appendChild(rightContainer);
header.appendChild(headerContainer);
header.style.backgroundColor='lightblue'

