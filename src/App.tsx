import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Coin {
  id: number;
  name: string;
  year: string;
  origin: string;
  price: number;
  metal: 'gold' | 'silver' | 'copper' | 'bronze';
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  weight: string;
  diameter: string;
  inStock: number;
}

interface CartItem extends Coin {
  quantity: number;
}

const coins: Coin[] = [
  {
    id: 1,
    name: "Roman Aureus",
    year: "27 BC - 14 AD",
    origin: "Roman Empire",
    price: 4250,
    metal: 'gold',
    description: "Augustus era gold coin featuring the first Roman Emperor. Exceptional preservation with clear portrait details.",
    rarity: 'Legendary',
    weight: '7.9g',
    diameter: '20mm',
    inStock: 1
  },
  {
    id: 2,
    name: "Greek Tetradrachm",
    year: "449-404 BC",
    origin: "Athens",
    price: 2800,
    metal: 'silver',
    description: "Classic Athenian owl design. Symbol of wisdom and commerce throughout the ancient Mediterranean.",
    rarity: 'Rare',
    weight: '17.2g',
    diameter: '24mm',
    inStock: 3
  },
  {
    id: 3,
    name: "Byzantine Solidus",
    year: "565-578 AD",
    origin: "Constantinople",
    price: 1950,
    metal: 'gold',
    description: "Justin II era gold solidus. Remarkably preserved with full luster and sharp strike.",
    rarity: 'Rare',
    weight: '4.5g',
    diameter: '21mm',
    inStock: 2
  },
  {
    id: 4,
    name: "Viking Silver Penny",
    year: "885-954 AD",
    origin: "Danelaw England",
    price: 890,
    metal: 'silver',
    description: "Rare Norse penny from Viking-controlled England. Features distinctive Scandinavian artistry.",
    rarity: 'Uncommon',
    weight: '1.4g',
    diameter: '18mm',
    inStock: 5
  },
  {
    id: 5,
    name: "Spanish Doubloon",
    year: "1702",
    origin: "Spain",
    price: 3200,
    metal: 'gold',
    description: "Philip V era 8 escudos. The legendary pirate treasure coin with excellent strike.",
    rarity: 'Rare',
    weight: '27g',
    diameter: '36mm',
    inStock: 2
  },
  {
    id: 6,
    name: "Chinese Cash Coin",
    year: "1736-1795",
    origin: "Qing Dynasty",
    price: 340,
    metal: 'copper',
    description: "Qianlong Emperor era cash coin. Square hole design used for over 2000 years.",
    rarity: 'Common',
    weight: '4.2g',
    diameter: '25mm',
    inStock: 12
  },
  {
    id: 7,
    name: "Persian Daric",
    year: "486-465 BC",
    origin: "Achaemenid Empire",
    price: 5500,
    metal: 'gold',
    description: "Xerxes I era gold daric showing the Great King with bow. Museum-quality specimen.",
    rarity: 'Legendary',
    weight: '8.4g',
    diameter: '15mm',
    inStock: 1
  },
  {
    id: 8,
    name: "Medieval Groat",
    year: "1351-1361",
    origin: "England",
    price: 650,
    metal: 'silver',
    description: "Edward III groat from the height of medieval England. Clear portrait and cross design.",
    rarity: 'Uncommon',
    weight: '4.7g',
    diameter: '27mm',
    inStock: 4
  }
];

const metalColors = {
  gold: 'from-amber-300 via-yellow-400 to-amber-500',
  silver: 'from-slate-300 via-gray-200 to-slate-400',
  copper: 'from-orange-400 via-orange-300 to-amber-600',
  bronze: 'from-amber-600 via-yellow-700 to-amber-800'
};

const metalBorders = {
  gold: 'border-amber-400/50',
  silver: 'border-slate-300/50',
  copper: 'border-orange-400/50',
  bronze: 'border-amber-600/50'
};

const rarityColors = {
  Common: 'text-slate-400',
  Uncommon: 'text-emerald-400',
  Rare: 'text-blue-400',
  Legendary: 'text-amber-400'
};

function CoinCard({ coin, onAddToCart }: { coin: Coin; onAddToCart: (coin: Coin) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${metalColors[coin.metal]} opacity-10 rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} />

      <div className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl border ${metalBorders[coin.metal]} overflow-hidden`}>
        {/* Coin Display */}
        <div className="relative h-40 sm:h-48 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-transparent" />

          {/* Coin Representation */}
          <motion.div
            animate={{ rotateY: isHovered ? 15 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${metalColors[coin.metal]} shadow-2xl flex items-center justify-center relative`}
              style={{
                boxShadow: `
                  inset -4px -4px 12px rgba(0,0,0,0.4),
                  inset 4px 4px 12px rgba(255,255,255,0.2),
                  0 10px 30px -10px rgba(0,0,0,0.8)
                `
              }}
            >
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <div className="absolute inset-4 rounded-full border border-black/20" />
              <span className="font-cormorant text-lg sm:text-xl font-bold text-zinc-900/60 tracking-wider">
                {coin.year.split('-')[0].replace(/\D/g, '').slice(0, 4)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-white truncate">{coin.name}</h3>
              <p className="text-xs sm:text-sm text-zinc-500">{coin.origin} · {coin.year}</p>
            </div>
            <span className={`text-xs font-medium ${rarityColors[coin.rarity]} shrink-0`}>
              {coin.rarity}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {coin.description}
          </p>

          <div className="flex gap-3 sm:gap-4 text-xs text-zinc-500">
            <span>{coin.weight}</span>
            <span>{coin.diameter}</span>
            <span className={coin.inStock <= 2 ? 'text-amber-500' : ''}>
              {coin.inStock} in stock
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <span className="font-cormorant text-xl sm:text-2xl font-semibold text-white">
              ${coin.price.toLocaleString()}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(coin)}
              className={`px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r ${metalColors[coin.metal]} text-zinc-900 font-medium text-xs sm:text-sm transition-shadow hover:shadow-lg hover:shadow-amber-500/20`}
            >
              Add to Vault
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Cart({ items, onUpdateQuantity, onRemove, isOpen, onClose }: {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-amber-900/30 z-50 flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="font-cormorant text-xl sm:text-2xl font-semibold text-white">Your Vault</h2>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center text-zinc-500 py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="font-source">Your vault is empty</p>
                  <p className="text-sm mt-1">Add some treasures to your collection</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${metalColors[item.metal]} flex-shrink-0 flex items-center justify-center`}
                      style={{
                        boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.1)'
                      }}
                    >
                      <span className="font-cormorant text-xs font-bold text-zinc-900/50">
                        {item.year.slice(0, 4)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-cormorant text-base sm:text-lg text-white truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-zinc-500">${item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-2 sm:gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-white w-6 sm:w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.inStock}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-zinc-500 hover:text-red-400 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-zinc-800 space-y-4 bg-zinc-900">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-cormorant text-2xl sm:text-3xl text-white">${total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-zinc-500">Shipping calculated at checkout. All coins ship insured.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-zinc-900 font-semibold text-base sm:text-lg shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | Coin['metal']>('all');

  const addToCart = (coin: Coin) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === coin.id);
      if (existing) {
        if (existing.quantity >= coin.inStock) return prev;
        return prev.map(item =>
          item.id === coin.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...coin, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const newQty = item.quantity + delta;
        if (newQty < 1 || newQty > item.inStock) return item;
        return { ...item, quantity: newQty };
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredCoins = filter === 'all' ? coins : coins.filter(c => c.metal === filter);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-source relative overflow-x-hidden flex flex-col">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="font-cormorant font-bold text-zinc-900 text-lg sm:text-xl">N</span>
              </div>
              <div>
                <h1 className="font-cormorant text-xl sm:text-2xl font-bold tracking-tight">Numisma</h1>
                <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase">Ancient Treasures</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-amber-500/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-zinc-900 text-xs font-bold flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-8 sm:py-12 lg:py-16 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6">
              Curated Collection of
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                Historical Coins
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed mb-6 sm:mb-8 px-4">
              Each coin in our vault has been authenticated, graded, and carefully preserved.
              Own a piece of history, shipped directly to your door with full insurance.
            </p>

            {/* Metal filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {(['all', 'gold', 'silver', 'copper', 'bronze'] as const).map((metal) => (
                <motion.button
                  key={metal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(metal)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
                    filter === metal
                      ? metal === 'all'
                        ? 'bg-white text-zinc-900'
                        : `bg-gradient-to-r ${metalColors[metal]} text-zinc-900`
                      : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
                  }`}
                >
                  {metal === 'all' ? 'All Metals' : metal.charAt(0).toUpperCase() + metal.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coins Grid */}
      <main className="relative z-10 py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <CoinCard coin={coin} onAddToCart={addToCart} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCoins.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-zinc-500 font-source">No coins available in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Trust badges */}
      <section className="relative z-10 border-t border-zinc-800/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: '🛡️', title: 'Authenticated', desc: 'NGC/PCGS Certified' },
              { icon: '📦', title: 'Insured Shipping', desc: 'Full coverage included' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Encrypted transactions' },
              { icon: '↩️', title: '14-Day Returns', desc: 'Money-back guarantee' }
            ].map((badge) => (
              <div key={badge.title} className="text-center p-3 sm:p-4">
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{badge.icon}</span>
                <h4 className="font-cormorant text-base sm:text-lg font-semibold text-white">{badge.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-zinc-600">
            Requested by @itsg73 · Built by @clonkbot
          </p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
