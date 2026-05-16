import React, { useState, useRef } from "react";
import { Download, Share2, MapPin, Calendar, Clock, Users, MessageCircle, Phone, Mail, Star } from "lucide-react";
import html2canvas from "html2canvas";
import axios from "axios";
import "./css/GraduationFlyer.css";
import logo from "../assets/Images/logo1.png"


const GraduationFlyer = () => {
    const [formData, setFormData] = useState({
        name: "",
        title: "Guest",
        invitedAs: "Guest"
    });
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [downloadError, setDownloadError] = useState(false);
    const cardRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("Image size should be less than 5MB");
                return;
            }
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const captureFlyer = async () => {
        if (!cardRef.current) return null;

        // Use off-screen cloning to guarantee absolutely perfect 1080x1080 sizing
        const offScreen = document.createElement('div');
        offScreen.style.position = 'absolute';
        offScreen.style.top = '-9999px';
        offScreen.style.left = '-9999px';
        offScreen.style.width = '1080px';
        offScreen.style.height = '1080px';
        
        const clone = cardRef.current.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.boxShadow = 'none';
        
        offScreen.appendChild(clone);
        document.body.appendChild(offScreen);

        try {
            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false,
                width: 1080,
                height: 1080
            });
            return canvas;
        } catch (error) {
            console.error("Error capturing flyer:", error);
            throw error;
        } finally {
            document.body.removeChild(offScreen);
        }
    };

    const getInvitedText = () => {
        if (formData.invitedAs === 'Guest') return 'I am attending as a Guest';
        if (formData.invitedAs === 'Organiser') return 'I am an Organiser';
        if (formData.invitedAs === 'Graduant') return 'I am the Graduant';
        return `I am attending as a ${formData.invitedAs}`;
    };

    const saveFlyerData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (!apiUrl) return;

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('invited_as', formData.invitedAs);
            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            await axios.post(`${apiUrl}/graduation-flyer`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Failed to save flyer data:", error);
        }
    };

    const handleDownload = async () => {
        setDownloadError(false);

        if (!formData.name || formData.name.trim() === "") {
            setDownloadError(true);
            return;
        }

        try {
            await saveFlyerData();

            const canvas = await captureFlyer();
            if (!canvas) return;

            const link = document.createElement("a");
            link.download = `graduation-flyer-${formData.name || "guest"}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        } catch (error) {
            setDownloadError(true);
            alert("Unable to download flyer. Please try again.");
        }
    };

    const handleShare = async () => {
        if (!formData.name || formData.name.trim() === "") {
            setDownloadError(true);
            return;
        }

        try {
            await saveFlyerData();

            const canvas = await captureFlyer();
            if (!canvas) return;

            const imageUrl = canvas.toDataURL("image/png");
            const shareText = `Join me at the GeP ProTech Graduation Ceremony on 23rd May, 2026! gepprotech.com/graduationFlyer`;
            const blob = await (await fetch(imageUrl)).blob();
            const file = new File([blob], 'flyer.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "I Will Be There - Graduation Flyer",
                    text: shareText,
                    files: [file]
                });
            } else if (navigator.share) {
                await navigator.share({
                    title: "I Will Be There - Graduation Flyer",
                    text: shareText,
                });
            } else {
                const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                window.open(waUrl, '_blank');
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                navigator.clipboard.writeText(`Join me at the GeP ProTech Graduation Ceremony on 23rd May, 2026! gepprotech.com/graduationFlyer`);
                alert("Link copied to clipboard!");
            }
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
                        Please you can't download empty or incomplete
                    </div>
                )}

                <div className="flyer-grid">
                    <div className="flyer-form-section">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Title</label>
                            <select
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
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
                            <label>Invited As</label>
                            <select
                                name="invitedAs"
                                value={formData.invitedAs}
                                onChange={handleInputChange}
                            >
                                <option value="Guest">Guest</option>
                                <option value="Organiser">Organiser</option>
                                <option value="Graduant">Graduant</option>
                            </select>
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
                                    PNG, JPG or GIF (Max 5MB) - This will appear on your flyer take note
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
                        <div className="sq-wrapper">
                            <div className="graduation-card sq-card" id="graduationCard" ref={cardRef}>
                                {/* Background Decorative Elements */}
                                <div className="sq-bg-top-right-gold"></div>
                                <div className="sq-bg-top-right"></div>
                                <div className="sq-bg-bottom-curve-gold"></div>
                                <div className="sq-bg-bottom-curve"></div>

                                <div className="sq-content">
                                    {/* Header */}
                                    <div className="sq-header">
                                        <div className="sq-logo-placeholder">
                                            <img src={logo} alt="Logo" style={{ width: "110%", height: "110%", marginTop: "-15px", borderRadius: "50%" }} />
                                        </div>
                                        <div className="sq-header-text">
                                            <h1>GEP PROTECH ACADEMY</h1>
                                            <p>A professional and vocational<br />training center</p>
                                        </div>
                                        <div className="sq-header-divider"></div>
                                        <div className="sq-header-slogan">
                                            Learn,<br />Earn and Lead
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="sq-body">
                                        {/* Left: Image section */}
                                        <div className="sq-image-section">
                                            <div className="sq-image-wrapper">
                                                <div className="sq-decor-blue"></div>
                                                <div className="sq-decor-gold"></div>
                                                <div className="sq-image-circle">
                                                    {image ? (
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundImage: `url(${image})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            borderRadius: '50%'
                                                        }} />
                                                    ) : (
                                                        <div className="sq-placeholder">
                                                            <div className="placeholder-icon">
                                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                                    <circle cx="12" cy="7" r="4"></circle>
                                                                </svg>
                                                            </div>
                                                            Upload Photo
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Text section */}
                                        <div className="sq-text-section">
                                            <div className="sq-name-badge">
                                                {formData.title}. {formData.name || "Your Name"}
                                            </div>
                                            <p className="sq-profession">{getInvitedText()}</p>

                                            <h2 className="sq-iam">I AM</h2>
                                            <h1 className="sq-attending">attending</h1>

                                            <div className="sq-star-divider">
                                                <div className="sq-line"></div>
                                                <Star size={24} color="#c69c38" fill="#c69c38" />
                                                <div className="sq-line"></div>
                                            </div>

                                            <h3 className="sq-batch">12TH BATCH</h3>
                                            <h2 className="sq-grad-title">
                                                GRADUATION<br />
                                                <span className="sq-gold-text">CEREMONY</span>
                                            </h2>

                                            <div className="sq-datetime">
                                                <div className="sq-dt-item">
                                                    <Calendar size={24} className="sq-icon" />
                                                    <span>Friday, 23rd May 2026</span>
                                                </div>
                                                <div className="sq-dt-item">
                                                    <Clock size={24} className="sq-icon" />
                                                    <span>10:00 AM prompt</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="sq-footer">
                                    <div className="sq-footer-item">
                                        <div className="sq-footer-icon"><Phone size={20} fill="currentColor" /></div>
                                        <span>674386778</span>
                                    </div>
                                    <div className="sq-footer-item">
                                        <div className="sq-footer-icon"><Mail size={20} /></div>
                                        <span>info@gepprotech.com</span>
                                    </div>
                                    <div className="sq-footer-item">
                                        <div className="sq-footer-icon"><MapPin size={20} /></div>
                                        <span>GEP ProTech Academy, Bambili</span>
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