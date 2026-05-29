// // productcard
































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ── same mapping as ProductDetail.jsx ─────────────────────────────────────────
// const CODE_TO_FRAME = {
//   "T04917":"/glass1.png","K01":"/glass2.png","D403054S":"/glass3.png",
//   "20237":"/glass4.png","RB4455F":"/glass5.png","5013":"/glass6.png",
//   "S2160":"/glass7.png","3377":"/glass8.png","28044":"/glass9.png",
//   "99032":"/glass10.png","T1798":"/glass11.png","28118":"/glass12.png",
//   "IPB":"/glass13.png","F0493":"/glass14.png","BL0985":"/glass15.png",
//   "D7481":"/glass16.png","H077048":"/glass17.png","9702":"/glass18.png",
//   "JV5816":"/glass19.png","D8822":"/glass20.png","PS8035":"/glass21.png",
//   "D8815":"/glass22.png","9362":"/glass23.png","D8953":"/glass24.png",
//   "TR1020":"/glass25.png","BV6522":"/glass26.png","D9108":"/glass27.png",
//   "9368":"/glass28.png","K88212":"/glass29.png","B7195":"/glass30.png",
//   "D1256":"/glass31.png","P3002":"/glass32.png","2011":"/glass33.png",
//   "AR2005":"/glass34.png","P210":"/glass35.png","D8954":"/glass36.png",
//   "K58083":"/glass37.png","LFL228":"/glass38.png","OF8651":"/glass39.png",
//   "OF8506":"/glass40.png","1122":"/glass41.png","R1013":"/glass42.png",
// };

// const getFrameId = (product) =>
//   (product?.code && CODE_TO_FRAME[product.code]) || "/glass1.png";

// // ── SMART IMAGE NORMALIZER ─────────────────────────────────────────────────────
// const useImageNormalization = (src, targetFill = 0.82) => {
//   const [style, setStyle] = useState({
//     transform: 'scale(1.12)',
//     transformOrigin: 'center center',
//     transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//   });
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!src) return;
//     let cancelled = false;

//     const analyse = async () => {
//       try {
//         const img = new Image();
//         img.crossOrigin = 'anonymous';

//         await new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//           img.src = src;
//         });

//         if (cancelled) return;

//         const W = img.naturalWidth;
//         const H = img.naturalHeight;
//         if (!W || !H) return;

//         const SAMPLE = 320;
//         const sw = SAMPLE;
//         const sh = Math.round((H / W) * SAMPLE);

//         const canvas = document.createElement('canvas');
//         canvas.width = sw;
//         canvas.height = sh;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, sw, sh);

//         const { data } = ctx.getImageData(0, 0, sw, sh);

//         const isContent = (i) => {
//           const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
//           if (a < 30) return false;
//           if (r > 235 && g > 235 && b > 235) return false;
//           return true;
//         };

//         let minX = sw, maxX = 0, minY = sh, maxY = 0;
//         let found = false;

//         for (let y = 0; y < sh; y++) {
//           for (let x = 0; x < sw; x++) {
//             const i = (y * sw + x) * 4;
//             if (isContent(i)) {
//               if (x < minX) minX = x;
//               if (x > maxX) maxX = x;
//               if (y < minY) minY = y;
//               if (y > maxY) maxY = y;
//               found = true;
//             }
//           }
//         }

//         if (!found || cancelled) return;

//         const pad = 4;
//         minX = Math.max(0, minX - pad);
//         minY = Math.max(0, minY - pad);
//         maxX = Math.min(sw - 1, maxX + pad);
//         maxY = Math.min(sh - 1, maxY + pad);

//         const contentW = maxX - minX;
//         const contentH = maxY - minY;
//         const contentCX = (minX + maxX) / 2 / sw;
//         const contentCY = (minY + maxY) / 2 / sh;

//         const scaleX = (targetFill * sw) / contentW;
//         const scaleY = (targetFill * sh) / contentH;
//         const scale = Math.min(scaleX, scaleY, 2.2);

//         const txPct = (0.5 - contentCX) * 100;
//         const tyPct = (0.5 - contentCY) * 100;

//         if (!cancelled) {
//           setStyle({
//             transform: `translate(${txPct.toFixed(2)}%, ${tyPct.toFixed(2)}%) scale(${scale.toFixed(3)})`,
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//             willChange: 'transform',
//           });
//           setReady(true);
//         }
//       } catch {
//         if (!cancelled) {
//           setStyle({
//             transform: 'scale(1.1)',
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//           });
//           setReady(true);
//         }
//       }
//     };

//     analyse();
//     return () => { cancelled = true; };
//   }, [src, targetFill]);

//   return { normalizedStyle: style, ready };
// };

// // ── NORMALISED IMAGE WRAPPER ───────────────────────────────────────────────────
// const NormalizedImage = ({ src, alt, hovered }) => {
//   const { normalizedStyle, ready } = useImageNormalization(src, 0.84);
//   const hoverBoost = hovered ? 1.055 : 1;

//   return (
//     <div style={{
//       width: '100%', height: '100%',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       overflow: 'hidden',
//       background: '#ffffff',
//     }}>
//       <div style={{
//         width: '100%', height: '100%',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         opacity: ready ? 1 : 0,
//         transition: 'opacity 0.35s ease',
//       }}>
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           decoding="async"
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'contain',
//             display: 'block',
//             imageRendering: 'high-quality',
//             ...normalizedStyle,
//             transform: normalizedStyle.transform
//               ? normalizedStyle.transform.replace(
//                   /scale\(([^)]+)\)/,
//                   (_, s) => `scale(${(parseFloat(s) * hoverBoost).toFixed(3)})`
//                 )
//               : `scale(${hoverBoost})`,
//           }}
//         />
//       </div>

//       {!ready && (
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)',
//           backgroundSize: '200% 100%',
//           animation: 'shimmer 1.6s infinite',
//         }} />
//       )}
//     </div>
//   );
// };

// // ── MAIN PRODUCT CARD ─────────────────────────────────────────────────────────
// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
//   const [hovered, setHovered] = useState(false);

//   // ── FIXED TRY ON HANDLER (same as ProductDetail) ────────────────────────────
//   const handleTryOn = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/tryon', {
//       state: {
//         frameId: getFrameId(product),
//         productName: product.name,
//         productId: product.id,
//       }
//     });
//   };

//   const displayPrice = product.discountPrice || product.originalPrice;
//   const hasDiscount = product.discount && parseFloat(product.discount) > 0;
//   const imageSrc = selectedVariant?.images?.[0] || '/placeholder-image.jpg';

//   const getCategoryDisplay = (cat) => ({
//     'men sunglass':    'Men Sunglass',
//     'men eyeglass':    'Men Eyeglass',
//     'woman sunglass':  'Women Sunglass',
//     'women eyeglass':  'Women Eyeglass',
//     'kid sunglass':    'Kids Sunglass',
//     'kids eyeglass':   'Kids Eyeglass',
//     'contactless':     'Contactless',
//   }[cat] || cat);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: -200% 0; }
//           100% { background-position:  200% 0; }
//         }
//       `}</style>

//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           width: '100%',
//           background: '#ffffff',
//           borderRadius: 24,
//           border: '1px solid rgba(0,0,0,0.07)',
//           boxShadow: hovered
//             ? '0 22px 56px rgba(0,0,0,0.13)'
//             : '0 2px 14px rgba(0,0,0,0.06)',
//           transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
//           transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)',
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           fontFamily: "'Outfit', sans-serif",
//         }}
//       >
//         <div
//           onClick={() => navigate(`/product/${product.id}`)}
//           style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
//         >
//           {/* ── IMAGE AREA ── */}
//           <div style={{
//             position: 'relative',
//             width: '100%',
//             aspectRatio: '4 / 3',
//             background: '#ffffff',
//             overflow: 'hidden',
//           }}>
//             {/* ── BADGES — top left ── */}
//             <div style={{
//               position: 'absolute', top: 12, left: 12, zIndex: 10,
//               display: 'flex', gap: 6, flexWrap: 'wrap',
//             }}>
//               {product.madeInTaiwan && (
//                 <span style={{
//                   background: '#0a0a0a', color: '#fff',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Taiwan</span>
//               )}
//               {hasDiscount && (
//                 <span style={{
//                   background: '#f5f0e8', color: '#92733a',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                   border: '1px solid rgba(146,115,58,0.2)',
//                 }}>{product.discount}</span>
//               )}
//               {product.reviews > 100 && (
//                 <span style={{
//                   background: '#e8f0f5', color: '#2c6e9e',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Top Rated</span>
//               )}
//             </div>

//             {/* ── TRY ON BUTTON (FIXED - same as ProductDetail behavior) ── */}
//             <button
//               onClick={handleTryOn}
//               style={{
//                 position: 'absolute', top: 12, right: 12, zIndex: 10,
//                 display: 'flex', alignItems: 'center', gap: 6,
//                 background: 'linear-gradient(135deg, #E87F24, #F5A623)',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 100,
//                 padding: '6px 14px',
//                 fontSize: 11, fontWeight: 700,
//                 fontFamily: "'Outfit', sans-serif",
//                 cursor: 'pointer', letterSpacing: '0.5px',
//                 boxShadow: '0 2px 8px rgba(232,127,36,0.3)',
//                 transition: 'all 0.25s ease',
//               }}
//               onMouseEnter={e => { 
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,127,36,0.5)';
//               }}
//               onMouseLeave={e => { 
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,127,36,0.3)';
//               }}
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="9"/>
//                 <circle cx="12" cy="10" r="3"/>
//                 <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
//               </svg>
//               TRY ON
//             </button>

//             {/* ── NORMALISED PRODUCT IMAGE ── */}
//             <NormalizedImage
//               src={imageSrc}
//               alt={product.name}
//               hovered={hovered}
//             />

//             {/* Soft bottom fade */}
//             <div style={{
//               position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, zIndex: 2,
//               background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)',
//               pointerEvents: 'none',
//             }} />
//           </div>

//           {/* ── CARD BODY ── */}
//           <div style={{ padding: '15px 17px 19px', display: 'flex', flexDirection: 'column', flex: 1 }}>

//             {/* Category & Type */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
//               <span style={{
//                 fontSize: 9, fontWeight: 600, color: '#92733a',
//                 background: '#f5f0e8', padding: '2px 8px', borderRadius: 100, letterSpacing: '0.04em',
//               }}>
//                 {getCategoryDisplay(product.category)}
//               </span>
//               {product.type && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.type}</span>
//               )}
//               {product.pattern && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.pattern}</span>
//               )}
//             </div>

//             {/* Variant Swatches */}
//             {product.variants?.length > 0 && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
//                 {product.variants.map((variant, i) => (
//                   <button
//                     key={i}
//                     onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedVariant(variant); }}
//                     aria-label={`Select ${variant.colorName}`}
//                     style={{
//                       width: 22, height: 22, borderRadius: '50%',
//                       border: selectedVariant?.colorName === variant.colorName
//                         ? '2px solid #0a0a0a' : '2px solid transparent',
//                       outline: selectedVariant?.colorName === variant.colorName
//                         ? '1.5px solid rgba(0,0,0,0.18)' : 'none',
//                       outlineOffset: 2,
//                       background: variant.hex || '#ccc',
//                       cursor: 'pointer', padding: 0, flexShrink: 0,
//                       transform: selectedVariant?.colorName === variant.colorName ? 'scale(1.18)' : 'scale(1)',
//                       transition: 'transform 0.2s ease, border-color 0.2s ease',
//                       boxShadow: '0 1px 4px rgba(0,0,0,0.14)',
//                     }}
//                   />
//                 ))}
//                 <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 4 }}>
//                   {product.variants.length} colors
//                 </span>
//               </div>
//             )}

//             {/* Product Name */}
//             <h3 style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 17, fontWeight: 700,
//               color: '#0e0e0e', letterSpacing: '-0.01em', lineHeight: 1.25,
//               margin: '0 0 3px',
//               overflow: 'hidden',
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//             }}>
//               {product.name}
//             </h3>

//             {/* Shape · Gender · Frame Color */}
//             <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, margin: '0 0 11px', letterSpacing: '0.02em' }}>
//               {product.shape && product.shape !== 'Other' ? product.shape : 'Contemporary'}
//               {product.gender && (
//                 <span style={{ color: '#C9A227', fontWeight: 500, marginLeft: 5 }}>· {product.gender}</span>
//               )}
//               {product.color && <span style={{ marginLeft: 5 }}>· {product.color}</span>}
//             </p>

//             {/* Detail Description */}
//             {product.detailDescription && (
//               <p style={{
//                 fontSize: 10, color: '#6b7280', lineHeight: 1.35,
//                 margin: '0 0 10px',
//                 overflow: 'hidden',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical',
//               }}>
//                 {product.detailDescription}
//               </p>
//             )}

//             {/* Divider */}
//             <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 11 }} />

//             {/* Pricing row */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <span style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: 20, fontWeight: 700,
//                   color: '#0e0e0e', lineHeight: 1, letterSpacing: '-0.02em',
//                 }}>
//                   Rs {displayPrice}
//                 </span>
//                 {product.discountPrice && product.originalPrice && (
//                   <span style={{ fontSize: 11, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 400 }}>
//                     Rs {product.originalPrice}
//                   </span>
//                 )}
//               </div>

//               {product.reviews > 0 && (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
//                     <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
//                   </svg>
//                   <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>
//                     {product.reviews} reviews
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* SKU */}
//             {product.code && (
//               <p style={{
//                 fontSize: 9, color: '#cbd5e1', marginTop: 10,
//                 letterSpacing: '0.03em', textAlign: 'right',
//               }}>
//                 SKU: {product.code}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;




















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ── same mapping as ProductDetail.jsx ─────────────────────────────────────────
// const CODE_TO_FRAME = {
//   "T04917":"/glass1.png","K01":"/glass2.png","D403054S":"/glass3.png",
//   "20237":"/glass4.png","RB4455F":"/glass5.png","5013":"/glass6.png",
//   "S2160":"/glass7.png","3377":"/glass8.png","28044":"/glass9.png",
//   "99032":"/glass10.png","T1798":"/glass11.png","28118":"/glass12.png",
//   "IPB":"/glass13.png","F0493":"/glass14.png","BL0985":"/glass15.png",
//   "D7481":"/glass16.png","H077048":"/glass17.png","9702":"/glass18.png",
//   "JV5816":"/glass19.png","D8822":"/glass20.png","PS8035":"/glass21.png",
//   "D8815":"/glass22.png","9362":"/glass23.png","D8953":"/glass24.png",
//   "TR1020":"/glass25.png","BV6522":"/glass26.png","D9108":"/glass27.png",
//   "9368":"/glass28.png","K88212":"/glass29.png","B7195":"/glass30.png",
//   "D1256":"/glass31.png","P3002":"/glass32.png","2011":"/glass33.png",
//   "AR2005":"/glass34.png","P210":"/glass35.png","D8954":"/glass36.png",
//   "K58083":"/glass37.png","LFL228":"/glass38.png","OF8651":"/glass39.png",
//   "OF8506":"/glass40.png","1122":"/glass41.png","R1013":"/glass42.png",
// };




// const getFrameId = (product) => {

//   if (product?.code && CODE_TO_FRAME[product.code]) {
//     return CODE_TO_FRAME[product.code];
//   }

  
//   return "/glass1.png"; // Default fallback
// };

// // const getFrameId = (product) =>
// //   (product?.code && CODE_TO_FRAME[product.code]) || "/glass1.png";

// // ── SMART IMAGE NORMALIZER ─────────────────────────────────────────────────────
// const useImageNormalization = (src, targetFill = 0.82) => {
//   const [style, setStyle] = useState({
//     transform: 'scale(1.12)',
//     transformOrigin: 'center center',
//     transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//   });
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!src) return;
//     let cancelled = false;

//     const analyse = async () => {
//       try {
//         const img = new Image();
//         img.crossOrigin = 'anonymous';

//         await new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//           img.src = src;
//         });

//         if (cancelled) return;

//         const W = img.naturalWidth;
//         const H = img.naturalHeight;
//         if (!W || !H) return;

//         const SAMPLE = 320;
//         const sw = SAMPLE;
//         const sh = Math.round((H / W) * SAMPLE);

//         const canvas = document.createElement('canvas');
//         canvas.width = sw;
//         canvas.height = sh;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, sw, sh);

//         const { data } = ctx.getImageData(0, 0, sw, sh);

//         const isContent = (i) => {
//           const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
//           if (a < 30) return false;
//           if (r > 235 && g > 235 && b > 235) return false;
//           return true;
//         };

//         let minX = sw, maxX = 0, minY = sh, maxY = 0;
//         let found = false;

//         for (let y = 0; y < sh; y++) {
//           for (let x = 0; x < sw; x++) {
//             const i = (y * sw + x) * 4;
//             if (isContent(i)) {
//               if (x < minX) minX = x;
//               if (x > maxX) maxX = x;
//               if (y < minY) minY = y;
//               if (y > maxY) maxY = y;
//               found = true;
//             }
//           }
//         }

//         if (!found || cancelled) return;

//         const pad = 4;
//         minX = Math.max(0, minX - pad);
//         minY = Math.max(0, minY - pad);
//         maxX = Math.min(sw - 1, maxX + pad);
//         maxY = Math.min(sh - 1, maxY + pad);

//         const contentW = maxX - minX;
//         const contentH = maxY - minY;
//         const contentCX = (minX + maxX) / 2 / sw;
//         const contentCY = (minY + maxY) / 2 / sh;

//         const scaleX = (targetFill * sw) / contentW;
//         const scaleY = (targetFill * sh) / contentH;
//         const scale = Math.min(scaleX, scaleY, 2.2);

//         const txPct = (0.5 - contentCX) * 100;
//         const tyPct = (0.5 - contentCY) * 100;

//         if (!cancelled) {
//           setStyle({
//             transform: `translate(${txPct.toFixed(2)}%, ${tyPct.toFixed(2)}%) scale(${scale.toFixed(3)})`,
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//             willChange: 'transform',
//           });
//           setReady(true);
//         }
//       } catch {
//         if (!cancelled) {
//           setStyle({
//             transform: 'scale(1.1)',
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//           });
//           setReady(true);
//         }
//       }
//     };

//     analyse();
//     return () => { cancelled = true; };
//   }, [src, targetFill]);

//   return { normalizedStyle: style, ready };
// };

// // ── NORMALISED IMAGE WRAPPER ───────────────────────────────────────────────────
// const NormalizedImage = ({ src, alt, hovered }) => {
//   const { normalizedStyle, ready } = useImageNormalization(src, 0.84);
//   const hoverBoost = hovered ? 1.055 : 1;

//   return (
//     <div style={{
//       width: '100%', height: '100%',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       overflow: 'hidden',
//       background: '#ffffff',
//     }}>
//       <div style={{
//         width: '100%', height: '100%',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         opacity: ready ? 1 : 0,
//         transition: 'opacity 0.35s ease',
//       }}>
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           decoding="async"
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'contain',
//             display: 'block',
//             imageRendering: 'high-quality',
//             ...normalizedStyle,
//             transform: normalizedStyle.transform
//               ? normalizedStyle.transform.replace(
//                   /scale\(([^)]+)\)/,
//                   (_, s) => `scale(${(parseFloat(s) * hoverBoost).toFixed(3)})`
//                 )
//               : `scale(${hoverBoost})`,
//           }}
//         />
//       </div>

//       {!ready && (
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)',
//           backgroundSize: '200% 100%',
//           animation: 'shimmer 1.6s infinite',
//         }} />
//       )}
//     </div>
//   );
// };

// // ── MAIN PRODUCT CARD ─────────────────────────────────────────────────────────
// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
//   const [hovered, setHovered] = useState(false);

//   // ── FIXED TRY ON HANDLER (same as ProductDetail) ────────────────────────────
//   const handleTryOn = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//       const codeToUse = selectedVariant?.code || product.code;
//     navigate('/tryon', {
//       state: {
//         frameId: getFrameId({code: codeToUse}),
//          productCode: codeToUse,
//         productName: product.name,
//         productId: product.id,
//       }
//     });
//   };

//   const displayPrice = product.discountPrice || product.originalPrice;
//   const hasDiscount = product.discount && parseFloat(product.discount) > 0;
//   const imageSrc = selectedVariant?.images?.[0] || '/placeholder-image.jpg';

//   const getCategoryDisplay = (cat) => ({
//     'men sunglass':    'Men Sunglass',
//     'men eyeglass':    'Men Eyeglass',
//     'woman sunglass':  'Women Sunglass',
//     'women eyeglass':  'Women Eyeglass',
//     'kid sunglass':    'Kids Sunglass',
//     'kids eyeglass':   'Kids Eyeglass',
//     'contactless':     'Contactless',
//   }[cat] || cat);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: -200% 0; }
//           100% { background-position:  200% 0; }
//         }
//       `}</style>

//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           width: '100%',
//           background: '#ffffff',
//           borderRadius: 24,
//           border: '1px solid rgba(0,0,0,0.07)',
//           boxShadow: hovered
//             ? '0 22px 56px rgba(0,0,0,0.13)'
//             : '0 2px 14px rgba(0,0,0,0.06)',
//           transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
//           transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)',
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           fontFamily: "'Outfit', sans-serif",
//         }}
//       >
//         <div
//           onClick={() => navigate(`/product/${product.id}`)}
//           style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
//         >
//           {/* ── IMAGE AREA ── */}
//           <div style={{
//             position: 'relative',
//             width: '100%',
//             aspectRatio: '4 / 3',
//             background: '#ffffff',
//             overflow: 'hidden',
//           }}>
//             {/* ── BADGES — top left ── */}
//             <div style={{
//               position: 'absolute', top: 12, left: 12, zIndex: 10,
//               display: 'flex', gap: 6, flexWrap: 'wrap',
//             }}>
//               {product.madeInTaiwan && (
//                 <span style={{
//                   background: '#0a0a0a', color: '#fff',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Taiwan</span>
//               )}
//               {hasDiscount && (
//                 <span style={{
//                   background: '#f5f0e8', color: '#92733a',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                   border: '1px solid rgba(146,115,58,0.2)',
//                 }}>{product.discount}</span>
//               )}
//               {product.reviews > 100 && (
//                 <span style={{
//                   background: '#e8f0f5', color: '#2c6e9e',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Top Rated</span>
//               )}
//             </div>

//             {/* ── TRY ON BUTTON (FIXED - same as ProductDetail behavior) ── */}
//             <button
//               onClick={handleTryOn}
//               style={{
//                 position: 'absolute', top: 12, right: 12, zIndex: 10,
//                 display: 'flex', alignItems: 'center', gap: 6,
//                 background: 'linear-gradient(135deg, #E87F24, #F5A623)',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 100,
//                 padding: '6px 14px',
//                 fontSize: 11, fontWeight: 700,
//                 fontFamily: "'Outfit', sans-serif",
//                 cursor: 'pointer', letterSpacing: '0.5px',
//                 boxShadow: '0 2px 8px rgba(232,127,36,0.3)',
//                 transition: 'all 0.25s ease',
//               }}
//               onMouseEnter={e => { 
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,127,36,0.5)';
//               }}
//               onMouseLeave={e => { 
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,127,36,0.3)';
//               }}
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="9"/>
//                 <circle cx="12" cy="10" r="3"/>
//                 <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
//               </svg>
//               TRY ON
//             </button>

//             {/* ── NORMALISED PRODUCT IMAGE ── */}
//             <NormalizedImage
//               src={imageSrc}
//               alt={product.name}
//               hovered={hovered}
//             />

//             {/* Soft bottom fade */}
//             <div style={{
//               position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, zIndex: 2,
//               background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)',
//               pointerEvents: 'none',
//             }} />
//           </div>

//           {/* ── CARD BODY ── */}
//           <div style={{ padding: '15px 17px 19px', display: 'flex', flexDirection: 'column', flex: 1 }}>

//             {/* Category & Type */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
//               <span style={{
//                 fontSize: 9, fontWeight: 600, color: '#92733a',
//                 background: '#f5f0e8', padding: '2px 8px', borderRadius: 100, letterSpacing: '0.04em',
//               }}>
//                 {getCategoryDisplay(product.category)}
//               </span>
//               {product.type && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.type}</span>
//               )}
//               {product.pattern && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.pattern}</span>
//               )}
//             </div>

//             {/* Variant Swatches */}
//             {product.variants?.length > 0 && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
//                 {product.variants.map((variant, i) => (
//                   <button
//                     key={i}
//                     onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedVariant(variant); }}
//                     aria-label={`Select ${variant.colorName}`}
//                     style={{
//                       width: 22, height: 22, borderRadius: '50%',
//                       border: selectedVariant?.colorName === variant.colorName
//                         ? '2px solid #0a0a0a' : '2px solid transparent',
//                       outline: selectedVariant?.colorName === variant.colorName
//                         ? '1.5px solid rgba(0,0,0,0.18)' : 'none',
//                       outlineOffset: 2,
//                       background: variant.hex || '#ccc',
//                       cursor: 'pointer', padding: 0, flexShrink: 0,
//                       transform: selectedVariant?.colorName === variant.colorName ? 'scale(1.18)' : 'scale(1)',
//                       transition: 'transform 0.2s ease, border-color 0.2s ease',
//                       boxShadow: '0 1px 4px rgba(0,0,0,0.14)',
//                     }}
//                   />
//                 ))}
//                 <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 4 }}>
//                   {product.variants.length} colors
//                 </span>
//               </div>
//             )}

//             {/* Product Name */}
//             <h3 style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 17, fontWeight: 700,
//               color: '#0e0e0e', letterSpacing: '-0.01em', lineHeight: 1.25,
//               margin: '0 0 3px',
//               overflow: 'hidden',
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//             }}>
//               {product.name}
//             </h3>

//             {/* Shape · Gender · Frame Color */}
//             <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, margin: '0 0 11px', letterSpacing: '0.02em' }}>
//               {product.shape && product.shape !== 'Other' ? product.shape : 'Contemporary'}
//               {product.gender && (
//                 <span style={{ color: '#C9A227', fontWeight: 500, marginLeft: 5 }}>· {product.gender}</span>
//               )}
//               {product.color && <span style={{ marginLeft: 5 }}>· {product.color}</span>}
//             </p>

//             {/* Detail Description */}
//             {product.detailDescription && (
//               <p style={{
//                 fontSize: 10, color: '#6b7280', lineHeight: 1.35,
//                 margin: '0 0 10px',
//                 overflow: 'hidden',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical',
//               }}>
//                 {product.detailDescription}
//               </p>
//             )}

//             {/* Divider */}
//             <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 11 }} />

//             {/* Pricing row */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <span style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: 20, fontWeight: 700,
//                   color: '#0e0e0e', lineHeight: 1, letterSpacing: '-0.02em',
//                 }}>
//                   Rs {displayPrice}
//                 </span>
//                 {product.discountPrice && product.originalPrice && (
//                   <span style={{ fontSize: 11, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 400 }}>
//                     Rs {product.originalPrice}
//                   </span>
//                 )}
//               </div>

//               {product.reviews > 0 && (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
//                     <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
//                   </svg>
//                   <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>
//                     {product.reviews} reviews
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* SKU */}
//             {product.code && (
//               <p style={{
//                 fontSize: 9, color: '#cbd5e1', marginTop: 10,
//                 letterSpacing: '0.03em', textAlign: 'right',
//               }}>
//                 SKU: {product.code}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;














// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ── same mapping as ProductDetail.jsx ─────────────────────────────────────────
// const CODE_TO_FRAME = {
//   "T04917":"/glass1.png","K01":"/glass2.png","D403054S":"/glass3.png",
//   "20237":"/glass4.png","RB4455F":"/glass5.png","5013":"/glass6.png",
//   "S2160":"/glass7.png","3377":"/glass8.png","28044":"/glass9.png",
//   "99032":"/glass10.png","T1798":"/glass11.png","28118":"/glass12.png",
//   "IPB":"/glass13.png","F0493":"/glass14.png","BL0985":"/glass15.png",
//   "D7481":"/glass16.png","H077048":"/glass17.png","9702":"/glass18.png",
//   "JV5816":"/glass19.png","D8822":"/glass20.png","PS8035":"/glass21.png",
//   "D8815":"/glass22.png","9362":"/glass23.png","D8953":"/glass24.png",
//   "TR1020":"/glass25.png","BV6522":"/glass26.png","D9108":"/glass27.png",
//   "9368":"/glass28.png","K88212":"/glass29.png","B7195":"/glass30.png",
//   "D1256":"/glass31.png","P3002":"/glass32.png","2011":"/glass33.png",
//   "AR2005":"/glass34.png","P210":"/glass35.png","D8954":"/glass36.png",
//   "K58083":"/glass37.png","LFL228":"/glass38.png","OF8651":"/glass39.png",
//   "OF8506":"/glass40.png","1122":"/glass41.png","R1013":"/glass42.png",
// };

// const getFrameId = (product) => {
//   // First try with product.code
//   if (product?.code && CODE_TO_FRAME[product.code]) {
//     return CODE_TO_FRAME[product.code];
//   }
  
//   // If product.code doesn't match, try extracting from product.name
//   if (product?.name) {
//     // Extract code from name (e.g., "R1013 - RimLess Eye Shape" -> "R1013")
//     const nameCode = product.name.split(' - ')[0];
//     if (CODE_TO_FRAME[nameCode]) {
//       return CODE_TO_FRAME[nameCode];
//     }
//   }
  
//   return "/glass1.png"; // Default fallback
// };

// // ── SMART IMAGE NORMALIZER ─────────────────────────────────────────────────────
// const useImageNormalization = (src, targetFill = 0.82) => {
//   const [style, setStyle] = useState({
//     transform: 'scale(1.12)',
//     transformOrigin: 'center center',
//     transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//   });
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!src) return;
//     let cancelled = false;

//     const analyse = async () => {
//       try {
//         const img = new Image();
//         img.crossOrigin = 'anonymous';

//         await new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//           img.src = src;
//         });

//         if (cancelled) return;

//         const W = img.naturalWidth;
//         const H = img.naturalHeight;
//         if (!W || !H) return;

//         const SAMPLE = 320;
//         const sw = SAMPLE;
//         const sh = Math.round((H / W) * SAMPLE);

//         const canvas = document.createElement('canvas');
//         canvas.width = sw;
//         canvas.height = sh;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, sw, sh);

//         const { data } = ctx.getImageData(0, 0, sw, sh);

//         const isContent = (i) => {
//           const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
//           if (a < 30) return false;
//           if (r > 235 && g > 235 && b > 235) return false;
//           return true;
//         };

//         let minX = sw, maxX = 0, minY = sh, maxY = 0;
//         let found = false;

//         for (let y = 0; y < sh; y++) {
//           for (let x = 0; x < sw; x++) {
//             const i = (y * sw + x) * 4;
//             if (isContent(i)) {
//               if (x < minX) minX = x;
//               if (x > maxX) maxX = x;
//               if (y < minY) minY = y;
//               if (y > maxY) maxY = y;
//               found = true;
//             }
//           }
//         }

//         if (!found || cancelled) return;

//         const pad = 4;
//         minX = Math.max(0, minX - pad);
//         minY = Math.max(0, minY - pad);
//         maxX = Math.min(sw - 1, maxX + pad);
//         maxY = Math.min(sh - 1, maxY + pad);

//         const contentW = maxX - minX;
//         const contentH = maxY - minY;
//         const contentCX = (minX + maxX) / 2 / sw;
//         const contentCY = (minY + maxY) / 2 / sh;

//         const scaleX = (targetFill * sw) / contentW;
//         const scaleY = (targetFill * sh) / contentH;
//         const scale = Math.min(scaleX, scaleY, 2.2);

//         const txPct = (0.5 - contentCX) * 100;
//         const tyPct = (0.5 - contentCY) * 100;

//         if (!cancelled) {
//           setStyle({
//             transform: `translate(${txPct.toFixed(2)}%, ${tyPct.toFixed(2)}%) scale(${scale.toFixed(3)})`,
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//             willChange: 'transform',
//           });
//           setReady(true);
//         }
//       } catch {
//         if (!cancelled) {
//           setStyle({
//             transform: 'scale(1.1)',
//             transformOrigin: 'center center',
//             transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
//           });
//           setReady(true);
//         }
//       }
//     };

//     analyse();
//     return () => { cancelled = true; };
//   }, [src, targetFill]);

//   return { normalizedStyle: style, ready };
// };

// // ── NORMALISED IMAGE WRAPPER ───────────────────────────────────────────────────
// const NormalizedImage = ({ src, alt, hovered }) => {
//   const { normalizedStyle, ready } = useImageNormalization(src, 0.84);
//   const hoverBoost = hovered ? 1.055 : 1;

//   return (
//     <div style={{
//       width: '100%', height: '100%',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       overflow: 'hidden',
//       background: '#ffffff',
//     }}>
//       <div style={{
//         width: '100%', height: '100%',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         opacity: ready ? 1 : 0,
//         transition: 'opacity 0.35s ease',
//       }}>
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           decoding="async"
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'contain',
//             display: 'block',
//             imageRendering: 'high-quality',
//             ...normalizedStyle,
//             transform: normalizedStyle.transform
//               ? normalizedStyle.transform.replace(
//                   /scale\(([^)]+)\)/,
//                   (_, s) => `scale(${(parseFloat(s) * hoverBoost).toFixed(3)})`
//                 )
//               : `scale(${hoverBoost})`,
//           }}
//         />
//       </div>

//       {!ready && (
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)',
//           backgroundSize: '200% 100%',
//           animation: 'shimmer 1.6s infinite',
//         }} />
//       )}
//     </div>
//   );
// };

// // ── MAIN PRODUCT CARD ─────────────────────────────────────────────────────────
// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
//   const [hovered, setHovered] = useState(false);

//   // ── FIXED TRY ON HANDLER ──
//   const handleTryOn = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Use product.code directly since variants don't have separate codes
//     const codeToUse = product.code;
//     const frameId = getFrameId({ code: codeToUse, name: product.name });
    
//     console.log('Navigating to tryon with:', {
//       frameId,
//       productCode: codeToUse,
//       productName: product.name,
//       productId: product.id
//     });
    
//     navigate('/tryon', {
//       state: {
//         frameId: frameId,
//         productCode: codeToUse,
//         productName: product.name,
//         productId: product.id,
//       }
//     });
//   };

//   const displayPrice = product.discountPrice || product.originalPrice;
//   const hasDiscount = product.discount && parseFloat(product.discount) > 0;
//   const imageSrc = selectedVariant?.images?.[0] || product.images?.[0] || '/placeholder-image.jpg';

//   const getCategoryDisplay = (cat) => ({
//     'men sunglass':    'Men Sunglass',
//     'men eyeglass':    'Men Eyeglass',
//     'woman sunglass':  'Women Sunglass',
//     'women eyeglass':  'Women Eyeglass',
//     'kid sunglass':    'Kids Sunglass',
//     'kids eyeglass':   'Kids Eyeglass',
//     'contactless':     'Contactless',
//   }[cat] || cat);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: -200% 0; }
//           100% { background-position:  200% 0; }
//         }
//       `}</style>

//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           width: '100%',
//           background: '#ffffff',
//           borderRadius: 24,
//           border: '1px solid rgba(0,0,0,0.07)',
//           boxShadow: hovered
//             ? '0 22px 56px rgba(0,0,0,0.13)'
//             : '0 2px 14px rgba(0,0,0,0.06)',
//           transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
//           transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)',
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           fontFamily: "'Outfit', sans-serif",
//         }}
//       >
//         <div
//           onClick={() => navigate(`/product/${product.id}`)}
//           style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
//         >
//           {/* ── IMAGE AREA ── */}
//           <div style={{
//             position: 'relative',
//             width: '100%',
//             aspectRatio: '4 / 3',
//             background: '#ffffff',
//             overflow: 'hidden',
//           }}>
//             {/* ── BADGES — top left ── */}
//             <div style={{
//               position: 'absolute', top: 12, left: 12, zIndex: 10,
//               display: 'flex', gap: 6, flexWrap: 'wrap',
//             }}>
//               {product.madeInTaiwan && (
//                 <span style={{
//                   background: '#0a0a0a', color: '#fff',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Taiwan</span>
//               )}
//               {hasDiscount && (
//                 <span style={{
//                   background: '#f5f0e8', color: '#92733a',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                   border: '1px solid rgba(146,115,58,0.2)',
//                 }}>{product.discount}</span>
//               )}
//               {product.reviews > 100 && (
//                 <span style={{
//                   background: '#e8f0f5', color: '#2c6e9e',
//                   fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
//                   padding: '3px 10px', borderRadius: 100,
//                 }}>Top Rated</span>
//               )}
//             </div>

//             {/* ── TRY ON BUTTON (FIXED) ── */}
//             <button
//               onClick={handleTryOn}
//               style={{
//                 position: 'absolute', top: 12, right: 12, zIndex: 10,
//                 display: 'flex', alignItems: 'center', gap: 6,
//                 background: 'linear-gradient(135deg, #E87F24, #F5A623)',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 100,
//                 padding: '6px 14px',
//                 fontSize: 11, fontWeight: 700,
//                 fontFamily: "'Outfit', sans-serif",
//                 cursor: 'pointer', letterSpacing: '0.5px',
//                 boxShadow: '0 2px 8px rgba(232,127,36,0.3)',
//                 transition: 'all 0.25s ease',
//               }}
//               onMouseEnter={e => { 
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,127,36,0.5)';
//               }}
//               onMouseLeave={e => { 
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,127,36,0.3)';
//               }}
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="9"/>
//                 <circle cx="12" cy="10" r="3"/>
//                 <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
//               </svg>
//               TRY ON
//             </button>

//             {/* ── NORMALISED PRODUCT IMAGE ── */}
//             <NormalizedImage
//               src={imageSrc}
//               alt={product.name}
//               hovered={hovered}
//             />

//             {/* Soft bottom fade */}
//             <div style={{
//               position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, zIndex: 2,
//               background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)',
//               pointerEvents: 'none',
//             }} />
//           </div>

//           {/* ── CARD BODY ── */}
//           <div style={{ padding: '15px 17px 19px', display: 'flex', flexDirection: 'column', flex: 1 }}>

//             {/* Category & Type */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
//               <span style={{
//                 fontSize: 9, fontWeight: 600, color: '#92733a',
//                 background: '#f5f0e8', padding: '2px 8px', borderRadius: 100, letterSpacing: '0.04em',
//               }}>
//                 {getCategoryDisplay(product.category)}
//               </span>
//               {product.type && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.type}</span>
//               )}
//               {product.pattern && (
//                 <span style={{
//                   fontSize: 9, fontWeight: 500, color: '#6b7280',
//                   background: '#f3f4f6', padding: '2px 8px', borderRadius: 100,
//                 }}>{product.pattern}</span>
//               )}
//             </div>

//             {/* Variant Swatches */}
//             {product.variants?.length > 0 && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
//                 {product.variants.map((variant, i) => (
//                   <button
//                     key={i}
//                     onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedVariant(variant); }}
//                     aria-label={`Select ${variant.colorName}`}
//                     style={{
//                       width: 22, height: 22, borderRadius: '50%',
//                       border: selectedVariant?.colorName === variant.colorName
//                         ? '2px solid #0a0a0a' : '2px solid transparent',
//                       outline: selectedVariant?.colorName === variant.colorName
//                         ? '1.5px solid rgba(0,0,0,0.18)' : 'none',
//                       outlineOffset: 2,
//                       background: variant.hex || '#ccc',
//                       cursor: 'pointer', padding: 0, flexShrink: 0,
//                       transform: selectedVariant?.colorName === variant.colorName ? 'scale(1.18)' : 'scale(1)',
//                       transition: 'transform 0.2s ease, border-color 0.2s ease',
//                       boxShadow: '0 1px 4px rgba(0,0,0,0.14)',
//                     }}
//                   />
//                 ))}
//                 <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 4 }}>
//                   {product.variants.length} colors
//                 </span>
//               </div>
//             )}

//             {/* Product Name */}
//             <h3 style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 17, fontWeight: 700,
//               color: '#0e0e0e', letterSpacing: '-0.01em', lineHeight: 1.25,
//               margin: '0 0 3px',
//               overflow: 'hidden',
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//             }}>
//               {product.name}
//             </h3>

//             {/* Shape · Gender · Frame Color */}
//             <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, margin: '0 0 11px', letterSpacing: '0.02em' }}>
//               {product.shape && product.shape !== 'Other' ? product.shape : 'Contemporary'}
//               {product.gender && (
//                 <span style={{ color: '#C9A227', fontWeight: 500, marginLeft: 5 }}>· {product.gender}</span>
//               )}
//               {product.color && <span style={{ marginLeft: 5 }}>· {product.color}</span>}
//             </p>

//             {/* Detail Description */}
//             {product.detailDescription && (
//               <p style={{
//                 fontSize: 10, color: '#6b7280', lineHeight: 1.35,
//                 margin: '0 0 10px',
//                 overflow: 'hidden',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical',
//               }}>
//                 {product.detailDescription}
//               </p>
//             )}

//             {/* Divider */}
//             <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 11 }} />

//             {/* Pricing row */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <span style={{
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: 20, fontWeight: 700,
//                   color: '#0e0e0e', lineHeight: 1, letterSpacing: '-0.02em',
//                 }}>
//                   Rs {displayPrice}
//                 </span>
//                 {product.discountPrice && product.originalPrice && (
//                   <span style={{ fontSize: 11, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 400 }}>
//                     Rs {product.originalPrice}
//                   </span>
//                 )}
//               </div>

//               {product.reviews > 0 && (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
//                     <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
//                   </svg>
//                   <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>
//                     {product.reviews} reviews
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* SKU */}
//             {product.code && (
//               <p style={{
//                 fontSize: 9, color: '#cbd5e1', marginTop: 10,
//                 letterSpacing: '0.03em', textAlign: 'right',
//               }}>
//                 SKU: {product.code}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Code → frame mapping (must match TryOn.jsx GLASS_OPTIONS ids) ─────────────
const CODE_TO_FRAME = {
  "T04917":  "/glass1.png",
  "K01":     "/glass2.png",
  "D403054S":"/glass3.png",
  "20237":   "/glass4.png",
  "RB4455F": "/glass5.png",
  "5013":    "/glass6.png",
  "S2160":   "/glass7.png",
  "3377":    "/glass8.png",
  "28044":   "/glass9.png",
  "99032":   "/glass10.png",
  "T1798":   "/glass11.png",
  "28118":   "/glass12.png",
  "IPB":     "/glass13.png",
  "F0493":   "/glass14.png",
  "BL0985":  "/glass15.png",
  "D7481":   "/glass16.png",
  "H077048": "/glass17.png",
  "9702":    "/glass18.png",
  "JV5816":  "/glass19.png",
  "D8822":   "/glass20.png",
  "PS8035":  "/glass21.png",
  "D8815":   "/glass22.png",
  "9362":    "/glass23.png",
  "D8953":   "/glass24.png",
  "TR1020":  "/glass25.png",
  "BV6522":  "/glass26.png",
  "D9108":   "/glass27.png",
  "9368":    "/glass28.png",
  "K88212":  "/glass29.png",
  "B7195":   "/glass30.png",
  "D1256":   "/glass31.png",
  "P3002":   "/glass32.png",
  "2011":    "/glass33.png",
  "AR2005":  "/glass34.png",
  "P210":    "/glass35.png",
  "D8954":   "/glass36.png",
  "K58083":  "/glass37.png",
  "LFL228":  "/glass38.png",
  "OF8651":  "/glass39.png",
  "OF8506":  "/glass40.png",
  "1122":    "/glass41.png",
  "R1013":   "/glass42.png",
};

// ── SMART IMAGE NORMALIZER ─────────────────────────────────────────────────────
const useImageNormalization = (src, targetFill = 0.82) => {
  const [style, setStyle] = useState({
    transform: 'scale(1.12)',
    transformOrigin: 'center center',
    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    const analyse = async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        if (cancelled) return;

        const W = img.naturalWidth;
        const H = img.naturalHeight;
        if (!W || !H) return;

        const SAMPLE = 320;
        const sw = SAMPLE;
        const sh = Math.round((H / W) * SAMPLE);

        const canvas = document.createElement('canvas');
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, sw, sh);

        const { data } = ctx.getImageData(0, 0, sw, sh);

        const isContent = (i) => {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 30) return false;
          if (r > 235 && g > 235 && b > 235) return false;
          return true;
        };

        let minX = sw, maxX = 0, minY = sh, maxY = 0;
        let found = false;

        for (let y = 0; y < sh; y++) {
          for (let x = 0; x < sw; x++) {
            const i = (y * sw + x) * 4;
            if (isContent(i)) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              found = true;
            }
          }
        }

        if (!found || cancelled) return;

        const pad = 4;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(sw - 1, maxX + pad);
        maxY = Math.min(sh - 1, maxY + pad);

        const contentW = maxX - minX;
        const contentH = maxY - minY;
        const contentCX = (minX + maxX) / 2 / sw;
        const contentCY = (minY + maxY) / 2 / sh;

        const scaleX = (targetFill * sw) / contentW;
        const scaleY = (targetFill * sh) / contentH;
        const scale = Math.min(scaleX, scaleY, 2.2);

        const txPct = (0.5 - contentCX) * 100;
        const tyPct = (0.5 - contentCY) * 100;

        if (!cancelled) {
          setStyle({
            transform: `translate(${txPct.toFixed(2)}%, ${tyPct.toFixed(2)}%) scale(${scale.toFixed(3)})`,
            transformOrigin: 'center center',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            willChange: 'transform',
          });
          setReady(true);
        }
      } catch {
        if (!cancelled) {
          setStyle({
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          });
          setReady(true);
        }
      }
    };

    analyse();
    return () => { cancelled = true; };
  }, [src, targetFill]);

  return { normalizedStyle: style, ready };
};

// ── NORMALISED IMAGE WRAPPER ───────────────────────────────────────────────────
const NormalizedImage = ({ src, alt, hovered }) => {
  const { normalizedStyle, ready } = useImageNormalization(src, 0.84);
  const hoverBoost = hovered ? 1.055 : 1;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      background: '#ffffff',
    }}>
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            imageRendering: 'high-quality',
            ...normalizedStyle,
            transform: normalizedStyle.transform
              ? normalizedStyle.transform.replace(
                  /scale\(([^)]+)\)/,
                  (_, s) => `scale(${(parseFloat(s) * hoverBoost).toFixed(3)})`
                )
              : `scale(${hoverBoost})`,
          }}
        />
      </div>

      {!ready && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s infinite',
        }} />
      )}
    </div>
  );
};

// ── MAIN PRODUCT CARD ─────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [hovered, setHovered] = useState(false);

  // ── TRY ON: navigate with ?code= URL param ────────────────────────────────
  const handleTryOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const code = product.code;
    // Navigate to /tryon?code=T04917&name=Product+Name
    // TryOn.jsx reads this param and selects the correct frame
    navigate(`/tryon?code=${encodeURIComponent(code)}&name=${encodeURIComponent(product.name)}`);
  };

  const displayPrice = product.discountPrice || product.originalPrice;
  const hasDiscount = product.discount && parseFloat(product.discount) > 0;
  const imageSrc = selectedVariant?.images?.[0] || product.images?.[0] || '/placeholder-image.jpg';

  const getCategoryDisplay = (cat) => ({
    'men sunglass':   'Men Sunglass',
    'men eyeglass':   'Men Eyeglass',
    'woman sunglass': 'Women Sunglass',
    'women eyeglass': 'Women Eyeglass',
    'kid sunglass':   'Kids Sunglass',
    'kids eyeglass':  'Kids Eyeglass',
    'contactless':    'Contactless',
  }[cat] || cat);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          background: '#ffffff',
          borderRadius: 24,
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: hovered
            ? '0 22px 56px rgba(0,0,0,0.13)'
            : '0 2px 14px rgba(0,0,0,0.06)',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1), box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
        >
          {/* ── IMAGE AREA ── */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            background: '#ffffff',
            overflow: 'hidden',
          }}>
            {/* Badges */}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {product.madeInTaiwan && (
                <span style={{ background: '#0a0a0a', color: '#fff', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100 }}>Taiwan</span>
              )}
              {hasDiscount && (
                <span style={{ background: '#f5f0e8', color: '#92733a', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(146,115,58,0.2)' }}>{product.discount}</span>
              )}
              {product.reviews > 100 && (
                <span style={{ background: '#e8f0f5', color: '#2c6e9e', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100 }}>Top Rated</span>
              )}
            </div>

            {/* ── TRY ON button → passes ?code= in URL ── */}
            <button
              onClick={handleTryOn}
              style={{
                position: 'absolute', top: 12, right: 12, zIndex: 10,
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(135deg, #E87F24, #F5A623)',
                color: '#fff', border: 'none', borderRadius: 100,
                padding: '6px 14px', fontSize: 11, fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer', letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(232,127,36,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,127,36,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,127,36,0.3)'; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <circle cx="12" cy="10" r="3"/>
                <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
              </svg>
              TRY ON
            </button>

            <NormalizedImage src={imageSrc} alt={product.name} hovered={hovered} />

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, zIndex: 2, background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)', pointerEvents: 'none' }} />
          </div>

          {/* ── CARD BODY ── */}
          <div style={{ padding: '15px 17px 19px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#92733a', background: '#f5f0e8', padding: '2px 8px', borderRadius: 100, letterSpacing: '0.04em' }}>{getCategoryDisplay(product.category)}</span>
              {product.type && <span style={{ fontSize: 9, fontWeight: 500, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 100 }}>{product.type}</span>}
              {product.pattern && <span style={{ fontSize: 9, fontWeight: 500, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 100 }}>{product.pattern}</span>}
            </div>

            {product.variants?.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedVariant(variant); }}
                    aria-label={`Select ${variant.colorName}`}
                    style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: selectedVariant?.colorName === variant.colorName ? '2px solid #0a0a0a' : '2px solid transparent',
                      outline: selectedVariant?.colorName === variant.colorName ? '1.5px solid rgba(0,0,0,0.18)' : 'none',
                      outlineOffset: 2, background: variant.hex || '#ccc',
                      cursor: 'pointer', padding: 0, flexShrink: 0,
                      transform: selectedVariant?.colorName === variant.colorName ? 'scale(1.18)' : 'scale(1)',
                      transition: 'transform 0.2s ease, border-color 0.2s ease',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.14)',
                    }}
                  />
                ))}
                <span style={{ fontSize: 9, color: '#9ca3af', marginLeft: 4 }}>{product.variants.length} colors</span>
              </div>
            )}

            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: '#0e0e0e', letterSpacing: '-0.01em', lineHeight: 1.25, margin: '0 0 3px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {product.name}
            </h3>

            <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, margin: '0 0 11px', letterSpacing: '0.02em' }}>
              {product.shape && product.shape !== 'Other' ? product.shape : 'Contemporary'}
              {product.gender && <span style={{ color: '#C9A227', fontWeight: 500, marginLeft: 5 }}>· {product.gender}</span>}
              {product.color && <span style={{ marginLeft: 5 }}>· {product.color}</span>}
            </p>

            {product.detailDescription && (
              <p style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.35, margin: '0 0 10px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {product.detailDescription}
              </p>
            )}

            <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 11 }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#0e0e0e', lineHeight: 1, letterSpacing: '-0.02em' }}>Rs {displayPrice}</span>
                {product.discountPrice && product.originalPrice && (
                  <span style={{ fontSize: 11, color: '#C0C0C0', textDecoration: 'line-through', fontWeight: 400 }}>Rs {product.originalPrice}</span>
                )}
              </div>
              {product.reviews > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" /></svg>
                  <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>{product.reviews} reviews</span>
                </div>
              )}
            </div>

            {product.code && (
              <p style={{ fontSize: 9, color: '#cbd5e1', marginTop: 10, letterSpacing: '0.03em', textAlign: 'right' }}>SKU: {product.code}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;