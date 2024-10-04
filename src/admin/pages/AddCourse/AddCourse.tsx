import { Input, Select, MenuItem, Button } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { LessonType } from "../../../types/LessonType";

type Course = {
  CourseName: string;
  Mode: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  course_id: string;
  type: LessonType;
  content: string;
  audio_url: string;
  created_at: string;
  updated_at: string;
};

function AddCourse() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      Mode: "test",
      Status: "draft",
      lessons: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const onSubmit = (data: Course) => {
    console.log("Course Data:", data);
  };

  return (
    <Container>
      <Title>Add New Course</Title>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <RowContainer>
          <ContentContainer>
            <label htmlFor="CourseName">Course Name</label>
            <Controller
              control={control}
              name="CourseName"
              rules={{ required: "Course name is required" }}
              render={({ field }) => (
                <Input
                  fullWidth
                  placeholder="Name of the course"
                  {...field}
                  error={!!errors.CourseName}
                />
              )}
            />
            <ErrorMessage>
              {errors.CourseName && errors.CourseName.message}
            </ErrorMessage>
          </ContentContainer>

          <ContentContainer>
            <label htmlFor="Mode">Mode</label>
            <Controller
              control={control}
              name="Mode"
              render={({ field }) => (
                <Select fullWidth {...field}>
                  <MenuItem value="test">Test</MenuItem>
                  <MenuItem value="practice">Practice</MenuItem>
                </Select>
              )}
            />
          </ContentContainer>
        </RowContainer>

        <RowContainer>
          <ContentContainer>
            <label htmlFor="StartDate">Start Date</label>
            <Controller
              control={control}
              name="StartDate"
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <Input
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors.StartDate}
                />
              )}
            />
            <ErrorMessage>
              {errors.StartDate && errors.StartDate.message}
            </ErrorMessage>
          </ContentContainer>

          <ContentContainer>
            <label htmlFor="EndDate">End Date</label>
            <Controller
              control={control}
              name="EndDate"
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <Input
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors.EndDate}
                />
              )}
            />
            <ErrorMessage>
              {errors.EndDate && errors.EndDate.message}
            </ErrorMessage>
          </ContentContainer>
        </RowContainer>

        <ContentContainer>
          <label htmlFor="Status">Status</label>
          <Controller
            control={control}
            name="Status"
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="draft">Draft</MenuItem>
                {/* <MenuItem value="ongoing">Ongoing</MenuItem> */}
              </Select>
            )}
          />
        </ContentContainer>
        <LessonSection>
          <SectionTitle>Lessons</SectionTitle>
          {fields.map((lesson, index) => (
            <LessonWrapper key={lesson.id}>
              <FieldRow>
                <ContentContainer>
                  <label>Lesson Type</label>
                  <Controller
                    name={`lessons.${index}.type`}
                    control={control}
                    defaultValue={LessonType.WORD}
                    render={({ field }) => (
                      <Select {...field} fullWidth>
                        <MenuItem value={LessonType.WORD}>Word</MenuItem>
                        <MenuItem value={LessonType.SENTENCE}>
                          Sentence
                        </MenuItem>
                        <MenuItem value={LessonType.PARAGRAPH}>
                          Paragraph
                        </MenuItem>
                        <MenuItem value={LessonType.SPEAKING

                        }>
                          Speaking
                        </MenuItem>
                      </Select>
                    )}
                  />
                </ContentContainer>

                <ContentContainer>
                  <label>Content</label>
                  <Controller
                    name={`lessons.${index}.content`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter lesson content"
                        fullWidth
                      />
                    )}
                  />
                </ContentContainer>
              </FieldRow>

              <FieldRow>
                <ContentContainer>
                  <label>Audio URL</label>
                  <Controller
                    name={`lessons.${index}.audio_url`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="file"
                        inputProps={{ accept: "audio/*" }}
                        fullWidth
                      />
                    )}
                  />
                </ContentContainer>

                <RemoveButton onClick={() => remove(index)}>
                  Remove Lesson
                </RemoveButton>
              </FieldRow>
            </LessonWrapper>
          ))}

          <AddButton
            onClick={() =>
              append({
                id: uuidv4(),
                course_id: "",
                type: LessonType.WORD,
                content: "",
                audio_url: "",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            }
          >
            Add Lesson
          </AddButton>
        </LessonSection>
        <SubmitButton type="submit">Add Course</SubmitButton>
      </FormWrapper>
    </Container>
  );
}

export default AddCourse;

const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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

const AddButton = styled(Button)`
  && {
    margin-top: 10px;
    padding: 10px;
    align-self: flex-start;
    background-color: #59dd59;
    color: white;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #26a226;
      transform: scale(1.05);
    }
  }
`;

const RemoveButton = styled(Button)`
  && {
    background-color: #ff4d4d;
    color: white;
    margin-top: 10px;
    align-self: flex-start;

    &:hover {
      background-color: #cc3c3c;
      transform: scale(1.05);
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const SubmitButton = styled(Button).attrs(() => ({
  variant: "contained",
  color: "primary",
}))`
  && {
    margin-top: 20px;
    align-self: center;
    width: 180px;
    height: 50px;
  }
`;