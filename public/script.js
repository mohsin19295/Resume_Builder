function submitForm() {
  var summary = document.getElementById("summary").value;
  var fullName = document.getElementById("name").value;
  var position = document.getElementById("position").value;
  var city = document.getElementById("city").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var github = document.getElementById("github").value;
  var linkedin = document.getElementById("linkedin").value;
  var qualification = document.getElementById("qualification").value;
  var universityName = document.getElementById("university_name").value;
  var qualificationCity = document.getElementById("qualification_city").value;
  var passoutYear = document.getElementById("passout_year").value;
  var experience = document.getElementById("experience").value;
  var skills = document.getElementById("skills").value;
  var softSkills = document.getElementById("softSkills").value;
  var interest = document.getElementById("interest").value;
  var image = document.getElementById("image").files[0];

  var resumeData = new FormData();
  resumeData.append("summary", summary);
  resumeData.append("fullName", fullName);
  resumeData.append("position", position);
  resumeData.append("city", city);
  resumeData.append("email", email);
  resumeData.append("number", number);
  resumeData.append("github", github);
  resumeData.append("linkedin", linkedin);
  resumeData.append("qualification", qualification);
  resumeData.append("universityName", universityName);
  resumeData.append("qualificationCity", qualificationCity);
  resumeData.append("passoutYear", passoutYear);
  resumeData.append("experience", experience);
  resumeData.append("skills", skills);
  resumeData.append("softSkills", softSkills);
  resumeData.append("interest", interest);
  resumeData.append("image", image);

  fetch("/submit-form", {
    method: "POST",
    body: resumeData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Form submitted successfully!");
        fetchResumeData();
      } else {
        alert("Form submission failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function fetchResumeData() {
  document.getElementById("resume-container").style.display = "flex";

  fetch("/resume-data")
    .then((response) => response.json())
    .then((data) => {
      // Getting all HTML elements
      console.log(data);

      data.forEach(function (formEntry) {
        document.getElementById("resume_summary").innerHTML = formEntry.summary;
        document.getElementById("resume_fullName").innerHTML =
          formEntry.fullName;
        document.getElementById("resume_position").innerHTML =
          formEntry.position;
        document.getElementById("resume_city").innerHTML = formEntry.city;
        document.getElementById("resume_email").innerHTML = formEntry.email;
        document.getElementById("resume_number").innerHTML = formEntry.number;
        document.getElementById("resume_linkedin").innerHTML =
          formEntry.linkedin;
        document.getElementById("resume_github").innerHTML = formEntry.github;
        document.getElementById("resume_qualification").innerHTML =
          formEntry.qualification;
        document.getElementById("resume_qualification_details").innerHTML =
          formEntry.universityName + ",";
        document.getElementById("resume_qualification_city").innerHTML =
          formEntry.qualificationCity + ",";
        document.getElementById("resume_qualification_year").innerHTML =
          formEntry.passoutYear;
        document.getElementById("resume_skills").innerHTML = formEntry.skills;
        document.getElementById("resume_softSkills").innerHTML =
          formEntry.softSkills;
        document.getElementById("resume_interest").innerHTML =
          formEntry.interest;
        document.getElementById("resume_img").src = "/uploads/" + formEntry.image;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
fetchResumeData();

// Download as a pdf

window.onload = () => {
  document.getElementById("download").addEventListener("click", () => {
    const resume = this.document.getElementById("resume-container");
    var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(resume).set(opt).save();
  });
};
