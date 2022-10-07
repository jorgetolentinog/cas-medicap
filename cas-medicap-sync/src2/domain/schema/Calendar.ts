export interface Calendar {
  id: string;
  startDate: string;
  endDate: string;
  isEnabled: boolean;
  companyId: string;
  officeId: string;
  serviceId: string;
  medicalAreaIds: string[];
  interestAreaIds: string[];
  professionalId: string;
  blockDurationInMinutes: number;
  conditionsOfService: {
    minAge?: number;
    maxAge?: number;
    gender?: "F" | "M";
  };
  days: {
    dayOfWeek: number;
    blocks: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
