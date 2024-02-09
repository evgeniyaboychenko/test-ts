import './table.css';
import Tr from './../tr/tr';
import * as React from "react";
import { useState } from 'react';

type Props = {
  id: number,
  name: string,
  phone: string,
  birthday: string,
  username: string,
  email: string,
  website: string,
  // handle: () => void,
  // isActive: boolean,
}

const TypeSort = {
  DESCENDING: 'DESCENDING',
  ASCENDING: 'ASCENDING',
  DEFAULT: 'DEFAULT'
};


const sortList = (list:Props[], typeSort: string , field:string) => {
  switch (typeSort) {
    case (TypeSort.DEFAULT):
      return list;
    case (TypeSort.ASCENDING):
      return list.sort((a, b) => a[field as keyof Props] > b[field as keyof Props] ? 1 : -1);
    case (TypeSort.DESCENDING):
      return list.sort((a, b) => a[field as keyof Props] < b[field as keyof Props] ? 1 : -1);
  }
  return list;
};

const Table = (props:{usersList:Props[], typeSort: string, field: string, isFilterByAge: boolean}) => {
  const {usersList, typeSort, field , isFilterByAge}=props;
  let copyArrayList = usersList.slice();
  if(isFilterByAge) {
    copyArrayList = usersList.filter(a => a.id === 22)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>birthday</th>
          <th>phone</th>
          <th>username</th>
          <th>email</th>
          <th>website</th>
        </tr>
      </thead>
      <tbody>
        {sortList(copyArrayList, typeSort, field).map(item => 
          <Tr key = {item.id} 
            id={item.id}
            name={item.name}
            birthday={item.birthday}
            username={item.username}
            email={item.email}
            website={item.website}
            phone={item.phone}
        />)}
      </tbody>
    </table>
  );
}

export default Table;
