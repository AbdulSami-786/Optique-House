// product.jsx




import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import productsData from "../data/data.json";
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { id:'all',            name:'All Products',     match:null },
  { id:'men-sunglass',   name:"Men's Sunglass",   match:'men sunglass' },
  { id:'men-eyeglass',   name:"Men's Eyeglass",   match:'men eyeglass' },
  { id:'women-sunglass', name:"Women's Sunglass", match:'woman sunglass' },
  { id:'women-eyeglass', name:"Women's Eyeglass", match:'women eyeglass' },
  { id:'kids-sunglass',  name:"Kids' Sunglass",   match:'kid sunglass' },
  { id:'kids-eyeglass',  name:"Kids' Eyeglass",   match:'kids eyeglass' },
  { id:'contact-lens',   name:'Contact Lens',     match:'contactless' },
];

const SHAPES  = ['Square','Oval','Round','Geometric','Wayfarer','Vaffer','Eye','Other'];
const GENDERS = ['Men','Women','Unisex','Kids'];

const getPrice = (p) =>
  parseFloat(String(p?.discountPrice || p?.originalPrice || 0).replace(/,/g,''));

export default function Products() {
  const navigate       = useNavigate();
  const location       = useLocation();
  const [searchParams] = useSearchParams();
  const searchRef      = useRef(null);

  const [products,       setProducts]       = useState([]);
  const [filtered,       setFiltered]       = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange,     setPriceRange]     = useState({ min:'', max:'' });
  const [shapes,         setShapes]         = useState([]);
  const [genders,        setGenders]        = useState([]);
  const [sortBy,         setSortBy]         = useState('default');
  const [search,         setSearch]         = useState('');
  const [openDrop,       setOpenDrop]       = useState(null);
  const [notification,   setNotification]   = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const all = productsData?.products || [];
    setProducts(all);
    setFiltered(all);
  }, []);

  useEffect(() => {
    const cp = searchParams.get('category');
    if (cp) {
      const m = CATEGORIES.find(c => c.match === cp || c.id === cp);
      if (m && m.id !== 'all') setActiveCategory(m.id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (location.state?.focusSearch && searchRef.current) {
      searchRef.current.focus();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let r = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p =>
        p.name?.toLowerCase().includes(q) || p.code?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'all') {
      const sel = CATEGORIES.find(c => c.id === activeCategory);
      if (sel?.match) r = r.filter(p => p.category?.toLowerCase() === sel.match);
    }
    if (genders.length && activeCategory === 'all')
      r = r.filter(p => genders.some(g => p.gender?.toLowerCase().includes(g.toLowerCase())));
    if (priceRange.min) r = r.filter(p => getPrice(p) >= parseFloat(priceRange.min));
    if (priceRange.max) r = r.filter(p => getPrice(p) <= parseFloat(priceRange.max));
    if (shapes.length && activeCategory === 'all')
      r = r.filter(p => shapes.includes(p.shape));
    if (sortBy === 'priceLowHigh')  r.sort((a, b) => getPrice(a) - getPrice(b));
    else if (sortBy === 'priceHighLow') r.sort((a, b) => getPrice(b) - getPrice(a));
    else if (sortBy === 'nameAZ')   r.sort((a, b) => (a.name||'').localeCompare(b.name||''));
    else if (sortBy === 'nameZA')   r.sort((a, b) => (b.name||'').localeCompare(a.name||''));
    setFiltered(r);
  }, [activeCategory, priceRange, shapes, genders, sortBy, products, search]);

  const toggleShape  = s => setShapes(p  => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleGender = g => setGenders(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);
  const toggleDrop   = n => setOpenDrop(o => o === n ? null : n);

  const clearFilters = () => {
    setActiveCategory('all'); setPriceRange({ min:'', max:'' }); setShapes([]);
    setGenders([]); setSortBy('default'); setSearch(''); setOpenDrop(null);
  };

  const handleCategoryChange = id => {
    setActiveCategory(id);
    if (id !== 'all') setGenders([]);
    setOpenDrop(null);
  };

  const handleAddToCart = (product) => {
    const cart   = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(i => i.id === product.id);
    if (exists) exists.quantity = (exists.quantity || 1) + 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const SortSelect = () => (
    <select className="sort-minimal" value={sortBy} onChange={e => setSortBy(e.target.value)}>
      <option value="default">Sort: Featured</option>
      <option value="priceLowHigh">Price: Low → High</option>
      <option value="priceHighLow">Price: High → Low</option>
      <option value="nameAZ">Name: A → Z</option>
      <option value="nameZA">Name: Z → A</option>
    </select>
  );

  return (
    <div className="pp">
      {notification && <div className="notif">{notification}</div>}

      <div className="container">
        <h1 className="page-title">Our Products</h1>
        <p className="page-sub">Discover premium eyewear for every style and need</p>

        {/* Category Tabs */}
        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`cat-tab${activeCategory === c.id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Filter Bar — only for 'all' */}
        {activeCategory === 'all' && (
          <div className="filter-bar">
            <div className="drop-group">
              {/* Shape */}
              <div className="drop-wrap">
                <button className={`drop-btn${shapes.length ? ' hl' : ''}`} onClick={() => toggleDrop('shape')}>
                  Shape <span className={`arr ${openDrop === 'shape' ? 'up' : 'dn'}`} />
                </button>
                {openDrop === 'shape' && (
                  <div className="drop-menu">
                    {SHAPES.map(s => (
                      <label key={s} className="drop-item">
                        <input type="checkbox" checked={shapes.includes(s)} onChange={() => toggleShape(s)} /> {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="drop-wrap">
                <button className={`drop-btn${genders.length ? ' hl' : ''}`} onClick={() => toggleDrop('gender')}>
                  Gender <span className={`arr ${openDrop === 'gender' ? 'up' : 'dn'}`} />
                </button>
                {openDrop === 'gender' && (
                  <div className="drop-menu">
                    {GENDERS.map(g => (
                      <label key={g} className="drop-item">
                        <input type="checkbox" checked={genders.includes(g)} onChange={() => toggleGender(g)} /> {g}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="drop-wrap">
                <button className={`drop-btn${priceRange.min || priceRange.max ? ' hl' : ''}`} onClick={() => toggleDrop('price')}>
                  Price <span className={`arr ${openDrop === 'price' ? 'up' : 'dn'}`} />
                </button>
                {openDrop === 'price' && (
                  <div className="drop-menu price-menu">
                    <input type="number" placeholder="Min PKR" value={priceRange.min}
                      onChange={e => setPriceRange({ ...priceRange, min: e.target.value })} />
                    <input type="number" placeholder="Max PKR" value={priceRange.max}
                      onChange={e => setPriceRange({ ...priceRange, max: e.target.value })} />
                  </div>
                )}
              </div>

              <button className="clear-btn" onClick={clearFilters}>Reset All</button>
            </div>
            <SortSelect />
          </div>
        )}

        {activeCategory !== 'all' && (
          <div className="simple-sort"><SortSelect /></div>
        )}

        {/* Search + Count */}
        <div className="search-row">
          <input
            ref={searchRef}
            type="text"
            className="search-inp"
            placeholder="Search by name or code..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <p className="count-txt">{filtered.length} items found</p>
        </div>

        {/* Grid - Now ProductCard has its own working TryOn button */}
        {filtered.length === 0 ? (
          <div className="no-prod">
            <p>No products found.</p>
            <button onClick={clearFilters}>Browse All</button>
          </div>
        ) : (
          <div className="prod-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .pp{font-family:'Inter',sans-serif;background:#fff;padding:40px 0;}
        .container{max-width:1300px;margin:0 auto;padding:0 20px;}
        .page-title{text-align:center;font-size:2rem;margin-bottom:8px;font-weight:700;}
        .page-sub{text-align:center;color:#777;margin-bottom:40px;}

        .cat-tabs{display:flex;justify-content:center;gap:10px;margin-bottom:30px;
          flex-wrap:wrap;position:sticky;top:70px;background:#fff;
          padding:10px 0;z-index:50;border-bottom:1px solid #f0f0f0;}
        .cat-tab{padding:9px 20px;border:1px solid #ddd;background:#fff;cursor:pointer;
          border-radius:30px;transition:.25s;font-weight:500;font-size:13px;white-space:nowrap;}
        .cat-tab:hover{background:#f5f5f5;border-color:#999;}
        .cat-tab.active{background:#000;color:#fff;border-color:#000;}

        .filter-bar{display:flex;justify-content:space-between;align-items:center;
          border-top:1px solid #eee;border-bottom:1px solid #eee;padding:14px 0;margin-bottom:20px;}
        .simple-sort{display:flex;justify-content:flex-end;padding:10px 0;margin-bottom:10px;}
        .drop-group{display:flex;gap:24px;align-items:center;flex-wrap:wrap;}
        .drop-wrap{position:relative;}
        .drop-btn{background:none;border:none;font-size:.95rem;cursor:pointer;
          font-weight:500;display:flex;align-items:center;gap:6px;padding:7px 0;}
        .drop-btn.hl{color:#d9534f;}
        .drop-menu{position:absolute;top:calc(100% + 8px);left:0;background:#fff;
          border:1px solid #eee;box-shadow:0 10px 20px rgba(0,0,0,.1);padding:14px;
          min-width:170px;display:flex;flex-direction:column;gap:9px;
          border-radius:10px;z-index:200;}
        .drop-item{display:flex;align-items:center;gap:8px;font-size:.88rem;cursor:pointer;}
        .price-menu{flex-direction:row;gap:10px;width:220px;}
        .price-menu input{width:50%;padding:7px;border:1px solid #ddd;border-radius:6px;font-size:.85rem;}
        .price-menu input:focus{outline:none;border-color:#000;}
        .clear-btn{background:none;border:none;color:#888;text-decoration:underline;
          cursor:pointer;font-size:.88rem;}
        .clear-btn:hover{color:#000;}
        .arr{border:solid #333;border-width:0 1.5px 1.5px 0;display:inline-block;padding:3px;transition:.2s;}
        .dn{transform:rotate(45deg);}
        .up{transform:rotate(-135deg);}
        .sort-minimal{border:1px solid #ddd;border-radius:20px;padding:7px 14px;
          font-size:.88rem;cursor:pointer;background:#fff;}

        .search-row{display:flex;justify-content:space-between;align-items:center;
          margin-bottom:28px;flex-wrap:wrap;gap:14px;}
        .search-inp{border:none;border-bottom:2px solid #eee;padding:9px 0;
          width:280px;outline:none;font-size:14px;transition:.3s;}
        .search-inp:focus{border-bottom-color:#000;}
        .count-txt{color:#888;font-size:.88rem;font-weight:500;}

        .prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:28px;}

        .no-prod{text-align:center;padding:80px 20px;background:#fafafa;border-radius:12px;}
        .no-prod p{font-size:17px;color:#666;margin-bottom:18px;}
        .no-prod button{padding:11px 26px;background:#000;color:#fff;border:none;
          cursor:pointer;border-radius:30px;font-size:13px;font-weight:500;transition:.3s;}
        .no-prod button:hover{background:#333;}

        .notif{position:fixed;top:20px;right:20px;background:#28a745;color:#fff;
          padding:12px 22px;border-radius:8px;z-index:9999;font-weight:500;
          box-shadow:0 4px 12px rgba(0,0,0,.15);animation:slideIn .3s ease;}

        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}

        @media(max-width:768px){
          .cat-tabs{gap:7px;overflow-x:auto;justify-content:flex-start;padding-bottom:6px;}
          .cat-tab{padding:7px 15px;font-size:12px;}
          .filter-bar{flex-direction:column;gap:14px;align-items:flex-start;}
          .drop-group{gap:14px;}
          .prod-grid{gap:18px;}
          .search-inp{width:100%;}
        }
      `}</style>
    </div>
  );
}