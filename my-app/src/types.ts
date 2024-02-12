export interface UserList {
	id: number;
	name: string;
	phone: string;
	birthday: string;
	username: string;
	email: string;
	website: string;
  };
  
export interface SortDirections {
	id: string;
	name: string;
	birthday: string;
};

export type SortingField = 'id'|'name'| 'birthday' | '';