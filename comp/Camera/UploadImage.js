export const uploadImage = async (uri) => {
    let base64Img = `data:image/jpg;base64,${await toBase64(uri)}`;

    let data = {
        image: base64Img
    };

    try {
        const response = await fetch('https://www.Sbdci.de/kpw/upload.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error("Fehler beim Hochladen des Bildes", error);
    }
}

const toBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
