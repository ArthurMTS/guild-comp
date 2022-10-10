import { Box, Typography } from "@mui/material";
import { Header } from "components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "services/api";
import { getKey } from "services/localStorage";
import {
  AccountInformation,
  WorldInformation,
  GuildInformation,
} from "config/interfaces";
import "./styles.scss";

export interface AccountData {
  id: string;
  name: string;
  world: WorldInformation;
  guilds: GuildInformation[];
  guildLeader: string[];
  access: string[];
  created: string;
  age: number;
  commander: boolean;
  fractalLevel: number;
  dailyAp: number;
  monthlyAp: number;
  wvwRank: number;
}

export const Home: React.FC = () => {
  const [account, setAccount] = React.useState<AccountData>(
    {} as AccountData,
  );
  const navigate = useNavigate();
  const apiKey = getKey();

  React.useEffect(() => {
    if (!apiKey) navigate("/");

    const fetchData = async () => {
      const account = await api.get<AccountInformation>(
        `${process.env.REACT_APP_API_URL}/account?access_token=${apiKey}`,
      );

      const accountInformation = account.data;

      const world = await api.get<WorldInformation[]>(
        `${process.env.REACT_APP_API_URL}/worlds?ids=${accountInformation.world}`,
      );

      const [worldInformation] = world.data;

      const guildsInformation = accountInformation?.guilds?.map(
        async (guild: string) => {
          const guildInfo = await api.get<GuildInformation>(
            `${process.env.REACT_APP_API_URL}/guild/${guild}`,
          );

          return guildInfo.data;
        },
      );

      const accountPrepared: AccountData = {
        ...accountInformation,
        world: worldInformation,
        guilds: await Promise.all(guildsInformation),
      };

      setAccount(accountPrepared);
    };

    fetchData();
  }, [apiKey, navigate]);

  return (
    <Box className="mainAccountHome">
      <Header />
      <Box component="main" className="mainAccountGrid">
        <Box className="mainAccountCard">
          <Typography>
            <Box component="span">Account name:</Box> {account?.name}
          </Typography>
          <Box>
            <Typography className="world">
              <Box component="span">World:</Box>
              &nbsp;
              {account?.world?.name}
              &nbsp;
              <Typography component="span" className={`tag ${account?.world?.population}`}>
                {account?.world?.population}
              </Typography>
            </Typography>
          </Box>
          <Typography>
            <Box component="span">Guilds:</Box>
          </Typography>
          {account?.guilds?.map(guild => 
            <Typography key={guild.id}>
              {guild.name}
            </Typography>  
          ) && (
            <Typography>None</Typography>
          )}
          <Typography>
            <Box component="span">Comander:</Box> {account?.commander ? "Yes" : "No"}
          </Typography>
          <Typography>
          <Box component="span">Fractal Level:</Box> {account?.fractalLevel || 1}
          </Typography>
          <Typography>
            <Box component="span">WvW Rank:</Box> {account?.wvwRank || 1}
          </Typography>
          <Typography>
            <Box component="span">Account Acess:</Box>
          </Typography>
          {account?.access?.map(content => 
            <Typography component="li" key={content}>
              {content}
            </Typography>  
          )}
          <Typography>
            <Box component="span">Created:</Box> {new Date(account?.created).toLocaleString("en")}
          </Typography>
          <Typography>
            <Box component="span">Age:</Box> {account?.age}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
