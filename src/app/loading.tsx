export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
        <p className="text-xl font-medium text-white">Loading...</p>
        <p className="mt-2 text-sm text-white/60">Please wait while we fetch your data</p>
      </div>
    </div>
  );
}