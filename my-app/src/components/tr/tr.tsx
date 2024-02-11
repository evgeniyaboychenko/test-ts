import "./tr.css";

type Props = {
  id: number;
  name: string;
  phone: string;
  birthday: string;
  username: string;
  email: string;
  website: string;
  activeIndex: number;
  handleRowClick: (index: number) => void;
};

const Tr = (props: Props) => {
  const { id, name, phone, birthday, username, email, website, activeIndex } =
    props;
  return (
    <tr
      className={`table__row ${id === activeIndex ? "is-active" : ""}`}
      onClick={() => {
        props.handleRowClick(id);
      }}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{birthday}</td>
      <td>{phone}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{website}</td>
    </tr>
  );
};

export default Tr;
