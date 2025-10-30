"use client";
import { useState } from "react";

interface GraphSliderProps {
    graphs: React.ReactNode[]; // Array of JSX graph components
}

export default function GraphSlider({ graphs }: GraphSliderProps) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleNext = () => {
        setCurrentIdx((prev) => (prev + 1) % graphs.length);
    };

    const handlePrev = () => {
        setCurrentIdx((prev) => (prev - 1 + graphs.length) % graphs.length);
    };

    return (
        <div className="">
            {/* Graph container */}
            <div className="overflow-x-auto">
                {graphs[currentIdx]}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handlePrev}
                    className="px-3 py-1 rounded hover:text-gray-400"
                >
                    ← Prev
                </button>
                <span className="text-sm text-gray-600">
                    {currentIdx + 1} / {graphs.length}
                </span>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 rounded hover:text-gray-400"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
