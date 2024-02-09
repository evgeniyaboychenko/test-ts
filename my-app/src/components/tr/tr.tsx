import { useState } from 'react';
import './tr.css';

type Props = {
  id: number,
  name: string,
  phone: string,
  birthday: string,
  username: string,
  email: string,
  website: string,
}

const Tr = (props:Props) => {
  const [isActive, setActive] = useState(false);
  
  function handleClick(isActive:boolean) {
    setActive(!isActive);
  }

  return (
      <tr className={`table__row ${isActive? 'is-active': ''}`}  onClick={()=> {handleClick(isActive)}}>
          <td>{props.id}</td>
          <td>{props.name}</td>
          <td>{props.birthday}</td>
          <td>{props.phone}</td>
          <td>{props.username}</td>
          <td>{props.email}</td>
          <td>{props.website}</td>
      </tr>
  );
}

export default Tr;
