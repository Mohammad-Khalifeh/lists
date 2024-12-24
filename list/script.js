document.addEventListener('DOMContentLoaded', (event) => {
  const searchInput = document.querySelector(
    '.search-container input[type="text"]'
  );
  const searchButton = document.querySelector(
    '.search-container button.search'
  );
  const deleteButton = document.querySelector(
    '.search-container button.delete'
  );
  const fruitsRadio = document.getElementById('fruits');
  const legumesRadio = document.getElementById('legumes');
  const addSpecificButton = document.querySelector(
    '.button-container button.add-specific'
  );
  const addGeneralButton = document.querySelector(
    '.button-container button.add-general'
  );

  // Sample data
  let fruitsList = ['Apple', 'Mangoes'];
  let legumesList = ['Broccoli', 'Green Beans'];
  let generalList = [
    'Fruits! - Pineapples',
    'Fruits! - Bananas',
    'Legumes! - Potato',
    'Legumes! - Lentils',
  ];

  function renderLists() {
    const fruitsContainer = document.querySelector('.list:nth-child(1)');
    const legumesContainer = document.querySelector('.list:nth-child(3)');
    const generalContainer = document.querySelector('.list:nth-child(2)');

    fruitsContainer.innerHTML = '<h3>List of Fruits</h3>';
    legumesContainer.innerHTML = '<h3>List of Legumes</h3>';
    generalContainer.innerHTML = '<h3>List of Fruits & Legumes</h3>';

    fruitsList.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'item';
      div.textContent = `Fruits! - ${item}`;
      fruitsContainer.appendChild(div);
    });

    legumesList.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'item';
      div.textContent = `Legumes! - ${item}`;
      legumesContainer.appendChild(div);
    });

    generalList.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'item';
      div.textContent = item;
      generalContainer.appendChild(div);

      div.addEventListener('click', () => {
        moveItemToSpecificList(item);
      });
    });
  }

  // Add item to specific list
  addSpecificButton.addEventListener('click', () => {
    const value = capitalizeFirstLetter(searchInput.value.trim());
    if (value) {
      if (fruitsRadio.checked) {
        fruitsList.push(value);
      } else if (legumesRadio.checked) {
        legumesList.push(value);
      }
      renderLists();
      searchInput.value = '';
    }
  });

  // Add item to general list
  addGeneralButton.addEventListener('click', () => {
    const value = capitalizeFirstLetter(searchInput.value.trim());
    if (value) {
      if (fruitsRadio.checked) {
        generalList.push(`Fruits! - ${value}`);
      } else if (legumesRadio.checked) {
        generalList.push(`Legumes! - ${value}`);
      }
      renderLists();
      searchInput.value = '';
    }
  });

  // Search for an item
  searchButton.addEventListener('click', () => {
    const value = capitalizeFirstLetter(searchInput.value.trim());
    if (value) {
      let found = false;
      document.querySelectorAll('.item').forEach((item) => {
        if (item.textContent.toLowerCase().includes(value.toLowerCase())) {
          item.style.backgroundColor = '#ffeb3b'; // highlight found item
          found = true;
        } else {
          item.style.backgroundColor = '#a5d6a7';
        }
      });
      if (!found) {
        alert('Item not found');
      }
    }
  });

  // Delete an item
  deleteButton.addEventListener('click', () => {
    const value = capitalizeFirstLetter(searchInput.value.trim());
    if (value) {
      fruitsList = fruitsList.filter((item) => item !== value);
      legumesList = legumesList.filter((item) => item !== value);
      generalList = generalList.filter(
        (item) =>
          item !== `Fruits! - ${value}` && item !== `Legumes! - ${value}`
      );
      renderLists();
      searchInput.value = '';
    }
  });

  // Helper function to capitalize the first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // Move item to specific list
  function moveItemToSpecificList(item) {
    generalList = generalList.filter((i) => i !== item);
    if (item.startsWith('Fruits! - ')) {
      item = item.replace('Fruits! - ', '');
      fruitsList.push(item);
    } else {
      item = item.replace('Legumes! - ', '');
      legumesList.push(item);
    }
    renderLists();
  }
  renderLists();
});
