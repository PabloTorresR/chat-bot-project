import { Form, useForm } from 'react-hook-form';
import Button from '../button';

interface Props {
  onSendMessage: (message: string) => void;
}

const InputBox = ({ onSendMessage }: Props) => {
  const form = useForm();

  const onSubmit = (data: any) => {
    onSendMessage(data.bio);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button label="Submit" type="submit" onClick={() => {}}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default InputBox;
