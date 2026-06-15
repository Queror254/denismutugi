import { projects } from "@/lib/projects";
import { WorkGridB } from "@/components/version-b/WorkGridB";

export default function WorkPageB() {
  return (
    <div className="min-h-screen bg-black px-8 pb-12 pt-28">
      <h1 className="mb-10 font-bebas text-6xl leading-none text-white">— WORK —</h1>
      <WorkGridB projects={projects} />
    </div>
  );
}
