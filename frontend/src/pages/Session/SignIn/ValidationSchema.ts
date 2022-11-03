import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .email("El correo no tiene un formato válido")
    .required("Requerido"),
  password: Yup.string()
    .required("Requerido")
    .max(25, "Debe de tener 25 caracteres o menos"),
});
