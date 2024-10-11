// Initialize Supabase
const { createClient } = supabase;
const supabaseUrl = 'https://exmllqrjhnhrssdzgxtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bWxscXJqaG5ocnNzZHpneHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MzMzMTksImV4cCI6MjA0NDIwOTMxOX0.X1NYjZhA_C-pkVF94rcjXeM7sj-LlFtZEOUYLd7___E';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url');
    const addUrlButton = document.getElementById('add-url');
    const linksList = document.getElementById('links');
    const dropArea = document.getElementById('drop-area');

    // Function to add URL to the list and Supabase
    const addUrlToList = async (url) => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        linksList.appendChild(listItem);

        // Add to Supabase
        await addUrlToDatabase(url);

        urlInput.value = ''; // Clear the input
    };

    // Function to add URL to Supabase
    const addUrlToDatabase = async (url) => {
        const { data, error } = await supabase
            .from('urls')
            .insert([{ url }]);

        if (error) {
            console.error('Error adding URL:', error);
        } else {
            console.log('URL added:', data);
        }
    };

    // Fetch URLs from Supabase
    const fetchUrls = async () => {
        const { data, error } = await supabase
            .from('urls')
            .select('*');

        if (error) {
            console.error('Error fetching URLs:', error);
        } else {
            data.forEach(item => {
                addUrlToList(item.url);
            });
        }
    };

    // Event listeners
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

    // Fetch URLs on page load
    fetchUrls();
});

