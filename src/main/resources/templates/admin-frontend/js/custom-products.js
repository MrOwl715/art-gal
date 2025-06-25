$(document).ready(function() {
  // ==========================
  //  1) KHỞI TẠO DATA TABLE CHO BẢNG SẢN PHẨM
  // ==========================
  var productTable = $('#productTable').DataTable({
    language: {
      search: "Tìm kiếm:",
      lengthMenu: "Hiển thị _MENU_ sản phẩm",
      zeroRecords: "Không tìm thấy sản phẩm",
      info: "Trang _PAGE_ trên tổng số _PAGES_",
      infoEmpty: "Không có sản phẩm nào",
      infoFiltered: "(lọc từ _MAX_ sản phẩm)"
    }
    // Nếu cần thêm các tùy chọn khác, bạn có thể bổ sung ở đây
  });

  // ==========================
  //  2) SỬA SẢN PHẨM
  // ==========================
  // Khi nhấn nút "Sửa thông tin" trên bảng
  $('.edit-product').click(function() {
    // Lấy ID sản phẩm và các thông tin liên quan
    var productId = $(this).data('product-id');
    var productStatus = $(this).data('product-status') || "dangban";

    // Thu thập dữ liệu sản phẩm từ thuộc tính data của nút
    var productData = {
      code: $(this).data('product-code') || "SP001",
      name: $(this).data('product-name') || "Sản phẩm A",
      category: $(this).data('category-code') || "DM01",
      description: $(this).data('product-description') || "Mô tả sản phẩm A",
      price: $(this).data('product-price') || 100000,
      quantity: $(this).data('product-quantity') || 50,
      status: productStatus,
      image: $(this).data('product-image') || ""
    };

    // Điền dữ liệu gốc vào modal sửa
    $('#originalProductCode').text(productData.code);
    $('#originalProductName').text(productData.name);
    $('#originalCategoryCode').text(productData.category);
    $('#originalProductDescription').text(productData.description);
    $('#originalProductPrice').text(productData.price);
    $('#originalProductQuantity').text(productData.quantity);
    if (productData.status === "dangban") {
      $('#originalProductStatus').text("Đang bán");
    } else if (productData.status === "dungban") {
      $('#originalProductStatus').text("Dừng bán");
    } else {
      $('#originalProductStatus').text("Chưa rõ");
    }

    // Reset các ô input trong modal sửa
    $('#productCodeNew').val('');
    $('#productNameNew').val('');
    $('#categoryCodeNew').val('');
    $('#productDescriptionNew').val('');
    $('#productPriceNew').val('');
    $('#productQuantityNew').val('');
    $('#productStatusNew').val('');

    // Xử lý preview ảnh (modal sửa)
    if (productData.image) {
      $('#newProductImagePreview').attr('src', productData.image).show();
      $('#newProductImagePreview').siblings('.placeholder').hide();
    } else {
      $('#newProductImagePreview').hide();
      $('#newProductImagePreview').siblings('.placeholder').show();
    }

    // Gắn productId vào nút xoá trong modal sửa
    $('#deleteProductBtn').data('product-id', productId);

    // Hiển thị modal sửa
    $('#editProductModalLabel').text('Sửa Thông Tin Sản Phẩm');
    $('#editProductModal').modal('show');
  });

  // Preview ảnh khi chọn file trong modal sửa
  $('#newProductImage').on('change', function(e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        $('#newProductImagePreview').attr('src', evt.target.result).show();
        $('#newProductImagePreview').siblings('.placeholder').hide();
      }
      reader.readAsDataURL(file);
    }
  });

  // Sự kiện nút "Xoá sản phẩm" trong modal sửa:
  // Thay vì dùng confirm(), ta sẽ hiển thị modal xác nhận xoá
  $('#deleteProductBtn').click(function() {
    var productId = $(this).data('product-id');
    // Lưu productId vào modal xác nhận xoá để sử dụng sau này
    $('#confirmDeleteModal').data('product-id', productId);
    // Hiển thị modal xác nhận xoá sản phẩm
    $('#confirmDeleteModal').modal('show');
  });

  // Khi nhấn nút "Xoá" trong modal xác nhận xoá sản phẩm
  $('#btnConfirmDelete').click(function() {
    var productId = $('#confirmDeleteModal').data('product-id');
    // TODO: Gọi AJAX xóa sản phẩm từ backend nếu cần
    // Ví dụ: $.ajax({ url: '/deleteProduct', type: 'POST', data: { id: productId } });
    
    // Sau khi xóa thành công, ẩn modal xác nhận và modal sửa (nếu mở)
    $('#confirmDeleteModal').modal('hide');
    $('#editProductModal').modal('hide');

    // Hiển thị modal thông báo xoá thành công
    $('#successModal').modal('show');

    // Nếu cần cập nhật lại bảng DataTable (ví dụ: xóa dòng đã xoá)
    // Bạn có thể tìm dòng tương ứng với productId và xóa nó khỏi DataTable.
    // Ví dụ:
    // var row = productTable.row( $('[data-product-id="'+ productId +'"]').parents('tr') );
    // row.remove().draw();
  });

  // Submit form sửa sản phẩm
  $('#editProductForm').submit(function(e) {
    e.preventDefault();
    // Thu thập dữ liệu từ form sửa
    var newCode = $('#productCodeNew').val();
    var newName = $('#productNameNew').val();
    var newCategory = $('#categoryCodeNew').val();
    var newDesc = $('#productDescriptionNew').val();
    var newPrice = $('#productPriceNew').val();
    var newQuantity = $('#productQuantityNew').val();
    var newStatus = $('#productStatusNew').val(); // ví dụ: "dangban" hoặc "dungban"

    // TODO: Gửi AJAX cập nhật thông tin sản phẩm
    alert('Đã lưu thay đổi sản phẩm (chưa có backend).');
    $('#editProductModal').modal('hide');
  });

  // ==========================
  //  3) THÊM SẢN PHẨM
  // ==========================
  // Mở modal thêm sản phẩm
  $('#addProductBtn').click(function() {
    // Reset form thêm
    $('#addProductForm')[0].reset();
    // Ẩn preview ảnh, hiện placeholder
    $('#addProductImagePreview').hide();
    $('#addProductImagePreview').siblings('.placeholder').show();
    // Hiển thị modal thêm
    $('#addProductModal').modal('show');
  });

  // Preview ảnh trong modal thêm sản phẩm
  $('#addProductImage').on('change', function(e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        $('#addProductImagePreview').attr('src', evt.target.result).show();
        $('#addProductImagePreview').siblings('.placeholder').hide();
      };
      reader.readAsDataURL(file);
    } else {
      $('#addProductImagePreview').hide();
      $('#addProductImagePreview').siblings('.placeholder').show();
    }
  });

  // Submit form thêm sản phẩm
  $('#addProductForm').submit(function(e) {
    e.preventDefault();
    // Thu thập dữ liệu thêm sản phẩm từ form nếu cần
    alert('Đã thêm sản phẩm! (chưa có backend)');
    $('#addProductModal').modal('hide');

    // Nếu có thêm sản phẩm mới thành công, bạn nên cập nhật DataTable bằng cách thêm dòng mới.
    // Ví dụ: productTable.row.add([...]).draw();
  });

  // ==========================
  //  4) PREVIEW ẢNH CHO CÁC INPUT KHÁC (nếu có)
  // ==========================
  // Ví dụ: preview ảnh cho input có id "productImage" (nếu được dùng ở nơi khác)
  $('#productImage').on('change', function() {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#productImagePreview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  });
});
