import { useForm } from 'react-hook-form';
import Button from '../button';

interface Props {
  onSubmitClick: (message: string) => void;
  isLoading: boolean;
}

const InputBox = ({ onSubmitClick }: Props) => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data: any) => {
    onSubmitClick(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('message')} />
      <Button label="Submit" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default InputBox;
