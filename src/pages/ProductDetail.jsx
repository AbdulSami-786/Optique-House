// components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Helper component for star ratings
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < fullStars ? 'text-yellow-400 fill-current' :
            i === fullStars && hasHalfStar ? 'text-yellow-400 fill-current opacity-50' : 
            'text-gray-300 fill-current'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 ml-2">({rating})</span>
    </div>
  );
};

// Quantity selector component
const QuantitySelector = ({ quantity, setQuantity, maxStock = 10 }) => {
  const decrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const increase = () => setQuantity(prev => Math.min(maxStock, prev + 1));
  
  return (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
      <button
        onClick={decrease}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </button>
      <span className="w-12 text-center font-medium text-gray-800">{quantity}</span>
      <button
        onClick={increase}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

// Color variant selector
const ColorVariantSelector = ({ variants, selectedVariant, setSelectedVariant }) => {
  if (!variants || variants.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Color / Variant</label>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedVariant(variant)}
            className={`relative group rounded-full transition-all duration-200 ${
              selectedVariant?.colorName === variant.colorName
                ? 'ring-2 ring-black ring-offset-2 scale-110'
                : 'hover:scale-105'
            }`}
          >
            <div
              className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm"
              style={{ backgroundColor: variant.hex || '#E8F4F8' }}
            />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {variant.colorName}
            </span>
          </button>
        ))}
      </div>
      {selectedVariant && (
        <p className="text-sm text-gray-500 mt-2">
          Selected: <span className="font-medium">{selectedVariant.colorName}</span>
        </p>
      )}
    </div>
  );
};

// Prescription form for contact lenses
const PrescriptionForm = ({ show, onClose, onSave }) => {
  const [prescription, setPrescription] = useState({
    sphere: '',
    cylinder: '',
    axis: '',
    baseCurve: '',
    diameter: ''
  });

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 transform animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Prescription Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sphere (Power)</label>
            <input
              type="text"
              placeholder="e.g., -2.00"
              value={prescription.sphere}
              onChange={(e) => setPrescription({...prescription, sphere: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cylinder</label>
            <input
              type="text"
              placeholder="e.g., -0.75"
              value={prescription.cylinder}
              onChange={(e) => setPrescription({...prescription, cylinder: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Axis</label>
              <input
                type="text"
                placeholder="e.g., 180"
                value={prescription.axis}
                onChange={(e) => setPrescription({...prescription, axis: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Curve</label>
              <input
                type="text"
                placeholder="8.6"
                value={prescription.baseCurve}
                onChange={(e) => setPrescription({...prescription, baseCurve: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => {
              onSave(prescription);
              onClose();
            }}
            className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors mt-4"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Product Detail Component
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Mock product data - in real app, fetch from API based on id
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProduct = {
        id: parseInt(id) || 101,
        name: "Premium Daily Contact Lenses",
        discount: "20%",
        madeInTaiwan: true,
        originalPrice: 4999,
        discountPrice: 3999,
        reviews: 128,
        rating: 4.7,
        description: "Experience all-day comfort with our Premium Daily Contact Lenses. Made with advanced moisture-lock technology, these lenses keep your eyes hydrated from morning to night. Perfect for sensitive eyes and busy lifestyles.",
        features: [
          "UV Protection (Class 1)",
          "Moisture-lock technology",
          "Breathable material",
          "Easy to handle",
          "Prescription range: -12.00 to +8.00"
        ],
        specifications: {
          "Material": "Silicone Hydrogel",
          "Water Content": "55%",
          "Oxygen Transmissibility": "138 Dk/t",
          "Wearing Schedule": "Daily Disposable",
          "Packaging": "30 lenses per box"
        },
        variants: [
          { colorName: "Clear", hex: "#E8F4F8", image: "https://images.unsplash.com/photo-1581579186913-45ac3e6a2c2e?w=600" },
          { colorName: "Natural Brown", hex: "#8B7355", image: "https://images.unsplash.com/photo-1581579186913-45ac3e6a2c2e?w=600" },
          { colorName: "Hazel", hex: "#A68A56", image: "https://images.unsplash.com/photo-1581579186913-45ac3e6a2c2e?w=600" }
        ],
        images: [
          "https://images.unsplash.com/photo-1581579186913-45ac3e6a2c2e?w=800",
          "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
          "https://images.unsplash.com/photo-1581579186913-45ac3e6a2c2e?w=800"
        ],
        category: "contact-lenses",
        inStock: true,
        freeShipping: true,
        warranty: "30-day satisfaction guarantee"
      };
      setProduct(mockProduct);
      setSelectedVariant(mockProduct.variants[0]);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
    // Here you would dispatch to cart store
    console.log('Added to cart:', { product, quantity, selectedVariant, prescriptionData });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 rounded-full">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = product.discount ? parseInt(product.discount) : 
    Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100);
  const finalPrice = product.discountPrice || product.originalPrice;

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Animated Background Elements (matching home page) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Home</button>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors capitalize">
            {product.category?.replace('-', ' ') || 'Shop'}
          </button>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <img
                src={selectedVariant?.image || product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {discountPercent}% OFF
                </span>
              )}
              {product.madeInTaiwan && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  🇹🇼 Made in Taiwan
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  Free Shipping
                </span>
              )}
              {product.inStock ? (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <StarRating rating={product.rating || 4.5} />
              <span className="text-sm text-gray-500">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{finalPrice.toLocaleString()}
              </span>
              {product.originalPrice !== finalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 font-semibold">{product.discount} off</span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <ColorVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            )}

            {/* Prescription Note for Contact Lenses */}
            {product.category === 'contact-lenses' && (
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 font-medium">Prescription Required</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Please have your prescription ready. You can upload or enter details at checkout.
                    </p>
                    <button
                      onClick={() => setShowPrescriptionModal(true)}
                      className="text-xs text-blue-700 font-semibold underline mt-2"
                    >
                      Enter Prescription Details →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={20} />
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            {/* Added to cart notification */}
            {showAddedToCart && (
              <div className="fixed top-24 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-slide-up">
                ✓ Added to cart!
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs Section */}
        <div className="mt-20">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide">
              {['Features', 'Specifications', 'Shipping & Returns'].map((tab, idx) => (
                <button
                  key={tab}
                  className={`pb-4 text-lg font-medium transition-colors whitespace-nowrap ${
                    idx === 0 ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="py-8">
            {/* Features Tab */}
            <div className="space-y-4">
              <ul className="grid md:grid-cols-2 gap-3">
                {product.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div className="hidden">
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-3 font-medium text-gray-700 border-b border-gray-100">{key}</td>
                        <td className="px-6 py-3 text-gray-600 border-b border-gray-100">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (matching home scrollable style) */}
        <section className="py-16 mt-8 border-t border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">You May Also Like</h2>
              <p className="text-gray-500 mt-1">Complete your look with these favorites</p>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="min-w-[260px] flex-shrink-0 bg-gray-50 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                </div>
                <h4 className="font-semibold">Style Collection #{item}</h4>
                <p className="text-sm text-gray-500">From ₹2,999</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Prescription Modal */}
      <PrescriptionForm
        show={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        onSave={(data) => setPrescriptionData(data)}
      />

      {/* Floating WhatsApp Button (matching home) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 25s ease-in-out infinite; }
        .animate-slide-up { animation: fadeSlideUp 0.3s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default ProductDetail;