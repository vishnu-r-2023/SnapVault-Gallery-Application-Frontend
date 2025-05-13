import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Shield, Image as ImageIcon, UploadCloud, XCircle, Download as DownloadIcon, ZoomIn } from 'lucide-react';
import Header from './Header';
import FloatingMenu from './FloatingMenu';
import PaymentModal from './PaymentModal';
import Toast from './Toast';
import { useAuth } from '../context/AuthContext';

const Publications = () => {
  const [lightboxPub, setLightboxPub] = useState(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [publications, setPublications] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [publishType, setPublishType] = useState('free'); // 'free' or 'paid'

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxPub) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [lightboxPub]);

  // Fetch gallery images from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token) return;
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/photos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setGallery(data.photos || []);
      } catch (err) {
        setGallery([]);
      }
    };
    fetchGallery();
  }, [isAuthenticated]);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem('publicationsData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setPublications(Array.isArray(parsedData) ? parsedData : []);
        }
      } catch (error) {
        console.error('Error loading publications data:', error);
        setPublications([]);
      }
    };
    loadData();
  }, []);

  // For previewing selected image from gallery
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl('');
      return;
    }
    setPreviewUrl(`${process.env.REACT_APP_BACKEND_URL}/uploads/${selectedImage.filename}`);
  }, [selectedImage]);

  // Handle image selection from gallery
  const handleImageSelect = (e) => {
    const imgId = e.target.value;
    const img = gallery.find(g => g._id === imgId);
    setSelectedImage(img || null);
  };

  // Handle publication submit
  const handlePublish = (e) => {
    e.preventDefault();
    setError('');
    if (!selectedImage || !title.trim() || !description.trim()) {
      setError('Please select an image, and provide a title and description.');
      return;
    }
    let pubUsername = '';
    if (user?.firstName || user?.lastName) {
      pubUsername = `${user?.firstName || ''}${user?.lastName ? ' ' + user.lastName : ''}`.trim();
    }
    if (!pubUsername) {
      pubUsername = 'Unknown';
      if (process.env.NODE_ENV === 'development') {
        console.warn('No firstName/lastName found on user object:', user);
      }
    }
    const newPub = {
      id: Date.now(),
      image: selectedImage.filename,
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      isPublic: true,
      username: pubUsername,
      paid: publishType === 'paid' // Add paid flag
    };

    const updated = [newPub, ...publications];
    setPublications(updated);
    localStorage.setItem('publicationsData', JSON.stringify(updated));
    setSelectedImage(null);
    setTitle('');
    setDescription('');
    setPreviewUrl('');
  };

  // Delete publication by id
  const handleDeletePublication = (id) => {
    const updated = publications.filter(pub => pub.id !== id);
    setPublications(updated);
    localStorage.setItem('publicationsData', JSON.stringify(updated));
  };

  // Compress image in-browser for low quality download
  const compressAndDownload = async (url, filename) => {
    try {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Scale down for low quality (e.g. 40% size)
        canvas.width = img.width * 0.4;
        canvas.height = img.height * 0.4;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Add watermark
        const logoImg = new window.Image();
        logoImg.src = '/GalleryApp-Logo.png';
        logoImg.onload = () => {
          // Resize logo to 20% of image width
          const logoWidth = canvas.width * 0.2;
          const aspect = logoImg.height / logoImg.width;
          const logoHeight = logoWidth * aspect;
          const margin = 10;
          const x = canvas.width - logoWidth - margin;
          const y = canvas.height - logoHeight - margin;
          ctx.globalAlpha = 0.5; // 50% opacity for watermark
          ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
          ctx.globalAlpha = 1.0;
          // Quality 0.4 for JPEG, fallback to PNG if not supported
          let dataUrl;
          try {
            dataUrl = canvas.toDataURL('image/jpeg', 0.4);
          } catch {
            dataUrl = canvas.toDataURL('image/png');
          }
          const link = document.createElement('a');
          link.href = dataUrl;
          link.setAttribute('download', filename.replace(/\.[^/.]+$/, '') + '-lowq.jpg');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        };
        logoImg.onerror = () => {
          alert('Failed to load watermark logo.');
        };
      };
      img.onerror = () => alert('Failed to load image for compression.');
    } catch {
      alert('Failed to compress image.');
    }
  };

  // Download high quality after payment simulation
  const downloadHighQuality = async () => {
    if (!lightboxPub) return;
    const filename = lightboxPub.image;
    const url = `${process.env.REACT_APP_BACKEND_URL}/uploads/${filename}`;
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

  return (
    <>
      <FloatingMenu />
      <div className="min-h-screen text-white pt-4 px-2 sm:px-8 relative overflow-hidden group/bg overflow-y-auto">
        {/* Animated blurred background blobs */}
        <div className="fixed inset-0 transition-all duration-700 group-hover/bg:backdrop-blur-sm z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20 group-hover/bg:opacity-30 transition-opacity duration-700">
            <div className="absolute top-0 -left-4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-10 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative mt-10 sm:mt-16 z-10">
          {/* Content */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl p-3 sm:p-8 shadow-2xl border border-slate-700/40 z-10">
            <Header badgeText="Publications" />

            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Shield className="w-6 h-6 text-indigo-400 mr-2" />
              Publications List
            </h2>

            {isAuthenticated && (
              <div className="mb-6">
                <div className="text-sm text-pink-300 bg-pink-900/20 border border-pink-700/30 rounded-lg px-4 py-2 mb-2">
                  <span className="font-semibold">Notice:</span> All images published here are <span className="font-bold">public</span> and can be viewed even without logging in.
                </div>
              </div>
            )}

            {isAuthenticated && (
              <form onSubmit={handlePublish} className="bg-gradient-to-br from-slate-800/60 to-slate-900/70 rounded-xl p-4 sm:p-6 mb-8 border border-slate-700/40 shadow-xl">
                <div className="flex items-center gap-6 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="publishType"
                      value="free"
                      checked={publishType === 'free'}
                      onChange={() => setPublishType('free')}
                      className="accent-green-500"
                    />
                    <span className="text-green-400 font-medium">Publish for Free (No Watermark)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="publishType"
                      value="paid"
                      checked={publishType === 'paid'}
                      onChange={() => setPublishType('paid')}
                      className="accent-purple-500"
                    />
                    <span className="text-purple-400 font-medium">Publish for Payment (With Watermark)</span>
                  </label>
                </div>
                <h2 className="text-xl font-bold text-white mb-4">Publish a New Image</h2>
                <div className="flex flex-col items-center">
                  <label className="flex flex-col items-center">
                    <select
                      className="w-full min-w-[220px] bg-slate-800/80 border border-slate-700/30 rounded-md p-2 mb-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={selectedImage ? selectedImage._id : ''}
                      onChange={handleImageSelect}
                    >
                      <option value="">Select from your gallery</option>
                      {gallery.map(img => (
                        <option key={img._id} value={img._id}>{img.originalname || img.filename}</option>
                      ))}
                    </select>
                    <div className="text-slate-400 text-sm mt-2 mb-4 text-center">Choose uploaded image</div>
                    <div className="w-28 h-28 flex items-center justify-center bg-slate-800/30 border-2 border-dashed border-slate-600 rounded-lg mb-2">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="object-cover w-full h-full rounded-lg" />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700/30 rounded-md p-2 mb-2 text-white"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full bg-slate-800/50 border border-slate-700/30 rounded-md p-2 mb-2 text-white"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={2}
                  />
                  <Toast message={error} type="error" onClose={() => setError("")} />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                  >
                    <UploadCloud className="w-5 h-5" /> Publish
                  </button>
                </div>
              </form>
            )}

            {publications.length === 0 ? (
              <div className="text-gray-300 text-lg text-center py-12">No publications found.</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {publications.map((pub, idx) => (
                    <div key={pub.id || idx} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition relative">
                      <div className="relative w-full h-48 flex items-center justify-center bg-slate-900/30 rounded-md mb-4 overflow-hidden cursor-pointer group" onClick={() => setLightboxPub(pub)} title="View publication">
                        {isAuthenticated && (
                          <button
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow transition-colors z-10"
                            title="Delete publication"
                            onClick={e => { e.stopPropagation(); handleDeletePublication(pub.id); }}
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                        {pub.image ? (
                          <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${pub.image}`} alt={pub.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-slate-500" />
                        )}
                      </div>
                      <div className="w-full">
                        <h3 className="text-lg font-bold text-white mb-1 truncate" title={pub.title}>{pub.title}</h3>
                        <p className="text-sm text-slate-300 mb-2 line-clamp-3" title={pub.description}>{pub.description}</p>
                        <div className="text-xs text-slate-400 mt-2">Published: {pub.createdAt ? new Date(pub.createdAt).toLocaleString() : ''}</div>
                        <div className="text-xs text-slate-400">Published by: {pub.username || 'Unknown'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxPub && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40">
            <div className="bg-slate-800/50 rounded-2xl p-4 shadow-xl border border-slate-700/30 w-full max-w-xl overflow-y-auto max-h-[60vh]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{lightboxPub.title}</h2>
                  <div className="text-xs text-slate-400 mt-1">Published by: {lightboxPub.username || 'Unknown'}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="bg-slate-900/50 p-2 rounded-full" onClick={() => setLightboxPub(null)}>
                    <XCircle className="w-6 h-6 text-white" />
                  </button>
                  <button
                    className="bg-slate-900/50 p-2 rounded-full ml-2"
                    title="View Fullscreen"
                    onClick={() => {
                      const img = document.getElementById('lightbox-fullscreen-img');
                      if (img && img.requestFullscreen) img.requestFullscreen();
                    }}
                  >
                    <ZoomIn className="w-6 h-6 text-white" />
                  </button>
                  {isAuthenticated && (
                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-full ml-2"
                      title="Delete publication"
                      onClick={() => {
                        handleDeletePublication(lightboxPub.id);
                        setLightboxPub(null);
                      }}
                    >
                      <XCircle className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full flex items-center justify-center bg-slate-900/30 rounded-md mb-4 overflow-auto" style={{ maxHeight: '80vh' }}>
                {lightboxPub.image ? (
                  lightboxPub.paid ? (
                    <WatermarkedPreview
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${lightboxPub.image}`}
                      alt={lightboxPub.title}
                      logoSrc={'/GalleryApp-Logo.png'}
                      maxHeight="40vh"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${lightboxPub.image}`}
                      alt={lightboxPub.title}
                      className="object-contain max-w-full max-h-[40vh] rounded-lg border border-slate-700/30 shadow-xl"
                    />
                  )
                ) : (
                  <ImageIcon className="w-24 h-24 text-slate-500" />
                )}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <p className="text-sm text-slate-300 flex-1">{lightboxPub.description}</p>
                <div className="flex gap-2">
                  <button
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold text-base shadow-lg border border-cyan-400/30 hover:border-cyan-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    onClick={() => setShowDownloadOptions(true)}
                  >
                    <DownloadIcon className="w-5 h-5" /> Download
                  </button>
                  {showDownloadOptions && (
                    <div className="bg-slate-900/50 p-2 rounded-md flex flex-col items-center">
                      <button
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/80 hover:bg-green-700 text-white font-semibold text-base shadow-lg border border-green-400/30 hover:border-green-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2 w-40"
                        onClick={async () => {
                          setShowDownloadOptions(false);
                          // Compress and download low quality
                          await compressAndDownload(`${process.env.REACT_APP_BACKEND_URL}/uploads/${lightboxPub.image}`, lightboxPub.title || 'publication');
                        }}
                      >
                        Low Quality (Free)
                      </button>
                      <button
                        className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-700 text-white font-semibold text-base shadow-lg border border-purple-400/30 hover:border-purple-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-40"
                        onClick={() => {
                          setShowDownloadOptions(false);
                          setShowPaymentModal(true);
                        }}
                      >
                        High Quality
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={async (paidAmount) => {
              setShowPaymentModal(false);
              await downloadHighQuality();
            }}
            minAmount={10}
          />
        )}

        {/* Footer */}
        <div className="max-w-6xl mx-auto relative mt-8 mb-4">
          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/40 shadow-lg">
            <div className="text-center text-sm text-gray-400">
              <p> {new Date().getFullYear()} SnapVault. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      {/* End main content */}
    </>
  );
};

// Utility to download an image via JS
const downloadImage = async (url, filename) => {
  try {
    // Download original image as-is (no watermark, no compression)
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

// WatermarkedPreview: Canvas-based preview with watermark (for viewing, not for download)
function WatermarkedPreview({ src, alt, logoSrc }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      // Watermark
      const logoImg = new window.Image();
      logoImg.src = logoSrc;
      logoImg.onload = () => {
        const logoWidth = img.width * 0.2;
        const aspect = logoImg.height / logoImg.width;
        const logoHeight = logoWidth * aspect;
        const margin = 10;
        const x = img.width - logoWidth - margin;
        const y = img.height - logoHeight - margin;
        ctx.globalAlpha = 0.5;
        ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
        ctx.globalAlpha = 1.0;
      };
    };
  }, [src, logoSrc]);
  return (
    <canvas
      ref={canvasRef}
      alt={alt}
      style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '0.5rem', boxShadow: '0 8px 24px #0007', background: '#222' }}
    />
  );
}

export default Publications;