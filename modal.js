export function showModal(contentHTML) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = contentHTML;
    modal.style.display = "block";

    document.getElementById("closeModal").onclick = () => {
        modal.style.display = "none";
    }

}

export function showAddModal(callback) {
    const addModal = document.getElementById("addModal");
    addModal.style.display = "block";

    document.getElementById("addEventBtn").onclick = () => {
        callback();
        addModal.style.display = "none";
        document.getElementById("newTitle").value = "";
        document.getElementById("newLocation").value = "";
    };

    document.getElementById("closeAddModal").onclick = () => {
        addModal.style.display = "none";
    }
}