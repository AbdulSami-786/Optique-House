// // product detail






// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import productsData from '../data/data.json';

// // ── same mapping as Products.jsx ──────────────────────────────────────────────
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

// // ── Helper Components ─────────────────────────────────────────────────────────
// const StarRating = ({ rating }) => {
//   const full = Math.floor(rating);
//   const half = rating % 1 >= 0.5;
//   return (
//     <div style={{ display:'flex', alignItems:'center', gap:4 }}>
//       {[...Array(5)].map((_,i) => (
//         <svg key={i} width="20" height="20" viewBox="0 0 20 20"
//           style={{ color: i < full || (i===full && half) ? '#FBBF24' : '#D1D5DB', fill:'currentColor' }}>
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//         </svg>
//       ))}
//       <span style={{ fontSize:13, color:'#6B7280', marginLeft:6 }}>({rating})</span>
//     </div>
//   );
// };

// const QuantitySelector = ({ quantity, setQuantity, maxStock=10 }) => (
//   <div style={{ display:'flex', alignItems:'center', border:'1px solid #E5E7EB', borderRadius:999, overflow:'hidden' }}>
//     <button onClick={() => setQuantity(p => Math.max(1,p-1))}
//       style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
//       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
//     </button>
//     <span style={{ width:44, textAlign:'center', fontWeight:600 }}>{quantity}</span>
//     <button onClick={() => setQuantity(p => Math.min(maxStock,p+1))}
//       style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
//       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
//     </button>
//   </div>
// );

// const ColorVariantSelector = ({ variants, selectedVariant, setSelectedVariant }) => {
//   if (!variants?.length) return null;
//   return (
//     <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
//       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//         <span style={{ fontSize:13, fontWeight:600, color:'#374151' }}>Color / Variant</span>
//         <span style={{ fontSize:11, color:'#6B7280', background:'#F3F4F6', padding:'2px 10px', borderRadius:999 }}>
//           {variants.length} {variants.length===1?'Color':'Colors'}
//         </span>
//       </div>
//       <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
//         {variants.map(v => {
//           const sel = selectedVariant?.colorName === v.colorName;
//           return (
//             <label key={v.colorName} style={{
//               display:'flex', alignItems:'center', gap:10, padding:'8px 16px',
//               borderRadius:999, border:`2px solid ${sel?'#000':'#E5E7EB'}`,
//               background:sel?'#000':'#fff', color:sel?'#fff':'#374151',
//               cursor:'pointer', transition:'all .2s',
//             }}>
//               <input type="radio" name="color" value={v.colorName}
//                 checked={sel} onChange={() => setSelectedVariant(v)} style={{ display:'none' }} />
//               <div style={{ width:18, height:18, borderRadius:'50%', background:v.hex||'#ccc',
//                 border:'2px solid rgba(255,255,255,.5)', flexShrink:0 }} />
//               <span style={{ fontSize:13, fontWeight:500 }}>{v.colorName}</span>
//               {sel && <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ── Prescription helpers ───────────────────────────────────────────────────────
// const LENS_OPTIONS = [
//   { id:'standard',     name:'Standard Lenses',     price:850,  desc:'Clear vision with anti-reflective coating' },
//   { id:'blueCut',      name:'Blue Cut Lenses',      price:1800, desc:'Protects against harmful blue light' },
//   { id:'photochromic', name:'hight UV',  price:4500, desc:'Auto-darken in sunlight' },
// ];

// const emptyEye = () => ({ sphere:'', cylinder:'', axis:'', addition:'' });

// const ScrollNumInput = ({ label, value, onChange, min, max, step, unit, required, placeholder, showSign }) => {
//   const num   = value === '' ? '' : parseFloat(value);
//   const color = typeof num === 'number' && !isNaN(num)
//     ? num > 0 ? '#16a34a' : num < 0 ? '#dc2626' : '#111' : '#111';

//   const fmt = () => {
//     if (num === '' || isNaN(num)) return '';
//     if (!showSign) return String(num);
//     return num > 0 ? `+${num}` : String(num);
//   };

//   const step_ = (dir) => {
//     const cur = typeof num === 'number' && !isNaN(num) ? num : 0;
//     let nv = Math.round((cur + dir * step) / step) * step;
//     nv = Math.min(max, Math.max(min, nv));
//     onChange(nv);
//   };

//   return (
//     <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
//       <label style={{ fontSize:11, fontWeight:600, color:'#374151' }}>
//         {label}{required && <span style={{ color:'#ef4444' }}> *</span>}
//       </label>
//       <div style={{ display:'flex', alignItems:'center', gap:6 }}>
//         <button type="button" onClick={() => step_(-1)}
//           style={{ width:34, height:34, borderRadius:8, border:'1px solid #E5E7EB', background:'#F9FAFB', cursor:'pointer', flexShrink:0 }}>−</button>
//         <input
//           type="text" value={fmt()} placeholder={placeholder}
//           onChange={e => {
//             let v = e.target.value.replace(/\+/g,'');
//             if (v===''||v==='-') { onChange(v); return; }
//             const n = parseFloat(v);
//             if (!isNaN(n)) onChange(Math.min(max, Math.max(min, Math.round(n/step)*step)));
//           }}
//           style={{ flex:1, textAlign:'center', padding:'6px 4px', border:'1px solid #E5E7EB',
//             borderRadius:8, fontWeight:600, fontSize:13, color, outline:'none' }}
//         />
//         {unit && <span style={{ fontSize:11, color:'#9CA3AF', marginLeft:-22, pointerEvents:'none' }}>{unit}</span>}
//         <button type="button" onClick={() => step_(1)}
//           style={{ width:34, height:34, borderRadius:8, border:'1px solid #E5E7EB', background:'#F9FAFB', cursor:'pointer', flexShrink:0 }}>+</button>
//       </div>
//       <div style={{ display:'flex', justifyContent:'space-between' }}>
//         <span style={{ fontSize:9, color:'#9CA3AF' }}>{min} to {max}</span>
//         <span style={{ fontSize:9, color:'#9CA3AF' }}>step {step}</span>
//       </div>
//     </div>
//   );
// };

// const PrescriptionModal = ({ show, onClose, onSave, existing }) => {
//   const [lensType, setLensType] = useState(existing?.lensType || 'standard');
//   const [right,    setRight]    = useState(existing?.rightEye || emptyEye());
//   const [left,     setLeft]     = useState(existing?.leftEye  || emptyEye());
//   const [errors,   setErrors]   = useState({});

//   const needsAxis = eye => eye.cylinder !== '' && eye.cylinder !== 0 && eye.cylinder !== undefined;

//   const validate = () => {
//     const e = {};
//     if (needsAxis(right) && (right.axis===''||right.axis===null)) e.ra = 'Axis required when Cylinder has value';
//     if (needsAxis(left)  && (left.axis==='' ||left.axis===null))  e.la = 'Axis required when Cylinder has value';
//     setErrors(e);
//     return !Object.keys(e).length;
//   };

//   const save = () => {
//     if (!validate()) return;
//     const lens = LENS_OPTIONS.find(l => l.id===lensType);
//     onSave({ lensType, lensName:lens.name, lensPrice:lens.price, rightEye:right, leftEye:left });
//     onClose();
//   };

//   if (!show) return null;

//   const EyeSection = ({ label, abbr, eye, setEye, axisErr }) => (
//     <div style={{ background:'#F9FAFB', borderRadius:14, border:'1px solid #E5E7EB', padding:18, marginBottom:16 }}>
//       <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
//         <div style={{ width:34, height:34, borderRadius:8, background:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center' }}>
//           <span style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{abbr}</span>
//         </div>
//         <div>
//           <div style={{ fontWeight:700, fontSize:15 }}>{label}</div>
//           <div style={{ fontSize:10, color:'#6B7280' }}>{abbr==='R'?'OD – Oculus Dexter':'OS – Oculus Sinister'}</div>
//         </div>
//       </div>
//       <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
//         <ScrollNumInput label="Sphere" value={eye.sphere} onChange={v => setEye(p=>({...p,sphere:v}))} min={-20} max={20} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
//         <ScrollNumInput label="Cylinder" value={eye.cylinder} onChange={v => setEye(p=>({...p,cylinder:v}))} min={-6} max={6} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
//         <div>
//           <ScrollNumInput label="Axis" value={eye.axis} onChange={v => setEye(p=>({...p,axis:v}))} min={0} max={180} step={1} unit="°" required={needsAxis(eye)} placeholder="0" showSign={false} />
//           {axisErr && <p style={{ color:'#ef4444', fontSize:10, marginTop:3 }}>{axisErr}</p>}
//         </div>
//         <ScrollNumInput label="Addition" value={eye.addition} onChange={v => setEye(p=>({...p,addition:v}))} min={0} max={3.5} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
//       </div>
//     </div>
//   );

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,.5)',
//       backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, overflowY:'auto' }}>
//       <div style={{ background:'#fff', borderRadius:20, maxWidth:680, width:'100%',
//         padding:24, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 25px 50px rgba(0,0,0,.2)' }}>

//         {/* Header */}
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, paddingBottom:14, borderBottom:'1px solid #F3F4F6' }}>
//           <div>
//             <h3 style={{ fontSize:18, fontWeight:700, margin:0 }}>Prescription Details</h3>
//             <p style={{ fontSize:11, color:'#6B7280', margin:'4px 0 0' }}>Enter your optical prescription information</p>
//           </div>
//           <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:999, color:'#6B7280' }}>
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
//           </button>
//         </div>

//         {/* Info */}
//         <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:12, marginBottom:18 }}>
//           <p style={{ fontSize:11, color:'#1D4ED8', margin:0 }}>
//             All fields optional. Sphere & Cylinder can be ±. Axis required only if Cylinder has a value.
//           </p>
//         </div>

//         {/* Lens Type */}
//         <div style={{ marginBottom:20 }}>
//           <p style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Select Lens Type</p>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:10 }}>
//             {LENS_OPTIONS.map(l => (
//               <label key={l.id} style={{
//                 border:`2px solid ${lensType===l.id?'#000':'#E5E7EB'}`,
//                 borderRadius:12, padding:12, cursor:'pointer',
//                 background:lensType===l.id?'#F9FAFB':'#fff', position:'relative',
//               }}>
//                 <input type="radio" name="lens" value={l.id} checked={lensType===l.id}
//                   onChange={() => setLensType(l.id)} style={{ display:'none' }} />
//                 <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
//                   <span style={{ fontWeight:600, fontSize:12 }}>{l.name}</span>
//                   <span style={{ fontWeight:700, fontSize:12 }}>+{l.price}</span>
//                 </div>
//                 <p style={{ fontSize:10, color:'#6B7280', margin:0 }}>{l.desc}</p>
//                 {lensType===l.id && (
//                   <div style={{ position:'absolute', top:8, right:8 }}>
//                     <svg width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                   </div>
//                 )}
//               </label>
//             ))}
//           </div>
//         </div>

//         <EyeSection label="Right Eye" abbr="R" eye={right} setEye={setRight} axisErr={errors.ra} />
//         <EyeSection label="Left Eye"  abbr="L" eye={left}  setEye={setLeft}  axisErr={errors.la} />

//         {/* Summary */}
//         <div style={{ background:'#F3F4F6', borderRadius:10, padding:12, marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <span style={{ fontSize:13, fontWeight:600 }}>Lens Extra Charge:</span>
//           <span style={{ fontSize:18, fontWeight:700 }}>+PKR {LENS_OPTIONS.find(l=>l.id===lensType)?.price}</span>
//         </div>

//         {/* Buttons */}
//         <div style={{ display:'flex', gap:12 }}>
//           <button onClick={onClose}
//             style={{ flex:1, padding:'10px 0', borderRadius:10, border:'none', background:'#F3F4F6', cursor:'pointer', fontWeight:600, fontSize:13 }}>
//             Cancel
//           </button>
//           <button onClick={save}
//             style={{ flex:1, padding:'10px 0', borderRadius:10, border:'none', background:'#000', color:'#fff', cursor:'pointer', fontWeight:600, fontSize:13 }}>
//             Save Prescription
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Main ProductDetail ────────────────────────────────────────────────────────
// export default function ProductDetail() {
//   const { id }   = useParams();
//   const navigate = useNavigate();

//   const [product,          setProduct]          = useState(null);
//   const [loading,          setLoading]          = useState(true);
//   const [error,            setError]            = useState(null);
//   const [quantity,         setQuantity]         = useState(1);
//   const [selectedVariant,  setSelectedVariant]  = useState(null);
//   const [showRx,           setShowRx]           = useState(false);
//   const [rxData,           setRxData]           = useState(null);
//   const [activeImg,        setActiveImg]        = useState('');
//   const [activeIdx,        setActiveIdx]        = useState(0);
//   const [cartToast,        setCartToast]        = useState(false);

//   // Reload once per product visit to clear stale state
//   useEffect(() => {
//     const key = `pdReloaded_${id}`;
//     if (!sessionStorage.getItem(key)) {
//       sessionStorage.setItem(key, '1');
//       window.location.reload();
//       return;
//     }
//     const t = setTimeout(() => sessionStorage.removeItem(key), 600);
//     return () => clearTimeout(t);
//   }, [id]);

//   useEffect(() => { window.scrollTo(0,0); }, []);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       const all  = Array.isArray(productsData) ? productsData : productsData.products || [];
//       const found = all.find(p => p.id === parseInt(id));
//       if (!found) throw new Error('Product not found');

//       const imgs = [];
//       found.variants?.forEach(v => v.images?.forEach(i => imgs.push(i)));

//       setProduct({
//         ...found,
//         originalPrice: parseFloat(String(found.originalPrice).replace(/,/g,'')),
//         discountPrice: parseFloat(String(found.discountPrice).replace(/,/g,'')),
//         rating:   4.5,
//         images:   imgs,
//         features: found.features  || ['Premium quality','UV protection','Scratch resistant','Lightweight'],
//         specifications: found.specifications || {
//           Material:   found.type  || 'Premium Plastic',
//           'Frame Type': found.shape || 'Standard',
//           Gender:     found.gender || 'Unisex',
//         },
//       });

//       const firstVariant = found.variants?.[0];
//       setSelectedVariant(firstVariant || null);
//       setActiveImg(firstVariant?.images?.[0] || imgs[0] || '');
//       setLoading(false);
//     } catch (e) {
//       setError(e.message);
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (selectedVariant?.images?.[0]) setActiveImg(selectedVariant.images[0]);
//   }, [selectedVariant]);

//   const framePrice = product?.discountPrice || product?.originalPrice || 0;
//   const lensCharge = rxData?.lensPrice || 0;
//   const totalPrice = framePrice + lensCharge;

//   const addToCart = () => {
//     if (!product) return;
//     const cart  = JSON.parse(localStorage.getItem('cart')) || [];
//     const item  = {
//       id: product.id, name: product.name,
//       framePrice, lensExtraCharge: lensCharge, totalPrice,
//       quantity, selectedVariant, image: activeImg,
//       prescription: rxData || null,
//     };
//     const idx = cart.findIndex(i =>
//       i.id===item.id &&
//       i.selectedVariant?.colorName===item.selectedVariant?.colorName &&
//       i.prescription?.lensType===item.prescription?.lensType
//     );
//     if (idx !== -1) cart[idx].quantity += quantity;
//     else cart.push(item);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     window.dispatchEvent(new Event('cartUpdated'));
//     setCartToast(true);
//     setTimeout(() => setCartToast(false), 2200);
//   };

//   const handleTryOn = () => {
//     if (!product) return;
//     navigate('/tryon', {
//       state: {
//         frameId:     getFrameId(product),
//         productName: product.name,
//         productId:   product.id,
//       }
//     });
//   };

//   if (loading) return (
//     <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
//       <div style={{ textAlign:'center' }}>
//         <div style={{ width:56, height:56, border:'4px solid #E5E7EB', borderTopColor:'#000',
//           borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
//         <p style={{ color:'#6B7280' }}>Loading product…</p>
//       </div>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   if (error || !product) return (
//     <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
//       <h2 style={{ fontSize:22, fontWeight:700 }}>{error || 'Product Not Found'}</h2>
//       <button onClick={() => navigate('/')}
//         style={{ background:'#000', color:'#fff', padding:'12px 28px', borderRadius:999, border:'none', cursor:'pointer', fontWeight:600 }}>
//         Back to Home
//       </button>
//     </div>
//   );

//   const discountPct = product.discount
//     ? parseInt(product.discount)
//     : Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100);

//   return (
//     <div style={{ background:'#fff', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
//       {/* Ambient bg */}
//       <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
//         <div style={{ position:'absolute', top:'25%', left:'25%', width:384, height:384,
//           borderRadius:'50%', background:'rgba(196,181,253,.3)', filter:'blur(80px)', mixBlendMode:'multiply' }} />
//         <div style={{ position:'absolute', bottom:'25%', right:'25%', width:384, height:384,
//           borderRadius:'50%', background:'rgba(147,197,253,.3)', filter:'blur(80px)', mixBlendMode:'multiply' }} />
//       </div>

//       <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>
//         {/* Breadcrumb */}
//         <nav style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#6B7280', marginBottom:32 }}>
//           <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B7280' }}>Home</button>
//           <span>›</span>
//           <button onClick={() => navigate('/products')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B7280', textTransform:'capitalize' }}>
//             {product.category?.replace('-',' ') || 'Shop'}
//           </button>
//           <span>›</span>
//           <span style={{ color:'#111', fontWeight:500 }}>{product.name}</span>
//         </nav>

//         {/* Main grid */}
//         <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
//           {/* Images */}
//           <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
//             <div style={{ borderRadius:24, overflow:'hidden', background:'#F9FAFB',
//               aspectRatio:'1/1', boxShadow:'0 4px 24px rgba(0,0,0,.08)' }}>
//               <img src={`.${activeImg}`} alt={product.name}
//                 style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s ease' }}
//                 onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
//                 onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
//               />
//             </div>
//             {product.images?.length > 1 && (
//               <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4 }}>
//                 {product.images.map((img, i) => (
//                   <button key={i} onClick={() => { setActiveImg(img); setActiveIdx(i); }}
//                     style={{ width:72, height:72, borderRadius:12, overflow:'hidden', flexShrink:0,
//                       border:`2px solid ${activeIdx===i?'#000':'transparent'}`,
//                       opacity: activeIdx===i ? 1 : 0.65, cursor:'pointer', transition:'all .2s' }}>
//                     <img src={`.${img}`} alt={`view ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Info */}
//           <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
//             {/* Badges */}
//             <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
//               {discountPct > 0 && (
//                 <span style={{ background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>
//                   {discountPct}% OFF
//                 </span>
//               )}
//               {product.madeInTaiwan && <span style={{ background:'#DBEAFE', color:'#1D4ED8', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>🇹🇼 Made in Taiwan</span>}
//               {product.freeShipping && <span style={{ background:'#D1FAE5', color:'#065F46', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>Free Shipping</span>}
//               <span style={{ background: product.inStock!==false?'#D1FAE5':'#FEE2E2',
//                 color: product.inStock!==false?'#065F46':'#991B1B',
//                 fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>
//                 {product.inStock!==false ? 'In Stock' : 'Out of Stock'}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, lineHeight:1.2, margin:0 }}>
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div style={{ display:'flex', alignItems:'center', gap:12 }}>
//               <StarRating rating={product.rating||4.5} />
//               <span style={{ fontSize:13, color:'#6B7280' }}>{product.reviews||0} reviews</span>
//             </div>

//             {/* Price */}
//             <div>
//               <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
//                 <span style={{ fontSize:28, fontWeight:800 }}>PKR {framePrice.toLocaleString()}</span>
//                 {product.originalPrice !== framePrice && (
//                   <>
//                     <span style={{ fontSize:16, color:'#9CA3AF', textDecoration:'line-through' }}>PKR {product.originalPrice.toLocaleString()}</span>
//                     <span style={{ fontSize:13, color:'#16A34A', fontWeight:600 }}>{product.discount} off</span>
//                   </>
//                 )}
//               </div>
//               {rxData && (
//                 <div style={{ marginTop:6, fontSize:13 }}>
//                   <span style={{ color:'#6B7280' }}>+ Lens: </span>
//                   <span style={{ fontWeight:700, color:'#2563EB' }}>PKR {lensCharge.toLocaleString()}</span>
//                   <span style={{ color:'#9CA3AF', marginLeft:6 }}>({rxData.lensName})</span>
//                 </div>
//               )}
//               {rxData && (
//                 <div style={{ marginTop:4, fontWeight:700, fontSize:15 }}>
//                   Total: <span>PKR {totalPrice.toLocaleString()}</span>
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <p style={{ color:'#4B5563', lineHeight:1.7, borderTop:'1px solid #F3F4F6', paddingTop:16, margin:0, fontSize:14 }}>
//               {product.description}
//             </p>

//             {/* Variants */}
//             {product.variants?.length > 0 && (
//               <ColorVariantSelector
//                 variants={product.variants}
//                 selectedVariant={selectedVariant}
//                 setSelectedVariant={setSelectedVariant}
//               />
//             )}

//             {/* Prescription block */}
//             <div style={{ background:'#EFF6FF', borderRadius:16, padding:16, border:'1px solid #BFDBFE' }}>
//               <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
//                 <svg width="18" height="18" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:2 }}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <div style={{ flex:1 }}>
//                   <p style={{ fontWeight:600, color:'#1E40AF', fontSize:13, margin:'0 0 4px' }}>Prescription Lenses (Extra Charge)</p>
//                   <p style={{ fontSize:11, color:'#3B82F6', margin:'0 0 8px' }}>Add prescription & choose lens type. Extra charges apply.</p>
//                   <button onClick={() => setShowRx(true)}
//                     style={{ fontSize:11, color:'#1D4ED8', fontWeight:700, textDecoration:'underline', background:'none', border:'none', cursor:'pointer', padding:0 }}>
//                     {rxData ? 'Edit Prescription →' : 'Add Prescription →'}
//                   </button>
//                   {rxData && (
//                     <div style={{ marginTop:8, fontSize:11, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:8, padding:8, color:'#166534' }}>
//                       <p style={{ margin:'0 0 2px' }}>✓ {rxData.lensName} (+PKR {rxData.lensPrice})</p>
//                       <p style={{ margin:0, color:'#6B7280' }}>
//                         R: {rxData.rightEye.sphere !== '' ? `${rxData.rightEye.sphere > 0?'+':''}${rxData.rightEye.sphere}D` : 'N/A'}
//                         {' | '}
//                         L: {rxData.leftEye.sphere  !== '' ? `${rxData.leftEye.sphere  > 0?'+':''}${rxData.leftEye.sphere}D`  : 'N/A'}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Quantity + Actions */}
//             <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center' }}>
//               <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={20} />
//               <button onClick={addToCart} disabled={product.inStock===false}
//                 style={{ flex:1, minWidth:130, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
//                   background:'#111', color:'#fff', padding:'12px 20px', borderRadius:999, border:'none',
//                   fontWeight:700, fontSize:14, cursor:'pointer', opacity:product.inStock===false?0.5:1, transition:'background .2s' }}
//                 onMouseEnter={e => e.currentTarget.style.background='#000'}
//                 onMouseLeave={e => e.currentTarget.style.background='#111'}
//               >
//                 <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
//                 Add to Cart
//               </button>
//               <button onClick={() => { addToCart(); navigate('/checkout'); }} disabled={product.inStock===false}
//                 style={{ padding:'12px 22px', borderRadius:999, border:'none', background:'#2563EB', color:'#fff',
//                   fontWeight:700, fontSize:14, cursor:'pointer', opacity:product.inStock===false?0.5:1, transition:'background .2s' }}
//                 onMouseEnter={e => e.currentTarget.style.background='#1D4ED8'}
//                 onMouseLeave={e => e.currentTarget.style.background='#2563EB'}
//               >
//                 Buy Now
//               </button>
//             </div>

//             {/* ── Try On Button ── */}
//             <button
//               onClick={handleTryOn}
//               style={{
//                 width:'100%', padding:'13px 0',
//                 background:'linear-gradient(135deg,#E87F24,#F5A623)',
//                 color:'#fff', border:'none', borderRadius:14, cursor:'pointer',
//                 fontWeight:800, fontSize:15, letterSpacing:'.5px',
//                 display:'flex', alignItems:'center', justifyContent:'center', gap:10,
//                 boxShadow:'0 4px 20px rgba(232,127,36,.40)',
//                 transition:'all .25s ease',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(232,127,36,.55)'; }}
//               onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(232,127,36,.40)'; }}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
//               </svg>
//               Try On Virtually — AR
//             </button>

//             {/* Trust badges */}
//             <div style={{ display:'flex', flexWrap:'wrap', gap:20, borderTop:'1px solid #F3F4F6', paddingTop:16 }}>
//               {[['30-Day Returns','M5 13l4 4L19 7'],['Secure Checkout','M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'],['Secure Payment','M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z']].map(([label, d]) => (
//                 <div key={label} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#4B5563' }}>
//                   <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d}/></svg>
//                   {label}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Features */}
//         <div style={{ marginTop:60 }}>
//           <h2 style={{ fontSize:20, fontWeight:700, marginBottom:20, paddingBottom:12, borderBottom:'2px solid #000', display:'inline-block' }}>Features</h2>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12 }}>
//             {product.features?.map((f,i) => (
//               <div key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'#374151', fontSize:14 }}>
//                 <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 {f}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Cart toast */}
//       {cartToast && (
//         <div style={{ position:'fixed', top:90, right:20, zIndex:9999, background:'#22c55e',
//           color:'#fff', padding:'12px 22px', borderRadius:999, fontWeight:600,
//           boxShadow:'0 4px 16px rgba(0,0,0,.2)', animation:'fadeUp .3s ease' }}>
//           ✓ Added to cart!
//         </div>
//       )}

//       {/* WhatsApp */}
//       <div style={{ position:'fixed', bottom:32, right:32, zIndex:50 }}>
//         <button style={{ background:'#25D366', color:'#fff', width:52, height:52, borderRadius:'50%',
//           border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
//           boxShadow:'0 4px 20px rgba(0,0,0,.25)', transition:'transform .2s' }}
//           onMouseEnter={e => e.currentTarget.style.transform='scale(1.12)'}
//           onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
//           <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="26" height="26" alt="WhatsApp" />
//         </button>
//       </div>

//       <PrescriptionModal show={showRx} onClose={() => setShowRx(false)} onSave={setRxData} existing={rxData} />

//       <style>{`
//         @keyframes spin    { to { transform:rotate(360deg) } }
//         @keyframes fadeUp  { from { opacity:0;transform:translateY(10px) } to { opacity:1;transform:translateY(0) } }
//         @media(max-width:768px){
//           div[style*="grid-template-columns: 1fr 1fr"] {
//             grid-template-columns:1fr !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


































import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/data.json';

// ── same mapping as Products.jsx ──────────────────────────────────────────────
const CODE_TO_FRAME = {
  "T04917":"/glass1.png","K01":"/glass2.png","D403054S":"/glass3.png",
  "20237":"/glass4.png","RB4455F":"/glass5.png","5013":"/glass6.png",
  "S2160":"/glass7.png","3377":"/glass8.png","28044":"/glass9.png",
  "99032":"/glass10.png","T1798":"/glass11.png","28118":"/glass12.png",
  "IPB":"/glass13.png","F0493":"/glass14.png","BL0985":"/glass15.png",
  "D7481":"/glass16.png","H077048":"/glass17.png","9702":"/glass18.png",
  "JV5816":"/glass19.png","D8822":"/glass20.png","PS8035":"/glass21.png",
  "D8815":"/glass22.png","9362":"/glass23.png","D8953":"/glass24.png",
  "TR1020":"/glass25.png","BV6522":"/glass26.png","D9108":"/glass27.png",
  "9368":"/glass28.png","K88212":"/glass29.png","B7195":"/glass30.png",
  "D1256":"/glass31.png","P3002":"/glass32.png","2011":"/glass33.png",
  "AR2005":"/glass34.png","P210":"/glass35.png","D8954":"/glass36.png",
  "K58083":"/glass37.png","LFL228":"/glass38.png","OF8651":"/glass39.png",
  "OF8506":"/glass40.png","1122":"/glass41.png","R1013":"/glass42.png",
};
const getFrameId = (product) =>
  (product?.code && CODE_TO_FRAME[product.code]) || "/glass1.png";

// ── Helper Components ─────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
      {[...Array(5)].map((_,i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20"
          style={{ color: i < full || (i===full && half) ? '#FBBF24' : '#D1D5DB', fill:'currentColor' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span style={{ fontSize:13, color:'#6B7280', marginLeft:6 }}>({rating})</span>
    </div>
  );
};

const QuantitySelector = ({ quantity, setQuantity, maxStock=10 }) => (
  <div style={{ display:'flex', alignItems:'center', border:'1px solid #E5E7EB', borderRadius:999, overflow:'hidden' }}>
    <button onClick={() => setQuantity(p => Math.max(1,p-1))}
      style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/></svg>
    </button>
    <span style={{ width:44, textAlign:'center', fontWeight:600 }}>{quantity}</span>
    <button onClick={() => setQuantity(p => Math.min(maxStock,p+1))}
      style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
    </button>
  </div>
);

const ColorVariantSelector = ({ variants, selectedVariant, setSelectedVariant }) => {
  if (!variants?.length) return null;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:13, fontWeight:600, color:'#374151' }}>Color / Variant</span>
        <span style={{ fontSize:11, color:'#6B7280', background:'#F3F4F6', padding:'2px 10px', borderRadius:999 }}>
          {variants.length} {variants.length===1?'Color':'Colors'}
        </span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
        {variants.map(v => {
          const sel = selectedVariant?.colorName === v.colorName;
          return (
            <label key={v.colorName} style={{
              display:'flex', alignItems:'center', gap:10, padding:'8px 16px',
              borderRadius:999, border:`2px solid ${sel?'#000':'#E5E7EB'}`,
              background:sel?'#000':'#fff', color:sel?'#fff':'#374151',
              cursor:'pointer', transition:'all .2s',
            }}>
              <input type="radio" name="color" value={v.colorName}
                checked={sel} onChange={() => setSelectedVariant(v)} style={{ display:'none' }} />
              <div style={{ width:18, height:18, borderRadius:'50%', background:v.hex||'#ccc',
                border:'2px solid rgba(255,255,255,.5)', flexShrink:0 }} />
              <span style={{ fontSize:13, fontWeight:500 }}>{v.colorName}</span>
              {sel && <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </label>
          );
        })}
      </div>
    </div>
  );
};

// ── Prescription helpers ───────────────────────────────────────────────────────
const LENS_OPTIONS = [
  { id:'standard',     name:'Standard Lenses',     price:850,  desc:'Just Vision' },
  { id:'blueCut',      name:'Anti Reflection',      price:1850, desc:'Clear vision with anti-reflective coating' },
  { id:'photochromic', name:'UV',  price:4500, desc:'Protects against harmful blue light' },
];

const emptyEye = () => ({ sphere:'', cylinder:'', axis:'', addition:'' });

const ScrollNumInput = ({ label, value, onChange, min, max, step, unit, required, placeholder, showSign }) => {
  const num   = value === '' ? '' : parseFloat(value);
  const color = typeof num === 'number' && !isNaN(num)
    ? num > 0 ? '#16a34a' : num < 0 ? '#dc2626' : '#111' : '#111';

  const fmt = () => {
    if (num === '' || isNaN(num)) return '';
    if (!showSign) return String(num);
    return num > 0 ? `+${num}` : String(num);
  };

  const step_ = (dir) => {
    const cur = typeof num === 'number' && !isNaN(num) ? num : 0;
    let nv = Math.round((cur + dir * step) / step) * step;
    nv = Math.min(max, Math.max(min, nv));
    onChange(nv);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <label style={{ fontSize:11, fontWeight:600, color:'#374151' }}>
        {label}{required && <span style={{ color:'#ef4444' }}> *</span>}
      </label>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <button type="button" onClick={() => step_(-1)}
          style={{ width:34, height:34, borderRadius:8, border:'1px solid #E5E7EB', background:'#F9FAFB', cursor:'pointer', flexShrink:0 }}>−</button>
        <input
          type="text" value={fmt()} placeholder={placeholder}
          onChange={e => {
            let v = e.target.value.replace(/\+/g,'');
            if (v===''||v==='-') { onChange(v); return; }
            const n = parseFloat(v);
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, Math.round(n/step)*step)));
          }}
          style={{ flex:1, textAlign:'center', padding:'6px 4px', border:'1px solid #E5E7EB',
            borderRadius:8, fontWeight:600, fontSize:13, color, outline:'none' }}
        />
        {unit && <span style={{ fontSize:11, color:'#9CA3AF', marginLeft:-22, pointerEvents:'none' }}>{unit}</span>}
        <button type="button" onClick={() => step_(1)}
          style={{ width:34, height:34, borderRadius:8, border:'1px solid #E5E7EB', background:'#F9FAFB', cursor:'pointer', flexShrink:0 }}>+</button>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:9, color:'#9CA3AF' }}>{min} to {max}</span>
        <span style={{ fontSize:9, color:'#9CA3AF' }}>step {step}</span>
      </div>
    </div>
  );
};

const PrescriptionModal = ({ show, onClose, onSave, existing }) => {
  const [lensType, setLensType] = useState(existing?.lensType || 'standard');
  const [right,    setRight]    = useState(existing?.rightEye || emptyEye());
  const [left,     setLeft]     = useState(existing?.leftEye  || emptyEye());
  const [errors,   setErrors]   = useState({});

  const needsAxis = eye => eye.cylinder !== '' && eye.cylinder !== 0 && eye.cylinder !== undefined;

  const validate = () => {
    const e = {};
    if (needsAxis(right) && (right.axis===''||right.axis===null)) e.ra = 'Axis required when Cylinder has value';
    if (needsAxis(left)  && (left.axis==='' ||left.axis===null))  e.la = 'Axis required when Cylinder has value';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const save = () => {
    if (!validate()) return;
    const lens = LENS_OPTIONS.find(l => l.id===lensType);
    onSave({ lensType, lensName:lens.name, lensPrice:lens.price, rightEye:right, leftEye:left });
    onClose();
  };

  if (!show) return null;

  const EyeSection = ({ label, abbr, eye, setEye, axisErr }) => (
    <div style={{ background:'#F9FAFB', borderRadius:14, border:'1px solid #E5E7EB', padding:18, marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
        <div style={{ width:34, height:34, borderRadius:8, background:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{abbr}</span>
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:15 }}>{label}</div>
          <div style={{ fontSize:10, color:'#6B7280' }}>{abbr==='R'?'OD – Oculus Dexter':'OS – Oculus Sinister'}</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        <ScrollNumInput label="Sphere" value={eye.sphere} onChange={v => setEye(p=>({...p,sphere:v}))} min={-20} max={20} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
        <ScrollNumInput label="Cylinder" value={eye.cylinder} onChange={v => setEye(p=>({...p,cylinder:v}))} min={-6} max={6} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
        <div>
          <ScrollNumInput label="Axis" value={eye.axis} onChange={v => setEye(p=>({...p,axis:v}))} min={0} max={180} step={1} unit="°" required={needsAxis(eye)} placeholder="0" showSign={false} />
          {axisErr && <p style={{ color:'#ef4444', fontSize:10, marginTop:3 }}>{axisErr}</p>}
        </div>
        <ScrollNumInput label="Addition" value={eye.addition} onChange={v => setEye(p=>({...p,addition:v}))} min={0} max={3.5} step={0.25} unit="D" required={false} placeholder="0.00" showSign />
      </div>
    </div>
  );

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,.5)',
      backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, overflowY:'auto' }}>
      <div style={{ background:'#fff', borderRadius:20, maxWidth:680, width:'100%',
        padding:24, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 25px 50px rgba(0,0,0,.2)' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, paddingBottom:14, borderBottom:'1px solid #F3F4F6' }}>
          <div>
            <h3 style={{ fontSize:18, fontWeight:700, margin:0 }}>Prescription Details</h3>
            <p style={{ fontSize:11, color:'#6B7280', margin:'4px 0 0' }}>Enter your optical prescription information</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:999, color:'#6B7280' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Info */}
        <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:12, marginBottom:18 }}>
          <p style={{ fontSize:11, color:'#1D4ED8', margin:0 }}>
            All fields optional. Sphere & Cylinder can be ±. Axis required only if Cylinder has a value.
          </p>
        </div>

        {/* Lens Type */}
        <div style={{ marginBottom:20 }}>
          <p style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Select Lens Type</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:10 }}>
            {LENS_OPTIONS.map(l => (
              <label key={l.id} style={{
                border:`2px solid ${lensType===l.id?'#000':'#E5E7EB'}`,
                borderRadius:12, padding:12, cursor:'pointer',
                background:lensType===l.id?'#F9FAFB':'#fff', position:'relative',
              }}>
                <input type="radio" name="lens" value={l.id} checked={lensType===l.id}
                  onChange={() => setLensType(l.id)} style={{ display:'none' }} />
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontWeight:600, fontSize:12 }}>{l.name}</span>
                  <span style={{ fontWeight:700, fontSize:12 }}>+{l.price}</span>
                </div>
                <p style={{ fontSize:10, color:'#6B7280', margin:0 }}>{l.desc}</p>
                {lensType===l.id && (
                  <div style={{ position:'absolute', top:8, right:8 }}>
                    <svg width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <EyeSection label="Right Eye" abbr="R" eye={right} setEye={setRight} axisErr={errors.ra} />
        <EyeSection label="Left Eye"  abbr="L" eye={left}  setEye={setLeft}  axisErr={errors.la} />

        {/* Summary */}
        <div style={{ background:'#F3F4F6', borderRadius:10, padding:12, marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:13, fontWeight:600 }}>Lens Extra Charge:</span>
          <span style={{ fontSize:18, fontWeight:700 }}>+PKR {LENS_OPTIONS.find(l=>l.id===lensType)?.price}</span>
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={onClose}
            style={{ flex:1, padding:'10px 0', borderRadius:10, border:'none', background:'#F3F4F6', cursor:'pointer', fontWeight:600, fontSize:13 }}>
            Cancel
          </button>
          <button onClick={save}
            style={{ flex:1, padding:'10px 0', borderRadius:10, border:'none', background:'#000', color:'#fff', cursor:'pointer', fontWeight:600, fontSize:13 }}>
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main ProductDetail ────────────────────────────────────────────────────────
export default function ProductDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [product,          setProduct]          = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [quantity,         setQuantity]         = useState(1);
  const [selectedVariant,  setSelectedVariant]  = useState(null);
  const [showRx,           setShowRx]           = useState(false);
  const [rxData,           setRxData]           = useState(null);
  const [activeImg,        setActiveImg]        = useState('');
  const [activeIdx,        setActiveIdx]        = useState(0);
  const [cartToast,        setCartToast]        = useState(false);

  // Reload once per product visit to clear stale state
  useEffect(() => {
    const key = `pdReloaded_${id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      window.location.reload();
      return;
    }
    const t = setTimeout(() => sessionStorage.removeItem(key), 600);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => { window.scrollTo(0,0); }, []);

  useEffect(() => {
    try {
      setLoading(true);
      const all  = Array.isArray(productsData) ? productsData : productsData.products || [];
      const found = all.find(p => p.id === parseInt(id));
      if (!found) throw new Error('Product not found');

      const imgs = [];
      found.variants?.forEach(v => v.images?.forEach(i => imgs.push(i)));

      setProduct({
        ...found,
        originalPrice: parseFloat(String(found.originalPrice).replace(/,/g,'')),
        discountPrice: parseFloat(String(found.discountPrice).replace(/,/g,'')),
        rating:   4.5,
        images:   imgs,
        features: found.features  || ['Premium quality','UV protection','Scratch resistant','Lightweight'],
        specifications: found.specifications || {
          Material:   found.type  || 'Premium Plastic',
          'Frame Type': found.shape || 'Standard',
          Gender:     found.gender || 'Unisex',
        },
      });

      const firstVariant = found.variants?.[0];
      setSelectedVariant(firstVariant || null);
      setActiveImg(firstVariant?.images?.[0] || imgs[0] || '');
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (selectedVariant?.images?.[0]) setActiveImg(selectedVariant.images[0]);
  }, [selectedVariant]);

  const framePrice = product?.discountPrice || product?.originalPrice || 0;
  const lensCharge = rxData?.lensPrice || 0;
  const totalPrice = framePrice + lensCharge;

  const addToCart = () => {
    if (!product) return;
    const cart  = JSON.parse(localStorage.getItem('cart')) || [];
    const item  = {
      id: product.id, name: product.name,
      framePrice, lensExtraCharge: lensCharge, totalPrice,
      quantity, selectedVariant, image: activeImg,
      prescription: rxData || null,
    };
    const idx = cart.findIndex(i =>
      i.id===item.id &&
      i.selectedVariant?.colorName===item.selectedVariant?.colorName &&
      i.prescription?.lensType===item.prescription?.lensType
    );
    if (idx !== -1) cart[idx].quantity += quantity;
    else cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartToast(true);
    setTimeout(() => setCartToast(false), 2200);
  };

  const handleTryOn = () => {
    if (!product) return;
    navigate('/tryon', {
      state: {
        frameId:     getFrameId(product),
         productCode: product.code,
        productName: product.name,
        productId:   product.id,
      }
    });
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:56, height:56, border:'4px solid #E5E7EB', borderTopColor:'#000',
          borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p style={{ color:'#6B7280' }}>Loading product…</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (error || !product) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <h2 style={{ fontSize:22, fontWeight:700 }}>{error || 'Product Not Found'}</h2>
      <button onClick={() => navigate('/')}
        style={{ background:'#000', color:'#fff', padding:'12px 28px', borderRadius:999, border:'none', cursor:'pointer', fontWeight:600 }}>
        Back to Home
      </button>
    </div>
  );

  const discountPct = product.discount
    ? parseInt(product.discount)
    : Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100);

  return (
    <div style={{ background:'#fff', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
      {/* Ambient bg */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'25%', left:'25%', width:384, height:384,
          borderRadius:'50%', background:'rgba(196,181,253,.3)', filter:'blur(80px)', mixBlendMode:'multiply' }} />
        <div style={{ position:'absolute', bottom:'25%', right:'25%', width:384, height:384,
          borderRadius:'50%', background:'rgba(147,197,253,.3)', filter:'blur(80px)', mixBlendMode:'multiply' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'32px 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#6B7280', marginBottom:32 }}>
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B7280' }}>Home</button>
          <span>›</span>
          <button onClick={() => navigate('/products')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B7280', textTransform:'capitalize' }}>
            {product.category?.replace('-',' ') || 'Shop'}
          </button>
          <span>›</span>
          <span style={{ color:'#111', fontWeight:500 }}>{product.name}</span>
        </nav>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          {/* Images */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ borderRadius:24, overflow:'hidden', background:'#F9FAFB',
              aspectRatio:'1/1', boxShadow:'0 4px 24px rgba(0,0,0,.08)' }}>
              <img src={`.${activeImg}`} alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              />
            </div>
            {product.images?.length > 1 && (
              <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => { setActiveImg(img); setActiveIdx(i); }}
                    style={{ width:72, height:72, borderRadius:12, overflow:'hidden', flexShrink:0,
                      border:`2px solid ${activeIdx===i?'#000':'transparent'}`,
                      opacity: activeIdx===i ? 1 : 0.65, cursor:'pointer', transition:'all .2s' }}>
                    <img src={`.${img}`} alt={`view ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {discountPct > 0 && (
                <span style={{ background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>
                  {discountPct}% OFF
                </span>
              )}
              {product.madeInTaiwan && <span style={{ background:'#DBEAFE', color:'#1D4ED8', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>🇹🇼 Made in Taiwan</span>}
              {product.freeShipping && <span style={{ background:'#D1FAE5', color:'#065F46', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>Free Shipping</span>}
              <span style={{ background: product.inStock!==false?'#D1FAE5':'#FEE2E2',
                color: product.inStock!==false?'#065F46':'#991B1B',
                fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>
                {product.inStock!==false ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, lineHeight:1.2, margin:0 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <StarRating rating={product.rating||4.5} />
              <span style={{ fontSize:13, color:'#6B7280' }}>{product.reviews||0} reviews</span>
            </div>

            {/* Price */}
            <div>
              <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
                <span style={{ fontSize:28, fontWeight:800 }}>PKR {framePrice.toLocaleString()}</span>
                {product.originalPrice !== framePrice && (
                  <>
                    <span style={{ fontSize:16, color:'#9CA3AF', textDecoration:'line-through' }}>PKR {product.originalPrice.toLocaleString()}</span>
                    <span style={{ fontSize:13, color:'#16A34A', fontWeight:600 }}>{product.discount} off</span>
                  </>
                )}
              </div>
              {rxData && (
                <div style={{ marginTop:6, fontSize:13 }}>
                  <span style={{ color:'#6B7280' }}>+ Lens: </span>
                  <span style={{ fontWeight:700, color:'#2563EB' }}>PKR {lensCharge.toLocaleString()}</span>
                  <span style={{ color:'#9CA3AF', marginLeft:6 }}>({rxData.lensName})</span>
                </div>
              )}
              {rxData && (
                <div style={{ marginTop:4, fontWeight:700, fontSize:15 }}>
                  Total: <span>PKR {totalPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p style={{ color:'#4B5563', lineHeight:1.7, borderTop:'1px solid #F3F4F6', paddingTop:16, margin:0, fontSize:14 }}>
              {product.description}
            </p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <ColorVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            )}

            {/* Prescription block */}
            <div style={{ background:'#EFF6FF', borderRadius:16, padding:16, border:'1px solid #BFDBFE' }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <svg width="18" height="18" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:2 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:600, color:'#1E40AF', fontSize:13, margin:'0 0 4px' }}>Prescription Lenses (Extra Charge)</p>
                  <p style={{ fontSize:11, color:'#3B82F6', margin:'0 0 8px' }}>Add prescription & choose lens type. Extra charges apply.</p>
                  <button onClick={() => setShowRx(true)}
                    style={{ fontSize:11, color:'#1D4ED8', fontWeight:700, textDecoration:'underline', background:'none', border:'none', cursor:'pointer', padding:0 }}>
                    {rxData ? 'Edit Prescription →' : 'Add Prescription →'}
                  </button>
                  {rxData && (
                    <div style={{ marginTop:8, fontSize:11, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:8, padding:8, color:'#166534' }}>
                      <p style={{ margin:'0 0 2px' }}>✓ {rxData.lensName} (+PKR {rxData.lensPrice})</p>
                      <p style={{ margin:0, color:'#6B7280' }}>
                        R: {rxData.rightEye.sphere !== '' ? `${rxData.rightEye.sphere > 0?'+':''}${rxData.rightEye.sphere}D` : 'N/A'}
                        {' | '}
                        L: {rxData.leftEye.sphere  !== '' ? `${rxData.leftEye.sphere  > 0?'+':''}${rxData.leftEye.sphere}D`  : 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity + Actions */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center' }}>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={20} />
              <button onClick={addToCart} disabled={product.inStock===false}
                style={{ flex:1, minWidth:130, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  background:'#111', color:'#fff', padding:'12px 20px', borderRadius:999, border:'none',
                  fontWeight:700, fontSize:14, cursor:'pointer', opacity:product.inStock===false?0.5:1, transition:'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background='#000'}
                onMouseLeave={e => e.currentTarget.style.background='#111'}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Add to Cart
              </button>
              <button onClick={() => { addToCart(); navigate('/checkout'); }} disabled={product.inStock===false}
                style={{ padding:'12px 22px', borderRadius:999, border:'none', background:'#2563EB', color:'#fff',
                  fontWeight:700, fontSize:14, cursor:'pointer', opacity:product.inStock===false?0.5:1, transition:'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background='#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background='#2563EB'}
              >
                Buy Now
              </button>
            </div>

            {/* ── Try On Button ── */}
            <button
              onClick={handleTryOn}
              style={{
                width:'100%', padding:'13px 0',
                background:'linear-gradient(135deg,#E87F24,#F5A623)',
                color:'#fff', border:'none', borderRadius:14, cursor:'pointer',
                fontWeight:800, fontSize:15, letterSpacing:'.5px',
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                boxShadow:'0 4px 20px rgba(232,127,36,.40)',
                transition:'all .25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(232,127,36,.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(232,127,36,.40)'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
              </svg>
              Try On Virtually — AR
            </button>

            {/* Trust badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:20, borderTop:'1px solid #F3F4F6', paddingTop:16 }}>
              {[['30-Day Returns','M5 13l4 4L19 7'],['Secure Checkout','M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'],['Secure Payment','M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z']].map(([label, d]) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#4B5563' }}>
                  <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d}/></svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginTop:60 }}>
          <h2 style={{ fontSize:20, fontWeight:700, marginBottom:20, paddingBottom:12, borderBottom:'2px solid #000', display:'inline-block' }}>Features</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12 }}>
            {product.features?.map((f,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, color:'#374151', fontSize:14 }}>
                <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart toast */}
      {cartToast && (
        <div style={{ position:'fixed', top:90, right:20, zIndex:9999, background:'#22c55e',
          color:'#fff', padding:'12px 22px', borderRadius:999, fontWeight:600,
          boxShadow:'0 4px 16px rgba(0,0,0,.2)', animation:'fadeUp .3s ease' }}>
          ✓ Added to cart!
        </div>
      )}

      {/* WhatsApp */}
      <div style={{ position:'fixed', bottom:32, right:32, zIndex:50 }}>
        <button style={{ background:'#25D366', color:'#fff', width:52, height:52, borderRadius:'50%',
          border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 20px rgba(0,0,0,.25)', transition:'transform .2s' }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.12)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="26" height="26" alt="WhatsApp" />
        </button>
      </div>

      <PrescriptionModal show={showRx} onClose={() => setShowRx(false)} onSave={setRxData} existing={rxData} />

      <style>{`
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes fadeUp  { from { opacity:0;transform:translateY(10px) } to { opacity:1;transform:translateY(0) } }
        @media(max-width:768px){
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns:1fr !important;
          }
        }
      `}</style>
    </div>
  );
}