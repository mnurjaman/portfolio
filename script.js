let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
  document.body.appendChild(css);
};

function validateForm() {
  // Mendapatkan nilai input
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Validasi Full Name
  if (fullName === "") {
    alert("Full Name is required");
    return false;
  }

  // Validasi Email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  // Validasi Phone Number (angka saja dan harus ada)
  if (phoneNumber === "") {
    alert("Phone Number is required");
    return false;
  }

  // Validasi Subject
  if (subject === "") {
    alert("Subject is required");
    return false;
  }

  // Validasi Message
  if (message === "") {
    alert("Message is required");
    return false;
  }

  // Jika semua validasi lolos
  alert("Message sent successfully!");
  return true;
}

emailjs.init("mnurjaman035@gmail.com"); // Gantilah dengan USER ID Anda dari EmailJS

// Fungsi validasi form
function validateForm() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!fullName || !email || !phoneNumber || !subject || !message) {
    alert("All fields are required!");
    return false;
  }

  sendEmail(fullName, email, phoneNumber, subject, message);
  return false; // Mencegah reload page
}

// Fungsi untuk mengirim email menggunakan EmailJS
function sendEmail(fullName, email, phoneNumber, subject, message) {
  const templateParams = {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    subject: subject,
    message: message,
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams).then(
    function (response) {
      // Menampilkan notifikasi setelah email berhasil dikirim
      document.getElementById("notification").classList.remove("hidden");
      document.querySelector("form").reset(); // Reset form setelah sukses
    },
    function (error) {
      alert("Failed to send message: " + error);
    }
  );
}

// FILTER PROJECT
// Fungsi untuk mengatur filter
function filterSelection(category) {
  const projects = document.querySelectorAll(".project-card");

  if (category === "all") {
    // Tampilkan semua proyek
    projects.forEach((project) => {
      project.style.display = "flex";
    });
  } else {
    // Sembunyikan semua proyek
    projects.forEach((project) => {
      project.style.display = "none";
    });
    // Tampilkan hanya proyek dengan kategori yang dipilih
    projects.forEach((project) => {
      if (project.dataset.category === category) {
        project.style.display = "flex";
      }
    });
  }

  // Update tombol aktif
  const btns = document.querySelectorAll("#myBtnContainer .btn");
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`#myBtnContainer .btn[onclick*="${category}"]`).classList.add("active");
}

/// Function to show only 6 projects
function showFirstSixProjects() {
  const allProjects = document.querySelectorAll(".projects-box .project-card");
  allProjects.forEach((project, index) => {
    if (index < 6) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

// Filter functionality
const filterButtons = document.querySelectorAll(".btn"); // Perbaikan di sini
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = button.getAttribute("onclick").split("'")[1]; // Mendapatkan kategori dari onclick
    const allProjects = document.querySelectorAll(".projects-box .project-card");

    allProjects.forEach((project, index) => {
      // Show only 6 items per filter
      if (category === "all" || project.getAttribute("data-category") === category) {
        project.style.display = index < 6 ? "block" : "none"; // Tampilkan hanya 6
      } else {
        project.style.display = "none";
      }
    });
  });
});

// Initial setup to show only 6 projects on page load
showFirstSixProjects();

//

//
