export default function Checkbox({ id, checked, onChange }) {
    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}></label>
        </div>
    );
}
