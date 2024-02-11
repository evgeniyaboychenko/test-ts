import "./table.css";
import Tr from "./../tr/tr";
import * as React from "react";
import { TypeSort } from "../../const";

type UserList = {
  id: number;
  name: string;
  phone: string;
  birthday: string;
  username: string;
  email: string;
  website: string;
};

type SortDirections = {
  id: string;
  name: string;
  birthday: string;
};

const sortList = (
  list: UserList[],
  sortDirections: SortDirections,
  sortField: "id" | "name" | "birthday"
) => {
  switch (sortDirections[sortField]) {
    case TypeSort.ASCENDING:
      return list.sort((a, b) =>
        a[sortField as keyof UserList] > b[sortField as keyof UserList] ? 1 : -1
      );
    case TypeSort.DESCENDING:
      return list.sort((a, b) =>
        a[sortField as keyof UserList] < b[sortField as keyof UserList] ? 1 : -1
      );
  }
  return list;
};

const filterListByAge = (list: UserList[]) => {
  return list.filter((item) => {
    const now = new Date();
    const year = now.getFullYear() - 18;
    const t = now.setFullYear(year);
    const diff = t - Date.parse(item.birthday);
    if (diff > 0) return item.birthday;
    else return null;
  });
};

const Table = (props: {
  usersList: UserList[];
  sortDirections: SortDirections;
  field: "id" | "name" | "birthday";
  isFilterByAge: boolean;
  activeIndex: number;
  handleRowClick: any;
}) => {
  const {
    usersList,
    sortDirections,
    field,
    isFilterByAge,
    handleRowClick,
    activeIndex,
  } = props;
  let copyArrayList = usersList.slice();
  if (isFilterByAge) {
    copyArrayList = filterListByAge(copyArrayList);
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
        {sortList(copyArrayList, sortDirections, field).map((item) => (
          <Tr
            key={item.id}
            id={item.id}
            name={item.name}
            birthday={item.birthday}
            username={item.username}
            email={item.email}
            website={item.website}
            phone={item.phone}
            activeIndex={activeIndex}
            handleRowClick={handleRowClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
