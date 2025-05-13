import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Upload } from 'lucide-react';
import Header from './Header';
import FloatingMenu from "./FloatingMenu";

// AISearch component: analyzes an image using Gemini API (Google AI) and finds similar images
const AISearch = ({ gallery }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // For image search
  const [similarImages, setSimilarImages] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(false);
  const [imageError, setImageError] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSummary('');
      setError('');
    }
  };

  // Analyze image using Gemini API (Google AI)
  const analyzeImage = async () => {
    if (!selectedFile || !apiKey) {
      setError('Please select an image and provide a valid Gemini API key.');
      return;
    }
    setLoading(true);
    setError('');
    setSummary('');

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        // Call Gemini multimodal API (Google AI)
        // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent
        // Docs: https://ai.google.dev/api/rest/v1beta/models/generateContent
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
          {
            contents: [
              {
                parts: [
                  { text: 'Describe this image and suggest keywords for finding similar images.' },
                  { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
                ]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        // Parse Gemini response
        const summaryText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary found.';
        setSummary(summaryText);
        // Improved: Extract keywords from the Gemini summary after '**Keywords:**'
        let keywords = [];
        const keywordsSection = summaryText.split('**Keywords:**')[1];
        if (keywordsSection) {
          keywords = keywordsSection
            .split('\n')
            .map(line => line.replace(/[*-]/g, '').trim())
            .filter(Boolean)
            .slice(0, 5);
        }
        setSearchQuery(keywords.join(' '));
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('Failed to analyze image with Gemini.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar images from Google Custom Search JSON API
  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return;
      setFetchingImages(true);
      setSimilarImages([]);
      setImageError('');
      try {
        // Replace with your API key and Search Engine ID
        const API_KEY = 'AIzaSyBtmOjXsxECau8p2JfXWtRZlCpYpiXy7W8';
        const CX = 'f7366c081c3b5489b';
        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&searchType=image&q=${encodeURIComponent(searchQuery)}`;
        console.log('Google CSE Search Query:', searchQuery);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Google CSE API Response:', data);
        if (data.items && Array.isArray(data.items)) {
          setSimilarImages(data.items);
        } else {
          setImageError('No similar images found.');
        }
      } catch (err) {
        setImageError('Failed to fetch similar images.');
      } finally {
        setFetchingImages(false);
      }
    };
    fetchImages();
  }, [searchQuery]);

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
          <Header badgeText="AI Search" />
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Search className="w-6 h-6" /> AI Image Search</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 mb-4 ${isDragging ? 'border-blue-400 bg-blue-500/20' : 'border-slate-700/30 bg-slate-800/20'}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); handleFileChange({ target: { files: e.dataTransfer.files } }); }}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-slate-800/10">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-lg text-white font-medium">Drag and drop your image here</p>
                <p className="text-sm text-white/70">or</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-white hover:text-blue-200 font-medium tracking-wide px-4 py-2 rounded-full bg-slate-800/10 hover:bg-blue-700/20 transition-colors duration-200"
                >
                  Browse Files
                </button>
                <p className="text-xs text-slate-400 mt-2">Supported: JPG, PNG, GIF, WEBP</p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {previewUrl && (
            <div className="flex flex-col items-center mb-4">
              <img src={previewUrl} alt="Preview" className="w-48 h-48 object-contain rounded-lg border border-slate-700/30 bg-slate-900/20" />
            </div>
          )}
          <button
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold text-base shadow-lg border border-cyan-400/30 hover:border-cyan-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
            onClick={analyzeImage}
            disabled={loading || !selectedFile || !apiKey}
          >
            {loading ? 'Analyzing...' : (<><Search className="w-5 h-5" /> Analyze & Find Similar</>)}
          </button>
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          {summary && (
            <div className="bg-slate-900/70 text-white rounded-lg p-4 mb-4 border border-slate-700/30">
              <h3 className="font-semibold mb-2">AI Summary</h3>
              <p className="whitespace-pre-line text-sm">{summary}</p>
            </div>
          )}
          {/* Minimal Robust Similar Images Section */}
          {similarImages.length > 0 && (
            <div className="my-4">
              <h3 className="text-lg font-semibold mb-2">Similar Images</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {similarImages.map(img => (
                  <a key={img.link} href={img.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={img.link}
                      alt={img.title}
                      style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 8, border: '1px solid #334155', background: '#0f172a' }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default AISearch;
