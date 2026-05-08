import React, { useState } from "react";
import "./css/GraduationFlyer.css";


const GraduationFlyer = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("Guest");
    const [profession, setProfession] = useState("Guest");
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className="flyer-page">
            {/* LEFT SECTION */}
            <div className="flyer-form-section">
                <h1>I Will Be There 🎓</h1>

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                        <option>Guest</option>
                        <option>Dr</option>
                        <option>Engr</option>
                        <option>Mr</option>
                        <option>Mrs</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Profession</label>
                    <input
                        type="text"
                        placeholder="Software Developer"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Upload Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flyer-preview-section">
                <div className="graduation-card" id="graduationCard">
                    <div className="top-badge">
                        I WILL BE THERE 🎓
                    </div>

                    <div className="image-container">
                        {
                            image ? (
                                <img src={image} alt="preview" />
                            ) : (
                                <div className="placeholder-image">
                                    Upload Image
                                </div>
                            )
                        }
                    </div>

                    <h2>
                        {title}. {name || "Your Name"}
                    </h2>

                    <p>
                        {profession || "Guest"}
                    </p>

                    <div className="event-date">
                        23 MAY 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraduationFlyer;