import type { ITodo } from './Todo';

interface ICustomTextInput<
  T extends keyof Pick<ITodo, 'name' | 'description'>
> {
  id: T;
  name: string;
  value: string;
  handleChange: (id: T, value: string, valid: boolean) => void;
  validationCallback?: (value: string) => boolean;
}

const CustomTextInput = <T extends keyof Pick<ITodo, 'name' | 'description'>>({
  id,
  value,
  name,
  handleChange,
  validationCallback,
}: ICustomTextInput<T>): JSX.Element => {
  const innerHandleChange = (val: string): void => {
    let valid = true;
    if (validationCallback) {
      valid = validationCallback(val);
    }
    handleChange(id, val, valid);
  };

  return (
    <div className="flex">
      <label htmlFor={id}>{name}:</label>
      <input
        className="mx-2 border-blue-600 border-2 px-1"
        id={id}
        type="text"
        value={value}
        onChange={(e) => innerHandleChange(e.target.value)}
      ></input>
    </div>
  );
};

export default CustomTextInput;
