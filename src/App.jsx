// src/App.jsx
import { useState } from 'react';

// Import các component con
import SearchForm from './components/SearchForm.jsx';
import AddUser from './components/AddUser.jsx';
import ResultTable from './components/ResultTable.jsx';

// BƯỚC 1 & 2: COMPONENT GỐC (APP) VÀ STATE TẬP TRUNG
function App() {
  
  // BƯỚC 2: Quản lý toàn bộ state và truyền props xuống con
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <div>
      {/* BƯỚC 1: Tiêu đề H1 */}
      <h1>Quản lý người dùng</h1>
      
      <div className="search-add-container">
        
        {/* BƯỚC 3 : Truyền hàm 'setKeyword' xuống SearchForm. */}
        <SearchForm onChangeValue={setKeyword} />
   
        {/* BƯỚC 5 (Liên quan): Truyền hàm 'setNewUser' xuống AddUser. */}
        <AddUser onAdd={setNewUser} />
      </div>

      {/* BƯỚC 2, 4, 5: Truyền state xuống component con (ResultTable) */}
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;