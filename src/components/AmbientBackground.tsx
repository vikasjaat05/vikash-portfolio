export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute top-[8%] -left-[10%] w-[42vw] h-[42vw] rounded-full bg-red/[0.07] blur-[120px] animate-drift-a" />
      <div className="absolute top-[45%] -right-[8%] w-[36vw] h-[36vw] rounded-full bg-black/[0.04] blur-[110px] animate-drift-b" />
      <div className="absolute bottom-[4%] left-[18%] w-[30vw] h-[30vw] rounded-full bg-red/[0.05] blur-[100px] animate-drift-c" />
    </div>
  );
}
