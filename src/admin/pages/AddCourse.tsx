import { useForm, useFieldArray, Controller } from 'react-hook-form';
import styled from 'styled-components';

// Define Types for Course and Lesson
type Lesson = {
  type: 'word' | 'sentence' | 'paragraph' | 'speaking';
  content: string;
  audio_url: string;
};

type Course = {
  name: string;
  mode: 'test' | 'practice';
  start_date: Date;
  end_date: Date;
  status: 'draft' | 'ongoing';
  lessons: Lesson[];
};

export const CourseForm = () => {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<Course>({
    defaultValues: {
      lessons: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lessons'
  });

  const onSubmit = (data: Course) => {
    console.log('Course Data:', data);
    reset(); 
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Title>Add Course</Title>

      <FieldWrapper>
        <Label>Course Name</Label>
        <Input
          {...register('name', { required: 'Course name is required' })}
          error={!!errors.name}
        />
        <ErrorMessage>{errors.name && errors.name.message}</ErrorMessage>
      </FieldWrapper>

      <FieldWrapper>
        <Label>Mode</Label>
        <Controller
          name="mode"
          control={control}
          defaultValue="test"
          render={({ field }) => (
            <Select {...field}>
              <option value="test">Test</option>
              <option value="practice">Practice</option>
            </Select>
          )}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Start Date</Label>
        <Input
          type="date"
          {...register('start_date', { required: 'Start date is required' })}
        />
        <ErrorMessage>{errors.start_date && errors.start_date.message}</ErrorMessage>
      </FieldWrapper>

      <FieldWrapper>
        <Label>End Date</Label>
        <Input
          type="date"
          {...register('end_date', { required: 'End date is required' })}
        />
        <ErrorMessage>{errors.end_date && errors.end_date.message}</ErrorMessage>
      </FieldWrapper>

      <FieldWrapper>
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          defaultValue="draft"
          render={({ field }) => (
            <Select {...field}>
              <option value="draft">Draft</option>
              <option value="ongoing">Ongoing</option>
            </Select>
          )}
        />
      </FieldWrapper>

      {/* Dynamic Lesson Fields */}
      <Title>Lessons</Title>
      {fields.map((lesson, index) => (
        <LessonWrapper key={lesson.id}>
          <FieldWrapper>
            <Label>Lesson Type</Label>
            <Controller
              name={`lessons.${index}.type`}
              control={control}
              defaultValue="word"
              render={({ field }) => (
                <Select {...field}>
                  <option value="word">Word</option>
                  <option value="sentence">Sentence</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="speaking">Speaking</option>
                </Select>
              )}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Content</Label>
            <Input
              {...register(`lessons.${index}.content`, { required: 'Content is required' })}
              error={!!errors.lessons?.[index]?.content}
            />
            <ErrorMessage>{errors.lessons?.[index]?.content?.message || ''}</ErrorMessage>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Audio URL</Label>
            <Input
              {...register(`lessons.${index}.audio_url`, { required: 'Audio URL is required' })}
              error={!!errors.lessons?.[index]?.audio_url}
            />
            <ErrorMessage>{errors.lessons?.[index]?.audio_url?.message || ''}</ErrorMessage>
          </FieldWrapper>

          <RemoveButton type="button" onClick={() => remove(index)}>Remove Lesson</RemoveButton>
        </LessonWrapper>
      ))}

      <AddButton type="button" onClick={() => append({ type: 'word', content: '', audio_url: '' })}>
        Add Lesson
      </AddButton>

      <SubmitButton type="submit">Submit</SubmitButton>
    </FormWrapper>
  );
};


const FormWrapper = styled.form`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input<{ error?: boolean }>`
  padding: 10px;
  border: 1px solid ${props => props.error ? 'red' : '#ccc'};
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const LessonWrapper = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #4880ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #3b6dc3;
  }
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc3c3c;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;
