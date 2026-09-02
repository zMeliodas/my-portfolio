const AddButton = ({ label }: { label: string }) => {
  return (
    <button className="border border-dashed border-borderColor rounded-lg py-4 text-white/40 font-mono text-sm">
      + Add {label}
    </button>
  );
};

export default AddButton;
