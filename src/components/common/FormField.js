function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) {
  return (
    <div className="col-12">
      <label className="form-label fw-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={error ? 'form-control is-invalid' : 'form-control'}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
}

export default FormField;
