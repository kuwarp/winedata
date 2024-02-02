import React from 'react';

const WineTable = ({ m, calculateValues, classNames, wineData }) => {
  const calculateMean = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length);
  };

  const calculateMedian = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
      return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    } else {
      return sortedValues[mid];
    }
  };

  const calculateMode = (values) => {
    const frequencyMap = {};
    values.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    let mode = null;
    let maxFrequency = 0;

    for (const [value, frequency] of Object.entries(frequencyMap)) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mode = value;
      }
    }

    return mode;
  };

  const renderTable = () => {
    const classMeans = {};
    const classMedians = {};
    const classModes = {};

    classNames.forEach((className) => {
      const classData = wineData.filter((wine) => wine.Alcohol === className);

      const mValues = classData.map((wine) => calculateValues(wine));

      classMeans[className] = calculateMean(mValues);
      classMedians[className] = calculateMedian(mValues);
      classModes[className] = calculateMode(mValues);
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>measure</th>
              {classNames.map((className) => (
                <th key={className}>Class {className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{m} Mean</td>
              {classNames.map((className, index) => (
                <td key={index}>{classMeans[className].toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <td>{m} Median</td>
              {classNames.map((className, index) => (
                <td key={index}>{classMedians[className].toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <td>{m} Mode</td>
              {classNames.map((className, index) => (
                <td key={index}>{classModes[className]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return renderTable();
};

export default WineTable;
