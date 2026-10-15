export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute top-[8%] -left-[10%] w-[42vw] h-[42vw] rounded-full bg-red/[0.06] blur-[80px] animate-drift-a will-change-transform" />
      <div className="absolute top-[45%] -right-[8%] w-[36vw] h-[36vw] rounded-full bg-black/[0.035] blur-[70px] animate-drift-b will-change-transform" />
      <div className="absolute bottom-[4%] left-[18%] w-[30vw] h-[30vw] rounded-full bg-red/[0.045] blur-[60px] animate-drift-c will-change-transform" />
    </div>
  );
}
