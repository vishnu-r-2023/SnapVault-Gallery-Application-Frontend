import React, { useState, useRef, useEffect } from "react";
import Toast from "./Toast";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Upload, Image as ImageIcon, XCircle, Download as DownloadIcon } from "lucide-react";
import axios from 'axios';
import Header from './Header';
import FloatingMenu from "./FloatingMenu";
// Utility to download an image via JS
const downloadImage = async (url, filename) => {
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    alert('Failed to download image.');
  }
};


const YourPhotos = () => {
  const [gallery, setGallery] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const lightboxRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => {
    setLightboxPhoto(null);
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  const toggleFullscreen = () => {
    if (!lightboxRef.current) return;
    if (!document.fullscreenElement) {
      lightboxRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Navigation for lightbox
  const showPrevPhoto = () => {
    if (!lightboxPhoto || gallery.length === 0) return;
    const idx = gallery.findIndex(p => p._id === lightboxPhoto._id);
    const prevIdx = (idx - 1 + gallery.length) % gallery.length;
    setLightboxPhoto(gallery[prevIdx]);
  };
  const showNextPhoto = () => {
    if (!lightboxPhoto || gallery.length === 0) return;
    const idx = gallery.findIndex(p => p._id === lightboxPhoto._id);
    const nextIdx = (idx + 1) % gallery.length;
    setLightboxPhoto(gallery[nextIdx]);
  };
  // Keyboard navigation and fullscreen shortcut
  useEffect(() => {
    if (!lightboxPhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, gallery, isFullscreen]);

  // Get JWT token from localStorage
  const token = localStorage.getItem('token');

  // Fetch user's gallery on mount
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/photos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGallery(res.data.photos || []);
      } catch (err) {
        setGallery([]);
      }
    };
    if (token) fetchGallery();
  }, [token]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files) => {
    if (files.length > 0) {
      // Validate all files are images
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
          setUploadError('Please select only image files.');
          return;
        }
      }
      setIsUploading(true);
      setUploadError(null);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/photos/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        // Refresh gallery after upload
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/photos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGallery(res.data.photos || []);
      } catch (err) {
        setUploadError(
          err.response?.data?.message || 'Failed to upload image.'
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGallery(gallery.filter(p => p._id !== photoId));
    } catch (err) {
      alert('Failed to delete photo.');
    }
  };


  return (
    <>
    <FloatingMenu />
     {/* Animated blurred background blobs */}
  <div className="fixed inset-0 transition-all duration-700 group-hover/bg:backdrop-blur-sm z-0 pointer-events-none">
    <div className="absolute inset-0 opacity-20 group-hover/bg:opacity-30 transition-opacity duration-700">
      <div className="absolute top-0 -left-4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 -right-4 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-10 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
  </div>
    <div className="min-h-screen text-white pt-4 px-2 sm:px-8 relative overflow-hidden group/bg overflow-y-auto">
      <div className="max-w-6xl mx-auto relative mt-10 sm:mt-16 z-10">
        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-3 sm:p-8 shadow-2xl border border-slate-700/40">
          <Header badgeText="Photo Gallery" />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
            {/* Upload Section */}
            <div className="space-y-4">
              <Card className="bg-slate-800/30 backdrop-blur-sm shadow-lg border border-slate-700/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Upload Photo</h2>
                    <span className="text-xs text-white/70 tracking-wider uppercase">Images only</span>
                  </div>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${isDragging ? "border-indigo-400 bg-indigo-500/20" : "border-slate-700/30 bg-slate-800/20"}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 rounded-full bg-slate-800/10">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg text-white font-medium">Drag and drop your photo here</p>
                        <p className="text-sm text-white/70">or</p>
                        <button
                          onClick={handleBrowseClick}
                          className="text-sm text-white hover:text-indigo-200 font-medium tracking-wide px-4 py-2 rounded-full bg-slate-800/10 hover:bg-slate-700/20 transition-colors duration-200"
                        >
                          Browse Files
                        </button>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70 tracking-wider">
                        <span>Uploading Photo...</span>
                      </div>
                      <Progress value={100} className="h-1 bg-slate-700/30" />
                    </div>
                  )}
                  <Toast message={uploadError} type="error" onClose={() => setUploadError(null)} />
                </CardContent>
              </Card>
            </div>
            {/* Gallery Section */}
            <div className="space-y-4">
              <Card className="bg-slate-800/30 backdrop-blur-sm shadow-lg border border-slate-700/30">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-white mb-4">Your Gallery</h2>
                  {gallery.length === 0 ? (
                    <div className="text-white/60 text-sm">No photos uploaded yet.</div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {gallery.map(photo => (
                        <div key={photo._id} className="relative group">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo.filename}`}
                            alt={photo.originalname || 'Uploaded'}
                            className="rounded-lg w-full h-40 object-cover border border-slate-700/30 cursor-pointer"
                            onClick={() => openLightbox(photo)}
                          />
                          {/* Download button */}
                          <button
                            type="button"
                            className="absolute bottom-2 left-2 bg-slate-800/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                            title="Download photo"
                            onClick={e => {
                              e.stopPropagation();
                              downloadImage(`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo.filename}`, photo.originalname || photo.filename);
                            }}
                          >
                            <DownloadIcon className="w-5 h-5" />
                          </button>
                          {/* Delete button */}
                          <button
                            className="absolute top-2 right-2 bg-slate-800/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                            onClick={() => handleDelete(photo._id)}
                            title="Remove from gallery"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {/* Lightbox Modal */}
                      {lightboxPhoto && (
                        <div ref={lightboxRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeLightbox}>
                          <div className="relative max-w-3xl w-full p-4 flex items-center justify-center" onClick={e => e.stopPropagation()}>
                            {/* Left navigation button */}
                            <button
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-800/90 p-2 rounded-full text-white hover:bg-slate-900 transition z-10"
                              onClick={showPrevPhoto}
                              title="Previous"
                              style={{fontSize: 0}}
                            >
                              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${lightboxPhoto.filename}`}
                              alt={lightboxPhoto.originalname || 'Uploaded'}
                              className="rounded-lg w-full max-h-[80vh] object-contain border border-slate-700/30 shadow-2xl"
                            />
                            {/* Right navigation button */}
                            <button
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-800/90 p-2 rounded-full text-white hover:bg-slate-900 transition z-10"
                              onClick={showNextPhoto}
                              title="Next"
                              style={{fontSize: 0}}
                            >
                              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                            </button>
                            {/* Fullscreen button */}
                            <button
                              className="absolute top-2 left-2 bg-slate-800/90 p-2 rounded-full text-white hover:bg-slate-900 transition"
                              onClick={toggleFullscreen}
                              title={document.fullscreenElement ? 'Exit Fullscreen' : 'View Fullscreen'}
                            >
                              {document.fullscreenElement ? (
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 9l-6-6M3 9V3h6M15 15l6 6m0-6v6h-6M21 9V3h-6M3 15v6h6"/></svg>
                              ) : (
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 9V3h-6M3 15v6h6"/></svg>
                              )}
                            </button>
                            <button
                              type="button"
                              className="absolute bottom-2 left-2 bg-slate-800/90 p-2 rounded-full text-white hover:bg-slate-900 transition"
                              title="Download photo"
                              onClick={e => {
                                e.stopPropagation();
                                downloadImage(`${process.env.REACT_APP_BACKEND_URL}/uploads/${lightboxPhoto.filename}`, lightboxPhoto.originalname || lightboxPhoto.filename);
                              }}
                            >
                              <DownloadIcon className="w-7 h-7" />
                            </button>
                            <button
                              className="absolute top-2 right-2 bg-slate-800/90 p-2 rounded-full text-white hover:bg-slate-900 transition"
                              onClick={closeLightbox}
                              title="Close"
                            >
                              <XCircle className="w-7 h-7" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default YourPhotos;