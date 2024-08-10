import React, { useState } from 'react';
import './UploadImage.css'; // Create a CSS file for styling if needed

export type Props = {
    onImageSelect: (file: File) => void;
    preview: string;
};

const UploadImage: React.FC<Props> = ({ onImageSelect, preview }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="upload-image-input" />
            <label htmlFor="upload-image-input" className="upload-image-label">
                {preview ? <img src={preview} alt="Image Preview" style={{ width: '100px', height: 'auto' }} /> : 'Upload Image'}
            </label>
        </div>
    );
};

export default UploadImage;