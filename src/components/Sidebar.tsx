type SidebarProps = {
  activeFolder: string;
  onFolderChange: (folder: string) => void;
};

export default function Sidebar({
  activeFolder,
  onFolderChange,
}: SidebarProps) {
  const folders = [
    {
      id: "inbox",
      label: "Inbox",
      icon: "📥",
    },
    {
      id: "starred",
      label: "Starred",
      icon: "⭐",
    },
    {
      id: "sent",
      label: "Sent",
      icon: "✉️",
    },
    {
      id: "drafts",
      label: "Drafts",
      icon: "📝",
    },
    {
      id: "trash",
      label: "Trash",
      icon: "🗑️",
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r bg-white p-6">
      <h1 className="mb-8 text-2xl font-bold">
        Email Client
      </h1>

      <nav className="space-y-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onFolderChange(folder.id)}
            className={`w-full rounded-lg px-4 py-3 text-left transition ${
              activeFolder === folder.id
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {folder.icon} {folder.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}