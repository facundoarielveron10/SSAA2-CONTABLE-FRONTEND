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
        <div key={action._id} className="actions-action">
            <input
                className="checkbox"
                type="checkbox"
                id={action._id}
                name={action.name}
                checked={selectedActions.includes(action.name) ? true : false}
                onChange={(e) => handleChecked(e.target.name)}
            />
            <label className="actions-description" htmlFor={action._id}>
                {action.description}
            </label>
        </div>
    );
}
