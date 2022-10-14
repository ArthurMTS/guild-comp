import { Card, Typography } from "@mui/material";
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

interface MouseCoord {
  x: number;
  y: number;
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

  const onItemMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const mousePos = {
      x: event.nativeEvent.offsetX + 20,
      y: -(event.nativeEvent.offsetY + 250),
    };
    setMouseCoord(mousePos);
  };

  return (
    <React.Fragment>
      {id ?
        <Box className="itemContainer">
          <Box className="itemWrapper" onMouseMove={onItemMouseOver}>
            <img className={`${itemData.rarity}`} src={itemData.icon} alt={itemData.name} />
          </Box>
          <Card
            className="itemDescription"
            //style={{ bottom: mouseCoord.y, left: mouseCoord.x }}
          >
            <Typography>{itemData.name}</Typography>
          </Card> 
        </Box>:
        <Box className="nullItemWrapper"></Box>}
    </React.Fragment>
  );
};