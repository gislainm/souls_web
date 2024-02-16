export interface TGroup {
  id: string;
  name: string;
  leader: {
    id: string;
    name: string;
    email: string;
    telephone: string;
    is_admin: boolean;
    is_group_leader: boolean;
    is_deleted: boolean;
  };
  members: string[];
  organization: string;
  meet_day: string;
  meet_time: string;
  is_deleted: boolean;
}
export interface TGroupWeekly {
  week: string;
  dates: string;
  total_attendend_members:number;
}

export interface TGroupAttendance {
  group_id: string;
  group_name: string;
  weekly_attendance_data:TGroupWeekly[];
}
