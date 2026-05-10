import React, { useState, useRef } from "react";
import { Download, Share2, MapPin, Calendar, Clock, Users, MessageCircle, Phone, Mail, Star } from "lucide-react";
import html2canvas from "html2canvas";
import "./css/GraduationFlyer.css";
import logo from "../assets/Images/logo1.png"


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

    const captureFlyer = async () => {
        if (!cardRef.current) return null;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false,
                width: 1080,
                height: 1080,
                windowWidth: 1080,
                windowHeight: 1080,
                onclone: (clonedDoc, clonedElement) => {
                    // Strip transforms from all ancestors in the cloned iframe
                    // This ensures the capture is 100% true to 1080x1080 without being shrunk by responsive CSS
                    let parent = clonedElement.parentElement;
                    while (parent && parent !== clonedDoc.body) {
                        parent.style.transform = 'none';
                        parent = parent.parentElement;
                    }
                    clonedElement.style.transform = 'none';
                }
            });
            return canvas;
        } catch (error) {
            console.error("Error capturing flyer:", error);
            throw error;
        }
    };

    const handleDownload = async () => {
        setDownloadError(false);

        try {
            const canvas = await captureFlyer();
            if (!canvas) return;

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
            const canvas = await captureFlyer();
            if (!canvas) return;

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
                                <div className="sq-bg-top-right"></div>
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
                                                        <img src={image} alt="preview" />
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
                                                {title}. {name || "Your Name"}
                                            </div>
                                            <p className="sq-profession">{profession || "Guest"}</p>

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