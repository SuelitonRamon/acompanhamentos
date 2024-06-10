pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

document.getElementById('addPdfButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const pdfData = new Uint8Array(fileReader.result);
            renderPdfThumbnail(pdfData);
        };
        fileReader.readAsArrayBuffer(file);
    }
});

document.getElementById('clearStorageButton').addEventListener('click', function() {
    localStorage.clear();
    document.getElementById('pdfList').innerHTML = '';
});

function renderPdfThumbnail(pdfData) {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    loadingTask.promise.then(function(pdf) {
        return pdf.getPage(1);
    }).then(function(page) {
        const scale = 1;
        const viewport = page.getViewport({ scale: scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext).promise.then(function() {
            const imgDataUrl = canvas.toDataURL();
            addPdfThumbnail(imgDataUrl);
            savePdfToLocalStorage(imgDataUrl);
        });
    });
}

function addPdfThumbnail(imgDataUrl) {
    const pdfList = document.getElementById('pdfList');
    const pdfThumbnail = document.createElement('div');
    pdfThumbnail.className = 'pdf-thumbnail';
    const index = pdfList.childElementCount;
    pdfThumbnail.setAttribute('data-index', index);
    pdfThumbnail.innerHTML = `<img src="${imgDataUrl}" alt="PDF Thumbnail">`;
    pdfThumbnail.addEventListener('click', function() {
        window.location.href = 'cadastro.html?index=' + index;
    });
    pdfList.appendChild(pdfThumbnail);
}

function savePdfToLocalStorage(imgDataUrl) {
    const pdfs = JSON.parse(localStorage.getItem('pdfs')) || [];
    pdfs.push(imgDataUrl);
    localStorage.setItem('pdfs', JSON.stringify(pdfs));
}

function loadPdfsFromLocalStorage() {
    const pdfs = JSON.parse(localStorage.getItem('pdfs')) || [];
    pdfs.forEach(addPdfThumbnail);
}

document.addEventListener('DOMContentLoaded', loadPdfsFromLocalStorage);

