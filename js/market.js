$(document).ready(function () {

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS AGRICOLAS ============================================

	$('#p-agri').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category1="' + catProduct + '"]').show();
			$('.product-item[category1="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});


	// FILTRANDO PRODUCTOS ALIMENTARIOS ============================================

	$('#p-ali').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category2="' + catProduct + '"]').show();
			$('.product-item[category2="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});


	// FILTRANDO PRODUCTOS COSMETICOS ============================================

	$('#p-cos').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category3="' + catProduct + '"]').show();
			$('.product-item[category3="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});



	// FILTRANDO PRODUCTOS FARMACEUTICOS ============================================

	$('#p-farma').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category4="' + catProduct + '"]').show();
			$('.product-item[category4="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});


	// FILTRANDO PRODUCTOS INDUSTRIALES ============================================

	$('#p-ind').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category5="' + catProduct + '"]').show();
			$('.product-item[category5="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});

	// FILTRANDO PRODUCTOS INDUSTRIALES ============================================

	$('#p-psc').click(function () {
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item[category6="' + catProduct + '"]').show();
			$('.product-item[category6="' + catProduct + '"]').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});




	// MOSTRANDO TODOS LOS PRODUCTOS =========================

	$('#all-prods').click(function () {
		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct() {
			$('.product-item').hide();
		} setTimeout(hideProduct, 400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct() {
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} setTimeout(showProduct, 400);
	});
});