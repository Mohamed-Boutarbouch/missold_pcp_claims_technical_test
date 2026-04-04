export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-3 md:py-6 lg:py-12 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
