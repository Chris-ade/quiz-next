import { useSnackbar } from "notistack";

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toastSuccess = (message: string) =>
    enqueueSnackbar(message, {
      style: {
        backgroundColor: "#009B77",
        color: "#fafafa",
      },
      preventDuplicate: true,
      variant: "success",
      disableWindowBlurListener: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastError = (message: string) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "error",
      disableWindowBlurListener: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastDefault = (message: string) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "default",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  const toastWarning = (message: string) =>
    enqueueSnackbar(message, {
      preventDuplicate: true,
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });

  return { toastSuccess, toastError, toastDefault, toastWarning };
};

export { useToast };
