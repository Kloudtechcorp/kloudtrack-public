import { WeatherItem } from "./terminology-tabs";
// Card for each terminology item
const TerminologyCard: React.FC<WeatherItem & { color?: string; category?: string }> = ({ term, threshold, definition, color, category }) => {
  return (
    <div
      className="flex flex-col p-5 gap-3 bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-xl shadow-sm h-60 transition-all duration-300 hover:shadow-md"
      onMouseEnter={(e) => { if (color) e.currentTarget.style.borderColor = color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-lg leading-tight">{term}</h4>
        {category && (
          <span className="text-xs px-2.5 py-1 bg-muted/70 rounded-full text-foreground whitespace-nowrap font-medium">
            {category}
          </span>
        )}
      </div>
      <div
        className="inline-flex items-center gap-2 rounded-md w-fit py-1.5 px-3 text-sm font-semibold border"
        style={{
          backgroundColor: color ? `${color}10` : 'hsl(var(--muted))',
          borderColor: color ? color : 'hsl(var(--border))',
          color: color || 'hsl(var(--foreground))',
        }}
      >
        <span className="text-xs opacity-60 font-normal">Range:</span>
        <span>{threshold}</span>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed overflow-y-auto max-h-24">
        <p dangerouslySetInnerHTML={{ __html: definition }} />
      </div>
    </div>
  );
};

export default TerminologyCard;