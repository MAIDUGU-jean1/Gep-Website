import React, { useState, useRef } from "react";
import { Download, Share2, MapPin, Calendar, Clock, Users, MessageCircle } from "lucide-react";
import html2canvas from "html2canvas";
import "./css/GraduationFlyer.css";


const GraduationFlyer = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("Guest");
    const [profession, setProfession] = useState("Guest");
    const [image, setImage] = useState(null);
    const [downloadError, setDownloadError] = useState(false);
    const cardRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("Image size should be less than 5MB");
                return;
            }
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDownload = async () => {
        setDownloadError(false);

        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
                logging: false,
                width: 794,
                height: 1123
            });
            const link = document.createElement("a");
            link.download = `graduation-flyer-${name || "guest"}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        } catch (error) {
            setDownloadError(true);
            alert("Unable to download flyer. Please try again.");
        }
    };

    const handleShare = async () => {
        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
                logging: false,
                width: 794,
                height: 1123
            });
            const imageUrl = canvas.toDataURL("image/png");

            if (navigator.canShare && navigator.canShare({ files: [new File([await (await fetch(imageUrl)).blob()], 'flyer.png', { type: 'image/png' })] })) {
                await navigator.share({
                    title: "I Will Be There - Graduation Flyer",
                    text: `Join me at the GeP ProTech Graduation Ceremony on 23rd May, 2026!`,
                    url: window.location.href
                });
            } else if (navigator.share) {
                await navigator.share({
                    title: "I Will Be There - Graduation Flyer",
                    text: `Join me at the GeP ProTech Graduation Ceremony on 23rd May, 2026!`,
                    url: window.location.href
                });
            } else {
                const waUrl = `https://api.whatsapp.com/status?text=${encodeURIComponent(`Join me at the GeP ProTech Graduation Ceremony on 23rd May, 2026! ${window.location.href}`)}`;
                window.open(waUrl, '_blank');
            }
        } catch (error) {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="flyer-page">
            <div className="flyer-container">
                <div className="flyer-header">
                    <h1 className="flyer-title">I Will Be There 🎓</h1>
                    <p className="flyer-subtitle">
                        Celebrate with us at the GeP ProTech Graduation Ceremony.
                        Create your personalized flyer and let everyone know you'll be joining the celebration!
                    </p>
                </div>

                {downloadError && (
                    <div style={{
                        background: "rgba(220, 20, 60, 0.1)",
                        border: "1px solid rgba(220, 20, 60, 0.3)",
                        borderRadius: "12px",
                        padding: "15px",
                        marginBottom: "20px",
                        color: "#dc143c"
                    }}>
                        Something went wrong. Please try again.
                    </div>
                )}

                <div className="flyer-grid">
                    <div className="flyer-form-section">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
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
                                <option>Ms</option>
                                <option>Prof</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Profession</label>
                            <input
                                type="text"
                                placeholder="Software Developer, Designer, etc."
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Your Photo</label>
                            <div className="upload-container">
                                <div className="upload-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                </div>
                                <div className="upload-text">
                                    {image ? "Change Photo" : "Click to Upload Your Photo"}
                                </div>
                                <div className="upload-hint">
                                    PNG, JPG or GIF (Max 5MB) - This will appear on your flyer
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="upload-input"
                                />
                            </div>
                        </div>

                        <div className="flyer-actions">
                            <button className="btn-download" onClick={handleDownload}>
                                <Download size={18} />
                                Download Flyer
                            </button>
                            <button className="btn-whatsapp" onClick={handleShare}>
                                <MessageCircle size={18} />
                                Share to WhatsApp Status
                            </button>
                        </div>
                    </div>

                    <div className="flyer-preview-section">
                        <div className="graduation-card a4-card" id="graduationCard" ref={cardRef}>
                            <div className="top-badge">
                                I WILL BE THERE 🎓
                            </div>

                            <div className="a4-layout">
                                <div className="a4-content-section">
                                    <h2 className="a4-name">
                                        {title}. {name || "Your Name"}
                                    </h2>

                                    <p className="a4-profession">
                                        {profession || "Guest"}
                                    </p>

                                    <div className="a4-event-details">
                                        <div className="a4-event-date">
                                            <Calendar size={20} />
                                            23 MAY 2026
                                        </div>
                                        <div className="a4-event-location">
                                            <MapPin size={18} />
                                            GEP ProTech Academy, Bambili, Beside Psalm one
                                        </div>
                                        <div className="a4-event-time">
                                            <Clock size={18} />
                                            10:00 AM - 4:00 PM
                                        </div>
                                    </div>

                                    <div className="a4-card-footer">
                                        <div className="organization-name">GeP ProTech Academy</div>
                                    </div>
                                </div>

                                <div className="a4-image-section">
                                    <div className="a4-image-container">
                                        {image ? (
                                            <img src={image} alt="preview" />
                                        ) : (
                                            <div className="placeholder-image a4-placeholder">
                                                <div className="placeholder-icon">
                                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                                Upload Your Photo
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="graduation-info">
                    <h3 className="info-title">Graduation Celebration Details</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-icon">
                                <Calendar size={24} />
                            </div>
                            <div className="info-content">
                                <h4>Date & Time</h4>
                                <p>23rd May, 2026 | 10:00 AM - 4:00 PM </p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="info-content">
                                <h4>Venue</h4>
                                <p>GEP ProTech Academy, Bamenda, Bambili</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <Users size={24} />
                            </div>
                            <div className="info-content">
                                <h4>Expected Guests</h4>
                                <p>Over 30 graduates, family, friends, and industry leaders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraduationFlyer;