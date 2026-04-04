export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 md:px-10 py-4 md:py-8 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
