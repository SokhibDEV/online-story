import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useContext } from "react";
import { Card,} from "react-bootstrap";
import React from 'react';
const BrandBar = observer(() => {
  const { device } = useContext(Context);
  
  return (
    <div className="d-flex">
      {device.brands.map((brand) => (
        <Card
        style={{cursor :"pointer "}}
          onClick={() => device.setSelectedBrand(brand)}
          key={brand.id}
          className="p-3 mt-2 mx-2"
          border={brand.id === device.selectedBrand.id ? "danger" : 'light'}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
