import React, { createContext, useState, type Dispatch, type ReactElement, type ReactNode, type SetStateAction } from 'react';

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({isOpen: false,setIsOpen: () => {}});

const ModalProvider = (props: {children: ReactNode}): ReactElement => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <ModalContext.Provider {...props} value={{ isOpen, setIsOpen }} />;
}

export { ModalContext, ModalProvider };
