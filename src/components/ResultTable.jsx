// src/components/ResultTable.jsx
import { useState, useEffect } from 'react';

// BƯỚC 4, 5, 6, 7: HIỂN THỊ, THÊM, SỬA, XÓA
function ResultTable({ keyword, user, onAdded }) {
  // State quản lý danh sách users
  const [users, setUsers] = useState([]);
  // State quản lý trạng thái tải dữ liệu
  const [loading, setLoading] = useState(true);
  
  // BƯỚC 6: Khai báo state để lưu user đang được chỉnh sửa
  const [editing, setEditing] = useState(null);

  // BƯỚC 4: Tải dữ liệu (READ)
  useEffect(() => {
    // Tải dữ liệu từ API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); 

  // BƯỚC 5: Cập nhật danh sách khi có người dùng MỚI (CREATE)
  useEffect(() => {
    if (user) {
      // Thêm người dùng mới vào danh sách 'users' (state của component này)
      // Dùng ID > 100 để tránh trùng lặp với 10 user ban đầu
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      // Gọi callback 'onAdded' để báo cho App biết đã thêm xong
      onAdded();
    }
  }, [user]); 

  // BƯỚC 7: XÓA NGƯỜI DÙNG (DELETE)
  function removeUser(id) {
    // Dùng filter() để tạo mảng mới KHÔNG chứa user có 'id' cần xóa
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // BƯỚC 6: SỬA NGƯỜI DÙNG (UPDATE)
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  function handleEditChange(key, value) {
    if (["street", "suite", "city"].includes(key)) {
      setEditing({
        ...editing,
        address: { ...editing.address, [key]: value }
      });
    } else {
      setEditing({ ...editing, [key]: value });
    }
  }

  function saveUser() {
    setUsers(prev => prev.map(u => (u.id === editing.id ? editing : u)));
    setEditing(null);
  }

  // BƯỚC 4: Lọc danh sách (Search/Filter)
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // Hiển thị "Loading" nếu chưa tải xong
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      {/* BƯỚC 6 & 8: Modal Form Sửa */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Chỉnh sửa người dùng</h4>
            <label htmlFor="name">Name:
              <input id="name" type="text" value={editing.name}
                onChange={(e) => handleEditChange("name", e.target.value)} />
            </label>
            <label htmlFor="username">Username:
              <input id="username" type="text" value={editing.username}
                onChange={(e) => handleEditChange("username", e.target.value)} />
            </label>
            <label htmlFor="email">Email:
              <input id="email" type="text" value={editing.email}
                onChange={(e) => handleEditChange("email", e.target.value)} />
            </label>
            <label htmlFor="city">City:
              <input id="city" type="text" value={editing.address.city}
                onChange={(e) => handleEditChange("city", e.target.value)} />
            </label>
            <div className="modal-actions">
              <button className="btn-save" onClick={saveUser}>Lưu</button>
              <button className="btn-cancel" onClick={() => setEditing(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* BƯỚC 4: Hiển thị dữ liệu bằng map */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                {/* BƯỚC 6: Nút Sửa */}
                <button className="btn-edit" onClick={() => editUser(u)}>Sửa</button>
                {/* BƯỚC 7: Nút Xóa */}
                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ResultTable;