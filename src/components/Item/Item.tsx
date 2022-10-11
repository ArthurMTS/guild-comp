import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { api } from "services/api";
import "./styles.scss";

interface ItemsInformation {
  id: number;
  name: string;
  icon?: string;
  rarity: string;
}

interface ItemsProps {
  id: number;
  count: number;
  charges?: number;
}

export const Item: React.FC<ItemsProps> = ({
  id,
  count,
  charges
}) => {
  const [itemData, setItemData] = React.useState<ItemsInformation>({} as ItemsInformation);

  React.useEffect(() => {
    const fecthData = async () => {
      const result = await api.get(`${process.env.REACT_APP_API_URL}/items/${id}`)

      setItemData(result.data);
      console.log(result.data);
    };

    fecthData();
  }, [api]);

  return (
    <React.Fragment>
      {id ?
        <Box className="itemContainer">
          <Box className="itemWrapper">
            <img className={`${itemData.rarity}`} src={itemData.icon} alt={itemData.name} />
          </Box>
          <Box className="itemDescription">
            <Typography>{itemData.name}</Typography>
          </Box> 
        </Box>:
        <Box className="nullItemWrapper"></Box>}
    </React.Fragment>
  );
};