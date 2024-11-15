// Function to save the content as a text file
document.getElementById('save-txt').addEventListener('click', () => {
    const noteContent = document.getElementById('note-content').value;
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Function to convert the content to a PDF
document.getElementById('convert-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const noteContent = document.getElementById('note-content').value;

    if (noteContent.trim() === "") {
        alert('No content to convert. Please write something first.');
        return;
    }

    if (confirm('Do you want to convert your note to a PDF?')) {
        doc.text(noteContent, 10, 10);
        doc.save('note.pdf');
    }
});
