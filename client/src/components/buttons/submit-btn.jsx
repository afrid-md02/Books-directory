function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="font-Poppins w-full bg-slate-950 border-2 text-bone_white border-slate-950 p-2 rounded-md hover:bg-slate-700 duration-500 hover:border-slate-700 sm:w-2/5 hover:scale-105"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
