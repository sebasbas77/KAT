document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('camera');
    const captureButton = document.getElementById('capture');
    const canvas = document.getElementById('snapshot');
    const imagePreview = document.getElementById('imagePreview');
    const result = document.getElementById('result');
    const context = canvas.getContext('2d');

    // Get the rear camera
    navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back')) || videoDevices[0];

        navigator.mediaDevices.getUserMedia({
            video: { deviceId: rearCamera.deviceId }
        })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
        });
    });

    captureButton.addEventListener('click', () => {
        // Draw the video frame to the canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL and display it
        const dataUrl = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = dataUrl;
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);

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
