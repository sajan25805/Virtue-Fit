export function Avatar({ className = "", children }) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ className = "", src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
    />
  );
}

export function AvatarFallback({ className = "", children }) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${className}`}>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{children}</span>
    </div>
  );
}