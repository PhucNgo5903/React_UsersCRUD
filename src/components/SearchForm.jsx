// src/components/SearchForm.jsx

// BƯỚC 3: CHỨC NĂNG TÌM KIẾM (SEARCHFORM)
function SearchForm({ onChangeValue }) {
  return (
    <input
      type="text"
      placeholder="Tìm theo name, username"
      /*
       * BƯỚC 3 (Logic):
       * Khi người dùng gõ (onChange), gọi hàm callback 'onChangeValue'
       * (chính là hàm 'setKeyword' ở App) với giá trị mới.
       * Dữ liệu được truyền từ CON (SearchForm) -> CHA (App).
      */
      onChange={(e) => onChangeValue(e.target.value)}
      style={{ width: '300px' }}
    />
  );
}

export default SearchForm;