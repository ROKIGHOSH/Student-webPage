document.getElementById('btn-primary').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;
    if (query.trim() === '') {
        alert('Please enter a search query.');
        return;
    }

    // Replace 'YOUR_API_KEY' and 'YOUR_CSE_ID' with your Google Custom Search API key and CSE ID
    const apiKey = 'AIzaSyAQFvPxB0WfoUVV_1ab8ENl45-Bkw44v4M';
    const cseId = 'YOUR_CSE_ID';
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cseId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '';

            // Check if there are any search results
            if (data.items && data.items.length > 0) {
                const results = data.items;
                results.forEach(result => {
                    const resultDiv = document.createElement('div');
                    resultDiv.style.marginBottom = '10px';

                    const title = document.createElement('a');
                    title.href = result.link;
                    title.target = '_blank';
                    title.textContent = result.title;
                    title.style.display = 'block';
                    title.style.color = '#007BFF';
                    title.style.textDecoration = 'none';
                    title.style.fontWeight = 'bold';

                    const snippet = document.createElement('p');
                    snippet.textContent = result.snippet;
                    snippet.style.margin = '5px 0';

                    resultDiv.appendChild(title);
                    resultDiv.appendChild(snippet);
                    resultsContainer.appendChild(resultDiv);
                });
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('search-results').textContent = 'An error occurred while fetching results.';
        });
});
