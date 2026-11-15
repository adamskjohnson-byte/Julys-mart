const WORDS = [
  'Provisions',
  'Groceries',
  'Rice',
  'Cooking Oil',
  'Wine',
  'Drinks',
  'Biscuits',
  'Snacks',
  'Body Cream',
  'Skincare',
];

export default function Ticker() {
  return (
    <div className="mt-1 overflow-hidden bg-ink py-4">
      <div className="marquee-track flex w-max items-center">
        {[...WORDS, ...WORDS].map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center">
            <span className="eyebrow px-6 text-ivory/60 md:px-9">{word}</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brass" />
          </span>
        ))}
      </div>
    </div>
  );
}