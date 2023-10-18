export const saveEditedImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = imageWidth;  // Setzen Sie diese Werte entsprechend der Größe Ihres Bildes
    canvas.height = imageHeight;

    const ctx = canvas.getContext("2d");

    // Zeichnen Sie das Bild zuerst
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);

        // Fügen Sie den Text zum Canvas hinzu
        ctx.font = "20px Arial"; // Passen Sie dies an Ihre Anforderungen an
        ctx.fillText(text, textPosition.x, textPosition.y);

        // Bilddaten aus dem Canvas extrahieren
        const dataURL = canvas.toDataURL("image/png");
        const base64Data = dataURL.split(',')[1];

        // Jetzt können Sie base64Data an Ihren Server senden
        uploadImage(base64Data);
    };
    img.src = imageUri;  // Ihr Bild-URI
};

