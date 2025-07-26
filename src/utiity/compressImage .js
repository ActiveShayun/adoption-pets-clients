import { useState } from 'react';

function useImageCompress() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;

                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const MAX_WIDTH = 800;
                        const scaleSize = MAX_WIDTH / img.width;
                        canvas.width = MAX_WIDTH;
                        canvas.height = img.height * scaleSize;

                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    const newFile = new File([blob], file.name, { type: file.type });
                                    resolve(newFile);
                                } else {
                                    reject(new Error('Compression failed'));
                                }
                            },
                            file.type,
                            0.7
                        );
                    };

                    img.onerror = () => reject(new Error('Image load failed'));
                };

                reader.onerror = () => reject(new Error('File read failed'));
            } catch (err) {
                reject(err);
            }
        });
    };

    const compress = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const compressedFile = await compressImage(file);
            setLoading(false);
            return compressedFile;
        } catch (err) {
            setError(err);
            setLoading(false);
            return null;
        }
    };

    return { compress, loading, error };
}

export default useImageCompress;
