import "./table.css";
import Tr from "./../tr/tr";
import { TypeSort, BOUNDARY_AGE } from "../../const";
import { UserList, SortDirections, SortingField } from "../../types";

interface Props {
  usersList: UserList[];
  sortDirections: SortDirections;
  field: SortingField;
  isFilterByAge: boolean;
  activeIndex: number;
  handleRowClick: (index: number) => void;
}

const sortUserList = (
  list: UserList[],
  sortDirections: SortDirections,
  sortField: SortingField
) => {
  if (sortField !== "") {
    switch (sortDirections[sortField]) {
      case TypeSort.ASCENDING:
        return list.sort((a, b) =>
          a[sortField as keyof UserList] > b[sortField as keyof UserList]
            ? 1
            : -1
        );
      case TypeSort.DESCENDING:
        return list.sort((a, b) =>
          a[sortField as keyof UserList] < b[sortField as keyof UserList]
            ? 1
            : -1
        );
    }
  }
  return list;
};

const filterListByAge = (list: UserList[]) => {
  return list.filter((item) => {
    const now = new Date();
    const maxBirthday = now.setFullYear(now.getFullYear() - BOUNDARY_AGE);
    const diff = maxBirthday - Date.parse(item.birthday);
    if (diff > 0) {
      return true;
    };
    return false;
  });
};

const Table = (props: Props) => {
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
        {sortUserList(copyArrayList, sortDirections, field).map((item) => (
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
