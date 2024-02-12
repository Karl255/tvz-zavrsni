import { httpClient } from "./httpClient";

const endpoint = "/api/transactionLabels";

export const transactionLabelApi = {
	create: async (transactionId: number, labelId: number) => await httpClient.post(endpoint, { transactionId, labelId }),
};
