import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <>
      <ListGroup className='mt-2'>
        {device.types.map((type) => (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            key={type.id}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
});

export default TypeBar;
