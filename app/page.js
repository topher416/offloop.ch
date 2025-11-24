'use client'

import { useState, useEffect } from 'react'

// Helper function to get dates relative to today
const getDate = (daysFromToday) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date;
};

// Mock data for shows with performance dates
const MOCK_SHOWS = [
  {
    id: 1,
    title: "The Last Broadcast",
    company: "Rattlestick Collective",
    neighborhood: "Wicker Park",
    tag: "New Work",
    showColorClass: "show-color-red",
    img: "https://placehold.co/400x300/a70000/ffffff?text=LAST+BCAST",
    synopsis: "A new absurdist play about media overload.",
    closing: true,
    performances: [getDate(0), getDate(1), getDate(3), getDate(5)], // Today + several dates
    closingDate: getDate(5)
  },
  {
    id: 2,
    title: "Hedda Gabler",
    company: "Defiant Theatre",
    neighborhood: "Pilsen",
    tag: "Classic Revival",
    showColorClass: "show-color-blue",
    img: "https://placehold.co/400x300/1e40af/ffffff?text=HEDDA+GABLER",
    synopsis: "Ibsen's classic tragedy, reimagined.",
    featured: true,
    performances: [getDate(2), getDate(4), getDate(9), getDate(11)],
    closingDate: getDate(21)
  },
  {
    id: 3,
    title: "Ghost Light Serenade",
    company: "Open Eye Ensemble",
    neighborhood: "Logan Square",
    tag: "Musical",
    showColorClass: "show-color-green",
    img: "https://placehold.co/400x300/065f46/ffffff?text=GHOST+LIGHT",
    synopsis: "A spooky, folk-rock musical.",
    featured: true,
    closing: true,
    performances: [getDate(0), getDate(1), getDate(2), getDate(4)],
    closingDate: getDate(4)
  },
  {
    id: 4,
    title: "Cyrano: A Solo Show",
    company: "The Neo-Futurists",
    neighborhood: "Andersonville",
    tag: "Solo Performance",
    showColorClass: "show-color-yellow",
    img: "https://placehold.co/400x300/b45309/ffffff?text=CYRANO",
    synopsis: "A lightning-fast, intimate telling of the classic tale.",
    featured: true,
    performances: [getDate(1), getDate(3), getDate(8), getDate(10)],
    closingDate: getDate(28)
  },
  {
    id: 5,
    title: "Witches' Brew",
    company: "The Otherworlders",
    neighborhood: "Uptown",
    tag: "Improv/Sketch",
    showColorClass: "show-color-red",
    img: "https://placehold.co/400x300/991b1b/ffffff?text=WITCHES",
    synopsis: "Fast-paced improv that changes every night.",
    closing: true,
    performances: [getDate(0), getDate(2), getDate(3)],
    closingDate: getDate(3)
  },
  {
    id: 6,
    title: "Waiting for Godot",
    company: "Beckett Project",
    neighborhood: "Lincoln Park",
    tag: "Classic Revival",
    showColorClass: "show-color-blue",
    img: "https://placehold.co/400x300/1d4ed8/ffffff?text=GODOT",
    synopsis: "They wait. They talk. They wait again.",
    closing: true,
    performances: [getDate(5), getDate(6)],
    closingDate: getDate(6)
  },
  {
    id: 7,
    title: "The Doll's House",
    company: "Nora Collective",
    neighborhood: "Pilsen",
    tag: "New Work",
    showColorClass: "show-color-green",
    img: "https://placehold.co/400x300/065f46/ffffff?text=DOLLS+HOUSE",
    synopsis: "A feminist response to Ibsen's masterpiece.",
    performances: [getDate(7), getDate(9), getDate(14), getDate(16)],
    closingDate: getDate(30)
  },
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
  const [activeTimeFilter, setActiveTimeFilter] = useState('Calendar');
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showNeighborhoodMenu, setShowNeighborhoodMenu] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowNeighborhoodMenu(false);
        setShowTagMenu(false);
      }
    };

    if (showNeighborhoodMenu || showTagMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNeighborhoodMenu, showTagMenu]);

  // Filter shows based on selected filters
  const getFilteredShows = () => {
    let filtered = [...MOCK_SHOWS];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date filtering
    if (activeTimeFilter === 'Today') {
      filtered = filtered.filter(show =>
        show.performances.some(perfDate => {
          const perf = new Date(perfDate);
          perf.setHours(0, 0, 0, 0);
          return perf.getTime() === today.getTime();
        })
      );
    } else if (activeTimeFilter === 'This Weekend') {
      // Get next Saturday and Sunday
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + daysUntilSaturday);
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);

      filtered = filtered.filter(show =>
        show.performances.some(perfDate => {
          const perf = new Date(perfDate);
          perf.setHours(0, 0, 0, 0);
          return perf.getTime() === saturday.getTime() || perf.getTime() === sunday.getTime();
        })
      );
    }
    // 'Calendar' shows all

    // Neighborhood filtering (multiple selections)
    if (selectedNeighborhoods.length > 0) {
      filtered = filtered.filter(show => selectedNeighborhoods.includes(show.neighborhood));
    }

    // Tag filtering (multiple selections)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(show => selectedTags.includes(show.tag));
    }

    return filtered;
  };

  // Get unique neighborhoods and tags for filters
  const neighborhoods = [...new Set(MOCK_SHOWS.map(s => s.neighborhood))].sort();
  const tags = [...new Set(MOCK_SHOWS.map(s => s.tag))].sort();

  const filteredShows = getFilteredShows();
  const snapshotLimit = isMobile ? 3 : 5;

  const toggleNeighborhood = (neighborhood) => {
    setSelectedNeighborhoods(prev => {
      if (prev.includes(neighborhood)) {
        return prev.filter(n => n !== neighborhood);
      } else {
        return [...prev, neighborhood];
      }
    });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const clearNeighborhoods = () => {
    setSelectedNeighborhoods([]);
    setShowNeighborhoodMenu(false);
    setToastMessage('Showing all neighborhoods');
  };

  const clearTags = () => {
    setSelectedTags([]);
    setShowTagMenu(false);
    setToastMessage('Showing all tags');
  };

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

            {/* Neighborhood Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNeighborhoodMenu(!showNeighborhoodMenu);
                  setShowTagMenu(false);
                }}
                className="bg-stone-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100 whitespace-nowrap"
                tabIndex={0}
              >
                Neighborhoods {selectedNeighborhoods.length > 0 && `(${selectedNeighborhoods.length})`}
                <span className="ml-0.5 text-stone-500">↓</span>
              </button>

              {showNeighborhoodMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-stone-900 rounded-lg shadow-lg z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {neighborhoods.map(neighborhood => (
                      <label
                        key={neighborhood}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-stone-100 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedNeighborhoods.includes(neighborhood)}
                          onChange={() => toggleNeighborhood(neighborhood)}
                          className="w-4 h-4 rounded border-2 border-stone-900"
                        />
                        <span className="text-sm">{neighborhood}</span>
                      </label>
                    ))}
                  </div>
                  {selectedNeighborhoods.length > 0 && (
                    <div className="border-t-2 border-stone-900 p-2">
                      <button
                        onClick={clearNeighborhoods}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tags Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTagMenu(!showTagMenu);
                  setShowNeighborhoodMenu(false);
                }}
                className="bg-stone-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-stone-900 transition-colors hover:bg-indigo-100 whitespace-nowrap"
                tabIndex={0}
              >
                Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                <span className="ml-0.5 text-stone-500">↓</span>
              </button>

              {showTagMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-stone-900 rounded-lg shadow-lg z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {tags.map(tag => (
                      <label
                        key={tag}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-stone-100 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 rounded border-2 border-stone-900"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="border-t-2 border-stone-900 p-2">
                      <button
                        onClick={clearTags}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Snapshot - Stacked on mobile */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-900 uppercase tracking-tight">
              {activeTimeFilter === 'Today' ? 'Today' : activeTimeFilter === 'This Weekend' ? 'This Weekend' : 'This Week'}
            </h2>
            {filteredShows.length === 0 ? (
              <p className="text-stone-600 text-sm">No shows match your filters. Try adjusting your selections.</p>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {filteredShows.slice(0, snapshotLimit).map(show => (
                  <ShowCard key={show.id} show={show} size="normal" />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 2. FEATURED SHOWS */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 uppercase tracking-tight border-b-2 border-stone-900 pb-2">
            Featured
          </h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredShows.filter(s => s.featured).map(show => (
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
              All Shows ({filteredShows.length})
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {filteredShows.map(show => (
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
              {filteredShows.filter(s => s.closing).map(show => (
                <ShowCard key={show.id} show={show} size="horizontal" />
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
