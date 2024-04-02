import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { TGroupAttendance } from "../Types/group";

const TableRowAtt = ({
  attendance_counts,
  week,
  year,
}: {
  attendance_counts: TGroupAttendance[];
  week: number;
  year: number;
}) => {
  const getWeekRange = (year: number, week: number) => {
    let startDate = new Date(year, 0, 1);
    startDate.setDate(
      startDate.getDate() + (week - 1) * 7 - startDate.getDay() + 1
    );
    let endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    let startDateFormatted =
      ("0" + (startDate.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + startDate.getDate()).slice(-2);
    let endDateFormatted =
      ("0" + (endDate.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + endDate.getDate()).slice(-2);

    return startDateFormatted + "-" + endDateFormatted;
  };
  let weeksRange = getWeekRange(year, week);
  let total = 0;
  return (
    <Tr>
      <Td fontSize={14}>{`week-${week}: ${weeksRange}`}</Td>
      {attendance_counts.map((group, index) => {
        let result = group.weekly_attendance_data.find(
          (item) => item.week === week
        );
        if (result) {
          total += result.total_attendend_members;
          return (
            <Td isNumeric key={index} fontSize={14}>
              {result.total_attendend_members}
            </Td>
          );
        } else {
          return (
            <Td isNumeric fontSize={14}>
              0
            </Td>
          );
        }
      })}
      <Td isNumeric fontWeight={600} fontSize={20}>
        {total}
      </Td>
    </Tr>
  );
};

export default TableRowAtt;
