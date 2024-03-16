import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"

function App() {
  const nameRef = useRef();
  const ageRef = useRef();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [edit, setEdit] = useState();
  const nameEditRef = useRef();
  const ageEditRef = useRef();

  function handleEdit(user) {
    setEdit(user);
  }

  function handleSubmitEdit(e){
    e.preventDefault();
    if(nameEditRef.current.value.trim() !== undefined){
      const updatedUser = {
        ...edit,
         name: nameEditRef.current.value,
         age: ageEditRef.current.value
      };
      dispatch({
        type: 'EDIT',
        id: updatedUser.id,
        name: updatedUser.name,
        age: updatedUser.age
      })
      setEdit(null);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    if(nameRef.current.value.trim() !== undefined){
      dispatch({
        type: "ADD_USER",
          name: nameRef.current.value,
          age: ageRef.current.value,
          id: Date.now(),
      });
      nameRef.current.value = "";
      ageRef.current.value = "";
    }
    }

    
    
  

  return (
    <>
    <div className="max-w-[1200px] mx-auto box-border p-5">
      <h1 className="text-3xl font-bold text-center mb-2">Participants</h1>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col mb-7">
        <input
          type="text"
          placeholder="Enter Name..."
          className="input input-bordered w-full max-w-3xl mb-2"
          ref={nameRef}
        />
        <input
          type="number"
          placeholder="Enter Age..."
          className="input input-bordered w-full max-w-3xl mb-2"
          ref={ageRef}
        />
        <button className="btn btn-success w-full max-w-3xl text-fuchsia-50 text-lg">
          SAVE
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-[768px] mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Age</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
           {
            users.map((user, index) => {
              return (
            <tr key={index}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td className="flex justify-center gap-1">
              <button onClick={() => handleEdit(user)} className="btn btn-circle text-lg"><FaUserEdit /></button>
              <button onClick={() => {dispatch({type: 'DELETE_USER', id: user.id})}} className="btn btn-circle text-lg"><MdDelete /></button>
            </td>
          </tr>
              )
            })
           }
            
          </tbody>
        </table>
      </div>
      {edit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-2">Edit User</h2>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                placeholder="Enter Name..."
                className="input input-bordered w-full mb-2"
                ref={nameEditRef}
                defaultValue={edit.name}
              />
              <input
                type="number"
                placeholder="Enter Age..."
                className="input input-bordered w-full mb-2"
                ref={ageEditRef}
                defaultValue={edit.age}
              />
              <button
                type="submit"
                className="btn btn-success w-full max-w-3xl text-fuchsia-50 text-lg"
              >
                EDIT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
