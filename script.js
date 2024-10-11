document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const addUrlButton = document.getElementById('add-url');
    const linksList = document.getElementById('links');
    const dropArea = document.getElementById('drop-area');

    // Function to add a URL to the list
    const addUrlToList = (url) => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        linksList.appendChild(listItem);
        urlInput.value = ''; // Clear the input
    };

    // Button click event to add URL
    addUrlButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            addUrlToList(url);
        } else {
            alert('Please enter a valid URL');
        }
    });

    // Drag and drop functionality
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('hover');

        const url = event.dataTransfer.getData('text/plain');
        if (url) {
            addUrlToList(url);
        }
    });
});

