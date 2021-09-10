interface Props {
  checked?: boolean;
  className?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = (props: Props) => {
  return (
    <input
      checked={props.checked}
      name={props.name}
      onChange={props.onChange}
      type="checkbox"
      className={`form-checkbox text-purple focus:outline-purple2 ` + props.className}
    />
  );
};

export default Checkbox;
