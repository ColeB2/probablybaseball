// Helper functions

/**
 * Flips an SVG text anchor value between "start" and "end".
 * 
 * Useful when rotating or repositioning text labels to maintain visual alignment.
 * 
 * - If the anchor is `"start"`, returns `"end"`.
 * - If the anchor is `"end"`, returns `"start"`.
 * - If the anchor is `"middle"`, returns `"middle"` (unchanged).
 *
 * @param {"start" | "middle" | "end"} a - The original text anchor value.
 * @returns {"start" | "middle" | "end"} The flipped (or unchanged) anchor value.
 */
const flipAnchor = (a: "start" | "middle" | "end") => {
  return a === "start" ? "end" : a === "end" ? "start" : a;
};



export {
    flipAnchor
}