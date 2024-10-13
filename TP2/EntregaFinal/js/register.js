const form = document.querySelector(".form");
const popover = document.querySelector("#id_popover");
const popoverBtnClose = document.querySelector("#id_popover_btn");

function supportsPopover() {
  console.log(
    "supportsPopover",
    HTMLElement.prototype.hasOwnProperty("popover")
  );
}

const onFormSubmit = (event) => {
  event.preventDefault();
  popover.classList.remove("inactive");
  popover.classList.add("active");
  popover.showPopover();
  popover.open = true;
};

function closePopover(event) {
  event.preventDefault();
  popover.classList.remove("active");
  popover.classList.add("inactive");
  setTimeout(() => {
    popover.hidePopover();
    window.location.href = "../index.html";
  }, 500);
}

if (form && popover && popoverBtnClose) {
  form.addEventListener("submit", onFormSubmit);
  popoverBtnClose.addEventListener("submit", closePopover);
}
