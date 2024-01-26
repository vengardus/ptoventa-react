import Swal from "sweetalert2";

export const modalAlert = ({ type = "delete", text }) => {
    const config = {
        title: "Desea eliminar registro?",
        text: "Una vez elimninado, no podrá recuperarlo.",
        icon: "warning",
        confirmButtonText: "Eliminar",
        toast: false,
        timer: undefined,
        showCancelButton: true,
    };

    switch (type) {
        case "delete":
            break;
        case "info":
            return Swal.fire({
                title: "",
                text: text,
                icon: "success",
            });
        case "warning":
            return Swal.fire({
                title: "",
                text: text,
                icon: "warning",
            });
        case "infoTimer":
            return Swal.fire({
                title: "",
                text: text,
                icon: "success",
                toast: true,
                timer: 2000,
            });
    }

    return Swal.fire({
        title: config.title,
        text: config.text,
        icon: config.icon,
        showCancelButton: config.showCancelButton,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: config.confirmButtonText,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        toast: config.toast,
        timer: config.timer,
    });
};
