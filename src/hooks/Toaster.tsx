import { toast } from "react-toastify";

const Toaster = {
    success : (message:string) => {
        toast.success(message)
    },
    error : (message : string) => {
        toast.error(message)
    },
    info : (message : string) => {
        toast.info(message)
    },
    warning : (message : string) => {
        toast.warning(message)
    },

}

export default Toaster;