export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Você está offline!</h1>
      <p className="text-lg mb-8">Conecte-se à internet para acessar todo o conteúdo.</p>
      <p className="text-sm text-gray-500">O conteúdo estático desta página está disponível offline.</p>
    </div>
  );
} 