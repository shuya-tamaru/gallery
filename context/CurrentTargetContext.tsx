import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext } from 'react';

type CurrentTargetContextType = number;
type CurrentTargetUpdateContextType = Dispatch<SetStateAction<number>>;

export const CurrentTargetContext = createContext<CurrentTargetContextType>(0);
export const CurrentTargetUpdateContext = createContext<CurrentTargetUpdateContextType>(() => { });

export const CurrentTargetprovider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [target, setTarget] = useState<number>(0);

  return (
    <CurrentTargetUpdateContext.Provider value={setTarget}>
      <CurrentTargetContext.Provider value={target}>
        {children}
      </CurrentTargetContext.Provider>
    </CurrentTargetUpdateContext.Provider>
  );
};

export const useCurrentTarget = (): CurrentTargetContextType => useContext(CurrentTargetContext);
export const useCurrentTargetUpdate = (): CurrentTargetUpdateContextType => useContext(CurrentTargetUpdateContext);