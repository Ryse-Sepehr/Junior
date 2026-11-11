/**
 * Sets the end of a display heading in the menu's serif, so the fold menu and the
 * page headings read as one voice: "Votre déménageur à <serif>Bruxelles</serif>".
 * A short preposition before the last word travels with it ("à Bruxelles", "in Brussel").
 */
export function Accent({ text, className = "" }: { text: string; className?: string }) {
  const clean = text.trim().replace(/[?!:.]+$/, (m) => m)
  const words = clean.split(" ")
  if (words.length < 3) return <>{text}</>
  let cut = words.length - 1
  const short = (w: string) => w.replace(/[’']/g, "").length <= 3
  if (short(words[cut - 1]) && cut - 1 > 0) cut -= 1
  // keep trailing punctuation (?) attached to the accented part
  const head = words.slice(0, cut).join(" ")
  const tail = words.slice(cut).join(" ")
  return (
    <>
      {head}{" "}
      <span className={`font-serif font-normal text-[1.08em] tracking-[-0.015em] ${className}`}>{tail}</span>
    </>
  )
}
