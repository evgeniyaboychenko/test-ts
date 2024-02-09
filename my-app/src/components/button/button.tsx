import { useState } from 'react';
import { ReactNode, FC } from 'react'

type Props = { 
  children?: ReactNode ,
  text?: string,
  onButtonClick: ()=>void;
}

// type PropsData = { text: string }

// type FooProps = {
//   name: 'foo'
//   children: ReactNode
// }
// type Props = {
//   id: number,
//   name: string,
// }

// interface FooProps extends React.PropsWithChildren { = (props: FooProps) => {
//   return props.children
// }

const Button = ({ children, ...props}: Props) => {
 const {text, onButtonClick} = props;
  return (
      <button onClick={onButtonClick}>
        {text}
        {children}
	  </button>
  );
}

export default Button;
