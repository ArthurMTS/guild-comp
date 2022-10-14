import { Box } from "@mui/system";
import { Item } from "components/Item";
import React from "react";
import { api } from "services/api";
import "./styles.scss";

interface itemsInformation {
  id: number;
  count: number;
  charges?: number;
  skin?: number;
  dyes?: number[];
  upgrades?: number[];
  upgrade_slot_indices?: number[];
  infusions?: string[];
  binding?: string;
  bound_to?: string;
  stats?: {
    id: number;
    attributes?: {
      AgonyResistance?: number;
      BoonDuration?: number;
      ConditionDamage?: number;
      ConditionDuration?: number;
      CritDamage?: number;
      Healing?: number;
      Power?: number;
      Precision?: number;
      Toughness?: number;
      Vitality?: number;
    }
  }
}

interface ItemListProps {
  path: string;
}

export const ItemList: React.FC<ItemListProps> = ({ path }) => {
  const [items, setItems] = React.useState<itemsInformation[]>([] as itemsInformation[]);

  React.useEffect(() => {
    const fecthData = async () => {
      const result = await api.get(`${process.env.REACT_APP_API_URL}/${path}?access_token=${process.env.REACT_APP_API_KEY}`);

      setItems(result.data);
    };

    fecthData();
  }, [api]);

  return (
    <Box className="itemListWrapper">
      {items?.map((item, index) => 
        <Item
          key={index}
          id={item?.id}
          count={item?.count}
        />
      )}
    </Box>
  );
};