import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const confirmDelete = async (id, modalMessage = 'You want to delete this message!') => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: modalMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: false,
        customClass: {
            confirmButton: "btn btn-success m-1",
            cancelButton: "btn btn-danger m-1"
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Swal.fire({
            //     title: "Deleted!",
            //     text: "Delete Successfully.",
            //     icon: "success",
            //     customClass: {
            //         confirmButton: "btn btn-success",
            //     }
            // });
            return { confirmed: true, id };
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Swal.fire({
            //     title: "Cancelled!",
            //     text: "Your imaginary file is safe :)",
            //     icon: "error",
            //     customClass: {
            //         confirmButton: "btn btn-danger",
            //     }
            // });
            return { confirmed: false };
        }
    });
};