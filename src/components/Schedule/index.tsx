import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
	AppointmentModel,
	ViewState,
	SchedulerDateTime,
} from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	DayView,
	Appointments,
	Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Container } from "./styles";

const appointments: Array<AppointmentModel> = [
	{
		startDate: "2020-11-08T07:00",
		endDate: "2020-11-08T08:00",
		title: "Spanish class",
		type: "class",
	},
	{
		startDate: "2020-11-08T09:00",
		endDate: "2020-11-08T12:00",
		title: "Lecture",
		type: "lecture",
	},
	{
		startDate: "2020-11-08T12:00",
		endDate: "2020-11-08T13:00",
		title: "Lunch",
		type: "lunch",
	},
	{
		startDate: "2020-11-08T13:00",
		endDate: "2020-11-08T16:00",
		title: "Lecture",
		type: "lecture",
	},
	{
		startDate: "2020-11-08T17:00",
		endDate: "2020-11-08T21:00",
		title: "Working on project 1",
		type: "project",
	},
];
const resources = [
	{
		fieldName: "type",
		title: "Type",
		instances: [
			{ id: "class", text: "Class", color: "#00695C" },
			{ id: "project", text: "Project", color: "#F58689" },
			{ id: "lecture", text: "Lecture", color: "rgba(51, 171, 126, 0.65)" },
			{ id: "lunch", text: "Lunch", color: "#00965E" },
		],
	},
];

const Schedule = () => {
	const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(
		"2020-11-08"
	);

	return (
		<Container>
			<p>Today's schedule</p>
			<Paper
				style={{
					maxHeight: 800,
					overflowY: "scroll",
				}}
			>
				<Scheduler data={appointments}>
					<ViewState
						currentDate={currentDate}
						onCurrentDateChange={setCurrentDate}
					/>
					<DayView startDayHour={7} endDayHour={21} />

					<Appointments />
					<Resources data={resources} />
				</Scheduler>
			</Paper>
		</Container>
	);
};

export default Schedule;
