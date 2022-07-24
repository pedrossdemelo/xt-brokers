import { ViewGridIcon } from "@heroicons/react/solid";

export default function Loader({ opacity = 80 }: { opacity?: number }) {
  return (
    <div
      className="overflow-hidden flex justify-center items-center
    h-screen w-screen rounded-xl fixed top-0 bottom-0 left-0 right-0"
    >
      <ViewGridIcon
        className="h-[200px] bg-gradient-to-b animate-enter
      from-slate-50 p-1 to-slate-100 shadow-2xl animate-bounce border
      shadow-slate-400/80 border-slate-100 rounded-[30px]"
        style={{ opacity: opacity / 100 }}
      />
    </div>
  );
}
