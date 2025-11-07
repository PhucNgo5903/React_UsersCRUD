// src/components/AddUser.jsx
import { useState } from 'react';

// BƯỚC 5: THÊM NGƯỜI DÙNG (ADDUSER)
function AddUser({ onAdd }) {
  // State 'adding' để quản lý việc ẩn/hiện modal form
  const [adding, setAdding] = useState(false);
  
  const initialUserState = {
    name: "", username: "", email: "",
    address: { street: "", suite: "", city: "" },
    phone: "", website: ""
  };

  // BƯỚC 5 (Logic): Dùng useState để quản lý các trường nhập liệu
  const [user, setUser] = useState(initialUserState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // BƯỚC 5 (Logic): Nested State
    if (["street", "suite", "city"].includes(id)) {
      setUser({
        ...user, // Giữ lại các giá trị cũ (name, username...)
        address: {
          ...user.address, // Giữ lại các giá trị cũ trong address
          [id]: value       // Cập nhật trường
        }
      });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    // BƯỚC 5 (Logic): Gọi onAdd(user) để truyền dữ liệu lên App
    onAdd(user);
    // Reset form về trạng thái ban đầu
    setUser(initialUserState);
    // Đóng modal
    setAdding(false);
  };

  return (
    <div>
      {/* BƯỚC 8 (Liên quan): Nút bấm để mở Modal */}
      <button className="btn-add" onClick={() => setAdding(true)}>Thêm Người Dùng</button>
      
      {/* Khi 'adding' là true, hiển thị Modal */}
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng mới</h4>
            
            <label htmlFor="name">Name:
              <input id="name" type="text" value={user.name} onChange={handleChange} />
            </label>
            <label htmlFor="username">Username:
              <input id="username" type="text" value={user.username} onChange={handleChange} />
            </label>
            <label htmlFor="email">Email:
              <input id="email" type="text" value={user.email} onChange={handleChange} />
            </label>
            <label htmlFor="city">City: 
              <input id="city" type="text" value={user.address.city} onChange={handleChange} />
            </label>
            <label htmlFor="street">Street:
              <input id="street" type="text" value={user.address.street} onChange={handleChange} />
            </label>
            
            <div className="modal-actions">
              <button className="btn-save" onClick={handleAdd}>Thêm</button>
              <button className="btn-cancel" onClick={() => setAdding(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;