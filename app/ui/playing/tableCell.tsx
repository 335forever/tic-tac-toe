import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TableCellProps {
    mark : string,
    key : string
}

const TableCell = ({ mark, key} : TableCellProps) => {
  const [currentMark, setCurrentMark] = useState(mark);

  useEffect(() => {
    setCurrentMark(mark);
  }, [mark]);

  return (
    <div key={key} className="bg-gray-400 m-px p-[5px]">
      <Image
        src={`/asset/${currentMark}.png`}
        alt="mark"
        height={40} // Adjust according to your requirements
        width={40}  // Adjust according to your requirements
        className="cell"
        draggable="false"
      />
    </div>
  );
};

export default TableCell;
