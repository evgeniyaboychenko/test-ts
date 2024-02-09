import './App.css';
import Table from './../table/table';
import Button from './../button/button';
import { useState } from 'react';
import { useReducer, useEffect } from 'react';
import { reducer, initialState, ActionCreator, ActionType } from '../../reducer/reducer';
import axios from 'axios';


type Props = {
  id: number,
  name: string
}


// type typeSort = {
//   DESCENDING: 'DESCENDING',
//   ASCENDING: 'ASCENDING',
//   DEFAULT: 'DEFAULT'
// }

// type user: {}[] = {
//   id: number,
//   name: string
// }


const TypeSort = {
  DESCENDING: 'DESCENDING',
  ASCENDING: 'ASCENDING',
  DEFAULT: 'DEFAULT'
};

const App = () => {

  const [state, dispatch] = useReducer(reducer,initialState);

  const { usersList, loading, error} = state;

  console.log(usersList, loading, error);
  // debugger;
  useEffect(() => {
    dispatch(ActionCreator.requestInit(loading));

    const loadUsersList = async () => {
      try {
        let responce = await axios('https://mocki.io/v1/a0bd24a9-7d83-4b7f-997d-6193d6a3a726');
        if(responce.status === 200 ) {
          dispatch(ActionCreator.requestSuccess(responce.data));
        }
      }
      catch(err) {
        console.error(err)
        dispatch(ActionCreator.requestError(loading, error ));
      }
    };
    loadUsersList();
  }, [])  


  const arr: Props[] = [
  {
    id: 22,
    name: 'iwwwww',
  },
  {
    id: 22345345,
    name: 'sasaererwwwww',
  },
  {
    id: 34,
    name: 'ererwwwww',
  },
  {
    id: 3,
    name: 'oererwwwww',
  },
];


  const [typeSort , setTypeSort] = useState(TypeSort.DESCENDING);
  const [nameField , setFieldName] = useState('');
  const [isFilterByAge , setFilter] = useState(false);

  function handleClick(typeSort:string, field:string) {
    setTypeSort((typeSort === TypeSort.DESCENDING) ?  TypeSort.ASCENDING: TypeSort.DESCENDING);
    setFieldName(field);
  }

  function handleFilterClick(check:boolean) {
    setFilter(check)
  }

	return (
    <div className="App">
      <>
        {
          loading? 
            (<p>идет загрузка</p>) : 
              error ? 
                (<p>error</p>) :     
                  ( <>
                    <Table usersList={usersList} typeSort={typeSort}  field={nameField} isFilterByAge={isFilterByAge}/>
                    <Button text={'ddddd'} onButtonClick={()=>handleClick(typeSort,'id' )}>сортировка по id {typeSort === 'DESCENDING' ? 'по убыв': 'по возр'}</Button>
                    <Button text={'ddddd'} onButtonClick={()=>handleClick(typeSort,'name' )}>сортировка по имени {typeSort === 'DESCENDING' ? 'по убыв': 'по возр'}</Button>
                    <label> 18 лет
                      <input type="checkbox" onChange={(evt) => {
                        handleFilterClick(evt.target.checked)
                      }} /> 
                    </label>
                    </>
                  )
        }
      </>
    </div>
  );
}

export default App;
