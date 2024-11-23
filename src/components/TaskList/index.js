//TaskList

import { useState } from "react";
import Popup from "reactjs-popup";

import "./index.css";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const TaskList = ({ todoDetails, saveEditedTask, deleteTodo }) => {
  const { id, title, description, dueDate, status } = todoDetails;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    dueDate,
    status,
  });

  const onEditChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSaveEdit = () => {
    saveEditedTask(id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            id="task"
            value={editedTask.title}
            onChange={(e) => onEditChange("title", e.target.value)}
            placeholder="Title"
            className="input"
          />
          <input
            type="text"
            id="description"
            value={editedTask.description}
            onChange={(e) => onEditChange("description", e.target.value)}
            placeholder="Description"
            className="input"
          />
          <input
            type="date"
            id="date"
            value={editedTask.dueDate}
            onChange={(e) => onEditChange("dueDate", e.target.value)}
            className="input"
          />
          <select
            value={editedTask.status}
            id="status"
            onChange={(e) => onEditChange("status", e.target.value)}
            className="input"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={onSaveEdit} className="save-btn">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="title-class">{title}</h1>
          <p className="description-class">{description}</p>
          <p>
            <strong className="due-date-class">Due Date:</strong> {dueDate}
          </p>
          <p className="status-class">
            <strong>Status:</strong> {status}
          </p>
          <div className="card-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn" >
              <MdOutlineDriveFileRenameOutline
                className="edit-icon"
                size={22}
              />
            </button>
            <div>
              <Popup
                modal
                trigger={
                  <button type="button" className="popup-trigger-btn">
                    <RiDeleteBin2Fill className="delete-icon" />
                  </button>
                }
                
              >
                {(close) => (
                  <div >
                    <p className="popup-message">
                      Are you sure you want to delete this task?
                    </p>
                    <div className="popup-buttons">
                      <button
                        className="popup-cancel-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="popup-delete-btn"
                        onClick={() => {
                          deleteTodo(id);
                          close();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
