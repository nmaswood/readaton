export default function Animatedloader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="absolute animate-ping h-12 w-12 rounded-full bg-green-400 opacity-75"></div>
        <div className="relative h-12 w-12 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
}
