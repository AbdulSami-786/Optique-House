// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// // ── Adjustments per frame ─────────────────────────────────────────────────────
// const DEFAULT_ADJ = { scaleW:1, scaleH:1,    offsetX:0, offsetY:0,  rotate:0 };
// const AVIATOR_ADJ = { scaleW:1, scaleH:1.18, offsetX:0, offsetY:10, rotate:0 };
// const ROUND_ADJ   = { scaleW:1, scaleH:0.85, offsetX:0, offsetY:4,  rotate:0 };


// export const GLASS_OPTIONS = [
//   { id:"/glass1.png",  name:"H77048 - Square Plastic Sunglass Luxury Style", price:"PKR 2,999", sizes:[{label:"XL",scale:1.10,mobileScale:1.00}] },
//   { id:"/glass2.png",  name:"T1798 - Oval Plastic Sunglass",                   price:"PKR 800",   sizes:[{label:"L", scale:1.15,mobileScale:1.00}] },
//   { id:"/glass3.png",  name:"99032 - Square Plastic Sunglass",            price:"PKR 2,400", sizes:[{label:"L", scale:1.15,mobileScale:1.00}] },
//   { id:"/glass4.png",  name:"28044 - Square Shape Plastic Sunglass",         price:"PKR 800",   sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass5.png",  name:"28044- Square Plastic Sunglass",             price:"PKR 2,500", sizes:[{label:"L", scale:1.25,mobileScale:0.98}] },
//   { id:"/glass6.png",  name:"9368-square Plastic Shape Sunglass",          price:"PKR 2,400", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass7.png",  name:"5013 - Square Plastic Sunglass",               price:"PKR 1,899", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
//   { id:"/glass8.png",  name:"1122 - Plastic Eye Sunglass",                   price:"PKR 1,600", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
//   { id:"/glass9.png",  name:"R1013 - Square Plastic Sunglass",               price:"PKR 2,899", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
//   { id:"/glass10.png", name:"Lfl228- Eye Plastic Sunglass",                  price:"PKR 4,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass11.png", name:" - Square Plastic Sunglass",               price:"PKR 2,400", sizes:[{label:"S", scale:0.75,mobileScale:0.50}] },
//   { id:"/glass12.png", name:"K58083 - Eye Plastic Sunglass",                  price:"PKR 3,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass13.png", name:" IPB- One Piece Sunglass",                      price:"PKR 800",   sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
//   { id:"/glass14.png", name:"20237- Plastic Square Men Sunglass",           price:"PKR 4,600", sizes:[{label:"S", scale:0.95,mobileScale:0.50}] },
//   { id:"/glass15.png", name:"28118 - Square Plastic Sunglass",              price:"PKR 3,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass16.png", name:"To4917 - Box Plastic Sunglass",                  price:"PKR 4,800", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass17.png", name:"Of8651 - Box Plastic Sunglass",                price:"PKR 4,600", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass18.png", name:"9702 - Metal Oval",                             price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass19.png", name:"3377 - Plastic Curve Square Shape",           price:"PKR 1,399", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass20.png", name:"Bl0985 - Plastic Square Shape",                  price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass21.png", name:" - Plastic Square Shape",                 price:"PKR 1,399", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
//   { id:"/glass22.png", name:"B7195 - Plastic Vaffer Shape",                  price:"PKR 1,499", sizes:[{label:"L", scale:1.05,mobileScale:0.95}] },
//   { id:"/glass23.png", name:"Tr90 - Plastic Square Shape",                   price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass24.png", name:"9368 - Plastic Square Shape",                  price:"PKR 1,499", sizes:[{label:"S", scale:0.85,mobileScale:0.50}] },
//   { id:"/glass25.png", name:"Jb5816 - Plastic Eye Shape",                    price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass26.png", name:"P3002 - Plastic Eye Shape",                    price:"PKR 1,799", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass27.png", name:"Of8506 - Plastic Square Shape",                  price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass28.png", name:"P210 - Plastic Square Shape",                   price:"PKR 1,499", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
//   { id:"/glass29.png", name:"D1256 - Metal Eye Shape",                      price:"PKR 1,899", sizes:[{label:"L", scale:1.25,mobileScale:0.95}] },
//   { id:"/glass30.png", name:"Jb5816 - Plastic Eye Shape",                     price:"PKR 1,999", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass31.png", name:"D8953 - Plastic Oval Shape",                    price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass32.png", name:"9368 - Plastic Square Shape",                  price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass33.png", name:"Sj2160 - Plastic Oval Shape",                     price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass34.png", name:"D8815 - Plastic Oval Shape",                   price:"PKR 2,299", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass35.png", name:"Rb4455f - Plastic Square Shape",                   price:"PKR 1,499", sizes:[{label:"M", scale:1.10,mobileScale:0.75}] },
//   { id:"/glass36.png", name:"9702 - Plastic Round Shape",                   price:"PKR 1,799", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass37.png", name:"To4917 - Plastic & Metal Round shape",          price:"PKR 2,899", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass38.png", name:"D8954 - Plastic & Metal Round Shape",          price:"PKR 1,999", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
//   { id:"/glass39.png", name:"3377 - Plastic & Metal Round Shape",          price:"PKR 1,999", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass40.png", name:"D8822 - Plastic & Metal Round Shape",          price:"PKR 2,899", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
//   { id:"/glass41.png", name:"Dl03054s - Plastic & Metal Round Shape",            price:"PKR 2,299", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
//   { id:"/glass42.png", name:" - RimLess Eye Shape",                     price:"PKR 1,999", sizes:[{label:"S", scale:0.95,mobileScale:0.50}] },
// ];





// // export const GLASS_OPTIONS = [
// //   {
// //     id: "/glass1.png",
// //     code: "T04917",
// //     name: "T04917 - Square Plastic Sunglass Luxury Style",
// //     price: "PKR 2,999",
// //     sizes: [{ label: "XL", scale: 1.1, mobileScale: 1.0 }],
// //   },

// //   {
// //     id: "/glass2.png",
// //     code: "K01",
// //     name: "K01 - Oval Plastic Sunglass",
// //     price: "PKR 800",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 1.0 }],
// //   },

// //   {
// //     id: "/glass3.png",
// //     code: "DL03054S",
// //     name: "DL03054S - Square Plastic Sunglass",
// //     price: "PKR 2,400",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 1.0 }],
// //   },

// //   {
// //     id: "/glass4.png",
// //     code: "20237",
// //     name: "20237 - Square Shape Plastic Sunglass",
// //     price: "PKR 800",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass5.png",
// //     code: "RB4455F",
// //     name: "RB4455F - Square Plastic Sunglass",
// //     price: "PKR 2,500",
// //     sizes: [{ label: "L", scale: 1.25, mobileScale: 0.98 }],
// //   },

// //   {
// //     id: "/glass6.png",
// //     code: "5013",
// //     name: "5013 - Square Plastic Shape Sunglass",
// //     price: "PKR 2,400",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass7.png",
// //     code: "S2160",
// //     name: "S2160 - Square Plastic Sunglass",
// //     price: "PKR 1,899",
// //     sizes: [{ label: "XL", scale: 1.3, mobileScale: 1.1 }],
// //   },

// //   {
// //     id: "/glass8.png",
// //     code: "3377",
// //     name: "3377 - Plastic Eye Sunglass",
// //     price: "PKR 1,600",
// //     sizes: [{ label: "XL", scale: 1.3, mobileScale: 1.1 }],
// //   },

// //   {
// //     id: "/glass9.png",
// //     code: "28044",
// //     name: "28044 - Square Plastic Sunglass",
// //     price: "PKR 2,899",
// //     sizes: [{ label: "M", scale: 1.0, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass10.png",
// //     code: "99032",
// //     name: "99032 - Eye Plastic Sunglass",
// //     price: "PKR 4,200",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass11.png",
// //     code: "T1798",
// //     name: "T1798 - Square Plastic Sunglass",
// //     price: "PKR 2,400",
// //     sizes: [{ label: "S", scale: 0.75, mobileScale: 0.5 }],
// //   },

// //   {
// //     id: "/glass12.png",
// //     code: "28118",
// //     name: "28118 - Eye Plastic Sunglass",
// //     price: "PKR 3,200",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass13.png",
// //     code: "IPB",
// //     name: "IPB - One Piece Sunglass",
// //     price: "PKR 800",
// //     sizes: [{ label: "M", scale: 1.0, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass14.png",
// //     code: "F0493",
// //     name: "F0493 - Plastic Square Men Sunglass",
// //     price: "PKR 4,600",
// //     sizes: [{ label: "S", scale: 0.95, mobileScale: 0.5 }],
// //   },

// //   {
// //     id: "/glass15.png",
// //     code: "BL0985",
// //     name: "BL0985 - Square Plastic Sunglass",
// //     price: "PKR 3,200",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass16.png",
// //     code: "D7481",
// //     name: "D7481 - Box Plastic Sunglass",
// //     price: "PKR 4,800",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass17.png",
// //     code: "H077048",
// //     name: "H077048 - Box Plastic Sunglass",
// //     price: "PKR 4,600",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass18.png",
// //     code: "9702",
// //     name: "9702 - Metal Oval",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass19.png",
// //     code: "JV5816",
// //     name: "JV5816 - Plastic Curve Square Shape",
// //     price: "PKR 1,399",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass20.png",
// //     code: "D8822",
// //     name: "D8822 - Plastic Square Shape",
// //     price: "PKR 1,199",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass21.png",
// //     code: "PS8035",
// //     name: "PS8035 - Plastic Square Shape",
// //     price: "PKR 1,399",
// //     sizes: [{ label: "M", scale: 1.0, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass22.png",
// //     code: "D8815",
// //     name: "D8815 - Plastic Vaffer Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.05, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass23.png",
// //     code: "TR1020",
// //     name: "TR1020 - Plastic Eye Shape",
// //     price: "PKR 1,199",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass24.png",
// //     code: "9362",
// //     name: "9362 - Plastic Square Shape",
// //     price: "PKR 1,199",
// //     sizes: [{ label: "S", scale: 0.85, mobileScale: 0.5 }],
// //   },

// //   {
// //     id: "/glass25.png",
// //     code: "D8953",
// //     name: "D8953 - Plastic Square Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass26.png",
// //     code: "BV6522",
// //     name: "BV6522 - Plastic Eye Shape",
// //     price: "PKR 1,799",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass27.png",
// //     code: "D9108",
// //     name: "D9108 - Plastic Square Shape",
// //     price: "PKR 1,199",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass28.png",
// //     code: "9368",
// //     name: "9368 - Plastic Square Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "M", scale: 1.0, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass29.png",
// //     code: "K88212",
// //     name: "K88212 - Metal Eye Shape",
// //     price: "PKR 1,899",
// //     sizes: [{ label: "L", scale: 1.25, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass30.png",
// //     code: "B7195",
// //     name: "B7195 - Plastic Eye Shape",
// //     price: "PKR 1,999",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass31.png",
// //     code: "D1256",
// //     name: "D1256 - Plastic Oval Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass32.png",
// //     code: "P3002",
// //     name: "P3002 - Plastic Square Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass33.png",
// //     code: "2011",
// //     name: "2011 - Plastic Oval Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass34.png",
// //     code: "AR2005",
// //     name: "AR2005 - Plastic Oval Shape",
// //     price: "PKR 2,299",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass35.png",
// //     code: "P210",
// //     name: "P210 - Plastic Square Shape",
// //     price: "PKR 1,499",
// //     sizes: [{ label: "M", scale: 1.1, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass36.png",
// //     code: "D8954",
// //     name: "D8954 - Plastic Round Shape",
// //     price: "PKR 1,799",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass37.png",
// //     code: "K58083",
// //     name: "K58083 - Plastic & Metal Round Shape",
// //     price: "PKR 2,899",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass38.png",
// //     code: "LFL228",
// //     name: "LFL228 - Plastic & Metal Round Shape",
// //     price: "PKR 1,999",
// //     sizes: [{ label: "XL", scale: 1.3, mobileScale: 1.1 }],
// //   },

// //   {
// //     id: "/glass39.png",
// //     code: "OF8651",
// //     name: "OF8651 - Plastic & Metal Round Shape",
// //     price: "PKR 1,999",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass40.png",
// //     code: "OF8506",
// //     name: "OF8506 - Plastic & Metal Round Shape",
// //     price: "PKR 2,899",
// //     sizes: [{ label: "M", scale: 1.0, mobileScale: 0.75 }],
// //   },

// //   {
// //     id: "/glass41.png",
// //     code: "1122",
// //     name: "1122 - Plastic & Metal Round Shape",
// //     price: "PKR 2,299",
// //     sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }],
// //   },

// //   {
// //     id: "/glass42.png",
// //     code: "R1013",
// //     name: "R1013 - RimLess Eye Shape",
// //     price: "PKR 1,999",
// //     sizes: [{ label: "S", scale: 0.95, mobileScale: 0.5 }],
// //   },
// // ];





// // ── Resolve initial frame from router state ───────────────────────────────────
// const resolveInitialFrame = (state) => {
//   if (!state?.frameId) return GLASS_OPTIONS[0].id;
//   const match = GLASS_OPTIONS.find(g => g.id === state.frameId);
//   return match ? match.id : GLASS_OPTIONS[0].id;
// };

// // ── Device helpers ────────────────────────────────────────────────────────────
// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getSizeScale = (sizeObj, mobile) =>
//   sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// const MOBILE_FPS       = 30;
// const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;
// const DESKTOP_CAM_W    = 1280;
// const DESKTOP_CAM_H    = 720;
// const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// // ── Landmarks ─────────────────────────────────────────────────────────────────
// const LM = {
//   // FIX: iris landmarks sirf refineLandmarks:true pe available hain (desktop only)
//   LEFT_IRIS_CENTER:  468,
//   RIGHT_IRIS_CENTER: 473,
//   LEFT_EYE_OUTER:    33,
//   RIGHT_EYE_OUTER:   263,
//   LEFT_EYE_INNER:    133,
//   RIGHT_EYE_INNER:   362,
//   LEFT_EYEBROW_LOWER:  [70,63,105,66,107],
//   RIGHT_EYEBROW_LOWER: [300,293,334,296,336],
//   NOSE_BRIDGE_TOP:   6,
// };

// class FaceGeoSmoother {
//   constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta=60, maxScaleDelta=0.15 }) {
//     Object.assign(this, { posAlpha, scaleAlpha, rotAlpha, maxPosDelta, maxScaleDelta, prev:null });
//   }
//   _step(p, c, a, mx, dz=0) {
//     const d = c-p;
//     if (dz > 0 && Math.abs(d) < dz) return p;
//     return p + a * Math.max(-mx, Math.min(mx, d));
//   }
//   smooth(cur, dz=0) {
//     if (!this.prev) { this.prev={...cur}; return {...cur}; }
//     const p=this.prev, r={
//       cx:    this._step(p.cx,    cur.cx,    this.posAlpha,   this.maxPosDelta,   dz),
//       cy:    this._step(p.cy,    cur.cy,    this.posAlpha,   this.maxPosDelta,   dz),
//       gw:    this._step(p.gw,    cur.gw,    this.scaleAlpha, this.maxPosDelta,   0),
//       gh:    this._step(p.gh,    cur.gh,    this.scaleAlpha, this.maxPosDelta,   0),
//       angle: this._step(p.angle, cur.angle, this.rotAlpha,   0.18,              0),
//       ds:    this._step(p.ds,    cur.ds,    this.scaleAlpha, this.maxScaleDelta, 0),
//     };
//     this.prev={...r}; return r;
//   }
//   reset() { this.prev=null; }
// }

// // FIX: useIris parameter — mobile pe refineLandmarks:false hota hai
// // isliye iris landmarks (468,473) available nahi — eye corners use karo
// function extractFaceGeometry(lm, W, H, useIris=false) {
//   const px    = i => ({ x:lm[i].x*W, y:lm[i].y*H, z:lm[i].z ?? 0 });
//   const avgPx = is => {
//     const ps = is.map(px);
//     return { x:ps.reduce((s,p)=>s+p.x,0)/ps.length, y:ps.reduce((s,p)=>s+p.y,0)/ps.length };
//   };
//   const dist  = (a,b) => Math.hypot(a.x-b.x, a.y-b.y);

//   const leo = px(LM.LEFT_EYE_OUTER);
//   const reo = px(LM.RIGHT_EYE_OUTER);
//   const lei = px(LM.LEFT_EYE_INNER);
//   const rei = px(LM.RIGHT_EYE_INNER);
//   const nbt = px(LM.NOSE_BRIDGE_TOP);
//   const lb  = avgPx(LM.LEFT_EYEBROW_LOWER);
//   const rb  = avgPx(LM.RIGHT_EYEBROW_LOWER);

//   // FIX: useIris aur lm length dono check — safe iris access
//   let li, ri;
//   if (useIris && lm.length > 473) {
//     li = px(LM.LEFT_IRIS_CENTER);
//     ri = px(LM.RIGHT_IRIS_CENTER);
//   } else {
//     // Mobile fallback: eye inner aur outer ka midpoint
//     li = { x:(leo.x+lei.x)/2, y:(leo.y+lei.y)/2, z:(leo.z+lei.z)/2 };
//     ri = { x:(reo.x+rei.x)/2, y:(reo.y+rei.y)/2, z:(reo.z+rei.z)/2 };
//   }

//   const irisY    = (li.y + ri.y) / 2;
//   const centerX  = (li.x + ri.x) / 2;
//   const browMidY = (lb.y + rb.y) / 2;
//   const centerY  = irisY * 0.65 + nbt.y * 0.30 + browMidY * 0.05;

//   const aEc  = Math.atan2(reo.y - leo.y, reo.x - leo.x);
//   const aBr  = Math.atan2(rb.y  - lb.y,  rb.x  - lb.x);
//   const aIr  = useIris ? Math.atan2(ri.y - li.y, ri.x - li.x) : aEc;
//   const angle = aEc * 0.65 + aBr * 0.25 + aIr * 0.10;

//   const eyeSpan = dist(leo, reo);
//   // FIX: mobile pe iris nahi toh scale multiplier thoda bada
//   const sm      = useIris ? 1.0 : 1.20;

//   const avgZ = (li.z + ri.z + (nbt.z ?? 0)) / 3;
//   return {
//     centerX,
//     centerY,
//     angle,
//     glassesWidth:  eyeSpan * 1.60 * sm,
//     glassesHeight: eyeSpan * 0.90 * sm,
//     depthScale:    Math.max(0.70, Math.min(1.55, 1 + (-avgZ * 2.5))),
//   };
// }

// // ── Theme ─────────────────────────────────────────────────────────────────────
// const C = {
//   primary:"#E87F24", bg:"#FEFDDF", surface:"#F5F3C7", text:"#1E293B",
//   primary12:"rgba(232,127,36,0.12)", primary20:"rgba(232,127,36,0.20)",
//   primary25:"rgba(232,127,36,0.25)", primary30:"rgba(232,127,36,0.30)",
//   primary40:"rgba(232,127,36,0.40)",
//   accent12:"rgba(115,165,202,0.12)", accent20:"rgba(115,165,202,0.20)",
//   text55:"rgba(30,41,59,0.55)", text30:"rgba(30,41,59,0.30)",
//   text12:"rgba(30,41,59,0.12)", text06:"rgba(30,41,59,0.06)",
//   glassBg:"rgba(254,253,223,0.65)", glassBorder:"rgba(255,255,255,0.70)",
//   surfaceBorder:"rgba(255,255,255,0.85)",
//   gradPrimary:"linear-gradient(135deg,#E87F24,#F5A623)",
//   gradPrimaryTx:"linear-gradient(135deg,#F5A623,#E87F24)",
//   gradBg:`radial-gradient(ellipse 60% 50% at 80% 10%,rgba(232,127,36,0.13) 0%,transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%,rgba(115,165,202,0.12) 0%,transparent 55%),#FEFDDF`,
// };
// const glassPill = { borderRadius:100, backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)" };

// // ── Sub-components ────────────────────────────────────────────────────────────
// const BrandingBadge = ({ mobile }) => (
//   <div style={{
//     position:"absolute", top:mobile?12:18, left:"50%", transform:"translateX(-50%)",
//     zIndex:10, display:"flex", alignItems:"center", gap:8,
//     padding:mobile?"6px 16px":"8px 20px", borderRadius:999,
//     background:mobile?"rgba(0,0,0,0.55)":"rgba(254,253,223,0.65)",
//     backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)",
//     border:`1px solid rgba(232,127,36,0.25)`,
//     boxShadow:mobile
//       ?"0 4px 20px rgba(232,127,36,0.18),0 2px 12px rgba(0,0,0,0.35)"
//       :"0 4px 24px rgba(232,127,36,0.20),0 2px 10px rgba(30,41,59,0.10)",
//     animation:"fadeIn 0.35s ease", whiteSpace:"nowrap", pointerEvents:"none",
//   }}>
//     <div style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",
//       boxShadow:"0 0 10px #22c55e",animation:"pulse 2s ease infinite",flexShrink:0 }} />
//     <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:mobile?11:13, fontWeight:700,
//       letterSpacing:"2px", color:mobile?"#fff":"#1E293B", textTransform:"uppercase", userSelect:"none" }}>
//       PRODUCT BY ASW SOLUTION
//     </span>
//   </div>
// );

// const Section = ({ title, icon, defaultOpen=false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{ borderRadius:16, border:`1px solid ${C.glassBorder}`, overflow:"hidden",
//       background:C.glassBg, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}>
//       <button onClick={() => setOpen(o=>!o)} aria-expanded={open}
//         style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
//           padding:"13px 16px", background:"rgba(254,253,223,0.50)", border:"none", cursor:"pointer",
//           borderBottom:open?`1px solid ${C.glassBorder}`:"none" }}>
//         <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:10, fontWeight:700, letterSpacing:"2px", color:C.primary }}>
//           <span style={{ fontSize:13 }}>{icon}</span>{title}
//         </span>
//         <span style={{ fontSize:9, color:C.text55, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.22s ease", display:"inline-block" }}>▼</span>
//       </button>
//       {open && <div style={{ padding:16, background:"rgba(245,243,199,.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom:18 }}>
//     <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
//       <label style={{ fontSize:10, color:C.text55, fontWeight:600, letterSpacing:"1px" }}>{label}</label>
//       <span style={{ fontSize:11, fontWeight:700, background:C.gradPrimaryTx,
//         WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{fmt(value)}</span>
//     </div>
//     <input type="range" min={min} max={max} step={step} value={value}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width:"100%", height:3, background:C.primary20, borderRadius:4,
//         appearance:"none", WebkitAppearance:"none", cursor:"pointer" }} />
//   </div>
// );

// // ── Main TryOn Component ──────────────────────────────────────────────────────
// const TryOn = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const initialFrameId      = resolveInitialFrame(location.state);
//   const incomingProductName = location.state?.productName || null;

//   // Refs
//   const videoRef            = useRef(null);
//   const canvasRef           = useRef(null);
//   const imgRef              = useRef(new Image());
//   const rafIdRef            = useRef(null);
//   const lastFrameRef        = useRef(0);
//   const touchStartX         = useRef(null);
//   const touchStartY         = useRef(null);
//   const cameraRdyRef        = useRef(false);
//   const glassesRef          = useRef(initialFrameId);
//   const adjRef              = useRef({});
//   const pendingResultRef    = useRef(null);
//   const camStreamRef        = useRef(null);
//   const camInstanceRef      = useRef(null);
//   const cachedGlassRef      = useRef(null);
//   const ctxRef              = useRef(null);
//   const resultVersionRef    = useRef(0);
//   const lastDrawnVersionRef = useRef(-1);
//   const activeCarouselRef   = useRef(null);
//   const activeGridRef       = useRef(null);
//   // FIX: track karo kya face detect hua — debugging ke liye
//   const faceDetectedRef     = useRef(false);

//   const [isMobile,    setIsMobile]    = useState(() => getIsMobile());
//   const isMobileRef = useRef(isMobile);
//   const [, setVideoDims] = useState(null);

//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     smootherRef.current = isMobile
//       ? new FaceGeoSmoother({ posAlpha:.38, scaleAlpha:1.0, rotAlpha:.22, maxPosDelta:48, maxScaleDelta:5.0 })
//       : new FaceGeoSmoother({ posAlpha:.45, scaleAlpha:1.0, rotAlpha:.30, maxPosDelta:60, maxScaleDelta:5.0 });
//   }

//   const [glasses,      setGlasses]     = useState(initialFrameId);
//   const [cameraReady,  setCameraReady] = useState(false);
//   const [faceTracking, setFaceTracking]= useState(false); // FIX: face tracking UI state
//   const [brightness,   setBrightness]  = useState(100);
//   const [contrast,     setContrast]    = useState(100);
//   const [saturate,     setSaturate]    = useState(100);
//   const [mpError,      setMpError]     = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, {...AVIATOR_ADJ}];
//       if (g.id === "/glass4.png") return [g.id, {...ROUND_ADJ}];
//       return [g.id, {...DEFAULT_ADJ}];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current[initialFrameId]);

//   // Resize handler
//   useEffect(() => {
//     const onResize = () => {
//       const m = getIsMobile();
//       isMobileRef.current = m;
//       setIsMobile(m);
//       ctxRef.current = null;
//       if (m && videoRef.current?.videoWidth) {
//         const vw=videoRef.current.videoWidth, vh=videoRef.current.videoHeight;
//         if (canvasRef.current && vw && vh) {
//           canvasRef.current.width=vw; canvasRef.current.height=vh;
//           setVideoDims({w:vw,h:vh}); ctxRef.current=null;
//         }
//       } else if (!m && canvasRef.current) {
//         canvasRef.current.width=DESKTOP_CAM_W; canvasRef.current.height=DESKTOP_CAM_H;
//         ctxRef.current=null;
//       }
//     };
//     window.addEventListener("resize", onResize, { passive:true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Sync glasses state → refs
//   useEffect(() => {
//     glassesRef.current     = glasses;
//     adjRef.current         = adjustmentsRef.current;
//     cachedGlassRef.current = GLASS_OPTIONS.find(g => g.id===glasses) || null;
//     setAdjUIState({...(adjustmentsRef.current[glasses] || DEFAULT_ADJ)});
//   }, [glasses]);

//   // Preload image on frame change
//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = glasses;
//     imgRef.current = img;
//   }, [glasses]);

//   // Scroll active item into view
//   useEffect(() => {
//     activeCarouselRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
//     activeGridRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest" });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]:val }
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState(p => ({...p,[key]:val}));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const d  = id==="/glass2.png" ? {...AVIATOR_ADJ} : id==="/glass4.png" ? {...ROUND_ADJ} : {...DEFAULT_ADJ};
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]:d };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState({...d});
//   }, []);

//   // ── Draw loop ────────────────────────────────────────────────────────────────
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);
//     const mobile = isMobileRef.current;
//     const now    = performance.now();
//     if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha:false, willReadFrequently:false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width, H = canvas.height;

//     // Draw camera frame with filters
//     const uB = brightnessRef.current, uC = contrastRef.current, uS = saturateRef.current;
//     const needsFilter = !mobile && (uB!==100||uC!==100||uS!==100||BEAUTY_B!==100||BEAUTY_C!==100||BEAUTY_S!==100);
//     ctx.filter = needsFilter
//       ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${uB}%) contrast(${uC}%) saturate(${uS}%)`
//       : "none";

//     // FIX: selfieMode:true use karne ke baad MediaPipe khud mirror karta hai
//     // isliye hum manually flip nahi karte mobile pe
//     if (mobile) {
//       ctx.drawImage(result.image, 0, 0, W, H);
//     } else {
//       ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);
//       ctx.drawImage(result.image, 0, 0, W, H);
//       ctx.restore();
//     }
//     ctx.filter = "none";

//     // FIX: agar face nahi detect hua toh glasses skip karo
//     // lekin version advance karo taake camera feed update ho
//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       // FIX: face tracking state update
//       if (faceDetectedRef.current) {
//         faceDetectedRef.current = false;
//         setFaceTracking(false);
//       }
//       return;
//     }

//     // Face mila — tracking state update
//     if (!faceDetectedRef.current) {
//       faceDetectedRef.current = true;
//       setFaceTracking(true);
//     }

//     const lm  = result.multiFaceLandmarks[0];
//     // FIX: mobile pe useIris=false kyunki refineLandmarks:false hai
//     const useIris = !mobile;
//     const geo = extractFaceGeometry(lm, W, H, useIris);

//     // FIX: selfieMode:true hone ke baad centerX mirror nahi karna
//     const finalCx = mobile ? geo.centerX : (W - geo.centerX);

//     const sm = smootherRef.current.smooth(
//       { cx:finalCx, cy:geo.centerY, gw:geo.glassesWidth, gh:geo.glassesHeight, angle:geo.angle, ds:geo.depthScale },
//       mobile ? 1.0 : 0,
//     );

//     const img = imgRef.current;
//     // FIX: image load nahi hua toh version advance MAT karo — next frame mein retry hoga
//     if (!img.complete || !img.naturalWidth) return;

//     const glassObj = cachedGlassRef.current;
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     let w = sm.gw * adj.scaleW * geo.depthScale * sSc;
//     let h = sm.gh * adj.scaleH * geo.depthScale * sSc;
//     w = Math.max(20, Math.min(W * 0.95, w));
//     h = Math.max(8,  Math.min(H * 0.60, h));

//     // FIX: mobile pe angle bhi mirror nahi karna (selfieMode handles it)
//     const mAngle = mobile ? sm.angle : -sm.angle;
//     const halfW = w * 0.5, halfH = h * 0.5;
//     const clampX = Math.max(halfW, Math.min(W - halfW, sm.cx + adj.offsetX));
//     const clampY = Math.max(halfH, Math.min(H - halfH, sm.cy + adj.offsetY));

//     ctx.save();
//     ctx.translate(clampX, clampY);
//     ctx.rotate(mAngle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w/2, -h/2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   // FIX: onResults — version hamesha advance karo
//   const onResults = useCallback(r => {
//     pendingResultRef.current = r;
//     resultVersionRef.current++;
//   }, []);

//   // ── Camera + FaceMesh init ───────────────────────────────────────────────────
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }
//     const mobile = isMobileRef.current;

//     const faceMesh = new window.FaceMesh({
//       locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${f}`
//     });

//     faceMesh.setOptions({
//       maxNumFaces:           1,
//       // FIX: mobile pe refineLandmarks:false (performance), desktop pe true (iris ke liye)
//       refineLandmarks:       !mobile,
//       // FIX: selfieMode:true — front camera ke liye ZAROORI
//       // Bina is ke landmarks mirror nahi hote aur glasses galat jagah lagti hain
//       selfieMode:            true,
//       // FIX: thresholds aur neeche karo mobile pe taake face better detect ho
//       minDetectionConfidence: mobile ? 0.25 : 0.50,
//       minTrackingConfidence:  mobile ? 0.20 : 0.50,
//     });

//     faceMesh.onResults(onResults);
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video:{
//         facingMode: "user",
//         width:      mobile ? { ideal:640 }          : { ideal:DESKTOP_CAM_W },
//         height:     mobile ? { ideal:480 }          : { ideal:DESKTOP_CAM_H },
//         frameRate:  mobile ? { ideal:30, max:30 }   : { ideal:60 },
//       },
//       audio: false,
//     })
//     .then(stream => {
//       camStreamRef.current = stream;
//       const video = videoRef.current;
//       if (!video) return;
//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//         video.play().then(() => {
//           cameraRdyRef.current = true;
//           setCameraReady(true);

//           if (mobile) {
//             const vw = video.videoWidth, vh = video.videoHeight;
//             if (canvasRef.current && vw && vh) {
//               canvasRef.current.width  = vw;
//               canvasRef.current.height = vh;
//               setVideoDims({ w:vw, h:vh });
//               ctxRef.current = null;
//             }
//           } else {
//             if (canvasRef.current) {
//               canvasRef.current.width  = DESKTOP_CAM_W;
//               canvasRef.current.height = DESKTOP_CAM_H;
//               ctxRef.current = null;
//             }
//           }

//           const sendFrame = async () => {
//             if (!cameraRdyRef.current) return;
//             try {
//               if (video.readyState >= 2) await faceMesh.send({ image: video });
//             } catch (_) {}
//             if (cameraRdyRef.current) {
//               camInstanceRef.current = requestAnimationFrame(sendFrame);
//             }
//           };
//           camInstanceRef.current = requestAnimationFrame(sendFrame);

//         }).catch(() => setMpError("Could not start video. Please reload and allow camera access."));
//       };
//     })
//     .catch(() => setMpError("Camera access denied. Please allow camera permissions and reload."));

//     return () => {
//       cameraRdyRef.current = false;
//       if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
//       camStreamRef.current?.getTracks().forEach(t => t.stop());
//       camStreamRef.current = null;
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults]);

//   // ── CSS ──────────────────────────────────────────────────────────────────────
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
//     input[type="range"]{-webkit-appearance:none;appearance:none;background:transparent;}
//     input[type="range"]::-webkit-slider-runnable-track{background:linear-gradient(90deg,rgba(232,127,36,.30),rgba(232,127,36,.10));height:3px;border-radius:3px;}
//     input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#F5A623,#E87F24);cursor:pointer;margin-top:-6.5px;border:2px solid rgba(254,253,223,.90);box-shadow:0 2px 8px rgba(232,127,36,.40);}
//     input[type="range"]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#F5A623,#E87F24);cursor:pointer;border:2px solid rgba(254,253,223,.90);}
//     .right-panel{scrollbar-width:thin;scrollbar-color:rgba(232,127,36,.40) rgba(232,127,36,.08);}
//     ::-webkit-scrollbar{width:3px;height:3px;}
//     ::-webkit-scrollbar-track{background:rgba(232,127,36,.06);border-radius:4px;}
//     ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#E87F24,#F5A623);border-radius:4px;}
//     .lens-carousel{display:flex;gap:14px;padding:6px 20px 14px;overflow-x:auto;overflow-y:visible;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth;}
//     .lens-carousel::-webkit-scrollbar{display:none;}
//     .lens-ring{flex-shrink:0;scroll-snap-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;transition:transform .25s ease;}
//     .lens-ring__circle{width:58px;height:58px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .25s,box-shadow .28s;}
//     .lens-ring__img{width:68%;height:68%;object-fit:contain;pointer-events:none;transition:filter .25s ease;}
//     .lens-ring--active .lens-ring__circle{transform:scale(1.15);box-shadow:0 0 0 2.5px #E87F24,0 0 0 5px rgba(232,127,36,.20),0 0 24px rgba(232,127,36,.55);}
//     .lens-ring--active .lens-ring__img{filter:drop-shadow(0 0 8px rgba(232,127,36,.80)) brightness(1.05);}
//     .lens-ring--inactive .lens-ring__circle{transform:scale(.88);opacity:.55;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 2px 8px rgba(0,0,0,.35);}
//     .lens-ring--inactive .lens-ring__img{filter:brightness(.55) saturate(.55);}
//     .lens-ring__glow-ring{position:absolute;inset:-3px;border-radius:50%;padding:2px;pointer-events:none;background:conic-gradient(from 0deg,#F5A623,#E87F24,#FF6B35,#F5A623);opacity:0;transition:opacity .25s;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:spinRing 2s linear infinite;}
//     .lens-ring--active .lens-ring__glow-ring{opacity:1;}
//     @keyframes spinRing{from{transform:rotate(0)}to{transform:rotate(360deg)}}
//     .lens-ring__label{font-size:9px;font-weight:700;text-align:center;max-width:64px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;transition:color .25s,opacity .25s;}
//     .lens-ring--active .lens-ring__label{color:#F5A623;opacity:1;}
//     .lens-ring--inactive .lens-ring__label{color:rgba(255,255,255,.40);}
//     .lens-ring__dot{width:4px;height:4px;border-radius:50%;background:#E87F24;transition:opacity .25s,transform .25s;}
//     .lens-ring--active .lens-ring__dot{opacity:1;transform:scale(1);box-shadow:0 0 8px #E87F24;}
//     .lens-ring--inactive .lens-ring__dot{opacity:0;transform:scale(0);}
//     .frame-card{transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s;-webkit-tap-highlight-color:transparent;}
//     .frame-card:hover{transform:translateY(-2px) scale(1.03);}
//     .frame-card:active{transform:scale(.96);}
//     @keyframes spin   {to{transform:rotate(360deg)}}
//     @keyframes fadeIn {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
//     @keyframes pulse  {0%,100%{opacity:.55}50%{opacity:1}}
//     .spinner{width:44px;height:44px;border-radius:50%;border:2px solid rgba(115,165,202,.20);border-top-color:#E87F24;animation:spin .85s linear infinite;}
//     .spinner-inner{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(232,127,36,.15);border-bottom-color:#F5A623;animation:spin 1.2s linear infinite reverse;position:absolute;top:7px;left:7px;}
//     .ar-dot{width:7px;height:7px;border-radius:50%;background:#73A5CA;box-shadow:0 0 8px rgba(115,165,202,.70);animation:pulse 2s ease infinite;display:inline-block;margin-right:6px;flex-shrink:0;}
//     .ar-dot--green{background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.70);}
//     .back-btn{position:absolute;top:18px;left:18px;z-index:15;display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.18);color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:background .2s;backdrop-filter:blur(10px);}
//     .back-btn:hover{background:rgba(232,127,36,0.70);}
//   `;

//   if (mpError) return (
//     <div role="alert" style={{ display:"flex", alignItems:"center", justifyContent:"center",
//       height:"100vh", background:C.bg, color:"#c2410c", fontFamily:"monospace", padding:24,
//       textAlign:"center", fontSize:13 }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj       = adjUIState;
//   const idx          = GLASS_OPTIONS.findIndex(g => g.id === glasses);

//   // ════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const onTouchStart = e => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = e => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur+1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur-1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <>
//         <style>{css}</style>
//         <div
//           style={{ display:"flex", flexDirection:"column", height:"100dvh", background:"#000", touchAction:"pan-y" }}
//           onTouchStart={onTouchStart}
//           onTouchEnd={onTouchEnd}
//         >
//           {/* Camera area */}
//           <div style={{ position:"relative", flex:"1 1 auto", minHeight:0, background:"#000", overflow:"hidden" }}>
//             {/* FIX: video hidden — selfieMode:true hone ke baad MediaPipe output already mirrored hai */}
//             <video
//               ref={videoRef}
//               style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }}
//               autoPlay playsInline muted
//             />
//             <canvas
//               ref={canvasRef}
//               style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", display:"block" }}
//               aria-label="AR glasses try-on"
//             />

//             <BrandingBadge mobile />

//             {/* Back button */}
//             <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
//               <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
//               </svg>
//               Back
//             </button>

//             {/* FIX: faceTracking state se green/blue dot — confirm karo detect ho raha hai */}
//             {cameraReady && (
//               <div style={{ position:"absolute", top:12, right:12, zIndex:20,
//                 display:"flex", alignItems:"center",
//                 background:"rgba(0,0,0,0.55)", ...glassPill,
//                 border:`1px solid ${faceTracking?"rgba(34,197,94,.35)":"rgba(115,165,202,.30)"}`,
//                 padding:"5px 12px" }}>
//                 <span className={`ar-dot ${faceTracking?"ar-dot--green":""}`} />
//                 <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.80)", letterSpacing:".5px" }}>
//                   {faceTracking ? "Tracking" : "Searching..."}
//                 </span>
//               </div>
//             )}

//             {cameraReady && currentGlass && (
//               <div aria-live="polite" style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
//                 zIndex:20, whiteSpace:"nowrap", background:"rgba(0,0,0,0.55)", ...glassPill,
//                 border:"1px solid rgba(232,127,36,.35)", padding:"7px 20px",
//                 display:"flex", alignItems:"center", gap:10 }}>
//                 <span style={{ fontSize:12, fontWeight:700, color:"rgba(254,253,223,.95)" }}>{currentGlass.name}</span>
//                 <span style={{ width:1, height:11, background:"rgba(232,127,36,.40)", display:"inline-block" }} />
//                 <span style={{ fontSize:12, fontWeight:700, background:"linear-gradient(135deg,#F5A623,#E87F24)",
//                   WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{currentGlass.price}</span>
//               </div>
//             )}

//             {/* Progress dots */}
//             {cameraReady && (
//               <div style={{ position:"absolute", bottom:56, left:"50%", transform:"translateX(-50%)",
//                 display:"flex", gap:4, zIndex:20 }}>
//                 {GLASS_OPTIONS.map((g,i) => (
//                   <div key={g.id} style={{
//                     width:i===idx?14:4, height:4, borderRadius:3,
//                     background:i===idx?"#E87F24":"rgba(255,255,255,.25)",
//                     transition:"all .25s ease"
//                   }} />
//                 ))}
//               </div>
//             )}

//             {/* Loading overlay */}
//             {!cameraReady && (
//               <div role="status" style={{ position:"absolute", inset:0, zIndex:50,
//                 background:"radial-gradient(ellipse 120% 80% at 55% 30%,rgba(232,127,36,.08),rgba(0,0,0,.98) 60%)",
//                 display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24 }}>
//                 <div style={{ position:"relative", width:44, height:44 }}>
//                   <div className="spinner"/>
//                   <div className="spinner-inner"/>
//                 </div>
//                 <div style={{ textAlign:"center" }}>
//                   <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6,
//                     background:"linear-gradient(135deg,#F5A623,#E87F24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                     VR.OPTICS
//                   </div>
//                   <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:"#E87F24", marginBottom:8 }}>INITIALIZING</div>
//                   <div style={{ fontSize:10, color:"rgba(254,253,223,.40)" }}>Allow camera access to continue</div>
//                 </div>
//                 <div style={{ fontSize:9, color:"rgba(254,253,223,.22)", border:"0.5px solid rgba(255,255,255,.10)",
//                   borderRadius:100, padding:"4px 14px" }}>← Swipe to browse frames →</div>
//               </div>
//             )}
//           </div>

//           {/* Frames carousel */}
//           <div style={{ flexShrink:0, paddingBottom:"env(safe-area-inset-bottom,10px)",
//             background:"linear-gradient(to top,rgba(8,4,1,.98) 40%,rgba(8,4,1,.80) 70%,transparent 100%)" }}>
//             <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 2px" }}>
//               <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px",
//                 color:"rgba(254,253,223,.35)", textTransform:"uppercase" }}>Frames</span>
//               <span style={{ fontSize:9, color:"rgba(254,253,223,.30)" }} aria-live="polite">{idx+1} / {GLASS_OPTIONS.length}</span>
//             </div>
//             <div className="lens-carousel" role="listbox" aria-label="Select glasses frame">
//               {GLASS_OPTIONS.map((g,i) => {
//                 const isA = glasses === g.id;
//                 const sz  = isA ? 58 : 50;
//                 return (
//                   <div key={g.id} ref={isA ? activeCarouselRef : null}
//                     className={`lens-ring ${isA?"lens-ring--active":"lens-ring--inactive"}`}
//                     role="option" aria-selected={isA} tabIndex={0}
//                     onClick={() => setGlasses(g.id)}
//                     onKeyDown={e => (e.key==="Enter"||e.key===" ") && setGlasses(g.id)}
//                     style={{ minWidth:60 }}>
//                     <div className="lens-ring__circle" style={{ width:sz, height:sz,
//                       background:isA
//                         ?"radial-gradient(circle at 35% 35%,rgba(232,127,36,.28),rgba(10,5,2,.95))"
//                         :"radial-gradient(circle at 35% 35%,rgba(255,255,255,.07),rgba(10,5,2,.85))" }}>
//                       <div className="lens-ring__glow-ring" />
//                       <img src={g.id} alt={g.name} loading="lazy" className="lens-ring__img" />
//                     </div>
//                     <span className="lens-ring__label">{g.name}</span>
//                     <div className="lens-ring__dot" />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // ════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT
//   // ════════════════════════════════════════════════════════════
//   return (
//     <>
//       <div style={{ fontFamily:"'Space Grotesk',sans-serif", background:C.gradBg, color:C.text,
//         height:"100vh", display:"flex", overflow:"hidden" }}>
//         <style>{css}</style>

//         {/* Ambient glow */}
//         <div aria-hidden style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//           <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
//             background:"radial-gradient(circle,rgba(232,127,36,.14) 0%,transparent 70%)" }} />
//           <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
//             background:"radial-gradient(circle,rgba(115,165,202,.12) 0%,transparent 70%)" }} />
//         </div>

//         {/* ── Camera (75%) ── */}
//         <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%",
//           padding:20, display:"flex", flexDirection:"column" }}>
//           <div style={{ flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//             border:`1px solid ${C.glassBorder}`, background:"#000",
//             boxShadow:"inset 0 0 60px rgba(0,0,0,.40),0 8px 40px rgba(30,41,59,.12)" }}>

//             <BrandingBadge mobile={false} />

//             {/* Back button */}
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
//               </svg>
//               Back
//             </button>

//             {incomingProductName && cameraReady && (
//               <div style={{ position:"absolute", bottom:60, left:"50%", transform:"translateX(-50%)",
//                 display:"flex", alignItems:"center", gap:10, padding:"7px 20px", borderRadius:999,
//                 background:"rgba(0,0,0,.52)", border:"0.5px solid rgba(232,127,36,.35)",
//                 whiteSpace:"nowrap", zIndex:6, pointerEvents:"none", animation:"fadeIn .35s ease" }}>
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E87F24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <circle cx="12" cy="12" r="3"/>
//                   <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
//                 </svg>
//                 <span style={{ fontSize:11, fontWeight:700, color:"rgba(254,253,223,.90)", letterSpacing:".5px" }}>
//                   Viewing: {incomingProductName}
//                 </span>
//               </div>
//             )}

//             {cameraReady && (
//               <div role="status" style={{ position:"absolute", top:16, right:16, zIndex:5,
//                 display:"flex", alignItems:"center",
//                 background:"rgba(0,0,0,.42)", ...glassPill,
//                 border:`1px solid ${faceTracking?"rgba(34,197,94,.28)":"rgba(115,165,202,.28)"}`,
//                 padding:"5px 14px", animation:"fadeIn .3s ease" }}>
//                 <span className={`ar-dot ${faceTracking?"ar-dot--green":""}`} />
//                 <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.80)", letterSpacing:".5px" }}>
//                   {faceTracking ? "Face Tracking Active" : "Searching for Face..."}
//                 </span>
//               </div>
//             )}

//             {/* Selected frame badge */}
//             <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//               <div aria-live="polite" style={{ background:"rgba(0,0,0,.52)", ...glassPill,
//                 border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
//                 display:"flex", alignItems:"center", gap:12 }}>
//                 <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,.50)", letterSpacing:"1.5px" }}>SELECTED</span>
//                 <span style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//                 <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,.95)" }}>{currentGlass?.name}</span>
//                 <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary,
//                   WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{currentGlass?.price}</span>
//               </div>
//             </div>

//             <video
//               ref={videoRef}
//               style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }}
//               autoPlay playsInline muted
//             />
//             <canvas
//               ref={canvasRef}
//               width={DESKTOP_CAM_W}
//               height={DESKTOP_CAM_H}
//               aria-label="AR glasses try-on camera view"
//               style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//             />

//             {!cameraReady && (
//               <div role="status" style={{ position:"absolute", inset:0, borderRadius:22, zIndex:30,
//                 background:`radial-gradient(ellipse 100% 60% at 55% 30%,rgba(232,127,36,.08),rgba(254,253,223,.97) 55%)`,
//                 display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
//                 <div style={{ position:"relative", width:50, height:50 }}>
//                   <div className="spinner"/>
//                   <div className="spinner-inner"/>
//                 </div>
//                 <div style={{ textAlign:"center" }}>
//                   <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
//                     background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                     INITIALIZING CAMERA
//                   </div>
//                   <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Controls panel (25%) ── */}
//         <div className="right-panel" role="complementary"
//           style={{ position:"relative", zIndex:1, flex:"0 0 25%", maxWidth:"25%", overflowY:"auto",
//             padding:"20px 16px 20px 4px", display:"flex", flexDirection:"column", gap:12,
//             borderLeft:`1px solid ${C.glassBorder}`,
//             background:"linear-gradient(180deg,rgba(245,243,199,.60),rgba(254,253,223,.80))",
//             backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>

//           <div style={{ padding:"4px 4px 2px" }}>
//             <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
//               Choose Frame
//             </div>
//             <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//               {GLASS_OPTIONS.length} styles available
//             </div>
//             {incomingProductName && (
//               <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:6, padding:"5px 10px",
//                 borderRadius:8, background:C.primary12, border:`1px solid ${C.primary25}` }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <circle cx="12" cy="12" r="3"/>
//                   <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
//                 </svg>
//                 <span style={{ fontSize:9, fontWeight:700, color:C.primary, letterSpacing:".5px" }}>
//                   From: {incomingProductName}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Frame grid */}
//           <div role="listbox" aria-label="Select glasses frame"
//             style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div key={g.id} ref={isA ? activeGridRef : null}
//                   className="frame-card" role="option" aria-selected={isA} tabIndex={0}
//                   onClick={() => setGlasses(g.id)}
//                   onKeyDown={e => (e.key==="Enter"||e.key===" ") && setGlasses(g.id)}
//                   style={{ borderRadius:14, background:isA?C.primary12:"rgba(254,253,223,.55)",
//                     border:`1px solid ${isA?C.primary:C.surfaceBorder}`, padding:"10px 6px",
//                     display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:"pointer",
//                     boxShadow:isA?`0 0 20px rgba(232,127,36,.20),0 4px 12px rgba(30,41,59,.08)`:`0 1px 4px ${C.text06}`,
//                     transition:"all .22s cubic-bezier(.22,1,.36,1)",
//                     backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)" }}>
//                   <div style={{ width:"100%", height:48, display:"flex", alignItems:"center", justifyContent:"center",
//                     borderRadius:10, overflow:"hidden", background:isA?C.primary12:C.text06 }}>
//                     <img src={g.id} alt={g.name} loading="lazy" crossOrigin="anonymous"
//                       style={{ width:"90%", height:"90%", objectFit:"contain",
//                         filter:isA?"drop-shadow(0 0 5px rgba(232,127,36,.55))":"brightness(.80) saturate(.75)",
//                         transition:"filter .2s" }} />
//                   </div>
//                   <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2,
//                     color:isA?C.text:C.text55 }}>{g.name}</div>
//                   <div style={{ fontSize:8, fontWeight:700,
//                     background:isA?C.gradPrimary:"none", WebkitBackgroundClip:isA?"text":"unset",
//                     WebkitTextFillColor:isA?"transparent":C.primary,
//                     color:isA?"transparent":C.primary }}>{g.price}</div>
//                 </div>
//               );
//             })}
//           </div>

//           <Section title="FRAME CALIBRATION" icon="⚙️">
//             <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//               <button onClick={resetAdj} style={{ fontSize:9, fontWeight:700, color:C.primary,
//                 background:C.primary12, border:`0.5px solid ${C.primary25}`, padding:"5px 14px",
//                 borderRadius:100, cursor:"pointer" }}>Reset</button>
//             </div>
//             <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleW",v)}  fmt={v=>`${v.toFixed(2)}×`} />
//             <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleH",v)}  fmt={v=>`${v.toFixed(2)}×`} />
//             <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetX",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
//             <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetY",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
//             <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v=>setAdj("rotate",v)}  fmt={v=>`${v>0?"+":""}${v.toFixed(1)}°`} />
//           </Section>

//           <Section title="SCENE FILTERS" icon="🎨">
//             <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v=>`${v}%`} />
//             <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v=>`${v}%`} />
//             <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v=>`${v}%`} />
//           </Section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TryOn;

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── Adjustments per frame ─────────────────────────────────────────────────────
const DEFAULT_ADJ = { scaleW:1, scaleH:1,    offsetX:0, offsetY:0,  rotate:0 };
const AVIATOR_ADJ = { scaleW:1, scaleH:1.18, offsetX:0, offsetY:10, rotate:0 };
const ROUND_ADJ   = { scaleW:1, scaleH:0.85, offsetX:0, offsetY:4,  rotate:0 };


export const GLASS_OPTIONS = [
  { id:"/glass1.png",  name:"H77048 - Square Plastic Sunglass Luxury Style", price:"PKR 2,999", sizes:[{label:"XL",scale:1.10,mobileScale:1.00}] },
  { id:"/glass2.png",  name:"T1798 - Oval Plastic Sunglass",                   price:"PKR 800",   sizes:[{label:"L", scale:1.15,mobileScale:1.00}] },
  { id:"/glass3.png",  name:"99032 - Square Plastic Sunglass",            price:"PKR 2,400", sizes:[{label:"L", scale:1.15,mobileScale:1.00}] },
  { id:"/glass4.png",  name:"28044 - Square Shape Plastic Sunglass",         price:"PKR 800",   sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass5.png",  name:"28044- Square Plastic Sunglass",             price:"PKR 2,500", sizes:[{label:"L", scale:1.25,mobileScale:0.98}] },
  { id:"/glass6.png",  name:"9368-square Plastic Shape Sunglass",          price:"PKR 2,400", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass7.png",  name:"5013 - Square Plastic Sunglass",               price:"PKR 1,899", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
  { id:"/glass8.png",  name:"1122 - Plastic Eye Sunglass",                   price:"PKR 1,600", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
  { id:"/glass9.png",  name:"R1013 - Square Plastic Sunglass",               price:"PKR 2,899", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
  { id:"/glass10.png", name:"Lfl228- Eye Plastic Sunglass",                  price:"PKR 4,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass11.png", name:" - Square Plastic Sunglass",               price:"PKR 2,400", sizes:[{label:"S", scale:0.75,mobileScale:0.50}] },
  { id:"/glass12.png", name:"K58083 - Eye Plastic Sunglass",                  price:"PKR 3,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass13.png", name:" IPB- One Piece Sunglass",                      price:"PKR 800",   sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
  { id:"/glass14.png", name:"20237- Plastic Square Men Sunglass",           price:"PKR 4,600", sizes:[{label:"S", scale:0.95,mobileScale:0.50}] },
  { id:"/glass15.png", name:"28118 - Square Plastic Sunglass",              price:"PKR 3,200", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass16.png", name:"To4917 - Box Plastic Sunglass",                  price:"PKR 4,800", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass17.png", name:"Of8651 - Box Plastic Sunglass",                price:"PKR 4,600", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass18.png", name:"9702 - Metal Oval",                             price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass19.png", name:"3377 - Plastic Curve Square Shape",           price:"PKR 1,399", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass20.png", name:"Bl0985 - Plastic Square Shape",                  price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass21.png", name:" - Plastic Square Shape",                 price:"PKR 1,399", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
  { id:"/glass22.png", name:"B7195 - Plastic Vaffer Shape",                  price:"PKR 1,499", sizes:[{label:"L", scale:1.05,mobileScale:0.95}] },
  { id:"/glass23.png", name:"Tr90 - Plastic Square Shape",                   price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass24.png", name:"9368 - Plastic Square Shape",                  price:"PKR 1,499", sizes:[{label:"S", scale:0.85,mobileScale:0.50}] },
  { id:"/glass25.png", name:"Jb5816 - Plastic Eye Shape",                    price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass26.png", name:"P3002 - Plastic Eye Shape",                    price:"PKR 1,799", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass27.png", name:"Of8506 - Plastic Square Shape",                  price:"PKR 1,199", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass28.png", name:"P210 - Plastic Square Shape",                   price:"PKR 1,499", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
  { id:"/glass29.png", name:"D1256 - Metal Eye Shape",                      price:"PKR 1,899", sizes:[{label:"L", scale:1.25,mobileScale:0.95}] },
  { id:"/glass30.png", name:"Jb5816 - Plastic Eye Shape",                     price:"PKR 1,999", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass31.png", name:"D8953 - Plastic Oval Shape",                    price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass32.png", name:"9368 - Plastic Square Shape",                  price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass33.png", name:"Sj2160 - Plastic Oval Shape",                     price:"PKR 1,499", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass34.png", name:"D8815 - Plastic Oval Shape",                   price:"PKR 2,299", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass35.png", name:"Rb4455f - Plastic Square Shape",                   price:"PKR 1,499", sizes:[{label:"M", scale:1.10,mobileScale:0.75}] },
  { id:"/glass36.png", name:"9702 - Plastic Round Shape",                   price:"PKR 1,799", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass37.png", name:"To4917 - Plastic & Metal Round shape",          price:"PKR 2,899", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass38.png", name:"D8954 - Plastic & Metal Round Shape",          price:"PKR 1,999", sizes:[{label:"XL",scale:1.30,mobileScale:1.10}] },
  { id:"/glass39.png", name:"3377 - Plastic & Metal Round Shape",          price:"PKR 1,999", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass40.png", name:"D8822 - Plastic & Metal Round Shape",          price:"PKR 2,899", sizes:[{label:"M", scale:1.00,mobileScale:0.75}] },
  { id:"/glass41.png", name:"Dl03054s - Plastic & Metal Round Shape",            price:"PKR 2,299", sizes:[{label:"L", scale:1.15,mobileScale:0.95}] },
  { id:"/glass42.png", name:" - RimLess Eye Shape",                     price:"PKR 1,999", sizes:[{label:"S", scale:0.95,mobileScale:0.50}] },
];




// ── Resolve initial frame from router state ───────────────────────────────────
const resolveInitialFrame = (state) => {
  if (!state?.frameId) return GLASS_OPTIONS[0].id;
  const match = GLASS_OPTIONS.find(g => g.id === state.frameId);
  return match ? match.id : GLASS_OPTIONS[0].id;
};

// ── Device helpers ────────────────────────────────────────────────────────────
const getIsMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const getSizeScale = (sizeObj, mobile) =>
  sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

const MOBILE_FPS       = 30;
const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;
const DESKTOP_CAM_W    = 1280;
const DESKTOP_CAM_H    = 720;
const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// ── Landmarks ─────────────────────────────────────────────────────────────────
const LM = {
  // FIX: iris landmarks sirf refineLandmarks:true pe available hain (desktop only)
  LEFT_IRIS_CENTER:  468,
  RIGHT_IRIS_CENTER: 473,
  LEFT_EYE_OUTER:    33,
  RIGHT_EYE_OUTER:   263,
  LEFT_EYE_INNER:    133,
  RIGHT_EYE_INNER:   362,
  LEFT_EYEBROW_LOWER:  [70,63,105,66,107],
  RIGHT_EYEBROW_LOWER: [300,293,334,296,336],
  NOSE_BRIDGE_TOP:   6,
};

class FaceGeoSmoother {
  constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta=60, maxScaleDelta=0.15 }) {
    Object.assign(this, { posAlpha, scaleAlpha, rotAlpha, maxPosDelta, maxScaleDelta, prev:null });
  }
  _step(p, c, a, mx, dz=0) {
    const d = c-p;
    if (dz > 0 && Math.abs(d) < dz) return p;
    return p + a * Math.max(-mx, Math.min(mx, d));
  }
  smooth(cur, dz=0) {
    if (!this.prev) { this.prev={...cur}; return {...cur}; }
    const p=this.prev, r={
      cx:    this._step(p.cx,    cur.cx,    this.posAlpha,   this.maxPosDelta,   dz),
      cy:    this._step(p.cy,    cur.cy,    this.posAlpha,   this.maxPosDelta,   dz),
      gw:    this._step(p.gw,    cur.gw,    this.scaleAlpha, this.maxPosDelta,   0),
      gh:    this._step(p.gh,    cur.gh,    this.scaleAlpha, this.maxPosDelta,   0),
      angle: this._step(p.angle, cur.angle, this.rotAlpha,   0.18,              0),
      ds:    this._step(p.ds,    cur.ds,    this.scaleAlpha, this.maxScaleDelta, 0),
    };
    this.prev={...r}; return r;
  }
  reset() { this.prev=null; }
}

// FIX: useIris parameter — mobile pe refineLandmarks:false hota hai
// isliye iris landmarks (468,473) available nahi — eye corners use karo
function extractFaceGeometry(lm, W, H, useIris=false) {
  const px    = i => ({ x:lm[i].x*W, y:lm[i].y*H, z:lm[i].z ?? 0 });
  const avgPx = is => {
    const ps = is.map(px);
    return { x:ps.reduce((s,p)=>s+p.x,0)/ps.length, y:ps.reduce((s,p)=>s+p.y,0)/ps.length };
  };
  const dist  = (a,b) => Math.hypot(a.x-b.x, a.y-b.y);

  const leo = px(LM.LEFT_EYE_OUTER);
  const reo = px(LM.RIGHT_EYE_OUTER);
  const lei = px(LM.LEFT_EYE_INNER);
  const rei = px(LM.RIGHT_EYE_INNER);
  const nbt = px(LM.NOSE_BRIDGE_TOP);
  const lb  = avgPx(LM.LEFT_EYEBROW_LOWER);
  const rb  = avgPx(LM.RIGHT_EYEBROW_LOWER);

  // FIX: useIris aur lm length dono check — safe iris access
  let li, ri;
  if (useIris && lm.length > 473) {
    li = px(LM.LEFT_IRIS_CENTER);
    ri = px(LM.RIGHT_IRIS_CENTER);
  } else {
    // Mobile fallback: eye inner aur outer ka midpoint
    li = { x:(leo.x+lei.x)/2, y:(leo.y+lei.y)/2, z:(leo.z+lei.z)/2 };
    ri = { x:(reo.x+rei.x)/2, y:(reo.y+rei.y)/2, z:(reo.z+rei.z)/2 };
  }

  const irisY    = (li.y + ri.y) / 2;
  const centerX  = (li.x + ri.x) / 2;
  const browMidY = (lb.y + rb.y) / 2;
  const centerY  = irisY * 0.65 + nbt.y * 0.30 + browMidY * 0.05;

  const aEc  = Math.atan2(reo.y - leo.y, reo.x - leo.x);
  const aBr  = Math.atan2(rb.y  - lb.y,  rb.x  - lb.x);
  const aIr  = useIris ? Math.atan2(ri.y - li.y, ri.x - li.x) : aEc;
  const angle = aEc * 0.65 + aBr * 0.25 + aIr * 0.10;

  const eyeSpan = dist(leo, reo);
  // FIX: mobile pe iris nahi toh scale multiplier thoda bada
  const sm      = useIris ? 1.0 : 1.20;

  const avgZ = (li.z + ri.z + (nbt.z ?? 0)) / 3;
  return {
    centerX,
    centerY,
    angle,
    glassesWidth:  eyeSpan * 1.60 * sm,
    glassesHeight: eyeSpan * 0.90 * sm,
    depthScale:    Math.max(0.70, Math.min(1.55, 1 + (-avgZ * 2.5))),
  };
}

// ── Theme ─────────────────────────────────────────────────────────────────────
const C = {
  primary:"#E87F24", bg:"#FEFDDF", surface:"#F5F3C7", text:"#1E293B",
  primary12:"rgba(232,127,36,0.12)", primary20:"rgba(232,127,36,0.20)",
  primary25:"rgba(232,127,36,0.25)", primary30:"rgba(232,127,36,0.30)",
  primary40:"rgba(232,127,36,0.40)",
  accent12:"rgba(115,165,202,0.12)", accent20:"rgba(115,165,202,0.20)",
  text55:"rgba(30,41,59,0.55)", text30:"rgba(30,41,59,0.30)",
  text12:"rgba(30,41,59,0.12)", text06:"rgba(30,41,59,0.06)",
  glassBg:"rgba(254,253,223,0.65)", glassBorder:"rgba(255,255,255,0.70)",
  surfaceBorder:"rgba(255,255,255,0.85)",
  gradPrimary:"linear-gradient(135deg,#E87F24,#F5A623)",
  gradPrimaryTx:"linear-gradient(135deg,#F5A623,#E87F24)",
  gradBg:`radial-gradient(ellipse 60% 50% at 80% 10%,rgba(232,127,36,0.13) 0%,transparent 60%),
    radial-gradient(ellipse 50% 40% at 10% 80%,rgba(115,165,202,0.12) 0%,transparent 55%),#FEFDDF`,
};
const glassPill = { borderRadius:100, backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)" };

// ── Sub-components ────────────────────────────────────────────────────────────
const BrandingBadge = ({ mobile }) => (
  <div style={{
    position:"absolute", top:mobile?12:18, left:"50%", transform:"translateX(-50%)",
    zIndex:10, display:"flex", alignItems:"center", gap:8,
    padding:mobile?"6px 16px":"8px 20px", borderRadius:999,
    background:mobile?"rgba(0,0,0,0.55)":"rgba(254,253,223,0.65)",
    backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)",
    border:`1px solid rgba(232,127,36,0.25)`,
    boxShadow:mobile
      ?"0 4px 20px rgba(232,127,36,0.18),0 2px 12px rgba(0,0,0,0.35)"
      :"0 4px 24px rgba(232,127,36,0.20),0 2px 10px rgba(30,41,59,0.10)",
    animation:"fadeIn 0.35s ease", whiteSpace:"nowrap", pointerEvents:"none",
  }}>
    <div style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",
      boxShadow:"0 0 10px #22c55e",animation:"pulse 2s ease infinite",flexShrink:0 }} />
    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:mobile?11:13, fontWeight:700,
      letterSpacing:"2px", color:mobile?"#fff":"#1E293B", textTransform:"uppercase", userSelect:"none" }}>
      PRODUCT BY ASW SOLUTION
    </span>
  </div>
);

const Section = ({ title, icon, defaultOpen=false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius:16, border:`1px solid ${C.glassBorder}`, overflow:"hidden",
      background:C.glassBg, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}>
      <button onClick={() => setOpen(o=>!o)} aria-expanded={open}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"13px 16px", background:"rgba(254,253,223,0.50)", border:"none", cursor:"pointer",
          borderBottom:open?`1px solid ${C.glassBorder}`:"none" }}>
        <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:10, fontWeight:700, letterSpacing:"2px", color:C.primary }}>
          <span style={{ fontSize:13 }}>{icon}</span>{title}
        </span>
        <span style={{ fontSize:9, color:C.text55, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.22s ease", display:"inline-block" }}>▼</span>
      </button>
      {open && <div style={{ padding:16, background:"rgba(245,243,199,.40)" }}>{children}</div>}
    </div>
  );
};

const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
  <div style={{ marginBottom:18 }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
      <label style={{ fontSize:10, color:C.text55, fontWeight:600, letterSpacing:"1px" }}>{label}</label>
      <span style={{ fontSize:11, fontWeight:700, background:C.gradPrimaryTx,
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{fmt(value)}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(Number(e.target.value))}
      style={{ width:"100%", height:3, background:C.primary20, borderRadius:4,
        appearance:"none", WebkitAppearance:"none", cursor:"pointer" }} />
  </div>
);

// ── Main TryOn Component ──────────────────────────────────────────────────────
const TryOn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFrameId      = resolveInitialFrame(location.state);
  const incomingProductName = location.state?.productName || null;

  // Refs
  const videoRef            = useRef(null);
  const canvasRef           = useRef(null);
  const imgRef              = useRef(new Image());
  const rafIdRef            = useRef(null);
  const lastFrameRef        = useRef(0);
  const touchStartX         = useRef(null);
  const touchStartY         = useRef(null);
  const cameraRdyRef        = useRef(false);
  const glassesRef          = useRef(initialFrameId);
  const adjRef              = useRef({});
  const pendingResultRef    = useRef(null);
  const camStreamRef        = useRef(null);
  const camInstanceRef      = useRef(null);
  const cachedGlassRef      = useRef(null);
  const ctxRef              = useRef(null);
  const resultVersionRef    = useRef(0);
  const lastDrawnVersionRef = useRef(-1);
  const activeCarouselRef   = useRef(null);
  const activeGridRef       = useRef(null);
  // FIX: track karo kya face detect hua — debugging ke liye
  const faceDetectedRef     = useRef(false);

  const [isMobile,    setIsMobile]    = useState(() => getIsMobile());
  const isMobileRef = useRef(isMobile);
  const [, setVideoDims] = useState(null);

  const smootherRef = useRef(null);
  if (!smootherRef.current) {
    smootherRef.current = isMobile
      ? new FaceGeoSmoother({ posAlpha:.38, scaleAlpha:1.0, rotAlpha:.22, maxPosDelta:48, maxScaleDelta:5.0 })
      : new FaceGeoSmoother({ posAlpha:.45, scaleAlpha:1.0, rotAlpha:.30, maxPosDelta:60, maxScaleDelta:5.0 });
  }

  const [glasses,      setGlasses]     = useState(initialFrameId);
  const [cameraReady,  setCameraReady] = useState(false);
  const [faceTracking, setFaceTracking]= useState(false); // FIX: face tracking UI state
  const [brightness,   setBrightness]  = useState(100);
  const [contrast,     setContrast]    = useState(100);
  const [saturate,     setSaturate]    = useState(100);
  const [mpError,      setMpError]     = useState(null);

  const brightnessRef = useRef(100);
  const contrastRef   = useRef(100);
  const saturateRef   = useRef(100);
  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
  useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

  const adjustmentsRef = useRef(
    Object.fromEntries(GLASS_OPTIONS.map(g => {
      if (g.id === "/glass2.png") return [g.id, {...AVIATOR_ADJ}];
      if (g.id === "/glass4.png") return [g.id, {...ROUND_ADJ}];
      return [g.id, {...DEFAULT_ADJ}];
    }))
  );
  const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current[initialFrameId]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      const m = getIsMobile();
      if (isMobileRef.current === m) return; // Skip if device type hasn't changed
      
      isMobileRef.current = m;
      setIsMobile(m);
      ctxRef.current = null;
      
      // Resize canvas based on actual video dimensions
      if (videoRef.current?.videoWidth && canvasRef.current) {
        const vw = videoRef.current.videoWidth;
        const vh = videoRef.current.videoHeight;
        if (vw && vh) {
          canvasRef.current.width = vw;
          canvasRef.current.height = vh;
          setVideoDims({ w: vw, h: vh });
        }
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync glasses state → refs
  useEffect(() => {
    glassesRef.current     = glasses;
    adjRef.current         = adjustmentsRef.current;
    cachedGlassRef.current = GLASS_OPTIONS.find(g => g.id===glasses) || null;
    setAdjUIState({...(adjustmentsRef.current[glasses] || DEFAULT_ADJ)});
  }, [glasses]);

  // Preload image on frame change
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = glasses;
    imgRef.current = img;
  }, [glasses]);

  // Scroll active item into view
  useEffect(() => {
    activeCarouselRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
    activeGridRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest" });
  }, [glasses]);

  const setAdj = useCallback((key, val) => {
    const id = glassesRef.current;
    adjustmentsRef.current = {
      ...adjustmentsRef.current,
      [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]:val }
    };
    adjRef.current = adjustmentsRef.current;
    setAdjUIState(p => ({...p,[key]:val}));
  }, []);

  const resetAdj = useCallback(() => {
    const id = glassesRef.current;
    const d  = id==="/glass2.png" ? {...AVIATOR_ADJ} : id==="/glass4.png" ? {...ROUND_ADJ} : {...DEFAULT_ADJ};
    adjustmentsRef.current = { ...adjustmentsRef.current, [id]:d };
    adjRef.current = adjustmentsRef.current;
    setAdjUIState({...d});
  }, []);

  const drawLoop = useCallback(() => {
    rafIdRef.current = requestAnimationFrame(drawLoop);
    const mobile = isMobileRef.current;
    const now    = performance.now();
    
    // Mobile: throttle to 30fps; Desktop: run every frame
    if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
    lastFrameRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d", { alpha:false, willReadFrequently:false });
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const result = pendingResultRef.current;
    if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

    const W = canvas.width, H = canvas.height;

    // Apply filters only if needed (skip on mobile for better performance)
    const uB = brightnessRef.current, uC = contrastRef.current, uS = saturateRef.current;
    const needsFilter = !mobile && (uB!==100||uC!==100||uS!==100||BEAUTY_B!==100||BEAUTY_C!==100||BEAUTY_S!==100);
    if (needsFilter) {
      ctx.filter = `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${uB}%) contrast(${uC}%) saturate(${uS}%)`;
    } else {
      ctx.filter = "none";
    }

    // Draw camera frame
    if (mobile) {
      ctx.drawImage(result.image, 0, 0, W, H);
    } else {
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(result.image, 0, 0, W, H);
      ctx.restore();
    }
    ctx.filter = "none";

    // Check if face detected
    if (!result.multiFaceLandmarks?.length) {
      smootherRef.current.reset();
      lastDrawnVersionRef.current = resultVersionRef.current;
      if (faceDetectedRef.current) {
        faceDetectedRef.current = false;
        setFaceTracking(false);
      }
      return;
    }

    // Face detected - update tracking state
    if (!faceDetectedRef.current) {
      faceDetectedRef.current = true;
      setFaceTracking(true);
    }

    const lm  = result.multiFaceLandmarks[0];
    const useIris = !mobile;
    const geo = extractFaceGeometry(lm, W, H, useIris);
    const finalCx = mobile ? geo.centerX : (W - geo.centerX);

    const sm = smootherRef.current.smooth(
      { cx:finalCx, cy:geo.centerY, gw:geo.glassesWidth, gh:geo.glassesHeight, angle:geo.angle, ds:geo.depthScale },
      mobile ? 1.0 : 0,
    );

    const img = imgRef.current;
    if (!img.complete || !img.naturalWidth) return;

    const glassObj = cachedGlassRef.current;
    const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
    const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

    let w = sm.gw * adj.scaleW * geo.depthScale * sSc;
    let h = sm.gh * adj.scaleH * geo.depthScale * sSc;
    w = Math.max(20, Math.min(W * 0.95, w));
    h = Math.max(8,  Math.min(H * 0.60, h));

    const mAngle = mobile ? sm.angle : -sm.angle;
    const halfW = w * 0.5, halfH = h * 0.5;
    const clampX = Math.max(halfW, Math.min(W - halfW, sm.cx + adj.offsetX));
    const clampY = Math.max(halfH, Math.min(H - halfH, sm.cy + adj.offsetY));

    ctx.save();
    ctx.translate(clampX, clampY);
    ctx.rotate(mAngle + adj.rotate * Math.PI / 180);
    ctx.drawImage(img, -w/2, -h/2, w, h);
    ctx.restore();

    lastDrawnVersionRef.current = resultVersionRef.current;
  }, []);

  // FIX: onResults — version hamesha advance karo
  const onResults = useCallback(r => {
    pendingResultRef.current = r;
    resultVersionRef.current++;
  }, []);

  // ── Camera + FaceMesh init ───────────────────────────────────────────────────
  useEffect(() => {
    if (!window.FaceMesh) {
      setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
      return;
    }
    const mobile = isMobileRef.current;

    const faceMesh = new window.FaceMesh({
      locateFile: f => {
        // Use multiple CDN fallbacks for faster loading
        const cdns = [
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${f}`,
          `https://unpkg.com/@mediapipe/face_mesh@0.4/${f}`
        ];
        // Use first CDN; browser will fallback on error
        return cdns[0];
      }
    });

    faceMesh.setOptions({
      maxNumFaces:           1,
      // Mobile: faster detection without iris landmarks; Desktop: full precision
      refineLandmarks:       !mobile,
      selfieMode:            true,
      // Aggressive thresholds - 0.3 and 0.25 for faster face detection
      minDetectionConfidence: 0.30,
      minTrackingConfidence:  0.25,
    });

    faceMesh.onResults(onResults);
    rafIdRef.current = requestAnimationFrame(drawLoop);

    navigator.mediaDevices.getUserMedia({
      video:{
        facingMode: "user",
        // Optimize constraints: lower resolution = faster camera startup
        width:      { ideal: 480 },  // Max 480px for faster access
        height:     { ideal: 360 },  // Reduced height
        frameRate:  { ideal: 30, max: 30 },  // 30fps max - sufficient for face detection
      },
      audio: false,
    })
    .then(stream => {
      camStreamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        // Use play() with timeout fallback
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Camera started - initialize canvas and face detection
            const vw = video.videoWidth, vh = video.videoHeight;
            if (canvasRef.current && vw && vh) {
              canvasRef.current.width = vw;
              canvasRef.current.height = vh;
              setVideoDims({ w: vw, h: vh });
              ctxRef.current = null;
            } else if (!mobile && canvasRef.current) {
              canvasRef.current.width = DESKTOP_CAM_W;
              canvasRef.current.height = DESKTOP_CAM_H;
              ctxRef.current = null;
            }
            
            cameraRdyRef.current = true;
            setCameraReady(true);
            
            // Start frame sending
            const sendFrame = async () => {
              if (!cameraRdyRef.current) return;
              try {
                if (video.readyState >= 2) await faceMesh.send({ image: video });
              } catch (_) {}
              if (cameraRdyRef.current) {
                camInstanceRef.current = requestAnimationFrame(sendFrame);
              }
            };
            camInstanceRef.current = requestAnimationFrame(sendFrame);
            
          }).catch(() => setMpError("Could not start video. Please reload and allow camera access."));
        } else {
          // Fallback for browsers with synchronous play
          cameraRdyRef.current = true;
          setCameraReady(true);
        }
      };
    })
    .catch(err => {
      console.error("Camera error:", err);
      setMpError("Camera access denied. Please allow camera permissions and reload.");
    });

    return () => {
      cameraRdyRef.current = false;
      if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
      if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
      camStreamRef.current?.getTracks().forEach(t => t.stop());
      camStreamRef.current = null;
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      faceMesh.close();
    };
  }, [drawLoop, onResults]);

  // ── CSS ──────────────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    input[type="range"]{-webkit-appearance:none;appearance:none;background:transparent;}
    input[type="range"]::-webkit-slider-runnable-track{background:linear-gradient(90deg,rgba(232,127,36,.30),rgba(232,127,36,.10));height:3px;border-radius:3px;}
    input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#F5A623,#E87F24);cursor:pointer;margin-top:-6.5px;border:2px solid rgba(254,253,223,.90);box-shadow:0 2px 8px rgba(232,127,36,.40);}
    input[type="range"]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 38% 35%,#F5A623,#E87F24);cursor:pointer;border:2px solid rgba(254,253,223,.90);}
    .right-panel{scrollbar-width:thin;scrollbar-color:rgba(232,127,36,.40) rgba(232,127,36,.08);}
    ::-webkit-scrollbar{width:3px;height:3px;}
    ::-webkit-scrollbar-track{background:rgba(232,127,36,.06);border-radius:4px;}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#E87F24,#F5A623);border-radius:4px;}
    .lens-carousel{display:flex;gap:14px;padding:6px 20px 14px;overflow-x:auto;overflow-y:visible;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth;}
    .lens-carousel::-webkit-scrollbar{display:none;}
    .lens-ring{flex-shrink:0;scroll-snap-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;transition:transform .25s ease;}
    .lens-ring__circle{width:58px;height:58px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .25s,box-shadow .28s;}
    .lens-ring__img{width:68%;height:68%;object-fit:contain;pointer-events:none;transition:filter .25s ease;}
    .lens-ring--active .lens-ring__circle{transform:scale(1.15);box-shadow:0 0 0 2.5px #E87F24,0 0 0 5px rgba(232,127,36,.20),0 0 24px rgba(232,127,36,.55);}
    .lens-ring--active .lens-ring__img{filter:drop-shadow(0 0 8px rgba(232,127,36,.80)) brightness(1.05);}
    .lens-ring--inactive .lens-ring__circle{transform:scale(.88);opacity:.55;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 2px 8px rgba(0,0,0,.35);}
    .lens-ring--inactive .lens-ring__img{filter:brightness(.55) saturate(.55);}
    .lens-ring__glow-ring{position:absolute;inset:-3px;border-radius:50%;padding:2px;pointer-events:none;background:conic-gradient(from 0deg,#F5A623,#E87F24,#FF6B35,#F5A623);opacity:0;transition:opacity .25s;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:spinRing 2s linear infinite;}
    .lens-ring--active .lens-ring__glow-ring{opacity:1;}
    @keyframes spinRing{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    .lens-ring__label{font-size:9px;font-weight:700;text-align:center;max-width:64px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;transition:color .25s,opacity .25s;}
    .lens-ring--active .lens-ring__label{color:#F5A623;opacity:1;}
    .lens-ring--inactive .lens-ring__label{color:rgba(255,255,255,.40);}
    .lens-ring__dot{width:4px;height:4px;border-radius:50%;background:#E87F24;transition:opacity .25s,transform .25s;}
    .lens-ring--active .lens-ring__dot{opacity:1;transform:scale(1);box-shadow:0 0 8px #E87F24;}
    .lens-ring--inactive .lens-ring__dot{opacity:0;transform:scale(0);}
    .frame-card{transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s;-webkit-tap-highlight-color:transparent;}
    .frame-card:hover{transform:translateY(-2px) scale(1.03);}
    .frame-card:active{transform:scale(.96);}
    @keyframes spin   {to{transform:rotate(360deg)}}
    @keyframes fadeIn {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse  {0%,100%{opacity:.55}50%{opacity:1}}
    .spinner{width:44px;height:44px;border-radius:50%;border:2px solid rgba(115,165,202,.20);border-top-color:#E87F24;animation:spin .85s linear infinite;}
    .spinner-inner{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(232,127,36,.15);border-bottom-color:#F5A623;animation:spin 1.2s linear infinite reverse;position:absolute;top:7px;left:7px;}
    .ar-dot{width:7px;height:7px;border-radius:50%;background:#73A5CA;box-shadow:0 0 8px rgba(115,165,202,.70);animation:pulse 2s ease infinite;display:inline-block;margin-right:6px;flex-shrink:0;}
    .ar-dot--green{background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.70);}
    .back-btn{position:absolute;top:18px;left:18px;z-index:15;display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.18);color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:background .2s;backdrop-filter:blur(10px);}
    .back-btn:hover{background:rgba(232,127,36,0.70);}
  `;

  if (mpError) return (
    <div role="alert" style={{ display:"flex", alignItems:"center", justifyContent:"center",
      height:"100vh", background:C.bg, color:"#c2410c", fontFamily:"monospace", padding:24,
      textAlign:"center", fontSize:13 }}>
      ⚠️ {mpError}
    </div>
  );

  const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
  const curAdj       = adjUIState;
  const idx          = GLASS_OPTIONS.findIndex(g => g.id === glasses);

  // ════════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ════════════════════════════════════════════════════════════
  if (isMobile) {
    const onTouchStart = e => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = e => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
      if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
        const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
        if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur+1].id);
        if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur-1].id);
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    return (
      <>
        <style>{css}</style>
        <div
          style={{ display:"flex", flexDirection:"column", height:"100dvh", background:"#000", touchAction:"pan-y" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Camera area */}
          <div style={{ position:"relative", flex:"1 1 auto", minHeight:0, background:"#000", overflow:"hidden" }}>
            {/* FIX: video hidden — selfieMode:true hone ke baad MediaPipe output already mirrored hai */}
            <video
              ref={videoRef}
              style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }}
              autoPlay playsInline muted
            />
            <canvas
              ref={canvasRef}
              width={480}
              height={360}
              aria-label="AR glasses try-on"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", display:"block" }}
            />

            <BrandingBadge mobile />

            {/* Back button */}
            <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>

            {/* FIX: faceTracking state se green/blue dot — confirm karo detect ho raha hai */}
            {cameraReady && (
              <div style={{ position:"absolute", top:12, right:12, zIndex:20,
                display:"flex", alignItems:"center",
                background:"rgba(0,0,0,0.55)", ...glassPill,
                border:`1px solid ${faceTracking?"rgba(34,197,94,.35)":"rgba(115,165,202,.30)"}`,
                padding:"5px 12px" }}>
                <span className={`ar-dot ${faceTracking?"ar-dot--green":""}`} />
                <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.80)", letterSpacing:".5px" }}>
                  {faceTracking ? "Tracking" : "Searching..."}
                </span>
              </div>
            )}

            {cameraReady && currentGlass && (
              <div aria-live="polite" style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
                zIndex:20, whiteSpace:"nowrap", background:"rgba(0,0,0,0.55)", ...glassPill,
                border:"1px solid rgba(232,127,36,.35)", padding:"7px 20px",
                display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"rgba(254,253,223,.95)" }}>{currentGlass.name}</span>
                <span style={{ width:1, height:11, background:"rgba(232,127,36,.40)", display:"inline-block" }} />
                <span style={{ fontSize:12, fontWeight:700, background:"linear-gradient(135deg,#F5A623,#E87F24)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{currentGlass.price}</span>
              </div>
            )}

            {/* Progress dots */}
            {cameraReady && (
              <div style={{ position:"absolute", bottom:56, left:"50%", transform:"translateX(-50%)",
                display:"flex", gap:4, zIndex:20 }}>
                {GLASS_OPTIONS.map((g,i) => (
                  <div key={g.id} style={{
                    width:i===idx?14:4, height:4, borderRadius:3,
                    background:i===idx?"#E87F24":"rgba(255,255,255,.25)",
                    transition:"all .25s ease"
                  }} />
                ))}
              </div>
            )}

            {/* Loading overlay */}
            {!cameraReady && (
              <div role="status" style={{ position:"absolute", inset:0, zIndex:50,
                background:"radial-gradient(ellipse 120% 80% at 55% 30%,rgba(232,127,36,.08),rgba(0,0,0,.98) 60%)",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24 }}>
                <div style={{ position:"relative", width:44, height:44 }}>
                  <div className="spinner"/>
                  <div className="spinner-inner"/>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6,
                    background:"linear-gradient(135deg,#F5A623,#E87F24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    VR.OPTICS
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:"#E87F24", marginBottom:8 }}>INITIALIZING</div>
                  <div style={{ fontSize:10, color:"rgba(254,253,223,.40)" }}>Allow camera access to continue</div>
                </div>
                <div style={{ fontSize:9, color:"rgba(254,253,223,.22)", border:"0.5px solid rgba(255,255,255,.10)",
                  borderRadius:100, padding:"4px 14px" }}>← Swipe to browse frames →</div>
              </div>
            )}
          </div>

          {/* Frames carousel */}
          <div style={{ flexShrink:0, paddingBottom:"env(safe-area-inset-bottom,10px)",
            background:"linear-gradient(to top,rgba(8,4,1,.98) 40%,rgba(8,4,1,.80) 70%,transparent 100%)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 2px" }}>
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px",
                color:"rgba(254,253,223,.35)", textTransform:"uppercase" }}>Frames</span>
              <span style={{ fontSize:9, color:"rgba(254,253,223,.30)" }} aria-live="polite">{idx+1} / {GLASS_OPTIONS.length}</span>
            </div>
            <div className="lens-carousel" role="listbox" aria-label="Select glasses frame">
              {GLASS_OPTIONS.map((g,i) => {
                const isA = glasses === g.id;
                const sz  = isA ? 58 : 50;
                return (
                  <div key={g.id} ref={isA ? activeCarouselRef : null}
                    className={`lens-ring ${isA?"lens-ring--active":"lens-ring--inactive"}`}
                    role="option" aria-selected={isA} tabIndex={0}
                    onClick={() => setGlasses(g.id)}
                    onKeyDown={e => (e.key==="Enter"||e.key===" ") && setGlasses(g.id)}
                    style={{ minWidth:60 }}>
                    <div className="lens-ring__circle" style={{ width:sz, height:sz,
                      background:isA
                        ?"radial-gradient(circle at 35% 35%,rgba(232,127,36,.28),rgba(10,5,2,.95))"
                        :"radial-gradient(circle at 35% 35%,rgba(255,255,255,.07),rgba(10,5,2,.85))" }}>
                      <div className="lens-ring__glow-ring" />
                      <img src={g.id} alt={g.name} loading="lazy" className="lens-ring__img" />
                    </div>
                    <span className="lens-ring__label">{g.name}</span>
                    <div className="lens-ring__dot" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT
  // ════════════════════════════════════════════════════════════
  return (
    <>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", background:C.gradBg, color:C.text,
        height:"100vh", display:"flex", overflow:"hidden" }}>
        <style>{css}</style>

        {/* Ambient glow */}
        <div aria-hidden style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(232,127,36,.14) 0%,transparent 70%)" }} />
          <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(115,165,202,.12) 0%,transparent 70%)" }} />
        </div>

        {/* ── Camera (75%) ── */}
        <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%",
          padding:20, display:"flex", flexDirection:"column" }}>
          <div style={{ flex:1, position:"relative", borderRadius:22, overflow:"hidden",
            border:`1px solid ${C.glassBorder}`, background:"#000",
            boxShadow:"inset 0 0 60px rgba(0,0,0,.40),0 8px 40px rgba(30,41,59,.12)" }}>

            <BrandingBadge mobile={false} />

            {/* Back button */}
            <button className="back-btn" onClick={() => navigate(-1)}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>

            {incomingProductName && cameraReady && (
              <div style={{ position:"absolute", bottom:60, left:"50%", transform:"translateX(-50%)",
                display:"flex", alignItems:"center", gap:10, padding:"7px 20px", borderRadius:999,
                background:"rgba(0,0,0,.52)", border:"0.5px solid rgba(232,127,36,.35)",
                whiteSpace:"nowrap", zIndex:6, pointerEvents:"none", animation:"fadeIn .35s ease" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E87F24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
                </svg>
                <span style={{ fontSize:11, fontWeight:700, color:"rgba(254,253,223,.90)", letterSpacing:".5px" }}>
                  Viewing: {incomingProductName}
                </span>
              </div>
            )}

            {cameraReady && (
              <div role="status" style={{ position:"absolute", top:16, right:16, zIndex:5,
                display:"flex", alignItems:"center",
                background:"rgba(0,0,0,.42)", ...glassPill,
                border:`1px solid ${faceTracking?"rgba(34,197,94,.28)":"rgba(115,165,202,.28)"}`,
                padding:"5px 14px", animation:"fadeIn .3s ease" }}>
                <span className={`ar-dot ${faceTracking?"ar-dot--green":""}`} />
                <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.80)", letterSpacing:".5px" }}>
                  {faceTracking ? "Face Tracking Active" : "Searching for Face..."}
                </span>
              </div>
            )}

            {/* Selected frame badge */}
            <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
              <div aria-live="polite" style={{ background:"rgba(0,0,0,.52)", ...glassPill,
                border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
                display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,.50)", letterSpacing:"1.5px" }}>SELECTED</span>
                <span style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
                <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,.95)" }}>{currentGlass?.name}</span>
                <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{currentGlass?.price}</span>
              </div>
            </div>

            <video
              ref={videoRef}
              style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }}
              autoPlay playsInline muted
            />
            <canvas
              ref={canvasRef}
              width={480}
              height={360}
              aria-label="AR glasses try-on camera view"
              style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
            />

            {!cameraReady && (
              <div role="status" style={{ position:"absolute", inset:0, borderRadius:22, zIndex:30,
                background:`radial-gradient(ellipse 100% 60% at 55% 30%,rgba(232,127,36,.08),rgba(254,253,223,.97) 55%)`,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
                <div style={{ position:"relative", width:50, height:50 }}>
                  <div className="spinner"/>
                  <div className="spinner-inner"/>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
                    background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
                    INITIALIZING CAMERA
                  </div>
                  <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Controls panel (25%) ── */}
        <div className="right-panel" role="complementary"
          style={{ position:"relative", zIndex:1, flex:"0 0 25%", maxWidth:"25%", overflowY:"auto",
            padding:"20px 16px 20px 4px", display:"flex", flexDirection:"column", gap:12,
            borderLeft:`1px solid ${C.glassBorder}`,
            background:"linear-gradient(180deg,rgba(245,243,199,.60),rgba(254,253,223,.80))",
            backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>

          <div style={{ padding:"4px 4px 2px" }}>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
              Choose Frame
            </div>
            <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
              {GLASS_OPTIONS.length} styles available
            </div>
            {incomingProductName && (
              <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:6, padding:"5px 10px",
                borderRadius:8, background:C.primary12, border:`1px solid ${C.primary25}` }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
                </svg>
                <span style={{ fontSize:9, fontWeight:700, color:C.primary, letterSpacing:".5px" }}>
                  From: {incomingProductName}
                </span>
              </div>
            )}
          </div>

          {/* Frame grid */}
          <div role="listbox" aria-label="Select glasses frame"
            style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
            {GLASS_OPTIONS.map(g => {
              const isA = glasses === g.id;
              return (
                <div key={g.id} ref={isA ? activeGridRef : null}
                  className="frame-card" role="option" aria-selected={isA} tabIndex={0}
                  onClick={() => setGlasses(g.id)}
                  onKeyDown={e => (e.key==="Enter"||e.key===" ") && setGlasses(g.id)}
                  style={{ borderRadius:14, background:isA?C.primary12:"rgba(254,253,223,.55)",
                    border:`1px solid ${isA?C.primary:C.surfaceBorder}`, padding:"10px 6px",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:"pointer",
                    boxShadow:isA?`0 0 20px rgba(232,127,36,.20),0 4px 12px rgba(30,41,59,.08)`:`0 1px 4px ${C.text06}`,
                    transition:"all .22s cubic-bezier(.22,1,.36,1)",
                    backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)" }}>
                  <div style={{ width:"100%", height:48, display:"flex", alignItems:"center", justifyContent:"center",
                    borderRadius:10, overflow:"hidden", background:isA?C.primary12:C.text06 }}>
                    <img src={g.id} alt={g.name} loading="lazy" crossOrigin="anonymous"
                      style={{ width:"90%", height:"90%", objectFit:"contain",
                        filter:isA?"drop-shadow(0 0 5px rgba(232,127,36,.55))":"brightness(.80) saturate(.75)",
                        transition:"filter .2s" }} />
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2,
                    color:isA?C.text:C.text55 }}>{g.name}</div>
                  <div style={{ fontSize:8, fontWeight:700,
                    background:isA?C.gradPrimary:"none", WebkitBackgroundClip:isA?"text":"unset",
                    WebkitTextFillColor:isA?"transparent":C.primary,
                    color:isA?"transparent":C.primary }}>{g.price}</div>
                </div>
              );
            })}
          </div>

          <Section title="FRAME CALIBRATION" icon="⚙️">
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
              <button onClick={resetAdj} style={{ fontSize:9, fontWeight:700, color:C.primary,
                background:C.primary12, border:`0.5px solid ${C.primary25}`, padding:"5px 14px",
                borderRadius:100, cursor:"pointer" }}>Reset</button>
            </div>
            <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleW",v)}  fmt={v=>`${v.toFixed(2)}×`} />
            <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleH",v)}  fmt={v=>`${v.toFixed(2)}×`} />
            <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetX",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
            <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetY",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
            <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v=>setAdj("rotate",v)}  fmt={v=>`${v>0?"+":""}${v.toFixed(1)}°`} />
          </Section>

          <Section title="SCENE FILTERS" icon="🎨">
            <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v=>`${v}%`} />
            <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v=>`${v}%`} />
            <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v=>`${v}%`} />
          </Section>
        </div>
      </div>
    </>
  );
};

export default TryOn;
