let pdfFiles = []; // Array to store uploaded PDF files

// Handle file selection and upload
document.getElementById('file-input').addEventListener('change', function() {
    const fileInput = document.getElementById('file-input');
    const fileListDiv = document.getElementById('file-list');
    
    // Add selected files to the pdfFiles array and display the file names
    for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        if (file.type === 'application/pdf') {
            pdfFiles.push(file); // Store the file
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            // Display the file name
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            fileItem.appendChild(fileName);
            
            // Create a "View" button for each file
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.className = 'view-btn';
            viewButton.addEventListener('click', function() {
                viewPdf(file); // Call function to view the selected PDF
            });
            fileItem.appendChild(viewButton);
            
            // Create a "Remove" button for each file
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.addEventListener('click', function() {
                removePdf(file, fileItem); // Call function to remove the selected PDF
            });
            fileItem.appendChild(removeButton);

            // Append the file item to the file list
            fileListDiv.appendChild(fileItem);
        }
    }

    // Clear file input after uploading
    fileInput.value = '';
});

// Function to handle incoming file uploads from Notepad page
function handleUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const blob = new Blob([content], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        
        // Add to pdfFiles array
        pdfFiles.push(blob);
        
        // Create and display file item
        const fileListDiv = document.getElementById('file-list');
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileItem.appendChild(fileName);
        
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.className = 'view-btn';
        viewButton.addEventListener('click', function() {
            viewPdf(blob); // Call function to view the uploaded PDF
        });
        fileItem.appendChild(viewButton);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            removePdf(blob, fileItem); // Call function to remove the uploaded PDF
        });
        fileItem.appendChild(removeButton);

        fileListDiv.appendChild(fileItem);
    };
    reader.readAsText(file); // Assuming the uploaded content is text-based
}
