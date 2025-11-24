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

// Show Card Component - Optimized for mobile
function ShowCard({ show, size = 'normal' }) {
  const isFeatured = size === 'featured';
  const isHorizontal = size === 'horizontal';

  // Mobile-first card styling
  let cardClasses = 'show-card relative rounded-lg overflow-hidden p-2 sm:p-3 grid gap-2 cursor-pointer';
  let imageClasses = 'aspect-[4/3] w-full object-cover rounded border-2 border-stone-900';
  let titleSize = isFeatured ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg';

  if (isHorizontal) {
    cardClasses = 'show-card relative rounded-lg overflow-hidden p-2 min-w-[240px] w-[240px] sm:min-w-[280px] sm:w-[280px] snap-start border-2 border-stone-900';
    imageClasses = 'aspect-[16/9] w-full object-cover rounded border-2 border-stone-900';
    titleSize = 'text-sm sm:text-base';
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
        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 bg-stone-900/90 text-white">
          <h3 className={`font-bold ${titleSize} leading-tight`}>
            {show.title.toUpperCase()}
          </h3>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm uppercase text-stone-700 tracking-wider line-clamp-1">
          {show.company}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-wider whitespace-nowrap">
            {show.neighborhood}
          </span>
          <a
            href="#"
            className="flex items-center text-indigo-600 font-bold text-xs sm:text-sm hover:underline whitespace-nowrap"
            aria-label={`Get tickets for ${show.title}`}
          >
            Tickets <span className="ml-1 text-sm">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Page Component - Mobile-first rebuild
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
    <div className="font-body text-stone-900 antialiased min-h-screen">
      {/* Toast Notification */}
      <div
        className={`toast ${showToast ? 'show' : ''}`}
        role="alert"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* MAIN CONTAINER - Mobile optimized padding */}
      <main className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 space-y-8 sm:space-y-10 md:space-y-12">

        {/* 1. HERO SECTION - Mobile first */}
        <section className="space-y-6 sm:space-y-8 pb-6 sm:pb-8 border-b-2 sm:border-b-4 border-stone-900">

          {/* Title + Tagline (Full width on mobile) */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-stone-900 tracking-tight">
              WHAT'S ON TONIGHT IN <span className="text-indigo-600">CHICAGO STOREFRONT THEATRE?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-700 max-w-2xl">
              A living calendar of DIY, fringe, and storefront shows across the city.
            </p>
          </div>

          {/* Filters - Mobile optimized */}
          <div className="flex flex-wrap gap-2">
            {/* Date Segmented Control */}
            <div className="flex rounded-full bg-stone-200 p-0.5 sm:p-1 border-2 border-stone-900">
              {['Today', 'This Weekend', 'Calendar'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTimeFilter(filter)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
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
              className="bg-stone-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100 whitespace-nowrap"
              tabIndex={0}
            >
              Neighborhood <span className="ml-0.5 text-stone-500">↓</span>
            </button>

            {/* Tags Filter */}
            <button
              onClick={() => handleFilterClick('tags')}
              className="bg-stone-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100 whitespace-nowrap"
              tabIndex={0}
            >
              Tags <span className="ml-0.5 text-stone-500">↓</span>
            </button>
          </div>

          {/* Quick Snapshot - Stacked on mobile */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
              This Week
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {MOCK_SHOWS.slice(0, snapshotLimit).map(show => (
                <ShowCard key={show.id} show={show} size="normal" />
              ))}
            </div>
          </div>
        </section>

        {/* 2. FEATURED SHOWS */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 uppercase tracking-tight border-b-2 border-stone-900 pb-2">
            Featured
          </h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_SHOWS.filter(s => s.featured).map(show => (
              <ShowCard key={show.id} show={show} size="featured" />
            ))}
          </div>
        </section>

        {/* 3. FULL LIST (Hide map on mobile, show it on desktop) */}
        <section className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">

          {/* Map - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block map-placeholder h-[400px]">
            Simple Map Placeholder (Venue Pins)
          </div>

          {/* Full List */}
          <div className="space-y-4 sm:space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
              All Shows
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {MOCK_SHOWS.map(show => (
                <ShowCard key={show.id} show={show} size="normal" />
              ))}
            </div>
          </div>
        </section>

        {/* 4. CLOSING SOON - Horizontal scroll */}
        <section className="space-y-3 sm:space-y-4 pb-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
            Closing Soon
          </h2>

          {/* Horizontal scroll container with padding for edge cards */}
          <div className="-mx-3 sm:-mx-4 md:-mx-6">
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 px-3 sm:px-4 md:px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
              {MOCK_SHOWS.filter(s => s.closing).map(show => (
                <ShowCard key={show.id} show={show} size="horizontal" />
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
