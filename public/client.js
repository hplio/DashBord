document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemsList = document.getElementById('itemsList');
  
    addItemForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const itemName = document.getElementById('itemName').value;
  
      try {
        const response = await axios.post('/addItem', { itemName });
        displayItem(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  
    const displayItem = (item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('card', 'mb-2');
      itemElement.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
          <span>${item.name}</span>
          <button class="btn btn-danger delete-btn" data-id="${item._id}">Delete</button>
        </div>
      `;
      itemsList.appendChild(itemElement);
  
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const itemId = btn.getAttribute('data-id');
          try {
            await axios.delete(`/deleteItem/${itemId}`);
            itemElement.remove();
          } catch (error) {
            console.error(error);
          }
        });
      });
    };
  });

