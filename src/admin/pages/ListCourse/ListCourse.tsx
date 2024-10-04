import { useState } from "react"; // Import useState
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletePopUp from "../../components/DeletePopUp";

enum Mode {
  TEST = "test",
  PRACTICE = "practice",
}

enum Status {
  DRAFT = "draft",
  ONGOING = "ongoing",
}

const generateCourses = (count: number) => {
  const courses = [];

  for (let i = 0; i < count; i++) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const course = {
      id: uuidv4(),
      name: `Course ${i + 1}`,
      mode: Math.random() > 0.5 ? Mode.TEST : Mode.PRACTICE,
      status: Math.random() > 0.5 ? Status.DRAFT : Status.ONGOING,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      lesson_quantity: Math.floor(Math.random() * 20) + 1,
    };

    courses.push(course);
  }
  return courses;
};

const ListCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(generateCourses(39));
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const coursesPerPage = 5;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOpenDeleteModal = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setCourseToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.filter(
          (course) => course.id !== courseToDelete
        );

        if (
          updatedCourses.length < (currentPage - 1) * coursesPerPage + 1 &&
          currentPage > 1
        ) {
          setCurrentPage((prev) => prev - 1);
        }

        return updatedCourses;
      });
    }
    handleCloseDeleteModal();
  };
  return (
    <CourseListContainer>
      <HeaderWrapper>
        <H1Custom>Course List</H1Custom>
        <AddButton onClick={() => navigate("/admin/courses/add")}>
          Add course
        </AddButton>
      </HeaderWrapper>
      <CourseTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Lesson Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr
              key={course.id}
              onClick={() =>
                navigate(`/admin/courses/detail/${course.id}`, {
                  state: { course },
                })
              }
            >
              <td>{course.name}</td>
              <td>{course.mode}</td>
              <td>
                <StatusButton status={course.status}>
                  {course.status}
                </StatusButton>
              </td>
              <td>{course.startDate}</td>
              <td>{course.endDate}</td>
              <td>{course.lesson_quantity}</td>
              <td>
                <ActionButtonContainer>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/courses/edit/${course.id}`, {
                        state: { course },
                      });
                    }}
                  >
                    <EditNoteIcon fontSize="small" />
                  </ActionButton>
                  <ActionButtonDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModal(course.id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      style={{ color: "red" }}
                      fontSize="small"
                    />
                  </ActionButtonDelete>
                </ActionButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </CourseTable>
      <PaginationContainer>
        <PaginationInfo>
          Showing {currentPage} of {totalPages}
        </PaginationInfo>
        <div>
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            isLeft
          >
            <KeyboardArrowLeftOutlinedIcon fontSize="small" />
          </PaginationButton>
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            isRight
          >
            <KeyboardArrowRightOutlinedIcon fontSize="small" />
          </PaginationButton>
        </div>
      </PaginationContainer>
      <DeletePopUp
        open={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this course?"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </CourseListContainer>
  );
};

export default ListCourse;

const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const AddButton = styled(Button).attrs(() => ({
  variant: "contained",
  color: "primary",
}))`
  && {
    align-self: center;
    width: 150px;
    height: 50px;

    &:focus {
      outline: none;
    }
  }
`;

const CourseTable = styled.table`
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 99%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: white;
  color: black;
  overflow: hidden;

  th,
  td {
    text-align: left;
    border-bottom: 1px solid #ddd;
    padding: 15px 12px;
    background-color: white;
    text-transform: uppercase;
  }

  th {
    &:nth-child(6) {
      text-align: center;
    }

    &:last-child {
      text-align: center;
    }

    &:nth-child(3) {
      text-align: center;
    }
  }

  td {
    &:nth-child(6) {
      text-align: center;
    }

    &:nth-child(3) {
      text-align: center;
    }

    &:last-child {
      text-align: center;
    }
  }

  th {
    background-color: #f8f9fa;
    color: #212529;
  }
  tr {
    &:hover td {
      background-color: #f1f1f1;
    }
  }
`;

const H1Custom = styled.h1`
  font-size: 32px;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d5d5d5;
  color: #000000;
  background-color: #f5f6fa;
  padding: 8px 12px;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover {
    background-color: #d4edda;
    color: #155724;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 4px;
  }

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }
`;

const ActionButtonDelete = styled(ActionButton)`
  border-radius: 0 4px 4px 0;
  background-color: #f8d7da;

  &:hover {
    background-color: #f5c6cb;
    color: #721c24;
    transform: scale(1.05);
  }
`;

const StatusButton = styled.button<{ status: Status }>`
  background-color: ${({ status }) =>
    status === Status.ONGOING ? "#cafff7" : "#FFEDDD"};
  color: ${({ status }) => (status === Status.ONGOING ? "#00B69B" : "#FFA756")};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  width: 120px;
  cursor: default;
  transition: 0.2s ease-in-out;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ status }) =>
      status === Status.ONGOING ? "#65ffe7" : "#ffd2ab"};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const PaginationButton = styled.button<{ isLeft?: boolean; isRight?: boolean }>`
  padding: 0 10px;
  border: 1px solid #d5d5d5;
  background-color: #4880ff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  border-radius: ${(props) =>
    props.isLeft ? "6px 0 0 6px" : props.isRight ? "0 6px 6px 0" : "6px"};

  &:hover {
    background-color: #3a6bbf;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  margin: 0 10px;
  font-size: 16px;
`;
