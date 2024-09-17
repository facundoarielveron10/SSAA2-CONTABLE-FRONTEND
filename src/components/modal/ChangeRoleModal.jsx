// MODAL
import Modal from "react-responsive-modal";

export default function ChangeRoleModal({
    openChangeModal,
    onCloseChangeRoleModal,
    handleChangeRole,
    role,
    roles,
    newRole,
    setNewRole,
}) {
    return (
        <div>
            <Modal
                open={openChangeModal}
                onClose={onCloseChangeRoleModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleChangeRole}>
                    <h2 className="listUser-modal-title">
                        Cambiar el rol del usuario
                    </h2>
                    <p className="listUser-modal-user">
                        Usuario:{" "}
                        <span>
                            {role.name} {role.lastname}
                        </span>
                    </p>
                    <p className="listUser-modal-paragraph">
                        Selecciona el rol para el usuario
                    </p>
                    <select
                        className="listUser-modal-select"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option
                            disabled
                            className="listUser-modal-option"
                            value=""
                        >
                            -- Seleccionar Rol --
                        </option>
                        {roles.length > 0
                            ? roles.map((rol) => (
                                  <option
                                      key={rol._id}
                                      className="listUser-modal-option"
                                      value={rol.name}
                                  >
                                      {rol.nameDescriptive}
                                  </option>
                              ))
                            : null}
                    </select>
                    <button
                        type="submit"
                        className="listUser-modal-button button"
                    >
                        Cambiar
                    </button>
                </form>
            </Modal>
        </div>
    );
}
