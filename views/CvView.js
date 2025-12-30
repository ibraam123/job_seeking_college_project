// views/CvView.js
const pdfViewModal = new bootstrap.Modal(document.getElementById('pdfViewModal'));
const uploadModal = document.getElementById('uploadModal');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));

export const CvView = {
    renderTable(cvs) {
        const tbody = document.getElementById('cv-table-body');
        const total = document.getElementById('total-cvs');

        tbody.innerHTML = '';

        if (!cvs.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No CVs uploaded yet
                    </td>
                </tr>`;
        } else {
            cvs.sort((a, b) => (b.isPrimary - a.isPrimary) || (b.id - a.id));

            cvs.forEach(cv => {
                const primaryIcon = cv.isPrimary ? '<i class="bi bi-star-fill text-warning ms-1" title="Primary CV"></i>' : '';
                const primaryBtn = cv.isPrimary 
                    ? `<button class="action-btn text-warning" disabled title="Already Primary">
                           <i class="bi bi-star-fill"></i>
                       </button>`
                    : `<button class="action-btn" data-action="primary" data-id="${cv.id}" title="Set as Primary">
                           <i class="bi bi-star"></i>
                       </button>`;
                
                tbody.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>
                            ${cv.name}
                            ${primaryIcon}
                        </td>
                        <td>${cv.modified}</td>
                        <td>${cv.size}</td>
                        <td><span class="badge bg-success">${cv.status}</span></td>
                        <td>
                            <button class="action-btn" data-action="view" data-id="${cv.id}" data-bs-toggle="modal" data-bs-target="#pdfViewModal" title="View PDF">
                                <i class="bi bi-eye-fill"></i>
                            </button>
                            <button class="action-btn" data-action="download" data-id="${cv.id}" title="Download">
                                <i class="bi bi-download"></i>
                            </button>
                            ${primaryBtn}
                            <button class="action-btn text-warning" data-action="edit" data-id="${cv.id}" data-bs-toggle="modal" data-bs-target="#editModal" title="Edit">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="action-btn text-danger" data-action="delete" data-id="${cv.id}" title="Delete">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                `);
            });
        }

        total.textContent = cvs.length;
    },

    showPdf(cv) {
        document.getElementById('pdfViewerFrame').src = cv.filePath;
        document.getElementById('viewCvTitle').textContent = cv.name;
        pdfViewModal.show();
    },

    showEditModal(cv) {
        document.getElementById('editCvId').value = cv.id;
        document.getElementById('editCvName').value = cv.name;
        document.getElementById('editSetPrimary').checked = cv.isPrimary;
        document.getElementById('editModalLabel').textContent = `Edit Metadata for "${cv.name}"`;
        editModal.show();
    },

    hideUploadModal() {
        bootstrap.Modal.getInstance(uploadModal).hide();
    }
};
