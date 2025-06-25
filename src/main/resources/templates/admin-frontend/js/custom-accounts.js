// File: js/custom-accounts.js

$(document).ready(function() {
  // ----------------------------
  // Nhân viên: Thêm/Sửa thông tin

  // Mở modal thêm nhân viên
  $('#addEmployeeBtn').click(function() {
    // Reset form và thay đổi tiêu đề modal
    $('#editEmployeeForm')[0].reset();
    $('#editEmployeeModalLabel').text('Thêm Nhân Viên');
    // TODO: Nếu cần, đặt thêm thuộc tính hidden cho ID (để xác định thêm mới hay cập nhật)
    $('#editEmployeeModal').modal('show');
  });

  // Mở modal sửa thông tin nhân viên
  $('.edit-employee').click(function() {
    var employeeId = $(this).data('employee-id');
    // TODO: Load dữ liệu nhân viên theo employeeId và điền vào form
    $('#editEmployeeModalLabel').text('Sửa Thông Tin Nhân Viên');
    $('#editEmployeeModal').modal('show');
  });

  // Xử lý submit form nhân viên
  $('#editEmployeeForm').submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    // TODO: Gửi dữ liệu qua AJAX hoặc xử lý lưu thay đổi
    alert('Thông tin nhân viên đã được lưu (chưa triển khai).');
    $('#editEmployeeModal').modal('hide');
  });

  // ----------------------------
  // Khách hàng: Sửa thông tin
  // ----------------------------
  // Mở modal sửa thông tin khách hàng
  $('.edit-customer').click(function() {
    var customerId = $(this).data('customer-id');
    // TODO: Load dữ liệu khách hàng theo customerId và điền vào form
    $('#editCustomerModal').modal('show');
  });

  // Xử lý submit form khách hàng
  $('#editCustomerForm').submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    // TODO: Gửi dữ liệu qua AJAX hoặc xử lý lưu thay đổi
    alert('Thông tin khách hàng đã được lưu (chưa triển khai).');
    $('#editCustomerModal').modal('hide');
  });
});
