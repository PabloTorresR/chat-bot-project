import { useForm } from 'react-hook-form';
import Button from '../button';
import styles from './styles.module.scss';
interface Props {
  onSubmitClick: (message: string) => void;
  isLoading: boolean;
}
const PLACEHOLDER = 'Type a message...';

const InputBox = ({ onSubmitClick }: Props) => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data: any) => {
    onSubmitClick(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputBox}>
      <textarea {...register('message')} placeholder={PLACEHOLDER} />
      <Button label="Submit" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default InputBox;
