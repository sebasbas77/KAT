document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('camera');
    const captureButton = document.getElementById('capture');
    const canvas = document.getElementById('snapshot');
    const result = document.getElementById('result');
    const context = canvas.getContext('2d');

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
        });

    captureButton.addEventListener('click', () => {
        // Draw the video frame to the canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Extract the text from the canvas image
        Tesseract.recognize(canvas, 'eng', {
            logger: m => console.log(m)
        }).then(({ data: { text } }) => {
            result.textContent = text;
        }).catch(err => {
            console.error("Error recognizing text: ", err);
        });
    });
});
