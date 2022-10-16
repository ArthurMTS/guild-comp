import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { api } from "services/api";
import { mousePosition } from "utils/mousePosition";
import "./styles.scss";

interface ItemsInformation {
  id: number;
  name: string;
  icon?: string;
  rarity: string;
}

interface MouseCoord {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface ItemProps {
  id: number;
  count: number;
  charges?: number;
}

export const Item: React.FC<ItemProps> = ({
  id,
  count,
  charges
}) => {
  const [itemData, setItemData] = React.useState<ItemsInformation>({} as ItemsInformation);
  const [mouseCoord, setMouseCoord] = React.useState<MouseCoord>({} as MouseCoord);

  React.useEffect(() => {
    const fecthData = async () => {
      if (!id) return;

      const result = await api.get(`${process.env.REACT_APP_API_URL}/items/${id}`)

      setItemData(result.data);
    };

    fecthData();
  }, [api]);

  const onItemMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = event.pageX + 20;
    const y = event.pageY + 20;
    
    const mousePos = mousePosition(x, y);

    setMouseCoord(mousePos);
  };

  return (
    <React.Fragment>
      {id ?
        <Box className="itemContainer">
          <Box className="itemWrapper" onMouseMove={onItemMouseMove}>
            <img className={`${itemData.rarity}`} src={itemData.icon} alt={itemData.name} />
          </Box>
          <Card
            className="itemDescription"
            style={mouseCoord}
          >
            <Typography>{itemData.name}</Typography>
          </Card> 
        </Box>:
        <Box className="nullItemWrapper"></Box>}
    </React.Fragment>
  );
};