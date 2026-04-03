export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-3 md:py-6 lg:py-12 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
