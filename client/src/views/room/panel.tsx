interface PanelProps {}

export const Panel = ({}: PanelProps) => {
  return (
    <div className="m-w-full h-full flex items-start justify-start flex-col rounded-2xl border-2 border-black bg-transparent p-8">
      <h1>Synth</h1>
      <h2>Settings</h2>
    </div>
  );
};
