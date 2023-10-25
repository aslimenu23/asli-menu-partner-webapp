import React, { useState } from "react";
import {
  AddMenuWrapper,
  ListItem,
  MenuList,
  MenuListCard,
  Separater,
} from "./Menu.styles";
import AddMenu from "./AddMenu/AddMenu";

const Menu = () => {
  const [menu, setMenu] = useState<any[]>([]);

  const onAddItem = (item: any) => setMenu([...menu, item]);

  return (
    <AddMenuWrapper>
      <MenuList>
        {menu.map((item) => (
          <MenuListCard>
            <div>
              <ListItem>{item.name}</ListItem>
              <ListItem>{item.dishType}</ListItem>
              <ListItem>{item.category}</ListItem>
            </div>
            <ListItem isLarge>{item.price}</ListItem>
          </MenuListCard>
        ))}
      </MenuList>
      {menu.length > 0 ? <Separater /> : <></>}
      <AddMenu onAddItem={onAddItem} />
    </AddMenuWrapper>
  );
};

export default Menu;
