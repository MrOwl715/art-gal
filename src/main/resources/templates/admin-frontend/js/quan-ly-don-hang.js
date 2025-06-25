$(document).ready(function() {
  // Khởi tạo DataTables
  var orderTable = $('#orderManagementTable').DataTable({
    dom: 'lrtip' // Loại bỏ phần filter mặc định ('f')

    // searching: false // Tắt search mặc định
  });
  var detailsTable = $('#orderDetailsTable').DataTable({
    // searching: false // Tắt search mặc định
    dom: 'lrtip'

  });

  // ========== A) BẢNG QUẢN LÝ ĐƠN HÀNG ==========
  // 1) Thay đổi cột
  $('#orderSearchColumn').change(function() {
    var colVal = $(this).val(); // "0", "1", "3", "5"
    if (colVal === '3') {
      // Cột Trạng Thái
      $('#orderSearchInput').hide();
      $('#orderStatusSelect').show().val('');
      $('#orderSearchInput').val('');
    } else {
      $('#orderStatusSelect').hide().val('');
      $('#orderSearchInput').show();

      if (colVal === '1') {
        // Ngày Tạo => date
        $('#orderSearchInput').attr('type','date').val('');
      } else {
        // Text
        $('#orderSearchInput').attr('type','text').val('');
        $('#orderSearchInput').attr('placeholder','Nhập từ khóa...');
      }
    }
  });

  // 2) Nút Tìm
  $('#orderSearchBtn').click(function() {
    var colVal = $('#orderSearchColumn').val();
    if (colVal === '3') {
      // Trạng Thái
      var statusVal = $('#orderStatusSelect').val(); 
      orderTable.column(3).search(statusVal).draw();
    } else {
      var query = $('#orderSearchInput').val().trim();
      var colIndex = parseInt(colVal,10);
      orderTable.column(colIndex).search(query).draw();
    }
  });

  // 3) Enter để tìm
  $('#orderSearchInput').keypress(function(e) {
    if (e.which === 13) {
      $('#orderSearchBtn').click();
    }
  });

  // ========== B) BẢNG CHI TIẾT ĐƠN HÀNG ==========
  // 1) Thay đổi cột (nếu cần logic date => cột 1, v.v.)
  $('#detailsSearchColumn').change(function() {
    // Ở đây cột 0 (Mã ĐH), 1 (Mã SP) => text
    $('#detailsSearchInput').attr('type','text').val('');
  });

  // 2) Nút Tìm
  $('#detailsSearchBtn').click(function() {
    var colVal = $('#detailsSearchColumn').val(); // "0" hoặc "1"
    var query = $('#detailsSearchInput').val().trim();
    var colIndex = parseInt(colVal,10);
    detailsTable.column(colIndex).search(query).draw();
  });

  // 3) Enter để tìm
  $('#detailsSearchInput').keypress(function(e) {
    if (e.which === 13) {
      $('#detailsSearchBtn').click();
    }
  });
});
