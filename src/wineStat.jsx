
import React from 'react';
import { getWineData } from './utils/DataUtils';
import WineTable from './utils/wineTable';

const WineStat = () => {
 
  const wineData = getWineData();
console.log(wineData);
  const classNames = [...new Set(wineData.map((wine) => wine.Alcohol))];

  return (
    <div>
      <WineTable
        measure="Flavanoids"
        calculateValues={(wine) => parseFloat(wine.Flavanoids)}
        classNames={classNames}
        wineData={wineData}  />
      <WineTable
        measure="Gamma"
        calculateValues={(wine) => (parseFloat(wine.Ash) * parseFloat(wine.Hue)) / parseFloat(wine.Magnesium)}
        classNames={classNames}
        wineData={wineData}      />
    </div>
  );
};

export default WineStat;
