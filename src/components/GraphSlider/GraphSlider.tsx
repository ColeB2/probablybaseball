"use client";
import { useEffect, useState, useCallback, useId } from "react";

interface GraphSliderProps {
    graphs: React.ReactNode[]; // Array of JSX graph components
    ariaLabel?: string;
}

export default function GraphSlider({ graphs, ariaLabel="graph carousel" }: GraphSliderProps) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const displayId = useId()

    const handleNext = useCallback(() => {
        setCurrentIdx((prev) => (prev + 1) % graphs.length);
    }, [graphs.length]);

    const handlePrev = useCallback(() => {
        setCurrentIdx((prev) => (prev - 1 + graphs.length) % graphs.length);
    }, [graphs.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    return (
        <div
            className=""
            role="group" 
            aria-roledescription="carousel"
            aria-label={ariaLabel}
        >
            {/* Graph container */}
            <div
                id={displayId}
                className="overflow-x-auto"
                aria-live="polite" 
                role="region"
                aria-atomic="true"
            >
                {graphs[currentIdx]}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4" aria-roledescription="controls for the graphs">
                <button
                    onClick={handlePrev}
                    className="px-3 py-1 rounded hover:text-gray-400"
                    aria-controls={displayId} // Connects button to the div above
                    aria-label="Previous Chart"
                >
                    ← Prev
                </button>
                <span className="text-sm text-gray-600" aria-current="step">
                    {currentIdx + 1} / {graphs.length}
                </span>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 rounded hover:text-gray-400"
                    aria-controls={displayId}
                    aria-label="Next Chart"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
