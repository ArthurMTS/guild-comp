import { Box } from "@mui/material";
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

export interface AccountData {
  id: string;
  name: string;
  age: number;
  world: WorldInformation;
  guilds: GuildInformation[];
  guildLeader: string[];
  created: string;
  access: string[];
  commander: boolean;
  fractalLevel: number;
  dailyAp: number;
  monthlyAp: number;
  wvwRank: number;
}

export const Home: React.FC = () => {
  const [accountInfo, setAccountInfo] = React.useState<AccountData>(
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

      setAccountInfo(accountPrepared);
    };

    fetchData();
  }, [apiKey, navigate]);

  return (
    <Box>
      <Header />
    </Box>
  );
};
