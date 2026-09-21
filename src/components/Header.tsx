type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCompose: () => void;
};

export default function Header({
  searchTerm,
  onSearchChange,
  onCompose,
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      
      {/* Search */}
      <div className="relative w-full max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search emails..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />
      </div>

      {/* Compose */}
      <button
        onClick={onCompose}
        className="ml-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        ✉️ Compose
      </button>
    </header>
  );
}