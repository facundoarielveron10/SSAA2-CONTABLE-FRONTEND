// CSS
import "@styles/roles/create-edit.css";

export default function Action({
    action,
    selectedActions,
    setSelectedActions,
}) {
    // FUNCTIONS
    const handleChecked = (action) => {
        if (selectedActions.includes(action)) {
            const updatedActions = selectedActions.filter((a) => a !== action);
            setSelectedActions(updatedActions);
        } else {
            setSelectedActions([...selectedActions, action]);
        }
    };

    return (
        <div key={action._id} className="createEditRole-action">
            <input
                className="createEditRole-checkbox"
                type="checkbox"
                id={action._id}
                name={action.name}
                checked={selectedActions.includes(action.name) ? true : false}
                onChange={(e) => handleChecked(e.target.name)}
            />
            <label className="createEditRole-description" htmlFor={action._id}>
                {action.description}
            </label>
        </div>
    );
}
