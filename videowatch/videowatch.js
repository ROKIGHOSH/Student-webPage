const API_KEY = 'AIzaSyAoU8PuFSutCl-CrG-JdeIvHRNK1VL28mo';
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// Function to perform YouTube search
async function searchVideos(query) {
    const response = await fetch(`${SEARCH_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
}

// Function to update the video iframe
function playVideo(videoId) {
    const iframe = document.getElementById('video-frame');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
}

// Function to handle search button click
async function handleSearch() {
    const query = document.getElementById('search-query').value;
    const results = await searchVideos(query);
    
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    results.forEach(item => {
        const videoId = item.id.videoId;
        const thumbnail = item.snippet.thumbnails.default.url;
        const title = item.snippet.title;

        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <img src="${thumbnail}" alt="${title}" />
            <p>${title}</p>
            <button onclick="playVideo('${videoId}')">Play</button>
        `;

        resultsContainer.appendChild(videoElement);
    });
}

// Add event listener to search button
document.getElementById('search-btn').addEventListener('click', handleSearch);
