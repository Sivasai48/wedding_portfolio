import React, { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

const PASSWORD = 'wedding2025'
const CATEGORIES = [
  {
      "id": "haldi",
      "title": "Haldi",
      "images": [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop"
      ]
    },
    {
      "id": "sangeet",
      "title": "Sangeet",
      "images": [
        "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519167758481-83f29da8c2b4?w=600&h=400&fit=crop"
      ]
    },
    {
      "id": "marriage",
      "title": "Marriage",
      "images": [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop"
      ]
    },
    {
      "id": "reception",
      "title": "Reception",
      "images": [
        "https://images.unsplash.com/photo-1530024828441-d05e50e2095e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop"
      ]
    },
    {
      "id": "candid",
      "title": "Candid",
      "images": [
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595032834862-a2a1b7e3c5d0?w=600&h=400&fit=crop"
      ]
    }
]

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { 
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial 
    } catch { 
      return initial 
    }
  })
  
  useEffect(() => { 
    localStorage.setItem(key, JSON.stringify(state)) 
  }, [key, state])
  
  return [state, setState]
}

export default function App() {
  const [entered, setEntered] = useLocalStorage('wedding_entered', false)
  const [inputPass, setInputPass] = useState('')
  const [likes, setLikes] = useLocalStorage('wedding_likes', {})

  function tryPassword(){
    if(inputPass === PASSWORD) {
      setEntered(true)
    } else {
      alert('Incorrect password')
    }
    setInputPass('')
  }

  function handleKeyPress(e){
    if(e.key === 'Enter') tryPassword()
  }

  function toggleLike(src){
    setLikes(prev => ({ ...prev, [src]: !prev[src] }))
  }

  if(!entered){
    return (
      <div className="flex items-center justify-center min-h-screen px-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-2xl transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Wedding Gallery</h1>
          <p className="text-gray-600 mb-6">Enter "wedding2025" password to view photos</p>
          <div className="flex gap-2">
            <input 
              type="password"
              value={inputPass} 
              onChange={e => setInputPass(e.target.value)} 
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none" 
              placeholder="Password" 
            />
            <button 
              onClick={tryPassword}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              Enter
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">Ask photographer for access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-900 antialiased" style={{backgroundColor: '#FFF9E6'}}>
      <header className="relative h-[70vh] w-full overflow-hidden">
        <img src="/images/hero.jpg" alt="bride-groom" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex items-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>Bride & Groom</h2>
            <p className="text-xl text-white/90" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>Scroll down to explore our special moments</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {CATEGORIES.map(cat => (
          <section key={cat.id} id={cat.id} className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-4 border-purple-500 inline-block pb-2">{cat.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cat.images.map(src => (
                <div 
                  key={src} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img src={src} alt="wedding photo" className="object-cover w-full h-64" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button 
                        onClick={() => toggleLike(src)} 
                        className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform text-xl"
                        aria-label="Like photo"
                      >
                        {likes[src] ? '❤️' : '🤍'}
                      </button>
                      <a 
                        href={src} 
                        download 
                        className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center" 
                        title="Download"
                        aria-label="Download photo"
                      >
                        <Download className="text-gray-700" size={18} />
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">Beautiful moment captured</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t-2 border-gray-200 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-800">Contact Photographer</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📷 Instagram: <a href="#" className="text-purple-600 hover:underline">@photographer</a></li>
                <li>📧 Email: <a href="mailto:photographer@example.com" className="text-purple-600 hover:underline">photographer@example.com</a></li>
                <li>📱 Phone: <a href="tel:+911234567890" className="text-purple-600 hover:underline">+91 12345 67890</a></li>
                <li>💬 Telegram: <a href="#" className="text-purple-600 hover:underline">t.me/photographer</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h4>
              <nav className="space-y-2 text-sm">
                {CATEGORIES.map(c => (
                  <a 
                    key={c.id} 
                    href={`#${c.id}`} 
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {c.title}
                  </a>
                ))}
              </nav>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-800">About</h4>
              <p className="text-sm text-gray-600 mb-3">© {new Date().getFullYear()} Wedding Photography</p>
              <p className="text-xs text-gray-500">Likes are stored locally in your browser. Password: wedding2025</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}