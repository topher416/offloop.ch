'use client'

import { useState, useEffect } from 'react'

// Mock data for shows
const MOCK_SHOWS = [
  { id: 1, title: "The Last Broadcast", company: "Rattlestick Collective", neighborhood: "Wicker Park", tag: "New Work", showColorClass: "show-color-red", img: "https://placehold.co/400x300/a70000/ffffff?text=LAST+BCAST", synopsis: "A new absurdist play about media overload.", closing: true },
  { id: 2, title: "Hedda Gabler", company: "Defiant Theatre", neighborhood: "Pilsen", tag: "Classic Revival", showColorClass: "show-color-blue", img: "https://placehold.co/400x300/1e40af/ffffff?text=HEDDA+GABLER", synopsis: "Ibsen's classic tragedy, reimagined.", featured: true },
  { id: 3, title: "Ghost Light Serenade", company: "Open Eye Ensemble", neighborhood: "Logan Square", tag: "Musical", showColorClass: "show-color-green", img: "https://placehold.co/400x300/065f46/ffffff?text=GHOST+LIGHT", synopsis: "A spooky, folk-rock musical.", featured: true, closing: true },
  { id: 4, title: "Cyrano: A Solo Show", company: "The Neo-Futurists", neighborhood: "Andersonville", tag: "Solo Performance", showColorClass: "show-color-yellow", img: "https://placehold.co/400x300/b45309/ffffff?text=CYRANO", synopsis: "A lightning-fast, intimate telling of the classic tale.", featured: true },
  { id: 5, title: "Witches' Brew", company: "The Otherworlders", neighborhood: "Uptown", tag: "Improv/Sketch", showColorClass: "show-color-red", img: "https://placehold.co/400x300/991b1b/ffffff?text=WITCHES", synopsis: "Fast-paced improv that changes every night.", closing: true },
  { id: 6, title: "Waiting for Godot", company: "Beckett Project", neighborhood: "Lincoln Park", tag: "Classic Revival", showColorClass: "show-color-blue", img: "https://placehold.co/400x300/1d4ed8/ffffff?text=GODOT", synopsis: "They wait. They talk. They wait again.", closing: true },
  { id: 7, title: "The Doll's House", company: "Nora Collective", neighborhood: "Pilsen", tag: "New Work", showColorClass: "show-color-green", img: "https://placehold.co/400x300/065f46/ffffff?text=DOLLS+HOUSE", synopsis: "A feminist response to Ibsen's masterpiece." },
];

// Show Card Component
function ShowCard({ show, size = 'normal' }) {
  const isFeatured = size === 'featured';
  const isHorizontal = size === 'horizontal';

  let cardClasses = 'show-card relative rounded-xl overflow-hidden p-3 md:p-4 grid gap-3 cursor-pointer';
  let imageClasses = 'aspect-[4/3] w-full object-cover rounded-lg border-2 border-stone-900';
  let titleSize = isFeatured ? 'text-2xl md:text-3xl' : 'text-xl';

  if (isHorizontal) {
    cardClasses = 'show-card relative rounded-xl overflow-hidden p-3 min-w-[280px] w-[280px] snap-start border-2 border-stone-900 transition-shadow';
    imageClasses = 'aspect-[16/9] w-full object-cover rounded-lg border-2 border-stone-900';
    titleSize = 'text-lg';
  }

  return (
    <div className={`${cardClasses} ${show.showColorClass}`} data-tag={show.tag}>
      {/* Image Area */}
      <div className="relative w-full">
        <img
          src={show.img}
          alt={`Key Art for ${show.title}`}
          className={imageClasses}
        />
        {/* Text Overlay Block */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-stone-900/90 text-white">
          <h3 className={`font-bold ${titleSize} leading-tight`}>
            {show.title.toUpperCase()}
          </h3>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-1">
        <p className="text-sm uppercase text-stone-700 tracking-wider">
          {show.company}
        </p>
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-wider">
            {show.neighborhood}
          </span>
          <a
            href="#"
            className="flex items-center text-indigo-600 font-bold text-sm hover:underline"
            aria-label={`Get tickets for ${show.title}`}
          >
            Tickets <span className="ml-1 text-base">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function Home() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState('Today');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toast display effect
  useEffect(() => {
    if (toastMessage) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleFilterClick = (filterType) => {
    const tag = filterType === 'tags' ? 'New Work' : 'Wicker Park';
    const filteredCount = MOCK_SHOWS.filter(s => s.tag === tag || s.neighborhood === tag).length;
    setToastMessage(`Filtered to ${filteredCount} shows tagged '${tag}'.`);
  };

  const snapshotLimit = isMobile ? 3 : 5;

  return (
    <div className="font-body text-stone-900 antialiased max-w-7xl mx-auto p-4 md:p-8">

      {/* Toast Notification */}
      <div
        className={`toast ${showToast ? 'show' : ''}`}
        role="alert"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* MAIN GRID CONTAINER */}
      <main className="grid gap-12 md:gap-16">

        {/* 1. LANDING PAGE: ABOVE THE FOLD */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 py-6 md:py-8 border-b-4 border-stone-900">
          {/* Left: Bold Text Block */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl leading-none text-stone-900 tracking-tighter">
              WHAT'S ON TONIGHT IN <span className="text-indigo-600">CHICAGO STOREFRONT THEATRE?</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl">
              A living calendar of DIY, fringe, and storefront shows across the city.
            </p>

            {/* Compact Filter Row */}
            <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
              <div className="flex rounded-full bg-stone-200 p-1 space-x-1 border-2 border-stone-900">
                {/* Date Segmented Control */}
                {['Today', 'This Weekend', 'Calendar'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveTimeFilter(filter)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                      activeTimeFilter === filter
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-stone-800 hover:bg-stone-300'
                    }`}
                    tabIndex={0}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Neighborhood Filter */}
              <button
                onClick={() => handleFilterClick('neighborhood')}
                className="filter-btn bg-stone-200 text-sm font-semibold px-4 py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100"
                tabIndex={0}
              >
                Neighborhood <span className="ml-1 text-stone-500">↓</span>
              </button>

              {/* Tags Filter */}
              <button
                onClick={() => handleFilterClick('tags')}
                className="filter-btn bg-stone-200 text-sm font-semibold px-4 py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100"
                tabIndex={0}
              >
                Tags <span className="ml-1 text-stone-500">↓</span>
              </button>
            </div>
          </div>

          {/* Right: Live Snapshot */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-stone-900 uppercase">
              This Week in Storefront Theatre
            </h2>
            <div className="space-y-4">
              {MOCK_SHOWS.slice(0, snapshotLimit).map(show => (
                <ShowCard key={show.id} show={show} size="normal" />
              ))}
            </div>
          </div>
        </section>

        {/* 2. FEATURED THIS WEEK STRIP */}
        <section className="space-y-6 md:space-y-8">
          <h2 className="font-display text-4xl md:text-5xl text-stone-900 uppercase tracking-tight border-b-2 border-stone-900 pb-2">
            Featured This Week
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SHOWS.filter(s => s.featured).map(show => (
              <ShowCard key={show.id} show={show} size="featured" />
            ))}
          </div>
        </section>

        {/* 3. MAP + LIST COMBO */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Simple Map Placeholder */}
          <div className="map-placeholder">
            Simple Map Placeholder (Venue Pins)
          </div>

          {/* Right: Continuous List of Performances */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
              Full Performance List
            </h2>
            <div className="space-y-6">
              {MOCK_SHOWS.map(show => (
                <ShowCard key={show.id} show={show} size="normal" />
              ))}
            </div>
          </div>
        </section>

        {/* 4. CLOSING SOON RAIL */}
        <section className="space-y-4 pb-12">
          <h2 className="font-display text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
            Closing Soon
          </h2>
          <div className="flex overflow-x-scroll space-x-4 pb-4 snap-x snap-mandatory">
            {MOCK_SHOWS.filter(s => s.closing).map(show => (
              <ShowCard key={show.id} show={show} size="horizontal" />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
