import axios from "axios";

export const getInvoices = async () => {
  const response = await axios.get(
    "https://68ca7f27430c4476c349b61c.mockapi.io/api/v1/invoices"
  );
  return response.data;
};
