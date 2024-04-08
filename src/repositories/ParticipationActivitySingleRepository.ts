import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { userActions } from "../store/slices/user.slice";
import { ParticipationActivity } from "../core/interfaces/participationActivity/participationActivity.interface";
import { PREFIX } from "../helpers/API";
import { ActivityName } from "../core/interfaces/activities/activityName.interface";
import { ActivityNamesBaseResponse } from "../core/interfaces/activities/activityNamesBaseResponse.interface";
import { ParticipationActivityBaseResponse } from "../core/interfaces/participationActivity/participationActivityBaseResponse.interface";
import { ParticipationActivityTable } from "../core/interfaces/participationActivity/participationActivityTable.interface";

export class ParticipationActivityRepository {
    private jwt: string | null;
    private dispatch: AppDispatch;
    private navigate: any;

    constructor() {
        this.jwt = useSelector((s: RootState) => s.user.jwt);
        this.dispatch = useDispatch<AppDispatch>();
        this.navigate = useNavigate();
    }

    private async authorizedRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axios.request<T>({
                url,
                ...config,
                headers: {
                    'Authorization': `Bearer ${this.jwt}`,
                    ...(config?.headers || {})
                }
            });
            return response.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                this.handleRequestError(e);
            }
        }
    }

    private handleRequestError(error: AxiosError) {
        if (error.response?.status === 401) {
            this.dispatch(userActions.logout());
            this.navigate('/auth/login');
        }
    }

    public async getParticipationActivity(id: string | undefined): Promise<ParticipationActivity | undefined> {
        return this.authorizedRequest<ParticipationActivity>(`${PREFIX}/ParticipationActivity/${id}`);
    }

    public async getParticipationActivities(): Promise<ParticipationActivityTable[] | undefined> {
        const data = await this.authorizedRequest<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`)
        return data?.entities;
	};

    public async getActivityNames(): Promise<ActivityName[] | undefined> {
        const data = await this.authorizedRequest<ActivityNamesBaseResponse>(`${PREFIX}/Activity/list/names`);
        return data?.entities;
    }

    public async saveParticipationActivity(participationActivity: ParticipationActivity): Promise<void> {
        await this.authorizedRequest<void>(`${PREFIX}/ParticipationActivity`, {
            method: 'PUT',
            data: {
                id: participationActivity?.id,
                result: participationActivity?.result,
                date: participationActivity?.date,
                description: participationActivity?.description,
                fileId: participationActivity?.document?.id,
                activityId: participationActivity?.activity?.id
            }
        });
    }

    public async submitParticipationActivity(id: string): Promise<void> {
        await this.authorizedRequest<void>(`${PREFIX}/ParticipationActivity/Submit`, {
            method: 'POST',
            data: { id }
        });
    }

    public async sendRevisionParticipationActivity(id: string): Promise<void> {
        await this.authorizedRequest<void>(`${PREFIX}/ParticipationActivity/SendRevision`, {
            method: 'POST',
            data: { id }
        });
    }

    public async confirmParticipationActivity(id: string): Promise<void> {
        await this.authorizedRequest<void>(`${PREFIX}/ParticipationActivity/Confirm`, {
            method: 'POST',
            data: { id }
        });
    }

    public async addParticipationActivity() {
		try {
			const {data} = await axios.post(`${PREFIX}/ParticipationActivity`, {}, {
				headers: {
					'Authorization': `Bearer ${this.jwt}`
				}
			});

			this.navigate(`/participationActivities/${data.participationActivityId}`);

		} catch (e) {
			if (e instanceof AxiosError) {
                this.handleRequestError(e);
            }
		}
	};
}