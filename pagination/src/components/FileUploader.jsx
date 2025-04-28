import React, { useRef, useState } from 'react';
import "./manga.css"

function FileUpload() {
    const [userProfile, setUserProfile] = useState({
        name: '',
        profileImage: ''
    });
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserProfile(prevProfile => ({
                    ...prevProfile,
                    profileImage: reader.result  // Save the image as base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        setUserProfile(prevProfile => ({
            ...prevProfile,
            name: value
        }));
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Enter your name"
                value={userProfile.name}
                onChange={handleNameChange}
                className="border p-2 mb-2 block"
            />

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />

            <button onClick={handleUploadClick} className="border p-2 bg-blue-500 text-white rounded">
                Upload Profile Image
            </button>

            {userProfile.profileImage && (
                <div className="mt-4">
                    <h3>Image Preview:</h3>
                    <img
                        src={userProfile.profileImage}
                        alt="Profile Preview"
                        style={{ width: '100px', height: 'auto' }}
                    />
                </div>
            )}


        </div>
    );
}

export default FileUpload;
