import "./App.css";
import Table from "./../table/table";
import Button from "./../button/button";
import { useReducer, useEffect } from "react";
import {
  reducer,
  initialState,
  ActionCreator,
} from "../../reducer/reducer";
import { TypeSort } from "../../const";
import axios from "axios";


type SortDirections = {
  id: string;
  name: string;
  birthday: string;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    usersList,
    loading,
    error,
    isFilterByAge,
    sortField,
    activeIndex,
    sortDirections,
  } = state;

  useEffect(() => {
    dispatch(ActionCreator.requestInit(loading));

    const loadUsersList = async () => {
      try {
        let responce = await axios(
          "https://mocki.io/v1/a0bd24a9-7d83-4b7f-997d-6193d6a3a726"
        );
        if (responce.status === 200) {
          dispatch(ActionCreator.requestSuccess(responce.data));
        }
      } catch (err) {
        console.error(err);
        dispatch(ActionCreator.requestError(loading, error));
      }
    };
    loadUsersList();
  }, []);

  const handleRowClick = (index: number) => {
    dispatch(ActionCreator.changeActiveIndex(index));
  };

  const handleCheckBoxClick = (isCheck: boolean) => {
    dispatch(ActionCreator.changeFilter(isCheck));
  };

  const handleButtonSortClick = (
    sortDirections: SortDirections,
    sortField: string
  ) => {
    dispatch(ActionCreator.changeSortField(sortField));
    dispatch(ActionCreator.changeSortDirections({ sortDirections, sortField }));
  };

  return (
    <div className="App">
      <>
        {loading ? (
          <p>идет загрузка</p>
        ) : error ? (
          <p>error</p>
        ) : (
          <>
            <Table
              usersList={usersList}
              sortDirections={sortDirections}
              field={sortField}
              isFilterByAge={isFilterByAge}
              activeIndex={activeIndex}
              handleRowClick={handleRowClick}
            />

            <Button
              handleButtonSortClick={() =>
                handleButtonSortClick(sortDirections, "id")
              }
            >
              сортировать по id по возрастанию
            </Button>
            <Button
              handleButtonSortClick={() =>
                handleButtonSortClick(sortDirections, "name")
              }
            >
              сортировать по name
              {(sortDirections.name !== TypeSort.ASCENDING)
                ? " по возрастанию"
                : " по убыванию"}
            </Button>
            <Button
              handleButtonSortClick={() =>
                handleButtonSortClick(sortDirections, "birthday")
              }
            >
              сортировать по birthday
              {(sortDirections.birthday !== TypeSort.ASCENDING)
                ? " по возрастанию"
                : " по убыванию"}
            </Button>
            <label>
              {" "}
              Старше 18 лет
              <input
                type="checkbox"
                onChange={(evt) => {
                  handleCheckBoxClick(evt.target.checked);
                }}
              />
            </label>
          </>
        )}
      </>
    </div>
  );
};

export default App;
