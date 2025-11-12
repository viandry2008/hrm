import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { RegisterTrialRequest, RegisterTrialResponse } from "./trial.types";

export const trialRegisterApi = async (payload: RegisterTrialRequest): Promise<RegisterTrialResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.TRIAL_REGISTER, payload);
    return data;
};
