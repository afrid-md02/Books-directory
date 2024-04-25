function CancelButton({ cancel }) {
  return (
    <button
      type="button"
      onClick={cancel}
      className="text-bone_white rounded-md w-full bg-custom_pink font-Poppins px-1 py-2 hover:bg-pink-800 duration-500 text-sm md:text-base"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
