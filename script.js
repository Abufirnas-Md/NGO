// Upload Food Post
async function uploadFood() {
    const data = {
        hostel: document.getElementById("hostel").value,
        foodType: document.getElementById("foodType").value,
        quantity: document.getElementById("quantity").value,
        location: document.getElementById("location").value,
        pickupTime: document.getElementById("pickupTime").value,
        image: document.getElementById("image").value
    };

    await fetch("/upload", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    alert("Food Uploaded Successfully");
}

// Razorpay Donation Payment
async function donateNow() {
    const amount = document.getElementById("amount").value;

    const order = await fetch("/donate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ amount })
    }).then(res => res.json());

    const options = {
        key: "RAZORPAY_KEY",
        amount: order.amount,
        currency: "INR",
        name: "FoodBridge Donation",
        order_id: order.id,
        handler: function () {
            alert("Donation Successful, Thank you ❤️");
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}
