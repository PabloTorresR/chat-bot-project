import { FieldValues, useForm } from 'react-hook-form';
import Button from '../button';
import styles from './styles.module.scss';
interface Props {
  onSubmitClick: (message: string) => void;
  isLoading: boolean;
}
const PLACEHOLDER = 'Type a message...';

const InputBox = ({ onSubmitClick }: Props) => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data: FieldValues) => {
    if (!data.message) {
      return;
    }
    onSubmitClick(data.message);
    reset();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputBox}>
      <textarea {...register('message')} placeholder={PLACEHOLDER} onKeyDown={handleKeyDown} />
      <Button label="Submit" type="submit" classNames={styles.inputBox__button}>
        Submit
      </Button>
    </form>
  );
};

export default InputBox;
