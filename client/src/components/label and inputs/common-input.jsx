function CommonInput({
  content,
  htmlFor,
  type,
  name,
  id,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={htmlFor}>{content}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
}

export default CommonInput;
