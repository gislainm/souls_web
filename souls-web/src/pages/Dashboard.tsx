import React, { useState, useEffect } from "react";
import {
  Container,
  TableContainer,
  Table,
  TableCaption,
  Heading,
  Thead,
  Tr,
  Th,
  Tbody,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import useAuth from "../hooks/useAuth";
import TableRowAtt from "../components/TableRowAtt";
import { TGroupAttendance } from "../Types/group";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Dashboard() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const [attendanceCount, setAttendanceCount] = useState<TGroupAttendance[]>(
    []
  );
  
  useEffect(() => {
    let isMounted = true;
    const apiController = new AbortController();
    const fetchAttendance = async () => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          `organization/${auth?.organization.id}/get-attendance-record/${currentYear}`,
          {
            signal: apiController.signal,
          }
        );
        isMounted && setAttendanceCount(response.data?.attendance_counts);
      } catch (error: any) {
        if (error.message !== "canceled") {
          toast({
            title: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    };
    fetchAttendance();
    return () => {
      isMounted = false;
      apiController.abort();
    };
    // eslint-disable-next-line
  }, []);

  const weekPassed = () => {
    const now: any = new Date();
    const startOfYear: any = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksPassed = Math.floor(diff / oneWeek);
    return weeksPassed;
  };
  const weeksPassedInYear = weekPassed() + 1;
  return (
    <Container maxW="8xl">
      {attendanceCount.length > 0 && (
        <TableContainer
          className="mt-32 pt-6 pb-12 mx-auto px-4 sm:px-6"
          borderWidth="2px"
          borderRadius="md"
          borderColor="table.100"
        >
          <Table variant="striped" colorScheme="table" size="sm">
            <TableCaption placement="top">
              <Heading color="browner">{`${auth?.organization.name} ${currentYear} attendance`}</Heading>
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12}>Dates</Th>
                {attendanceCount.map((item, index) => {
                  return (
                    <Th key={index} isNumeric fontSize={12}>
                      {item.group_name}
                    </Th>
                  );
                })}
                <Th color="#008C95" isNumeric fontSize={12}>
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: weeksPassedInYear }, (x, i) => i + 1).map(
                (num) => {
                  return (
                    <TableRowAtt
                      key={num}
                      year={currentYear}
                      week={num}
                      attendance_counts={attendanceCount}
                    />
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {!(attendanceCount.length > 0) && (
        <div className="relative max-w-6xl  pt-20 mx-auto px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-[#115554] mb-4">
                Not enough data available yet
              </h2>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Dashboard;
