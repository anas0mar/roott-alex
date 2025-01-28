const productsData = {
    "ROOTT R": ["R3010", "R3012", "R3014", "R3016"],
    "ROOTT C COMPRESSIVE": ["C3006", "C3008", "C3010"],
    "ROOTT M": ["C3006M", "C3008M", "C3010M"]
};

let orderItemCount = 0;

function addProduct() {
    orderItemCount++;

    const orderItemsContainer = document.getElementById("order-items");
    const orderItemDiv = document.createElement("div");
    orderItemDiv.classList.add("order-item");

    const productSelect = document.createElement("select");
    productSelect.name = `product-${orderItemCount}`;
    Object.keys(productsData).forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        option.innerText = product;
        productSelect.appendChild(option);
    });

    const sizeSelect = document.createElement("select");
    sizeSelect.name = `size-${orderItemCount}`;
    productSelect.addEventListener("change", function () {
        const selectedProduct = this.value;
        sizeSelect.innerHTML = "";
        productsData[selectedProduct].forEach(size => {
            const sizeOption = document.createElement("option");
            sizeOption.value = size;
            sizeOption.innerText = size;
            sizeSelect.appendChild(sizeOption);
        });
    });
    productSelect.dispatchEvent(new Event("change"));

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.placeholder = "العدد";

    const removeButton = document.createElement("button");
    removeButton.innerText = "إزالة";
    removeButton.onclick = function () {
        orderItemDiv.remove();
    };

    orderItemDiv.appendChild(productSelect);
    orderItemDiv.appendChild(sizeSelect);
    orderItemDiv.appendChild(quantityInput);
    orderItemDiv.appendChild(removeButton);
    orderItemsContainer.appendChild(orderItemDiv);
}

function generateWhatsappLink() {
    const name = document.getElementById("customer-name").value;
    const email = document.getElementById("customer-email").value;
    const address = document.getElementById("customer-address").value;
    const notes = document.getElementById("order-notes").value;

    if (!name || !email || !address) {
        alert("الرجاء ملء جميع الحقول المطلوبة");
        return;
    }

    const orderItemsContainer = document.getElementById("order-items");
    const orderItemDivs = orderItemsContainer.getElementsByClassName("order-item");
    if (orderItemDivs.length === 0) {
        alert("الرجاء إضافة منتج واحد على الأقل");
        return;
    }

    let orderDetails = "";
    for (let itemDiv of orderItemDivs) {
        const product = itemDiv.querySelector("select[name^='product']").value;
        const size = itemDiv.querySelector("select[name^='size']").value;
        const quantity = itemDiv.querySelector("input").value;
        if (!product || !size || !quantity) {
            alert("الرجاء ملء جميع التفاصيل لكل منتج");
            return;
        }
        orderDetails += `${product} - ${size} - ${quantity}\n`;
    }

    const message = `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالعنوان: ${address}\n\nالمنتجات:\n${orderDetails}\nملاحظات: ${notes}`;
    const whatsappLink = `https://wa.me/201099331401?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
}

function openOrderForm() {
    document.getElementById("order-form").style.display = "block";
}

function changeLanguage(language) {
    const translations = {
        ar: {
            "site-title": "Roott Implant System",
            "branch-title": "فرع إسكندرية",
            "order-title": "لطلب الأوردر، اضغط هنا:",
            "add-product-button": "إضافة منتج",
            "submit-button": "إرسال الطلب"
        },
        en: {
            "site-title": "Roott Implant System",
            "branch-title": "Alexandria Branch",
            "order-title": "To place an order, click here:",
            "add-product-button": "Add Product",
            "submit-button": "Submit Order"
        }
    };

    const elements = translations[language];
    for (const id in elements) {
        document.getElementById(id).innerText = elements[id];
    }
}
