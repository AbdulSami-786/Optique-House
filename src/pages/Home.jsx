// components/Home.js
import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import data from '../data/data.json';

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Home = () => {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative w-full h-[85vh] overflow-hidden flex items-center animate-on-scroll">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511499767350-a153568a5705?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block animate-slide-up">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 animate-slide-up animation-delay-100">
              SEE THE <br />
              <span className="italic text-gray-400">FUTURE.</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 animate-slide-up animation-delay-200">
              Precision engineered frames that blend Italian craftsmanship with modern clarity.
            </p>
            <div className="flex gap-4 animate-slide-up animation-delay-300">
              <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:px-12 transition-all">
                Shop Now
              </button>
              <button className="bg-white border-2 border-black text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                Explore Frames
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-6 max-w-7xl mx-auto animate-on-scroll">
        <SectionHeading title="Browse by Style" subtitle="From vintage classics to modern minimalism, find the perfect shape for your face." />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Men', img: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=500' },
            { name: 'Women', img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500' },
            { name: 'Kids', img: 'https://images.unsplash.com/photo-1513333420772-7b64ad15ca96?w=500' },
            { name: 'Blue Light', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500' }
          ].map((item, idx) => (
            <div 
              key={item.name} 
              className="group relative h-80 overflow-hidden rounded-3xl cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
     {data.products.map(p => <ProductCard key={p.id} product={p} />)}

      {/* Virtual Try-On & Store Locator */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 animate-on-scroll">
        <div className="bg-blue-600 rounded-[40px] p-12 text-white flex flex-col justify-center transform transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-4xl font-bold mb-6">Virtual Try-On</h3>
          <p className="mb-8 text-blue-100">Not sure if they fit? Use our AI-powered tool to see exactly how these frames look on your face from any angle.</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold w-max">Launch Camera</button>
        </div>
        <div className="bg-gray-900 rounded-[40px] p-12 text-white flex flex-col justify-center transform transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-4xl font-bold mb-6">In-Store Eye Test</h3>
          <p className="mb-8 text-gray-400">Need a fresh prescription? Visit one of our 50+ locations for a professional eye exam by certified optometrists.</p>
          <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold w-max">Book Appointment</button>
        </div>
      </section>

      {/* Lens Technology */}
      <section className="bg-white py-24 border-y border-gray-100 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading title="Advanced Lens Tech" subtitle="Beyond just frames. Customize your vision with our specialized coating technology." />
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {[
              { icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12", title: "One-Click Upload", desc: "Just snap a photo of your prescription and we'll handle the rest.", color: "blue" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Blue Light Block", desc: "Protect your eyes from digital strain with our Ultra-Shield coating.", color: "purple" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Anti-Reflective", desc: "Reduce glare from headlights and screens for crystal clear night vision.", color: "green" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-gray-100 rounded-3xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 text-${item.color}-600`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-4">{item.title}</h4>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="What Our Customers Say" />
          <div className="flex gap-8 animate-scroll">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[350px] bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"The virtual try-on was so accurate! I've never bought glasses online before, but this was easier than going to the mall."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-bold">Sarah Jenkins</p>
                    <p className="text-xs text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-white border-b animate-on-scroll">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center opacity-40 grayscale gap-8">
            <span className="text-3xl font-serif italic">RAY·BAN</span>
            <span className="text-3xl font-sans font-black">OAKLEY</span>
            <span className="text-3xl font-serif uppercase">Prada</span>
            <span className="text-3xl font-sans font-light tracking-tighter uppercase">Gucci</span>
            <span className="text-3xl font-serif">Vogue</span>
          </div>
        </div>
      </section>

      {/* Blog / Magazine */}
      <section className="py-24 max-w-7xl mx-auto px-6 animate-on-scroll">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Magazine</h2>
            <p className="text-gray-500">Tips from our experts on eye care and fashion trends.</p>
          </div>
          <button className="text-blue-600 font-bold border-b-2 border-blue-600">View All Articles</button>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { t: "Choosing the Right Shape", c: "Fashion" },
            { t: "Does Blue Light Really Matter?", c: "Health" },
            { t: "Trend Alert: Transparent Frames", c: "Fashion" }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer transform transition-transform hover:-translate-y-2 duration-300">
              <div className="h-64 bg-gray-200 rounded-3xl mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <span className="text-blue-600 text-xs font-bold uppercase">{post.c}</span>
              <h4 className="text-2xl font-bold mt-2 group-hover:text-blue-600 transition-colors">{post.t}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
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
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        .animate-scroll {
          display: flex;
          width: 200%;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 15s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: fadeSlideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        /* Scroll reveal animation */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
    </div>
  );
};

export default Home;