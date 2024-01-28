export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen mx-auto max-w-7xl sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
