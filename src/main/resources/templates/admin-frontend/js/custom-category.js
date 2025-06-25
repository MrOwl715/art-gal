$(document).ready(function(){
  // Khởi tạo DataTable cho bảng danh mục
  var categoryTable = $('#categoryTable').DataTable();
  
  
  var actionType = ""; // "add" hoặc "edit"
  var editingRow = null;
  var rowToDelete = null; // Lưu trữ dòng cần xoá

  // Khi nhấn nút Thêm Danh Mục
  $('#addCategoryBtn').on('click', function(){
    actionType = "add";
    editingRow = null;
    $('#categoryModalLabel').text("Thêm Danh Mục");
    $('#categoryCode').val('');
    $('#categoryName').val('');
    $('#categoryModal').modal('show');
  });
  
  // Khi nhấn nút Sửa
  $('#categoryTable').on('click', '.edit-btn', function(){
    actionType = "edit";
    editingRow = $(this).closest('tr');
    var data = categoryTable.row(editingRow).data();
    $('#categoryModalLabel').text("Sửa Danh Mục");
    $('#categoryCode').val(data[0]);
    $('#categoryName').val(data[1]);
    $('#categoryModal').modal('show');
  });
  
  // Xử lý lưu khi nhấn nút Lưu trong modal
  $('#saveCategoryBtn').on('click', function(){
    var code = $('#categoryCode').val().trim();
    var name = $('#categoryName').val().trim();
    
    if(code === "" || name === ""){
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    if(actionType === "add"){
      // Thêm dòng mới vào DataTable
      categoryTable.row.add([
        code,
        name,
        '<button class="btn btn-sm btn-primary edit-btn">Sửa</button> <button class="btn btn-sm btn-danger delete-btn">Xoá</button>'
      ]).draw(false);
    } else if(actionType === "edit"){
      // Cập nhật dữ liệu dòng hiện tại
      categoryTable.row(editingRow).data([
        code,
        name,
        '<button class="btn btn-sm btn-primary edit-btn">Sửa</button> <button class="btn btn-sm btn-danger delete-btn">Xoá</button>'
      ]).draw(false);
    }
    $('#categoryModal').modal('hide');
  });
  
  // Xử lý nút Xoá: Hiển thị modal xác nhận xoá
  $('#categoryTable').on('click', '.delete-btn', function(){
    rowToDelete = $(this).closest('tr'); // Lưu dòng cần xoá
    $('#confirmDeleteModal').modal('show'); // Hiển thị modal xác nhận xoá
  });
  
  // Khi nhấn nút "Xoá" trong modal xác nhận
  $('#btnConfirmDelete').on('click', function(){
    if (rowToDelete) {
      categoryTable.row(rowToDelete).remove().draw();
      $('#confirmDeleteModal').modal('hide'); // Ẩn modal xác nhận
      $('#successModal').modal('show'); // Hiển thị modal thông báo xoá thành công
    }
  });
});
