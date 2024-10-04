import { Button } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeletePopUp from "../../components/DeletePopUp";

function CourseDetail() {
  const location = useLocation();
  const course = location.state?.course;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  useEffect(() => {
    console.log(course);

    if (!course) {
      console.error("Course not found");
    }
  }, [course]);

  if (!course) {
    return <p>Course not found</p>;
  }

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
      //
      navigate("/admin/courses/all");
    }
    handleCloseDeleteModal();
  };

  return (
    <Container>
      <HeaderWrapper>
        <Title>Course Detail</Title>
        <Action>
          <RemoveButton onClick={() => handleOpenDeleteModal(course.id)}>
            Remove
          </RemoveButton>
          <EditButton
            onClick={() =>
              navigate(`/admin/courses/edit/${course.id}`, {
                state: { course },
              })
            }
          >
            Edit
          </EditButton>
        </Action>
      </HeaderWrapper>
      <DetailWrapper>
        <RowContainer>
          <ContentContainer>
            <label>Course Name</label>
            <DataText>{course.name}</DataText>
          </ContentContainer>

          <ContentContainer>
            <label>Mode</label>
            <DataText>{course.mode}</DataText>
          </ContentContainer>
        </RowContainer>

        <RowContainer>
          <ContentContainer>
            <label>Start Date</label>
            <DataText>{course.startDate}</DataText>
          </ContentContainer>

          <ContentContainer>
            <label>End Date</label>
            <DataText>{course.endDate}</DataText>
          </ContentContainer>
        </RowContainer>

        <ContentContainer>
          <label>Status</label>
          <DataText>{course.status}</DataText>
        </ContentContainer>

        <LessonSection>
          <SectionTitle>Lessons</SectionTitle>
          {course.lesson_quantity > 0 ? (
            Array.from({ length: course.lesson_quantity }).map((_, index) => (
              <LessonWrapper key={index}>
                <FieldRow>
                  <ContentContainer>
                    <label>Lesson Type</label>
                    <DataText>Placeholder Lesson Type {index + 1}</DataText>
                  </ContentContainer>

                  <ContentContainer>
                    <label>Content</label>
                    <DataText>Placeholder Content {index + 1}</DataText>
                  </ContentContainer>
                </FieldRow>

                <FieldRow>
                  <ContentContainer>
                    <label>Audio URL</label>
                    <DataText>No audio available</DataText>
                  </ContentContainer>
                </FieldRow>
              </LessonWrapper>
            ))
          ) : (
            <p>No lessons available for this course.</p>
          )}
        </LessonSection>
      </DetailWrapper>
      <DeletePopUp
        open={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this course?"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}

export default CourseDetail;

const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 20px;
`;

const LessonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  color: #444;
`;

const LessonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
`;

const RemoveButton = styled(Button)`
  && {
    background-color: #ff4d4d;
    color: white;
    margin-top: 10px;
    margin-right: 5px;
    align-self: flex-start;
    outline: none;

    &:hover {
      background-color: #cc3c3c;
      transform: scale(1.05);
    }
  }
`;

const EditButton = styled(Button)`
  && {
    background-color: #68cf68;
    color: white;
    margin-top: 10px;
    align-self: flex-start;
    outline: none;

    &:hover {
      background-color: #54ba54;
      transform: scale(1.05);
    }
  }
`;

const DataText = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;
